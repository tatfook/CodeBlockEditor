/**
Author: leio
Date: 2018/12/19
*/
define([
], function () {
    var BlocklySourceLoader = function (input) {
        this.toolbox_menu = null;
        this.config_source = null;
        this.excution = null;

        this.variable_types_map = null;
        this.extra_variable_names = null;

        this.input = input;

        this.config_map = {}
    }
    // assumed one block has 10 args in maximal
    var arg_len = 10;
    BlocklySourceLoader.forEachArg = function (cmd, arg_name, callback) {
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
    BlocklySourceLoader.fix_format_args = function (item) {
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

    BlocklySourceLoader.fix_format = function (item) {
        if (!item) {
            return
        }

        item = BlocklySourceLoader.fix_format_args(item);

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
    BlocklySourceLoader.update_variableTypes = function (item, variable_types_map) {
        if (!item || !variable_types_map) {
            return
        }
        var variableTypes = [];

        for (var type in variable_types_map) {
            variableTypes.push(type);
        }
        BlocklySourceLoader.forEachArg(item, "args", function (arg) {
            if (arg) {
                if (arg.type == "field_variable") {
                    arg.variableTypes = variableTypes;
                }
            }
        })
        return item;
    }
    /**
    * Parse raw source and find out all of variable types and names 
    * @param {string} config_json
    * @returns {array} result
    * @param {object} result[0] - the map of variable types
    * @param {object} result[1] - the map of variable names
    */
    BlocklySourceLoader.getAllVariableTypes = function (config_json) {
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
            BlocklySourceLoader.forEachArg(item, "arg", function (arg) {
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
    BlocklySourceLoader.loadExecution = function (execution_str) {
        if (execution_str) {
            eval(execution_str);
        }
    }
    
    BlocklySourceLoader.prototype.loadResource = function (toolbox_menu, config_json, excution) {
        var self = this;
        self.toolbox_menu = toolbox_menu;
        self.config_json = config_json;
        self.excution = excution;


        var variable_result = BlocklySourceLoader.getAllVariableTypes(config_json);
        var variable_types_map = variable_result[0];
        var extra_variable_names = variable_result[1];

        self.variable_types_map = variable_types_map;
        self.extra_variable_names = extra_variable_names;

        self.parse(config_json, variable_types_map);
        BlocklySourceLoader.loadExecution(excution);
    }
    BlocklySourceLoader.prototype.load = function (callback) {
        var self = this;
        var input = this.input;
        var s_0 = "text!" + input[0];
        var s_1 = "text!" + input[1];
        var s_2 = "text!" + input[2];
        require([s_0, s_1, s_2], function (toolbox_menu, config_json, excution) {
            self.loadResource(toolbox_menu, config_json, excution);
            callback && callback();
        })
    }
    BlocklySourceLoader.prototype.parse = function (config_json, variable_types_map) {
        if (!config_json) {
            return
        }
        var self = this;
        config_json = JSON.parse(config_json);
        var len = config_json.length;
        for (var i = 0; i < len; i++) {
            var item = config_json[i];
            var type = item.type;

            var block = Blockly.Blocks[type];
            if (!block) {
                item = BlocklySourceLoader.fix_format(item);
                if (type == "setLocalVariable" || type == "getLocalVariable") {
                    item = BlocklySourceLoader.update_variableTypes(item, variable_types_map);
                }
                self.config_map[type] = item;
                block = {
                    init: function () {
                        var source = self.config_map[this.type];
                        this.jsonInit(source);
                    }
                }
                Blockly.Blocks[type] = block;
            }
        }
    }
    BlocklySourceLoader.prototype.getConfigMap = function () {
        return this.config_map;
    }
    return BlocklySourceLoader;
})