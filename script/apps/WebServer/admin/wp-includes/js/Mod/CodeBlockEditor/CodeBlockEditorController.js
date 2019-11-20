/**
Author: leio
Date: 2017/10/23
*/

define([
    "js/Mod/CodeBlockEditor/angular.config",
    "js/Mod/CodeBlockEditor/MonacoLanguage",
    "BlocklyLoader"
], function (app, MonacoLanguage, BlocklyLoader) {
    app.registerController('CodeBlockEditorController', ['$scope',
        function ($scope) {
            BlocklyLoader = BlocklyLoader.BlocklyLoader;
            var BlocklySourceLoader = BlocklyLoader.BlocklySourceLoader;
            var BlocklyUtil = BlocklyLoader.BlocklyUtil;

            var showCodeEditor = false;
            var debug = getUrlParameter("debug");
            var showmenu = getUrlParameter("showmenu");
            var blocktype = getUrlParameter("blocktype") || "codeblock"; // "codeblock" or "nplcad"
            var lang = getUrlParameter("lang") || "zhCN"; // "en" or "zhCN"
            var blockpos = getUrlParameter("blockpos");
            var codeLanguageType = getUrlParameter("codeLanguageType") || "npl";
            $scope.loaded_file = false;
            if (showmenu == "True" || showmenu == "true") {
                // show a help menu to debug
                $scope.showmenu = true;
            }
            var gWorkSpace;
            var menu_parent_id = "blocklyDiv";

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
            $scope.onLoad = function (is_local_source, lang, menu_xml, config_json, execution_str, keywords_json) {
                lang = lang || "zhCN";

                var locale;
                var locale2;
                if (lang == "zhCN") {
                    locale = "zh-cn";
                    locale2 = "zh_cn";
                } else {
                    locale = "en"
                    locale2 = "en";
                }

                $scope.locale = locale;
                Blockly.ScratchMsgs.setLocale(locale);

                
                var blockly_loader = new BlocklySourceLoader();
                blockly_loader.loadResource(menu_xml, config_json, execution_str);

                // register mcml extensions before creating block workspace
                Blockly.Extensions.registerMcmlExtensions();

                var menu_xml = blockly_loader.toolbox_menu;
                var variable_types_map = blockly_loader.variable_types_map;
                var extra_variable_names = blockly_loader.extra_variable_names;
                $scope.createBlocklyWorkspace(menu_xml, variable_types_map, extra_variable_names);


                if (showCodeEditor) {
                    $scope.init_code_editor(keywords_json);
                    if ($scope.code_editor) {
                        $scope.code_editor.layout();
                    }
                }

                $scope.onLoadFile();
            }
            $scope.isDebug = function () {
                if (debug == "True" || debug == "true") {
                    return true;
                }
                return false;
            }
            $scope.domIsValid = function () {
                var dom = document.getElementById(menu_parent_id);
                if (dom) {
                    return true;
                }
                return false;
            }
            $scope.hasChanged = function () {
                if (gWorkSpace) {
                    return ( gWorkSpace.hasUndoStack() || gWorkSpace.hasRedoStack() )
                }
                return false;
            }
            $scope.createBlocklyWorkspace = function (menu_xml, variable_types_map, extra_variable_names) {
                var grid = {
                    spacing: 20,
                    length: 3,
                    colour: '#ccc',
                    snap: true
                };
                if ($scope.isDebug()) {
                    grid = null;
                }
                gWorkSpace = Blockly.inject(menu_parent_id, {
                    toolbox: menu_xml,
                    media: "wp-includes/js/scratch_blocks/media/",
                    zoom: {
                        controls: true,
                        wheel: true,
                        startScale: 0.75,
                        maxScale: 4,
                        minScale: 0.25,
                        scaleSpeed: 1.1
                    },
                    trashcan: true,
                    grid: grid,
                    colours: {
                        fieldShadow: 'rgba(255, 255, 255, 0.3)',
                        dragShadowOpacity: 0.6
                    }
                });
                $scope.blockly_workspace = gWorkSpace;

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
                for (var type in extra_variable_names) {
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
                    var self = $scope;
                    if (lastTimerId != null)
                        clearTimeout(lastTimerId);
                    lastTimerId = setTimeout(function () {
                        if (showCodeEditor) {
                            $scope.onRun("showcode");
                        }
                        $scope.onSaveFile(); // auto save
                    }, 500);

                    if (event.type == "create") {
                        if (event.xml) {
                            var type = event.xml.getAttribute("type");
                            if (type == "createNode") {
                                self.selected_blockId = event.blockId;
                            }
                        }
                    } else if (event.type == "endDrag") {
                        if (self.selected_blockId && self.selected_blockId == event.blockId) {
                            self.createNextVariable();
                        }

                        self.selected_blockId = null;
                    }
                });

            }

            $scope.createNextVariable = function () {
                var self = $scope;
                var blockly_workspace = self.blockly_workspace;
                var blockId = self.selected_blockId;
                if (blockId) {
                    var next_name = BlocklyUtil.getNextVariableName(blockly_workspace);
                    var block = blockly_workspace.getBlockById(blockId);
                    if (block) {
                        var next_variable = blockly_workspace.createVariable(next_name);
                        var field = block.getField("var_name");
                        field.setValue(next_variable.getId());
                        blockly_workspace.toolbox_.refreshSelection();
                    }

                }
            },
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
                        //console.log(block_xml_txt);
                        $scope.readBlocklyFromXml(block_xml_txt);
                        $scope.loaded_file = true;

                        //$scope.onSaveFile(true); // saving file to generate codes
                    });
                }
                
            }
            $scope.getBlocklyLanguageNameSpace = function () {
                var namespace;
                if (codeLanguageType == "npl") {
                    namespace = Blockly.Lua;
                } else if (codeLanguageType == "javascript") {
                    namespace = Blockly.JavaScript;
                } else if (codeLanguageType == "python") {
                    namespace = Blockly.Python;
                }
                return namespace;
            }
            $scope.onSaveFile = function (bForce) {
                if (!$scope.domIsValid()) {
                    console.log("dom isn't valid");
                    return
                }
                if (!bForce) {
                    if (!$scope.hasChanged()) {
                        console.log("nothing changed");
                        return
                    }
                }
                
                if (blockpos) {
                    var xmlText = $scope.writeBlocklyToXml();
                    var url = "/ajax/blockeditor?action=savefile&blockpos=" + blockpos;

                    var content;
                    try {
                        var namespace = $scope.getBlocklyLanguageNameSpace();
                        code = namespace.workspaceToCode(gWorkSpace);
                        content = code.valueOf();
                    } catch (err) {
                        console.log("get code error:",err);
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

            $scope.handleFiles = function (e) {
                var files = e.files;
                var file = files[0];
                if (file) {
                    var name = file.name;
                    self.filename = name;

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var txt = e.target.result;
                        $scope.readBlocklyFromXml(txt)
                    }
                    reader.readAsText(file);
                }
            },
            $scope.onHelp = function (state) {
                if(state == "open"){
                    $("#file_upload_id").click();
                } else if (state == "save") {
                    var filename = "test_" + blockpos;
                    var content = $scope.writeBlocklyToXml();
                    var blob = new Blob([content], { type: 'text/plain' });
                    saveAs(blob, filename + '.xml');
                }
            }
            $scope.onRun = function (state) {
                var code;
                var content;
                try {
                    var namespace = $scope.getBlocklyLanguageNameSpace();
                    code = namespace.workspaceToCode(gWorkSpace);
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
                    
                    $scope.onLoad(false, lang, menu_xml, config_json, execution_str, keywords_json);
                });
            }
            $scope.onParse = function () {
                var content = $scope.getEditorValue();
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
                $scope.onMakeEditor();
            })
        }]);


});
