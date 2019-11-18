Blockly.Extensions.inputListToDom = function (element, inputList) {
    if (!element || !inputList) {
        return
    }
    for (var i = 0, input; input = inputList[i]; i++) {
        if (input.type == Blockly.INPUT_VALUE) {
            var container = goog.dom.createDom('value');
            var name = input.name;
            container.setAttribute('name', name);
            element.appendChild(container);
        }
    }
}

Blockly.Extensions["FIELD_BUTTON_CALLBACK_append_mcml_attr"] = function (source_block, btn) {
    if (source_block) {

        var workspace = source_block.workspace;
        var isInFlyout = source_block.isInFlyout;
        if (!isInFlyout) {

            var index = Blockly.Extensions.getInputIndexByName(source_block, "end_dummy");
            if(index > -1){
                var child_input = Blockly.Extensions.insertValueInput(source_block, index);

                var newBlock = Blockly.Extensions.newMcmlAttrBlock(workspace);


                child_input.connection.connect(newBlock.outputConnection);
                newBlock.removeFieldCallback = function (field) {
                    Blockly.Extensions.removeField(source_block, field);
                }
            }
            

        }
    }
}
Blockly.Extensions.insertValueInput = function (block, index) {
    if (!block) {
        return
    }
    var connection = null;
    var type = Blockly.INPUT_VALUE;
    var name = Blockly.utils.genUid();

    if (type == Blockly.INPUT_VALUE || type == Blockly.NEXT_STATEMENT) {
        connection = block.makeConnection_(type);
    }
    var input = new Blockly.Input(type, name, block, connection);
    var inputList = block.inputList;
    if (!inputList) {
        inputList = [];
        console.warn("block.inputList is null, created a new one")
    }
    inputList.splice(index, 0, input);

    block.inputList = inputList;
    return input;
}
Blockly.Extensions.getInputByName = function (block, name) {
    if (block && block.inputList) {
        var inputList = block.inputList;
        for (var i = 0; i < inputList.length; i++) {
            var input = inputList[i];
            if (input.name == name) {
                return input;
            }
        }
    }
}
Blockly.Extensions.getInputIndexByName = function (block, name) {
    if(block && block.inputList){
        var inputList = block.inputList;
        for (var i = 0; i < inputList.length; i++) {
            var input = inputList[i];
            if (input.name == name) {
                return i;
            }
        }
    }
    return -1;
}
Blockly.Extensions.removeField = function (block, field) {
    if (!block || !field) {
        return
    }
    var inputNameToRemove = null;
    for (var n = 0; n < block.inputList.length; n++) {
        var input = block.inputList[n];
        if (input.connection && input.connection.targetBlock()) {
            var target = input.connection.targetBlock();
            if (target.getField(field.name) == field) {
                inputNameToRemove = input.name;
            }
        } else {
            for (var j = 0; j < input.fieldRow.length; j++) {
                if (input.fieldRow[j] == field) {
                    inputNameToRemove = input.name;
                }
            }
        }
    }
    if (inputNameToRemove) {
        block.removeInput(inputNameToRemove);
    }
}

Blockly.Extensions.newMcmlAttrBlock = function (workspace) {
    if (!workspace) {
        return
    }
    var newBlock = workspace.newBlock("argument_editor_string_number");
    newBlock.setMovable(false);
    newBlock.setDeletable(true);
    newBlock.setFieldValue("", 'TEXT');
    newBlock.setShadow(true);
    newBlock.initSvg();
    newBlock.render();
    return newBlock;
}

// read from xml file
Blockly.Extensions.domToMutation = function (block, xmlElement) {
    var workspace = block.workspace;
    for (var i = 0; i < xmlElement.childNodes.length; i++) {
        var value_node = xmlElement.childNodes[i];
        var nodeName = value_node.nodeName;
        // only insert value input to block
        if (nodeName && nodeName.toLowerCase() == "value") {
            var end_index = Blockly.Extensions.getInputIndexByName(block, "end_dummy");
            var s = new XMLSerializer().serializeToString(value_node);
            var name = value_node.getAttribute("name");
            var child_input = Blockly.Extensions.insertValueInput(block, end_index);
            // set name
            child_input.name = name;
        }
    }

}

// save to xml file
Blockly.Extensions.mutationToDom = function (block) {
    var container = document.createElement('mutation');
    Blockly.Extensions.inputListToDom(container, block.inputList);
    return container;
}
/**
 * read the input value in block.inputList between start_dummy and end_dummy
 * @param {Block} block
 * @param {string} languageType - "Lua" or "JavaScript" or "Python"
 * @returns {string} 
 */
Blockly.Extensions.readTextFromMcmlAttrs = function (block,languageType) {
    if (!block) {
        return
    }
    languageType = languageType || "Lua"
    var inputList = block.inputList;
    var start_index = Blockly.Extensions.getInputIndexByName(block, "start_dummy");
    start_index += 1;
    var end_index = Blockly.Extensions.getInputIndexByName(block, "end_dummy");
    var result = null
    for (var i = start_index; i < end_index; i++) {
        var input = inputList[i];
        if (input.type == Blockly.INPUT_VALUE) {
            // get input value by valueToCode
            var text = Blockly[languageType].valueToCode(block, input.name)
            if (text) {
                if (result == null) {
                    result = text;
                } else {
                    result = result + " " + text;
                }
            }
        }
        
    }
    return result;
}

Blockly.Extensions.register_mcml_block = function (block) {
    if (!block) {
        return
    }
    block.removeFieldCallback = function (field) {
        Blockly.Extensions.removeField(this, field);
    }
    // read from xml file
    block.domToMutation = function (xmlElement) {
        Blockly.Extensions.domToMutation(this, xmlElement)
    }

    // save to xml file
    block.mutationToDom = function () {
        return Blockly.Extensions.mutationToDom(this);
    }
}
Blockly.Extensions.getMcmlControlText = function (block, tag_name, languageType) {
    var attrs = Blockly.Extensions.readTextFromMcmlAttrs(block, languageType);
    return "<%s %s/>\n".format(tag_name, [attrs]);
}
Blockly.Extensions.registerMcmlExtensions = function () {

    var tags = [
        "mcml_div", 
        "mcml_button", 
        "mcml_label", 
        "mcml_text", 
        "mcml_checkbox", 
        "mcml_progressbar", 
        "mcml_sliderbar", 
        "mcml_attrs_style_key_value",
    ]
    for (var i = 0; i < tags.length; i++) {
        var name = tags[i];
        var block = Blockly.Blocks[name];
        Blockly.Extensions.register_mcml_block(block);
      
    }
    //Blockly.Lua["mcml_div"] = function (block) {
    //    var attrs = Blockly.Extensions.readTextFromMcmlAttrs(block, "Lua");
    //    var code = Blockly.Lua.statementToCode(block, 'code') || '';
    //    if (attrs) {
    //        return "<div %s>\n%s</div>\n".format(attrs,code)
    //    }else{
    //        return "<div>\n%s</div>\n".format(code)
    //    }
    //};
    //Blockly.Lua["mcml_button"] = function (block) {
    //    return Blockly.Extensions.getMcmlControlText(block, "button", "Lua");
    //};
    //Blockly.Lua["mcml_label"] = function (block) {
    //    return Blockly.Extensions.getMcmlControlText(block, "pe:label", "Lua");
    //};
    //Blockly.Lua["mcml_text"] = function (block) {
    //    return Blockly.Extensions.getMcmlControlText(block, "input type='text'", "Lua");
    //};
    //Blockly.Lua["mcml_checkbox"] = function (block) {
    //    return Blockly.Extensions.getMcmlControlText(block, "input type='checkbox'", "Lua");
    //};
    //Blockly.Lua["mcml_progressbar"] = function (block) {
    //    return Blockly.Extensions.getMcmlControlText(block, "pe:progressbar", "Lua");
    //};
    //Blockly.Lua["mcml_sliderbar"] = function (block) {
    //    return Blockly.Extensions.getMcmlControlText(block, "pe:sliderbar", "Lua");
    //};
    
    //Blockly.Lua['mcml_attrs_style_key_value'] = function (block) {
    //    var key_value = block.getFieldValue("key");
    //    var attrs_value = Blockly.Extensions.readTextFromMcmlAttrs(block);
    //    var s = key_value + "='" + attrs_value + "'"
    //    return [s];
    //};
    //Blockly.Lua['mcml_data_color'] = function (block) {
    //    var text = Blockly.Lua.valueToCode(block, 'value');
    //    if (text) {
    //        var index = text.indexOf("\'");
    //        var last_index = text.lastIndexOf("\'");
    //        if (index > -1 && last_index > -1) {
    //            text = text.substr(index + 1, last_index - 1);
    //        }

    //    }
    //    return [text]
    //}
    Blockly.Lua['argument_editor_string_number'] = function (block) {
        var text = block.getFieldValue("TEXT");
        return [text]
    }
}
