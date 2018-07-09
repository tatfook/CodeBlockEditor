/**
Author: leio
Date: 2017/10/23
*/

define([
    "js/Mod/CodeBlockEditor/angular.config",
    "js/Mod/CodeBlockEditor/BlocklyLoader",
    "js/Mod/CodeBlockEditor/MonacoLanguage",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyMenu.xml",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyConfigSource.json",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyExecution.js",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/LanguageKeywords.json",
], function (app, BlocklyLoader, MonacoLanguage, template_menu_xml, template_config_json, template_execution_str, template_keywords_json) {
    app.registerController('CodeBlockEditorController', ['$scope',
        function ($scope) {
            var debug = getUrlParameter("debug");
            var menu_parent_id = "blocklyDiv";
            var gWorkSpace;

            
            $scope.onLoad = function (menu_xml, config_json, execution_str, keywords_json) {
                BlocklyLoader.loadConfig(config_json);
                BlocklyLoader.loadMenu(menu_parent_id, menu_xml);
                BlocklyLoader.loadExecution(execution_str);

                gWorkSpace = Blockly.inject(menu_parent_id, {
                    toolbox: document.getElementById('toolbox'),
                    media: "wp-includes/js/blockly.mini/media/",
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
                    code_editor.updateOptions({ readOnly: true, });
                }
            }
            $scope.onRun = function(state) {
                var code = Blockly.Lua.workspaceToCode(gWorkSpace);
                var content = code.valueOf();
                console.log(content);
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
                    var menu_xml = data.menu_xml;
                    var config_json = data.config_json;
                    var execution_str = data.execution_str;
                    var keywords_json = data.keywords_json;
                    $scope.onLoad(menu_xml, config_json, execution_str, keywords_json);
                });
            }
            if(debug == "true"){
                $scope.onLoad(template_menu_xml, template_config_json, template_execution_str, template_keywords_json);
            }else{
                $scope.onMakeEditor();
            }

        }]);


});
