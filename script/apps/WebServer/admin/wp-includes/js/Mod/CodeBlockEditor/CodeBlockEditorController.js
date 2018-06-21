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
            BlocklyLoader.load();
            BlocklyLoader.loadMenu(menu_parent_id);

            var gWorkSpace;
            function onLoad() {
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
            onLoad();
        }]);


});
