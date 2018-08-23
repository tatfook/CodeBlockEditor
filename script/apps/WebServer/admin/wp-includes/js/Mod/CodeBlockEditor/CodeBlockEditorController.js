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
            var debug = getUrlParameter("debug");
            var lang = getUrlParameter("lang") || "zhCN"; // "en" or "zhCN"
            
            var menu_parent_id = "blocklyDiv";
            var gWorkSpace;

            $scope.locale = "";
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

                BlocklyLoader.loadConfig(config_json);
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

                var variable_types = BlocklyLoader.getAllVariableTypes();
                for (var i = 0; i < variable_types.length; i++) {
                    var type = variable_types[i];
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
                

                
                gWorkSpace.toolbox_.refreshSelection();

                gWorkSpace.addChangeListener(function (event) {
                    setTimeout(function () {
                        $scope.onRun("showcode");
                    }, 500);
                });

                $scope.init_editor(keywords_json);
                if ($scope.code_editor) {
                    $scope.code_editor.layout();
                }

            }
            $scope.init_editor = function (keywords_json) {
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
                var url = "/ajax/blockeditor?action=runblockly&state=" + state;
                $.post(url, { code: content }, function (data) {
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
            $scope.onExportXml = function () {
                var xmlDom = Blockly.Xml.workspaceToDom(gWorkSpace);
                var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
                $scope.setEditorValue(xmlText);
            }
            
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
