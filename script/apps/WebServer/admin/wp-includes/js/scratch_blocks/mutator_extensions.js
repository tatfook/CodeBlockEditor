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
 * @param {string} split - the split char
 * @returns {string} 
 */
Blockly.Extensions.readTextFromMcmlAttrs = function (block,languageType,split) {
    if (!block) {
        return
    }
    split = split || " "
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
                    result = result + split + text;
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

        "newEmptyTable",
    ]
    for (var i = 0; i < tags.length; i++) {
        var name = tags[i];
        var block = Blockly.Blocks[name];
        Blockly.Extensions.register_mcml_block(block);
      
    }
   
    Blockly.Lua['argument_editor_string_number'] = function (block) {
        var text = block.getFieldValue("TEXT");
        return [text]
    }

    Blockly.Extensions.registerExtensions_temp_paracraft();
}
Blockly.Extensions.registerExtensions_temp_mcml = function () {
    Blockly.Lua["newEmptyTable"] = function (block) {
        var attrs = Blockly.Extensions.readTextFromMcmlAttrs(block, "Lua", ",");
        return [attrs];
    };

    Blockly.Lua["mcml_div"] = function (block) {
        var attrs = Blockly.Extensions.readTextFromMcmlAttrs(block, "Lua");
        var code = Blockly.Lua.statementToCode(block, 'code') || '';
        if (attrs) {
            return "<div %s>\n%s</div>\n".format(attrs,code)
        }else{
            return "<div>\n%s</div>\n".format(code)
        }
    };
    Blockly.Lua["mcml_button"] = function (block) {
        return Blockly.Extensions.getMcmlControlText(block, "button", "Lua");
    };
    Blockly.Lua["mcml_label"] = function (block) {
        return Blockly.Extensions.getMcmlControlText(block, "pe:label", "Lua");
    };
    Blockly.Lua["mcml_text"] = function (block) {
        return Blockly.Extensions.getMcmlControlText(block, "input type='text'", "Lua");
    };
    Blockly.Lua["mcml_checkbox"] = function (block) {
        return Blockly.Extensions.getMcmlControlText(block, "input type='checkbox'", "Lua");
    };
    Blockly.Lua["mcml_progressbar"] = function (block) {
        return Blockly.Extensions.getMcmlControlText(block, "pe:progressbar", "Lua");
    };
    Blockly.Lua["mcml_sliderbar"] = function (block) {
        return Blockly.Extensions.getMcmlControlText(block, "pe:sliderbar", "Lua");
    };

    Blockly.Lua['mcml_attrs_style_key_value'] = function (block) {
        var key_value = block.getFieldValue("key");
        var attrs_value = Blockly.Extensions.readTextFromMcmlAttrs(block);
        var s = key_value + "='" + attrs_value + "'"
        return [s];
    };
    Blockly.Lua['mcml_data_color'] = function (block) {
        var text = Blockly.Lua.valueToCode(block, 'value');
        if (text) {
            var index = text.indexOf("\'");
            var last_index = text.lastIndexOf("\'");
            if (index > -1 && last_index > -1) {
                text = text.substr(index + 1, last_index - 1);
            }

        }
        return [text]
    }
}
Blockly.Extensions.registerExtensions_temp_paracraft = function () {
    //******************************Events******************************
    Blockly.Python["registerClickEvent"] = function (block) {
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def registerClickEvent_func():\n%sregisterClickEvent(registerClickEvent_func)\n'.format(input_statement_input);
    };
    Blockly.Python["registerKeyPressedEvent"] = function (block) {
        var keyname = Blockly.Python.valueToCode(block, 'keyname') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def registerKeyPressedEvent_func(msg):\n%sregisterKeyPressedEvent(%s,registerKeyPressedEvent_func)\n'.format(input_statement_input, keyname);
    };
    Blockly.Python["registerBlockClickEvent"] = function (block) {
        var blockid = Blockly.Python.valueToCode(block, 'blockid') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def registerBlockClickEvent_func(msg):\n%sregisterBlockClickEvent(%s,registerBlockClickEvent_func)\n'.format(input_statement_input, blockid);
    };
    Blockly.Python["registerTickEvent"] = function (block) {
        var ticks = Blockly.Python.valueToCode(block, 'ticks') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def registerTickEvent_func():\n%sregisterTickEvent(%d,registerTickEvent_func)\n'.format(input_statement_input, ticks);
    };
    Blockly.Python["registerAnimationEvent"] = function (block) {
        var time = Blockly.Python.valueToCode(block, 'time') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def registerAnimationEvent_func():\n%sregisterAnimationEvent(%d,registerAnimationEvent_func)\n'.format(input_statement_input, time);
    };
    Blockly.Python["registerBroadcastEvent"] = function (block) {
        var msg = Blockly.Python.valueToCode(block, 'msg') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def registerBroadcastEvent_func(msg):\n%sregisterBroadcastEvent(%s,registerBroadcastEvent_func)\n'.format(input_statement_input, msg);
    };
    Blockly.Python["registerStopEvent"] = function (block) {
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def registerStopEvent_func():\n%sregisterStopEvent(registerStopEvent_func)\n'.format(input_statement_input);
    };
    Blockly.Python["registerNetworkEvent"] = function (block) {
        var msg = Blockly.Python.valueToCode(block, 'msg') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def registerNetworkEvent_func(msg):\n%sregisterNetworkEvent(%s,registerNetworkEvent_func)\n'.format(input_statement_input, msg);
    };
    //******************************Control******************************
    Blockly.Python["repeat"] = function (block) {
        var times = Blockly.Python.valueToCode(block, 'times') || '';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'for index in range(%d):\n%s\n'.format(times, input_statement_input);
    };
    Blockly.Python["forever"] = function (block) {
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'while True:\n%s\n'.format(input_statement_input);
    };
    Blockly.Python["repeat_count"] = function (block) {
        var name = Blockly.Python.variableDB_.getName(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE) || 'i';
        var start_index = Blockly.Python.valueToCode(block, 'start_index') || '""';
        var end_index = Blockly.Python.valueToCode(block, 'end_index') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'for %s in range(%d,%d):\n%s\n'.format(name, start_index, end_index, input_statement_input);
    };
    Blockly.Python["repeat_count_step"] = function (block) {
        var name = Blockly.Python.variableDB_.getName(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE) || 'i';
        var start_index = Blockly.Python.valueToCode(block, 'start_index') || '""';
        var end_index = Blockly.Python.valueToCode(block, 'end_index') || '""';
        var step = Blockly.Python.valueToCode(block, 'step') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'for %s in range(%d,%d,%d):\n%s\n'.format(name, start_index, end_index, step, input_statement_input);
    };
    Blockly.Python["waitUntil"] = function (block) {
        var expression = Blockly.Python.valueToCode(block, 'expression') || '""';
        return 'while true:\n  wait(0.01)\n  if %s:\n    break\n'.format(expression);
    };
    Blockly.Python["while_if"] = function (block) {
        var expression = Blockly.Python.valueToCode(block, 'expression') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input_true') || '  pass\n';
        return 'while %s:\n%s\n'.format(expression, input_statement_input);
    };
    Blockly.Python["control_if"] = function (block) {
        var expression = Blockly.Python.valueToCode(block, 'expression') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input_true') || '  pass\n';
        return 'if %s:\n%s\n'.format(expression, input_statement_input);
    };
    Blockly.Python["if_else"] = function (block) {
        var expression = Blockly.Python.valueToCode(block, 'expression') || '""';
        var input_statement_input_true = Blockly.Python.statementToCode(block, 'input_true') || '  pass\n';
        var input_statement_input_false = Blockly.Python.statementToCode(block, 'input_else') || '  pass\n';
        return 'if %s:\n%selse:\n%s\n'.format(expression, input_statement_input_true, input_statement_input_false);
    };
    //https://docs.python.org/3/tutorial/datastructures.html#dictionaries
    Blockly.Python["forKeyValue"] = function (block) {
        var key_name = Blockly.Python.variableDB_.getName(block.getFieldValue('key'), Blockly.Variables.NAME_TYPE) || 'key';
        var value_name = Blockly.Python.variableDB_.getName(block.getFieldValue('value'), Blockly.Variables.NAME_TYPE) || 'value';
        var data = Blockly.Python.valueToCode(block, 'data') || '';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'for %s, %s in %s.items():\n%s'.format(key_name, value_name, data, input_statement_input);
    };
    Blockly.Python["forIndexValue"] = function (block) {
        var i_name = Blockly.Python.variableDB_.getName(block.getFieldValue('i'), Blockly.Variables.NAME_TYPE) || 'index';
        var item_name = Blockly.Python.variableDB_.getName(block.getFieldValue('item'), Blockly.Variables.NAME_TYPE) || 'value';
        var data = Blockly.Python.valueToCode(block, 'data') || '';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'for %s, %s in enumerate(%s):\n%s'.format(i_name, item_name,data,input_statement_input);
    };
    Blockly.Python["run"] = function (block) {
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def run_func():\n%srun(run_func)\n'.format(input_statement_input);
    };
    Blockly.Python["runForActor"] = function (block) {
        var actor = Blockly.Python.valueToCode(block, 'actor') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def runForActor_func():\n%srunForActor(%s,runForActor_func)\n'.format(input_statement_input,actor);
    };

    //******************************Sensing******************************
    Blockly.Python["registerCollisionEvent"] = function (block) {
        var name = Blockly.Python.valueToCode(block, 'name') || '""';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def registerCollisionEvent_func(actor):\n%sregisterCollisionEvent(%s,registerCollisionEvent_func)\n'.format(input_statement_input, name);
    };
    //******************************Operators******************************
    Blockly.Python["math_op_compare_number"] = function (block) {
        var left = Blockly.Python.valueToCode(block, 'left');
        var op = block.getFieldValue('op');
        var right = Blockly.Python.valueToCode(block,'right');
        if (op == "~=") {
            op = "!=";
        }
        return ['((%s) %s (%s))'.format(left, op, right)];
    }
    Blockly.Python["math_op_compare"] = function (block) {
        var left = Blockly.Python.valueToCode(block, 'left');
        var op = block.getFieldValue('op');
        var right = Blockly.Python.valueToCode(block, 'right');
        if (op == "~=") {
            op = "!=";
        }
        return ['((%s) %s (%s))'.format(left, op, right)];
    }
    //Blockly.Python["random"] = function (block) {
    //    var from = Blockly.Python.valueToCode(block, 'from');
    //    var to = Blockly.Python.valueToCode(block, 'to');
    //    return ['random.randrange(%s,%s)'.format(from,to)];
    //}
    Blockly.Python["math_compared"] = function (block) {
        var left = Blockly.Python.valueToCode(block, 'left');
        var op = block.getFieldValue('op');
        var right = Blockly.Python.valueToCode(block, 'right');
        if (op == "and") {
            op = "&&";
        } else if (op == "or") {
            op = "||";
        }
        return ['((%s) %s (%s))'.format(left, op, right)];
    }
    Blockly.Python["join"] = function (block) {
        var left = Blockly.Python.valueToCode(block, 'left');
        var right = Blockly.Python.valueToCode(block, 'right');
        return ['(%s+%s)'.format(left,right)];
    }
    Blockly.Python["lengthOf"] = function (block) {
        var left = Blockly.Python.valueToCode(block, 'left');
        return ['(len(%s))'.format(left)];
    }
    Blockly.Python["math_oneop"] = function (block) {
        var name = block.getFieldValue('name');
        var left = Blockly.Python.valueToCode(block, 'left');

        if (name == "tonumber") {
            return ['float(%s)'.format(left)];
        } else if (name == "tostring") {
            return ['str(%s)'.format(left)];
        } else {
            return ['math.%s(%s)'.format(name,left)];
        }
    }
    //******************************Data******************************
    Blockly.Python["registerCloneEvent"] = function (block) {
        var param = Blockly.Python.variableDB_.getName(block.getFieldValue('param'), Blockly.Variables.NAME_TYPE) || 'name';
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def registerCloneEvent_func(%s):\n%sregisterCloneEvent(registerCloneEvent_func)\n'.format(param, input_statement_input);
    };
    Blockly.Python["newFunction"] = function (block) {
        var param = block.getFieldValue('param');
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '  pass\n';
        return 'def temp_func(%s):\n%s'.format(param, input_statement_input);
    }
    Blockly.Python["code_comment"] = function (block) {
        var value = block.getFieldValue('value');
        return '# %s\n'.format(value);
    }
    Blockly.Python["code_comment_full"] = function (block) {
        var input_statement_input = Blockly.Python.statementToCode(block, 'input') || '';
        return '"""\n%s\n"""'.format(input_statement_input);
    }
}
