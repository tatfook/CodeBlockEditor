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

    BlocklyLoader.loadConfig = function (config_json) {
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
                BlocklyLoader.paracraft_config_map[type] = BlocklyLoader.fix_format(item);
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
    BlocklyLoader.getAllVariableTypes = function () {
        var cmd_maps = BlocklyLoader.getConfigMap();
        var variable_types_map = {
            "": "" // default types
        };

        for (var type in cmd_maps) {
            var cmd = cmd_maps[type];
            BlocklyLoader.forEachArg(cmd, "args", function (arg) {
                if (arg) {
                    if (arg.type == "field_variable") {
                        var variableTypes = arg.variableTypes;
                        if (variableTypes) {
                            for (var i = 0; i < variableTypes.length; i++) {
                                var type = variableTypes[i];
                                variable_types_map[type] = type;
                            }
                        }
                    }
                }
            })
        }
        var result = [];
        for (var type in variable_types_map) {
            result.push(type);
        }
        return result;
    }
    return BlocklyLoader;
})





