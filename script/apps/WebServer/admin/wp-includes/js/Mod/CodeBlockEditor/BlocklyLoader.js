/**
 * @author leio
 * @date 2018/6/21
 */
define([
    "text!js/Mod/CodeBlockEditor/blockly/BlocklyConfigSource.json",
    "text!js/Mod/CodeBlockEditor/blockly/BlocklyMenu.xml",
    "js/Mod/CodeBlockEditor/blockly/BlocklyExecution",
], function (BlocklyConfigSourceJson, BlocklyMenuXml) {

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

            item.previousStatement = null;
            item.nextStatement = null;

            if (arg0.output) {
                var old_output = arg0.output;
                arg0.output = old_output.type;
            }
        }
        return item;
    }

    BlocklyLoader.load = function () {
        var config_source = JSON.parse(BlocklyConfigSourceJson);
        if (!config_source) {
            return
        }
        var len = config_source.length;
        for (var i = 0; i < len; i++) {
            var item = config_source[i];
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
    BlocklyLoader.loadMenu = function (parentDomID) {
        if (!parentDomID) {
            return;
        }
        var dom = document.getElementById(parentDomID);
        if (dom) {
            dom.innerHTML = BlocklyMenuXml;
        }
    }
    return BlocklyLoader;
})





