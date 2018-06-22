/**
Author: leio
Date: 2017/10/23
*/

define([
    "js/Mod/CodeBlockEditor/angular.config",
    "js/Mod/CodeBlockEditor/BlocklyLoader",
], function (app,BlocklyLoader){    
    app.registerController('CodeBlockEditorController', ['$scope',
        function ($scope) {
            var menu_parent_id = "blocklyDiv";
            var gWorkSpace;
            $scope.onLoad = function(menu_xml, config_json, execution_str) {
                BlocklyLoader.loadConfig(config_json);
                BlocklyLoader.loadMenu(menu_parent_id, menu_xml);
                BlocklyLoader.loadExecution(execution_str);

                gWorkSpace = Blockly.inject(menu_parent_id, { toolbox: document.getElementById('toolbox') });
            }
            $scope.onRun = function(state) {
                var code = Blockly.Lua.workspaceToCode(gWorkSpace);
                var content = code.valueOf();
                document.getElementById('LuaCode_Orgin').value = content;

                state = state || "insert"
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
            $scope.onMakeEditor();
        }]);


});
