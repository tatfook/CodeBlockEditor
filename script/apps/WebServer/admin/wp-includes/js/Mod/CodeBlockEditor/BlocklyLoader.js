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

    BlocklyLoader.fix_format = function(item) {
        if (!item) {
            return
        }
        var arg0 = item.arg0;
        if (arg0) {
            var len = arg0.length;
            for (var i = 0; i < len; i++) {
                var arg_item = arg0[i];
                if (arg_item.type == "field_number") {
                    arg_item.value = arg_item.text;
                    arg_item.text = null;
                }
            }

            item.args0 = arg0;

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
    BlocklyLoader.loadMenu = function (menu_parent_id, menu_xml) {
        if (!menu_parent_id) {
            return;
        }
        var dom = document.getElementById(menu_parent_id);
        if (dom) {
            dom.innerHTML = menu_xml;
        }
    }
    return BlocklyLoader;
})





