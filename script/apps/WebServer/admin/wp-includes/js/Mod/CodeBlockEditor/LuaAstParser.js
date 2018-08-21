/**
 * @author leio
 * @date 2018/6/21
 */
define([
    "luaparse",
    "js/Mod/CodeBlockEditor/BlocklyLoader",
], function (luaparse, BlocklyLoader) {

    var LuaAstParser = function (content) {
        this.load(content);
    }
    LuaAstParser.id = -1;
    var shadow_configs = {
        math_number: "NUM",
        math_integer: "NUM",
        math_whole_number: "NUM",
        math_positive_number: "NUM",
        math_angle: "NUM",
        colour_picker: "COLOUR",
        matrix: "MATRIX",
        text: "TEXT",
    }
    LuaAstParser.prototype.load = function (content) {
        if (!content) {
            return
        }
        this.ast = luaparse.parse(content);
    }
    LuaAstParser.prototype.walk = function () {
        var xml_doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', "xml", null);
        console.log("this.ast", this.ast);
        this.walkInternal(this.ast, xml_doc, xml_doc.documentElement);
    }
    LuaAstParser.prototype.walkInternal = function (parent, xml_doc, xml_element) {
        if (!parent) {
            return
        }
        var self = this;
        var type = parent.type;

        var func = LuaAstParser[type];
        if (func) {
            xml_element = func(xml_doc, xml_element, parent)
        }
        var body = parent.body;
        if (body) {
            for (var i = 0; i < body.length; i++) {
                var item = body[i];
                self.walkInternal(item, xml_doc, xml_element);
            }
        }
    }
    LuaAstParser.prototype.createBlocks = function () {
        this.walk({}, function (type, tags, item) {
            console.log("type", type, item);
        })
    }
    LuaAstParser.generalID = function(){
        LuaAstParser.id += 1;
        return LuaAstParser.id;
    }
    LuaAstParser.getShadowFieldName = function (type) {
        return shadow_configs[type];
    }
    LuaAstParser.forEachArg = function (block_config, callback) {
        if (!block_config) {
            return
        }
        var iterator_index = 0;
        var len = 10;
        for (var i = 0; i < len; i++) {
            var input_arg = block_config["args" + i];
            if (input_arg) {
                for (var k = 0; k < input_arg.length; k++) {
                    var arg_item = input_arg[k];
                    if (arg_item.type && arg_item.type != "input_dummy") {
                        callback && callback(arg_item, iterator_index);
                        iterator_index += 1;
                    }
                }
            }
        }
    }
    LuaAstParser.CallStatement = function (xml_doc, xml_element, input) {
        if (!input) {
            return
        }
        var len = xml_element.childNodes.length;
        if (len > 0) {
            var next_element = xml_doc.createElement("next");
            xml_element.appendChild(next_element);

            xml_element = next_element;

        }
        var input_arguments = input.expression.arguments;
        var block_element = xml_doc.createElement("block");
        xml_element.appendChild(block_element);

        var name = input.expression.base.name;
        var config = LuaAstParser.getBlockConfig(name);
        console.log("input_arguments", input_arguments);
        console.log("config", name, config);


        block_element.setAttribute("type", name)
        block_element.setAttribute("id", LuaAstParser.generalID())

        LuaAstParser.forEachArg(config, function (arg, iterator_index) {
            if (arg) {
                if(arg.shadow){
                    var shadow_type = arg.shadow.type;
                    var shadow_field_name = LuaAstParser.getShadowFieldName(shadow_type);
                    var value_element = xml_doc.createElement("value");
                    block_element.appendChild(value_element);

                    value_element.setAttribute("name", arg.name);

                    var shadow_element = xml_doc.createElement("shadow");
                    value_element.appendChild(shadow_element);

                    shadow_element.setAttribute("type", shadow_type);
                    shadow_element.setAttribute("id", LuaAstParser.generalID());

                    var field_element = xml_doc.createElement("field");
                    shadow_element.appendChild(field_element);

                    field_element.setAttribute("name", shadow_field_name);

                    var input_arg_item = input_arguments[iterator_index];
                    //TODO: check null undefined
                    var input_arg_item_type = input_arg_item.type;
                    field_element.innerHTML = input_arg_item.value;

                } else {
                    var field_element = xml_doc.createElement("field");
                    block_element.appendChild(field_element);

                    field_element.setAttribute("name", arg.name);
                    var input_arg_item = input_arguments[iterator_index];
                    //TODO: check null undefined
                    var input_arg_item_type = input_arg_item.type;
                    field_element.innerHTML = input_arg_item.value;
                }
            }
        })
        console.log("xml_doc:", xml_doc);
    }
    
    LuaAstParser.recursive = function (ast_node, state, funcs) {
        var visitor = funcs;
        function c(ast_node, state) {
            visitor(ast_node, state,c);
        }
    }
    LuaAstParser.getBlockConfig = function (type) {
        return BlocklyLoader.getConfigMap()[type];
    }
    return LuaAstParser;
})
