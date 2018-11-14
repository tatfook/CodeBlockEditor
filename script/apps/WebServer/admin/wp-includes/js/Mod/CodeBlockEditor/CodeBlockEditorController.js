/**
Author: leio
Date: 2017/10/23
*/

define([
    "LuaAstParser",
    "js/Mod/CodeBlockEditor/angular.config",
    "js/Mod/CodeBlockEditor/BlocklyLoader",
    "js/Mod/CodeBlockEditor/MonacoLanguage",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyMenu.xml",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyMenu-zh-cn.xml",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyConfigSource.json",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyConfigSource-zh-cn.json",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyExecution.js",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/LanguageKeywords.json",
], function (LuaAstParser, app, BlocklyLoader, MonacoLanguage, template_menu_xml, template_menu_xml_zh_cn, template_config_json, template_config_json_zh_cn, template_execution_str, template_keywords_json) {
    app.registerController('CodeBlockEditorController', ['$scope',
        function ($scope) {
            var showCodeEditor = false;
            var debug = getUrlParameter("debug");
            var lang = getUrlParameter("lang") || "zhCN"; // "en" or "zhCN"
            var blockpos = getUrlParameter("blockpos");
            $scope.loaded_file = false;

            var menu_parent_id = "blocklyDiv";
            var gWorkSpace;
            $scope.locale = "";
            $scope.notifications = [];
            // @param type: "success", "info", "warning", "danger"
            $scope.addNotice = function (notification, type, duration) {
                $scope.notifications.push({ text: notification, type: type || "success" });
                $scope.$apply();
                window.setTimeout(function () {
                    $scope.notifications.splice(0, 1);
                    $scope.$apply();
                }, duration || 3000);
            };
            $scope.onLoad = function (lang, menu_xml, config_json, execution_str, keywords_json) {

                lang = lang || "zhCN";

                var locale;
                if (lang == "zhCN") {
                    locale = "zh-cn";
                } else
                {
                    locale = "en"
                }
                $scope.locale = locale;
                Blockly.ScratchMsgs.setLocale(locale);

                var variable_result = BlocklyLoader.getAllVariableTypes(config_json);
                var variable_types_map = variable_result[0];
                var extra_variable_names = variable_result[1];

                BlocklyLoader.loadConfig(config_json, variable_types_map);
                BlocklyLoader.loadExecution(execution_str);


                gWorkSpace = Blockly.inject(menu_parent_id, {
                    toolbox: menu_xml,
                    media: "wp-includes/js/scratch-blocks/media/",
                    zoom: {
                        controls: true,
                        wheel: true,
                        startScale: 0.75,
                        maxScale: 4,
                        minScale: 0.25,
                        scaleSpeed: 1.1
                    },
                    trashcan: true,
                    grid:{
                            spacing: 20,
                            length: 3,
                            colour: '#ccc',
                            snap: true
                    },
                    colours: {
                        fieldShadow: 'rgba(255, 255, 255, 0.3)',
                        dragShadowOpacity: 0.6
                    }
                });

                
                for (var type in variable_types_map) {
                    var callbackKey;
                    if (type == "") {
                        callbackKey = "create_variable";
                    } else {
                        callbackKey = "create_variable_" + type;
                    }
                    var callback = function (button) {
                        var var_type = button.callback_.__var_type;
                        Blockly.Variables.createVariable(button.getTargetWorkspace(), function (variableBlockId) {
                            //console.log("====Blockly.allUsedVariables", Blockly.Variables.allUsedVariables(gWorkSpace));
                            //console.log("====Blockly.allVariables", Blockly.Variables.allVariables(gWorkSpace));
                        }, var_type);
                    }
                    // hold variable type
                    callback.__var_type = type;
                    gWorkSpace.registerButtonCallback(callbackKey, callback);
                }
                var var_id_index = 0;
                for (var type in extra_variable_names)
                {
                    var names = extra_variable_names[type];
                    for (var name in names) {
                        var id = "_extra_var_id_" + var_id_index;
                        gWorkSpace.createVariable(name, type, id);
                        var_id_index += 1;
                    }
                }
                gWorkSpace.toolbox_.refreshSelection();

                var lastTimerId = null;
                gWorkSpace.addChangeListener(function (event) {
                    if(lastTimerId != null)
                        clearTimeout(lastTimerId);
                    lastTimerId = setTimeout(function () {
                        if(showCodeEditor){
                            $scope.onRun("showcode");
                        }
                        $scope.onSaveFile(); // auto save
                    }, 500);
                });

                if(showCodeEditor){
                    $scope.init_code_editor(keywords_json);
                    if ($scope.code_editor) {
                        $scope.code_editor.layout();
                    }
                }

                $scope.onLoadFile();
            }
            $scope.init_code_editor = function (keywords_json) {
                if ($scope.code_editor) {
                    return
                }
                if (keywords_json) {
                    keywords_json = JSON.parse(keywords_json);
                }
                var m = new MonacoLanguage();
                var language_name = "codeblock";
                m.register(language_name, keywords_json);
                var config = {
                    value: this.content,
                    language: language_name,
                };

                var editor_container = document.getElementById("editor");
                $scope.code_editor = monaco.editor.create(editor_container, config)
            }
            $scope.getEditorValue = function () {
                var code_editor = $scope.code_editor;
                if (code_editor) {
                    var content = code_editor.getValue();
                    return content;
                }
            }
            $scope.setEditorValue = function (text) {
                var code_editor = $scope.code_editor;
                if (code_editor) {
                    code_editor.updateOptions({ readOnly: false, });
                    var range = code_editor.getModel().getFullModelRange();
                    code_editor.executeEdits("",
                        [
                            {
                                range: range,
                                text: text
                            }
                        ]
                    );
                    code_editor.updateOptions({ readOnly: false, });
                }
            }
            $scope.onLoadFile = function () {
                if (blockpos && !$scope.loaded_file) {
                    var url = "/ajax/blockeditor?action=loadfile&blockpos=" + blockpos;
                    $.get(url, function (data) {
                        var block_xml_txt = data.block_xml_txt;
                        $scope.readBlocklyFromXml(block_xml_txt);
                        $scope.loaded_file = true;
                    });
                }
                
            }
            $scope.onSaveFile = function () {
                if (blockpos) {
                    var xmlText = $scope.writeBlocklyToXml();
                    var url = "/ajax/blockeditor?action=savefile&blockpos=" + blockpos;

                    var content;
                    try{
                        code = Blockly.Lua.workspaceToCode(gWorkSpace);
                        content = code.valueOf();
                    } catch (err) {
                    }

                    $.post(url, { block_xml_txt: xmlText, code: content }, function (data) {
                        if (data && data.successful) {
                            // var msg;
                            // if ($scope.locale == "zh-cn") {
                            //     msg = "保存成功!";
                            // } else {
                            //     msg = "saved successful!";
                            // }
                            // $scope.addNotice(msg, "success");
                        }
                        else
                        {
                            var msg;
                            if ($scope.locale == "zh-cn") {
                                 msg = "保存失败了!";
                            } else {
                                 msg = "save failed!";
                            }
                            $scope.addNotice(msg, "error");
                        }
                    });
                }
            }
            $scope.onRun = function (state) {
                var code;
                var content;
                try{
                    code = Blockly.Lua.workspaceToCode(gWorkSpace);
                    content = code.valueOf();
                } catch (err) {
                }
                
                $scope.setEditorValue(content);
                state = state || "showcode"

                if (state == "showcode") {
                    return;
                }
                var blockpos = getUrlParameter("blockpos");
                var url = "/ajax/blockeditor?action=runblockly&state=" + state;
                if(blockpos){
                    url = url + "&blockpos=" + blockpos;
                }
                $.post(url, { code: content }, function (data) {
                    if(data.succeed){
                        var msg;
                        if ($scope.locale == "zh-cn") {
                            msg = "成功!";
                        } else
                        {
                            msg = "succeed!";
                        }
                        $scope.addNotice(msg, "success");
                    }
                    else{
                        // TODO: display error message to the user.     
                        console.log("failed to update code because blockpos does not match");
                        var msg;
                        if ($scope.locale == "zh-cn") {
                            msg = "无法替换代码";
                        } else
                        {
                            msg = "failed to insert code";
                        }
                        $scope.addNotice(msg, "danger");
                    }
                    console.log(data);
                }, "json");
            }
            $scope.onMakeEditor = function () {
                var url = "/ajax/blockeditor?action=makeblocklyeditor";
                $.get(url, function (data) {
                    var lang = data.lang;
                    var menu_xml = data.menu_xml;
                    var config_json = data.config_json;
                    var execution_str = data.execution_str;
                    var keywords_json = data.keywords_json;
                    
                    $scope.onLoad(lang, menu_xml, config_json, execution_str, keywords_json);
                });
            }
            $scope.onParse = function () {
                var content = $scope.getEditorValue();
                var p = new LuaAstParser(content);
                p.createBlocks();
            }
            $scope.writeBlocklyToXml = function () {
                var xmlDom = Blockly.Xml.workspaceToDom(gWorkSpace);
                var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
                return xmlText;
            }
            $scope.readBlocklyFromXml = function (s) {
                var dom = Blockly.Xml.textToDom(s);
                gWorkSpace.clear();
                Blockly.Xml.domToWorkspace(dom, gWorkSpace);
                gWorkSpace.clearUndo();
            },
            $scope.$watch('$viewContentLoaded', function () {
                if (debug == "true") {
                    if (lang == "zhCN") {
                        $scope.onLoad(lang, template_menu_xml_zh_cn, template_config_json_zh_cn, template_execution_str, template_keywords_json);
                    } else {
                        $scope.onLoad(lang, template_menu_xml, template_config_json, template_execution_str, template_keywords_json);
                    }
                } else {
                    $scope.onMakeEditor();
                }
            })
        }]);


});
