/**
Author: leio
Date: 2019/2/24
*/
define([
], function () {
    var BlocklyUtil = function () {
    }
    BlocklyUtil.getNextVariableName = function (blockly_workspace,type) {
        type = type || "";
        var variableModelList = blockly_workspace.getVariablesOfType(type);
        var max_len = 100;
        for (var i = 0; i < max_len; i++) {
            var name = "object" + i;
            var obj = BlocklyUtil.findVariableByName(variableModelList,name);
            if (!obj) {
                return name;
            }

        }
        variableModelList.sort(Blockly.VariableModel.compareByName);
        var len = variableModelList.length;
        var obj = variableModelList[len - 1];
        var index = this.getNameIndex(obj.name) || 0;
        index += 1;
        var var_name = "object" + index;
        return var_name
    }
    BlocklyUtil.findVariableByName = function (list, name) {
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            if (obj.name == name) {
                return obj;
            }
        }
    }
    BlocklyUtil.getNameIndex = function (name) {
        if (name) {
            var result = name.match(/object(.+)/)
            if (result[1]) {
                var v = Number(result[1]);
                return v;
            }
        }
        return null;
    }
    return BlocklyUtil;
})