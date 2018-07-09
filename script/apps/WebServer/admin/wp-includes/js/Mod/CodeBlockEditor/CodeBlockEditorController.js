/**
Author: leio
Date: 2017/10/23
*/

define([
    "js/Mod/CodeBlockEditor/angular.config",
    "js/Mod/CodeBlockEditor/BlocklyLoader",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyMenu.xml",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyConfigSource.json",
    "text!js/Mod/CodeBlockEditor/BlocklySourceTemplate/BlocklyExecution.js",
], function (app, BlocklyLoader, template_menu_xml, template_config_json, template_execution_str) {
    app.registerController('CodeBlockEditorController', ['$scope',
        function ($scope) {
            var debug = getUrlParameter("debug");
            var menu_parent_id = "blocklyDiv";
            var gWorkSpace;
            $scope.onLoad = function(menu_xml, config_json, execution_str) {
                BlocklyLoader.loadConfig(config_json);
                BlocklyLoader.loadMenu(menu_parent_id, menu_xml);
                BlocklyLoader.loadExecution(execution_str);

                gWorkSpace = Blockly.inject(menu_parent_id, {
                    toolbox: document.getElementById('toolbox'),
                    media: "wp-includes/js/blockly.mini/media/",
                });
            }
            $scope.onRun = function(state) {
                var code = Blockly.Lua.workspaceToCode(gWorkSpace);
                var content = code.valueOf();
                document.getElementById('LuaCode_Orgin').value = content;
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
                    $scope.onLoad(menu_xml, config_json, execution_str);
                });
            }
            if(debug == "true"){
                $scope.onLoad(template_menu_xml, template_config_json, template_execution_str);
            }else{
                $scope.onMakeEditor();
            }

        }]);


});
