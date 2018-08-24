/**
 * @author leio
 * @date 2018/6/21
 */
define([
], function () {

    // assumed one block has 10 args in maximal
    var arg_len = 10;
    String.prototype.format = function () {
        var a = this;
        if (arguments && arguments.length > 0) {
            var b;
            for (b in arguments) {
                a = a.replace(/%[a-z]/, arguments[b]);
            }
        }
        return String(a);
    };
    var BlocklyLoader = {};
    BlocklyLoader.paracraft_config_map = {};
    BlocklyLoader.forEachArg = function (cmd,arg_name,callback) {
        if (cmd && arg_name) {
            for (var i = 0; i < arg_len; i++) {
                var input_arg = cmd[arg_name + i];
                if (input_arg) {
                    for (var k = 0; k < input_arg.length; k++) {
                        var arg_item = input_arg[k];
                        callback && callback(arg_item);
                    }
                }
            }
        }
    }
    BlocklyLoader.fix_format_args = function (item) {
        if (!item) {
            return;
        }
        for (var i = 0; i < arg_len; i++) {
            var input_arg = item["arg" + i];
            if (input_arg) {
                for (var k = 0; k < input_arg.length; k++) {
                    var arg_item = input_arg[k];
                    if (arg_item.type == "field_number") {
                        arg_item.value = arg_item.text;
                        arg_item.text = null;
                    }
                }

                // changed arg0 -- > args0
                item["args" + i] = input_arg;
                delete item["arg" + i];
            }
        }
        return item;
    }
    
    BlocklyLoader.fix_format = function(item) {
        if (!item) {
            return
        }

        item = BlocklyLoader.fix_format_args(item);

        if (item.previousStatement == true) {
            item.previousStatement = null;
        }
        if (item.nextStatement == true) {
            item.nextStatement = null;
        }

        if (item.output) {
            var old_output = item.output;
            if (old_output.type == "null") {
                item.output = null;
            } else {
                item.output = old_output.type;
            }

        }

        return item;
    }
    BlocklyLoader.update_variableTypes = function (item, variable_types_map) {
        if (!item || !variable_types_map) {
            return
        }
        var variableTypes = [];
        for (var type in variable_types_map) {
            variableTypes.push(type);
        }
        BlocklyLoader.forEachArg(item, "args", function (arg) {
            if (arg) {
                if (arg.type == "field_variable") {
                    arg.variableTypes = variableTypes;
                }
            }
        })
        return item;
    }
    /**
     * Initiate blockly
     * update variableTypes in "setLocalVariable" and "getLocalVariable" from variable_types_map
     * @param {string} config_json
     * @param {object} variable_types_map
     */
    BlocklyLoader.loadConfig = function (config_json, variable_types_map) {
        if (!config_json) {
            return
        }
        config_json = JSON.parse(config_json);
        var len = config_json.length;
        for (var i = 0; i < len; i++) {
            var item = config_json[i];
            var type = item.type;
            
            var block = Blockly.Blocks[type];
            if (!block) {
                item = BlocklyLoader.fix_format(item);
                if (type == "setLocalVariable" || type == "getLocalVariable") {
                    item = BlocklyLoader.update_variableTypes(item, variable_types_map);
                }
                BlocklyLoader.paracraft_config_map[type] = item;
                block = {
                    init: function () {
                        var source = BlocklyLoader.paracraft_config_map[this.type];
                        this.jsonInit(source);
                    }
                }
                Blockly.Blocks[type] = block;
            }
        }
    }
    BlocklyLoader.getConfigMap = function () {
        return BlocklyLoader.paracraft_config_map;
    }
    BlocklyLoader.loadExecution = function (execution_str) {
        if (execution_str) {
            eval(execution_str);
        }
    }
    /**
     * Parse raw source and find out all of variable types and names 
     * @param {string} config_json
     * @returns {array} result
     * @param {object} result[0] - the map of variable types
     * @param {object} result[1] - the map of variable names
     */
    BlocklyLoader.getAllVariableTypes = function (config_json) {
        if (!config_json) {
            return
        }
        var variable_types_map = {
            "": "" // default types
        };
        var extra_variable_names = {}

        config_json = JSON.parse(config_json);
        var len = config_json.length;
        for (var i = 0; i < len; i++) {
            var item = config_json[i];
            BlocklyLoader.forEachArg(item, "arg", function (arg) {
                if (arg) {
                    if (arg.type == "field_variable") {
                        var variableTypes = arg.variableTypes;
                        var injectVariableTypeValues = arg.injectVariableTypeValues;
                        if (variableTypes) {
                            for (var i = 0; i < variableTypes.length; i++) {
                                var type = variableTypes[i];
                                variable_types_map[type] = type;
                            }
                        }
                        if (injectVariableTypeValues) {
                            for (var var_type in injectVariableTypeValues) {
                                variable_types_map[type] = type;
                                var names = injectVariableTypeValues[var_type];

                                var len = names.length;
                                if (len > 0) {
                                    if (!extra_variable_names[type]) {
                                        extra_variable_names[type] = {};
                                    }
                                    for (var i = 0; i < len; i++) {
                                        var name = names[i];
                                        extra_variable_names[type][name] = name;
                                    }
                                }

                            }
                        }
                    }
                }
            })
        }
        var result = [variable_types_map, extra_variable_names];
        return result;
    }
    return BlocklyLoader;
})





