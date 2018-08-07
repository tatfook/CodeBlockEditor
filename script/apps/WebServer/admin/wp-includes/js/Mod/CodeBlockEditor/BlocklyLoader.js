/**
 * @author leio
 * @date 2018/6/21
 */
define([
], function () {

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

    // assumed one block has 10 args in maximal
    BlocklyLoader.fix_format_args = function (item) {
        if (!item) {
            return;
        }
        var len = 10;
        for (var i = 0; i < len; i++) {
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
    BlocklyLoader.loadExecution = function (execution_str) {
        if (execution_str) {
            eval(execution_str);
        }
    }
    return BlocklyLoader;
})





