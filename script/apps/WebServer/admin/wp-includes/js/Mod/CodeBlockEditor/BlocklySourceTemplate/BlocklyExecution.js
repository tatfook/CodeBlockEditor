Blockly.Lua['wait'] = function (block) {
    var wait_input_value_time_var = Blockly.Lua.valueToCode(block, 'time', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'wait(%s)\n'.format(wait_input_value_time_var);
};
Blockly.Lua['repeat'] = function (block) {
    var repeat_input_value_times_var = Blockly.Lua.valueToCode(block, 'times', Blockly.Lua.ORDER_ATOMIC) || '""';
    var repeat_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'for i=1, %d do\n%send\n'.format(repeat_input_value_times_var, repeat_input_statement_input_var);
};
Blockly.Lua['repeat_until'] = function (block) {
    var repeat_until_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    var repeat_until_input_value_expression_var = Blockly.Lua.valueToCode(block, 'expression', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'repeat\n%suntil(%s)\n'.format(repeat_until_input_statement_input_var, repeat_until_input_value_expression_var);
};
Blockly.Lua['forever'] = function (block) {
    var forever_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'while(true) do\n%send\n'.format(forever_input_statement_input_var);
};
Blockly.Lua['control_if'] = function (block) {
    var control_if_input_value_expression_var = Blockly.Lua.valueToCode(block, 'expression', Blockly.Lua.ORDER_ATOMIC) || '""';
    var control_if_input_statement_input_true_var = Blockly.Lua.statementToCode(block, 'input_true') || '';
    return 'if(%s) then\n%send\n'.format(control_if_input_value_expression_var, control_if_input_statement_input_true_var);
};
Blockly.Lua['if_else'] = function (block) {
    var if_else_input_value_expression_var = Blockly.Lua.valueToCode(block, 'expression', Blockly.Lua.ORDER_ATOMIC) || '""';
    var if_else_input_statement_input_true_var = Blockly.Lua.statementToCode(block, 'input_true') || '';
    var if_else_input_statement_input_else_var = Blockly.Lua.statementToCode(block, 'input_else') || '';
    return 'if(%s) then\n%selse\n%send\n'.format(if_else_input_value_expression_var, if_else_input_statement_input_true_var, if_else_input_statement_input_else_var);
};
Blockly.Lua['forKeyValue'] = function (block) {
    var forKeyValue_field_input_key_var = block.getFieldValue('key');
    var forKeyValue_field_input_value_var = block.getFieldValue('value');
    var forKeyValue_field_input_data_var = block.getFieldValue('data');
    var forKeyValue_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'for %s, %s in pairs(%s) do\n%send\n'.format(forKeyValue_field_input_key_var, forKeyValue_field_input_value_var, forKeyValue_field_input_data_var, forKeyValue_input_statement_input_var);
};
Blockly.Lua['forIndexValue'] = function (block) {
    var forIndexValue_field_input_i_var = block.getFieldValue('i');
    var forIndexValue_field_input_item_var = block.getFieldValue('item');
    var forIndexValue_field_input_data_var = block.getFieldValue('data');
    var forIndexValue_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'for %s, %s in ipairs(%s) do\n%send\n'.format(forIndexValue_field_input_i_var, forIndexValue_field_input_item_var, forIndexValue_field_input_data_var, forIndexValue_input_statement_input_var);
};
Blockly.Lua['run'] = function (block) {
    var run_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'run(function()\n%send)\n'.format(run_input_statement_input_var);
};
Blockly.Lua['exit'] = function (block) {

    return 'exit()\n'.format();
};
Blockly.Lua['restart'] = function (block) {

    return 'restart()\n'.format();
};
Blockly.Lua['becomeAgent'] = function (block) {
    var becomeAgent_field_variable_name_var = Blockly.Lua.variableDB_.getName(block.getFieldValue('name'), Blockly.Variables.NAME_TYPE) || '""';
    return 'becomeAgent("%s")\n'.format(becomeAgent_field_variable_name_var);
};
Blockly.Lua['setLocalVariable'] = function (block) {
    var setLocalVariable_field_variable_var_var = Blockly.Lua.variableDB_.getName(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE) || '""';
    var setLocalVariable_input_value_value_var = Blockly.Lua.valueToCode(block, 'value', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'local %s = %s\n'.format(setLocalVariable_field_variable_var_var, setLocalVariable_input_value_value_var);
};
Blockly.Lua['getLocalVariable'] = function (block) {
    var getLocalVariable_field_variable_var_var = Blockly.Lua.variableDB_.getName(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE) || '""';
    return ['%s'.format(getLocalVariable_field_variable_var_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['set'] = function (block) {
    var set_field_input_key_var = block.getFieldValue('key');
    var set_field_input_value_var = block.getFieldValue('value');
    return 'set("%s", "%s")\n'.format(set_field_input_key_var, set_field_input_value_var);
};
Blockly.Lua['showVariable'] = function (block) {
    var showVariable_field_input_name_var = block.getFieldValue('name');
    return 'showVariable("%s")\n'.format(showVariable_field_input_name_var);
};
Blockly.Lua['hideVariable'] = function (block) {
    var hideVariable_field_input_name_var = block.getFieldValue('name');
    return 'hideVariable("%s")\n'.format(hideVariable_field_input_name_var);
};
Blockly.Lua['registerCloneEvent'] = function (block) {
    var registerCloneEvent_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'registerCloneEvent(function()\n%send)\n'.format(registerCloneEvent_input_statement_input_var);
};
Blockly.Lua['clone'] = function (block) {
    var clone_field_variable_input_var = Blockly.Lua.variableDB_.getName(block.getFieldValue('input'), Blockly.Variables.NAME_TYPE) || '""';
    return 'clone("%s")\n'.format(clone_field_variable_input_var);
};
Blockly.Lua['delete'] = function (block) {

    return 'delete()\n'.format();
};
Blockly.Lua['setActorValue'] = function (block) {
    var setActorValue_field_dropdown_key_var = block.getFieldValue('key');
    var setActorValue_input_value_value_var = Blockly.Lua.valueToCode(block, 'value', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'setActorValue("%s", %s)\n'.format(setActorValue_field_dropdown_key_var, setActorValue_input_value_value_var);
};
Blockly.Lua['getActorValue'] = function (block) {
    var getActorValue_field_dropdown_key_var = block.getFieldValue('key');
    return ['getActorValue("%s")'.format(getActorValue_field_dropdown_key_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['log'] = function (block) {
    var log_input_value_obj_var = Blockly.Lua.valueToCode(block, 'obj', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'log(%s)\n'.format(log_input_value_obj_var);
};
Blockly.Lua['echo'] = function (block) {
    var echo_input_value_obj_var = Blockly.Lua.valueToCode(block, 'obj', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'echo(%s)\n'.format(echo_input_value_obj_var);
};
Blockly.Lua['registerClickEvent'] = function (block) {
    var registerClickEvent_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'registerClickEvent(function()\n%send)\n'.format(registerClickEvent_input_statement_input_var);
};
Blockly.Lua['registerKeyPressedEvent'] = function (block) {
    var registerKeyPressedEvent_field_dropdown_keyname_var = block.getFieldValue('keyname');
    var registerKeyPressedEvent_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'registerKeyPressedEvent("%s", function()\n%send)\n'.format(registerKeyPressedEvent_field_dropdown_keyname_var, registerKeyPressedEvent_input_statement_input_var);
};
Blockly.Lua['registerAnimationEvent'] = function (block) {
    var registerAnimationEvent_input_value_time_var = Blockly.Lua.valueToCode(block, 'time', Blockly.Lua.ORDER_ATOMIC) || '""';
    var registerAnimationEvent_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'registerAnimationEvent(%d, function()\n%send)\n'.format(registerAnimationEvent_input_value_time_var, registerAnimationEvent_input_statement_input_var);
};
Blockly.Lua['registerBroadcastEvent'] = function (block) {
    var registerBroadcastEvent_field_variable_msg_var = Blockly.Lua.variableDB_.getName(block.getFieldValue('msg'), Blockly.Variables.NAME_TYPE) || '""';
    var registerBroadcastEvent_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'registerBroadcastEvent("%s", function(fromName)\n%send)\n'.format(registerBroadcastEvent_field_variable_msg_var, registerBroadcastEvent_input_statement_input_var);
};
Blockly.Lua['broadcast'] = function (block) {
    var broadcast_field_variable_msg_var = Blockly.Lua.variableDB_.getName(block.getFieldValue('msg'), Blockly.Variables.NAME_TYPE) || '""';
    return 'broadcast("%s")\n'.format(broadcast_field_variable_msg_var);
};
Blockly.Lua['broadcastAndWait'] = function (block) {
    var broadcastAndWait_field_variable_msg_var = Blockly.Lua.variableDB_.getName(block.getFieldValue('msg'), Blockly.Variables.NAME_TYPE) || '""';
    return 'broadcastAndWait("%s")\n'.format(broadcastAndWait_field_variable_msg_var);
};
Blockly.Lua['cmd'] = function (block) {
    var cmd_input_value_msg_var = Blockly.Lua.valueToCode(block, 'msg', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'cmd(%s)\n'.format(cmd_input_value_msg_var);
};
Blockly.Lua['sayAndWait'] = function (block) {
    var sayAndWait_input_value_text_var = Blockly.Lua.valueToCode(block, 'text', Blockly.Lua.ORDER_ATOMIC) || '""';
    var sayAndWait_input_value_duration_var = Blockly.Lua.valueToCode(block, 'duration', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'say(%s, %s)\n'.format(sayAndWait_input_value_text_var, sayAndWait_input_value_duration_var);
};
Blockly.Lua['say'] = function (block) {
    var say_input_value_text_var = Blockly.Lua.valueToCode(block, 'text', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'say(%s)\n'.format(say_input_value_text_var);
};
Blockly.Lua['tip'] = function (block) {
    var tip_input_value_text_var = Blockly.Lua.valueToCode(block, 'text', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'tip(%s)\n'.format(tip_input_value_text_var);
};
Blockly.Lua['show'] = function (block) {

    return 'show()\n'.format();
};
Blockly.Lua['hide'] = function (block) {

    return 'hide()\n'.format();
};
Blockly.Lua['anim'] = function (block) {
    var anim_input_value_animId_var = Blockly.Lua.valueToCode(block, 'animId', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'anim(%d)\n'.format(anim_input_value_animId_var);
};
Blockly.Lua['play'] = function (block) {
    var play_input_value_timeFrom_var = Blockly.Lua.valueToCode(block, 'timeFrom', Blockly.Lua.ORDER_ATOMIC) || '""';
    var play_input_value_timeTo_var = Blockly.Lua.valueToCode(block, 'timeTo', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'play(%d, %d)\n'.format(play_input_value_timeFrom_var, play_input_value_timeTo_var);
};
Blockly.Lua['playLoop'] = function (block) {
    var playLoop_input_value_timeFrom_var = Blockly.Lua.valueToCode(block, 'timeFrom', Blockly.Lua.ORDER_ATOMIC) || '""';
    var playLoop_input_value_timeTo_var = Blockly.Lua.valueToCode(block, 'timeTo', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'playLoop(%d, %d)\n'.format(playLoop_input_value_timeFrom_var, playLoop_input_value_timeTo_var);
};
Blockly.Lua['playSpeed'] = function (block) {
    var playSpeed_input_value_speed_var = Blockly.Lua.valueToCode(block, 'speed', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'playSpeed(%d)\n'.format(playSpeed_input_value_speed_var);
};
Blockly.Lua['stop'] = function (block) {

    return 'stop()\n'.format();
};
Blockly.Lua['scale'] = function (block) {
    var scale_input_value_scaleDelta_var = Blockly.Lua.valueToCode(block, 'scaleDelta', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'scale(%d)\n'.format(scale_input_value_scaleDelta_var);
};
Blockly.Lua['scaleTo'] = function (block) {
    var scaleTo_input_value_scale_var = Blockly.Lua.valueToCode(block, 'scale', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'scaleTo(%d)\n'.format(scaleTo_input_value_scale_var);
};
Blockly.Lua['focus'] = function (block) {
    var focus_field_dropdown_name_var = block.getFieldValue('name');
    return 'focus("%s")\n'.format(focus_field_dropdown_name_var);
};
Blockly.Lua['camera'] = function (block) {
    var camera_input_value_dist_var = Blockly.Lua.valueToCode(block, 'dist', Blockly.Lua.ORDER_ATOMIC) || '""';
    var camera_input_value_pitch_var = Blockly.Lua.valueToCode(block, 'pitch', Blockly.Lua.ORDER_ATOMIC) || '""';
    var camera_input_value_facing_var = Blockly.Lua.valueToCode(block, 'facing', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'camera(%s, %s, %s)\n'.format(camera_input_value_dist_var, camera_input_value_pitch_var, camera_input_value_facing_var);
};
Blockly.Lua['getScale'] = function (block) {

    return ['getScale()'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['getPlayTime'] = function (block) {

    return ['getPlayTime()'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['moveForward'] = function (block) {
    var moveForward_input_value_dist_var = Blockly.Lua.valueToCode(block, 'dist', Blockly.Lua.ORDER_ATOMIC) || '""';
    var moveForward_input_value_duration_var = Blockly.Lua.valueToCode(block, 'duration', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'moveForward(%d, %d)\n'.format(moveForward_input_value_dist_var, moveForward_input_value_duration_var);
};
Blockly.Lua['turn'] = function (block) {
    var turn_input_value_degree_var = Blockly.Lua.valueToCode(block, 'degree', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'turn(%d)\n'.format(turn_input_value_degree_var);
};
Blockly.Lua['turnTo'] = function (block) {
    var turnTo_input_value_degree_var = Blockly.Lua.valueToCode(block, 'degree', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'turnTo(%d)\n'.format(turnTo_input_value_degree_var);
};
Blockly.Lua['turnToTarget'] = function (block) {
    var turnToTarget_field_dropdown_targetName_var = block.getFieldValue('targetName');
    return 'turnTo("%s")\n'.format(turnToTarget_field_dropdown_targetName_var);
};
Blockly.Lua['move'] = function (block) {
    var move_input_value_x_var = Blockly.Lua.valueToCode(block, 'x', Blockly.Lua.ORDER_ATOMIC) || '""';
    var move_input_value_y_var = Blockly.Lua.valueToCode(block, 'y', Blockly.Lua.ORDER_ATOMIC) || '""';
    var move_input_value_z_var = Blockly.Lua.valueToCode(block, 'z', Blockly.Lua.ORDER_ATOMIC) || '""';
    var move_input_value_duration_var = Blockly.Lua.valueToCode(block, 'duration', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'move(%s, %s, %s, %s)\n'.format(move_input_value_x_var, move_input_value_y_var, move_input_value_z_var, move_input_value_duration_var);
};
Blockly.Lua['moveTo'] = function (block) {
    var moveTo_input_value_x_var = Blockly.Lua.valueToCode(block, 'x', Blockly.Lua.ORDER_ATOMIC) || '""';
    var moveTo_input_value_y_var = Blockly.Lua.valueToCode(block, 'y', Blockly.Lua.ORDER_ATOMIC) || '""';
    var moveTo_input_value_z_var = Blockly.Lua.valueToCode(block, 'z', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'moveTo(%s, %s, %s)\n'.format(moveTo_input_value_x_var, moveTo_input_value_y_var, moveTo_input_value_z_var);
};
Blockly.Lua['moveToTarget'] = function (block) {
    var moveToTarget_field_dropdown_targetName_var = block.getFieldValue('targetName');
    return 'moveTo("%s")\n'.format(moveToTarget_field_dropdown_targetName_var);
};
Blockly.Lua['walk'] = function (block) {
    var walk_input_value_x_var = Blockly.Lua.valueToCode(block, 'x', Blockly.Lua.ORDER_ATOMIC) || '""';
    var walk_input_value_y_var = Blockly.Lua.valueToCode(block, 'y', Blockly.Lua.ORDER_ATOMIC) || '""';
    var walk_input_value_z_var = Blockly.Lua.valueToCode(block, 'z', Blockly.Lua.ORDER_ATOMIC) || '""';
    var walk_input_value_duration_var = Blockly.Lua.valueToCode(block, 'duration', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'walk(%s, %s, %s, %s)\n'.format(walk_input_value_x_var, walk_input_value_y_var, walk_input_value_z_var, walk_input_value_duration_var);
};
Blockly.Lua['walkForward'] = function (block) {
    var walkForward_input_value_dist_var = Blockly.Lua.valueToCode(block, 'dist', Blockly.Lua.ORDER_ATOMIC) || '""';
    var walkForward_input_value_duration_var = Blockly.Lua.valueToCode(block, 'duration', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'walkForward(%s, %s)\n'.format(walkForward_input_value_dist_var, walkForward_input_value_duration_var);
};
Blockly.Lua['velocity'] = function (block) {
    var velocity_input_value_cmd_text_var = Blockly.Lua.valueToCode(block, 'cmd_text', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'velocity(%s)\n'.format(velocity_input_value_cmd_text_var);
};
Blockly.Lua['bounce'] = function (block) {

    return 'bounce()\n'.format();
};
Blockly.Lua['getX'] = function (block) {

    return ['getX()'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['getY'] = function (block) {

    return ['getY()'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['getZ'] = function (block) {

    return ['getZ()'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['getPos'] = function (block) {

    return ['getPos()'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['setPos'] = function (block) {
    var setPos_input_value_x_var = Blockly.Lua.valueToCode(block, 'x', Blockly.Lua.ORDER_ATOMIC) || '""';
    var setPos_input_value_y_var = Blockly.Lua.valueToCode(block, 'y', Blockly.Lua.ORDER_ATOMIC) || '""';
    var setPos_input_value_z_var = Blockly.Lua.valueToCode(block, 'z', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'setPos(%s, %s, %s)\n'.format(setPos_input_value_x_var, setPos_input_value_y_var, setPos_input_value_z_var);
};
Blockly.Lua['getFacing'] = function (block) {

    return ['getFacing()'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['getString'] = function (block) {
    var getString_field_input_left_var = block.getFieldValue('left');
    return ['"%s"'.format(getString_field_input_left_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['getBoolean'] = function (block) {
    var getBoolean_field_dropdown_value_var = block.getFieldValue('value');
    return ['%s'.format(getBoolean_field_dropdown_value_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['getNumber'] = function (block) {
    var getNumber_field_number_left_var = block.getFieldValue('left');
    return ['%s'.format(getNumber_field_number_left_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['addition'] = function (block) {
    var addition_input_value_left_var = Blockly.Lua.valueToCode(block, 'left', Blockly.Lua.ORDER_ATOMIC) || '""';
    var addition_input_value_right_var = Blockly.Lua.valueToCode(block, 'right', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['((%s) + (%s))'.format(addition_input_value_left_var, addition_input_value_right_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['random'] = function (block) {
    var random_input_value_from_var = Blockly.Lua.valueToCode(block, 'from', Blockly.Lua.ORDER_ATOMIC) || '""';
    var random_input_value_to_var = Blockly.Lua.valueToCode(block, 'to', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['math.random(%s,%s)'.format(random_input_value_from_var, random_input_value_to_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['equal'] = function (block) {
    var equal_input_value_left_var = Blockly.Lua.valueToCode(block, 'left', Blockly.Lua.ORDER_ATOMIC) || '""';
    var equal_input_value_right_var = Blockly.Lua.valueToCode(block, 'right', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['((%s) == (%s))'.format(equal_input_value_left_var, equal_input_value_right_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['and'] = function (block) {
    var and_input_value_left_var = Blockly.Lua.valueToCode(block, 'left', Blockly.Lua.ORDER_ATOMIC) || '""';
    var and_input_value_right_var = Blockly.Lua.valueToCode(block, 'right', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['((%s) and (%s))'.format(and_input_value_left_var, and_input_value_right_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['or'] = function (block) {
    var or_input_value_left_var = Blockly.Lua.valueToCode(block, 'left', Blockly.Lua.ORDER_ATOMIC) || '""';
    var or_input_value_right_var = Blockly.Lua.valueToCode(block, 'right', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['((%s) or (%s))'.format(or_input_value_left_var, or_input_value_right_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['not'] = function (block) {
    var not_input_value_left_var = Blockly.Lua.valueToCode(block, 'left', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['(not %s)'.format(not_input_value_left_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['join'] = function (block) {
    var join_input_value_left_var = Blockly.Lua.valueToCode(block, 'left', Blockly.Lua.ORDER_ATOMIC) || '""';
    var join_input_value_right_var = Blockly.Lua.valueToCode(block, 'right', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['(%s..%s)'.format(join_input_value_left_var, join_input_value_right_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['lengthOf'] = function (block) {
    var lengthOf_input_value_left_var = Blockly.Lua.valueToCode(block, 'left', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['(#%s)'.format(lengthOf_input_value_left_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['mod'] = function (block) {
    var mod_input_value_left_var = Blockly.Lua.valueToCode(block, 'left', Blockly.Lua.ORDER_ATOMIC) || '""';
    var mod_input_value_right_var = Blockly.Lua.valueToCode(block, 'right', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['(%s%%s)'.format(mod_input_value_left_var, mod_input_value_right_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['round'] = function (block) {
    var round_input_value_left_var = Blockly.Lua.valueToCode(block, 'left', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['math.floor(%s+0.5)'.format(round_input_value_left_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['math.sqrt'] = function (block) {
    var math_sqrt_field_dropdown_name_var = block.getFieldValue('name');
    var math_sqrt_input_value_left_var = Blockly.Lua.valueToCode(block, 'left', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['math.%s(%s)'.format(math_sqrt_field_dropdown_name_var, math_sqrt_input_value_left_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['isTouching'] = function (block) {
    var isTouching_field_dropdown_input_var = block.getFieldValue('input');
    return ['isTouching("%s")'.format(isTouching_field_dropdown_input_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['setName'] = function (block) {
    var setName_input_value_name_var = Blockly.Lua.valueToCode(block, 'name', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'setActorValue("name", %s)\n'.format(setName_input_value_name_var);
};
Blockly.Lua['setPhysicsRaidus'] = function (block) {
    var setPhysicsRaidus_input_value_radius_var = Blockly.Lua.valueToCode(block, 'radius', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'setActorValue("physicsRadius", %s)\n'.format(setPhysicsRaidus_input_value_radius_var);
};
Blockly.Lua['setPhysicsHeight'] = function (block) {
    var setPhysicsHeight_input_value_height_var = Blockly.Lua.valueToCode(block, 'height', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'setActorValue("physicsHeight", %s)\n'.format(setPhysicsHeight_input_value_height_var);
};
Blockly.Lua['registerCollisionEvent'] = function (block) {
    var registerCollisionEvent_field_input_name_var = block.getFieldValue('name');
    var registerCollisionEvent_input_statement_input_var = Blockly.Lua.statementToCode(block, 'input') || '';
    return 'registerCollisionEvent(%s, function()\n%send)\n'.format(registerCollisionEvent_field_input_name_var, registerCollisionEvent_input_statement_input_var);
};
Blockly.Lua['broadcastCollision'] = function (block) {

    return 'broadcastCollision()\n'.format();
};
Blockly.Lua['distanceTo'] = function (block) {
    var distanceTo_field_dropdown_input_var = block.getFieldValue('input');
    return ['distanceTo("%s")'.format(distanceTo_field_dropdown_input_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['askAndWait'] = function (block) {
    var askAndWait_input_value_input_var = Blockly.Lua.valueToCode(block, 'input', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'ask("%s")\n'.format(askAndWait_input_value_input_var);
};
Blockly.Lua['answer'] = function (block) {

    return ['get("answer")'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['isKeyPressed'] = function (block) {
    var isKeyPressed_field_dropdown_input_var = block.getFieldValue('input');
    return ['isKeyPressed("%s")'.format(isKeyPressed_field_dropdown_input_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['isMouseDown'] = function (block) {

    return ['isMouseDown()'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['mousePickBlock'] = function (block) {

    return ['mousePickBlock()'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['getBlock'] = function (block) {
    var getBlock_input_value_x_var = Blockly.Lua.valueToCode(block, 'x', Blockly.Lua.ORDER_ATOMIC) || '""';
    var getBlock_input_value_y_var = Blockly.Lua.valueToCode(block, 'y', Blockly.Lua.ORDER_ATOMIC) || '""';
    var getBlock_input_value_z_var = Blockly.Lua.valueToCode(block, 'z', Blockly.Lua.ORDER_ATOMIC) || '""';
    return ['getBlock(%s, %s, %s)'.format(getBlock_input_value_x_var, getBlock_input_value_y_var, getBlock_input_value_z_var), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['setBlock'] = function (block) {
    var setBlock_input_value_x_var = Blockly.Lua.valueToCode(block, 'x', Blockly.Lua.ORDER_ATOMIC) || '""';
    var setBlock_input_value_y_var = Blockly.Lua.valueToCode(block, 'y', Blockly.Lua.ORDER_ATOMIC) || '""';
    var setBlock_input_value_z_var = Blockly.Lua.valueToCode(block, 'z', Blockly.Lua.ORDER_ATOMIC) || '""';
    var setBlock_input_value_blockId_var = Blockly.Lua.valueToCode(block, 'blockId', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'setBlock(%s, %s, %s, %s)\n'.format(setBlock_input_value_x_var, setBlock_input_value_y_var, setBlock_input_value_z_var, setBlock_input_value_blockId_var);
};
Blockly.Lua['timer'] = function (block) {

    return ['getTimer()'.format(), Blockly.Lua.ORDER_ATOMIC];
};
Blockly.Lua['resetTimer'] = function (block) {

    return 'resetTimer()\n'.format();
};
Blockly.Lua['mode'] = function (block) {

    return 'cmd("/mode game")\n'.format();
};
Blockly.Lua['modeEdit'] = function (block) {

    return 'cmd("/mode edit")\n'.format();
};
Blockly.Lua['playNote'] = function (block) {
    var playNote_field_dropdown_note_var = block.getFieldValue('note');
    var playNote_input_value_beat_var = Blockly.Lua.valueToCode(block, 'beat', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'playNote("%s", %s)\n'.format(playNote_field_dropdown_note_var, playNote_input_value_beat_var);
};
Blockly.Lua['playMusic'] = function (block) {
    var playMusic_field_dropdown_filename_var = block.getFieldValue('filename');
    return 'playMusic("%s")\n'.format(playMusic_field_dropdown_filename_var);
};
Blockly.Lua['playSound'] = function (block) {
    var playSound_field_dropdown_filename_var = block.getFieldValue('filename');
    return 'playSound("%s")\n'.format(playSound_field_dropdown_filename_var);
};