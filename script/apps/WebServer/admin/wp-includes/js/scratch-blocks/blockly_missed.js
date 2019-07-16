Blockly.Variables.allUsedVarModels = function (ws) {
    var blocks = ws.getAllBlocks();
    var variableHash = Object.create(null);
    // Iterate through every block and add each variable to the hash.
    for (var x = 0; x < blocks.length; x++) {
        var blockVariables = blocks[x].getVarModels();
        if (blockVariables) {
            for (var y = 0; y < blockVariables.length; y++) {
                var variable = blockVariables[y];
                if (variable.getId()) {
                    variableHash[variable.getId()] = variable;
                }
            }
        }
    }
    // Flatten the hash into a list.
    var variableList = [];
    for (var id in variableHash) {
        variableList.push(variableHash[id]);
    }
    return variableList;
};