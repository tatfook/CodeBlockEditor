Blockly.Lua['set'] = function (block) {
  var set_key_value = block.getFieldValue('key');
		
var set_value_value = block.getFieldValue('value');
		
return 'set("%s", "%s")\n'.format(set_key_value,set_value_value);

};
	
Blockly.Lua['showVariable'] = function (block) {
  var showVariable_name_value = block.getFieldValue('name');
		
return 'showVariable("%s")\n'.format(showVariable_name_value);

};
	
Blockly.Lua['hideVariable'] = function (block) {
  var hideVariable_name_value = block.getFieldValue('name');
		
return 'hideVariable("%s")\n'.format(hideVariable_name_value);

};
	
Blockly.Lua['log'] = function (block) {
  var log_obj_value = block.getFieldValue('obj');
		
return 'log("%s")\n'.format(log_obj_value);

};
	
Blockly.Lua['setActorValue'] = function (block) {
  var setActorValue_key_value = block.getFieldValue('key');
		
var setActorValue_value_value = block.getFieldValue('value');
		
return 'setActorValue("%s", "%s")\n'.format(setActorValue_key_value,setActorValue_value_value);

};
	
Blockly.Lua['getActorValue'] = function (block) {
  var getActorValue_key_value = block.getFieldValue('key');
		
return 'getActorValue("%s")\n'.format(getActorValue_key_value);

};
	
Blockly.Lua['sayAndWait'] = function (block) {
  var sayAndWait_text_value = block.getFieldValue('text');
		
var sayAndWait_duration_value = block.getFieldValue('duration');
		
return 'say("%s", %s)\n'.format(sayAndWait_text_value,sayAndWait_duration_value);

};
	
Blockly.Lua['say'] = function (block) {
  var say_text_value = block.getFieldValue('text');
		
return 'say("%s")\n'.format(say_text_value);

};
	
Blockly.Lua['tip'] = function (block) {
  var tip_text_value = block.getFieldValue('text');
		
return 'tip("%s")\n'.format(tip_text_value);

};
	
Blockly.Lua['show'] = function (block) {
  
return 'show()\n'.format();

};
	
Blockly.Lua['hide'] = function (block) {
  
return 'hide()\n'.format();

};
	
Blockly.Lua['anim'] = function (block) {
  var anim_animId_value = block.getFieldValue('animId');
		
var anim_duration_value = block.getFieldValue('duration');
		
return 'anim(%d, %d)\n'.format(anim_animId_value,anim_duration_value);

};
	
Blockly.Lua['play'] = function (block) {
  var play_timeFrom_value = block.getFieldValue('timeFrom');
		
var play_timeTo_value = block.getFieldValue('timeTo');
		
return 'play(%d, %d)\n'.format(play_timeFrom_value,play_timeTo_value);

};
	
Blockly.Lua['playLoop'] = function (block) {
  var playLoop_timeFrom_value = block.getFieldValue('timeFrom');
		
var playLoop_timeTo_value = block.getFieldValue('timeTo');
		
return 'playLoop(%d, %d)\n'.format(playLoop_timeFrom_value,playLoop_timeTo_value);

};
	
Blockly.Lua['stop'] = function (block) {
  
return 'stop()\n'.format();

};
	
Blockly.Lua['scale'] = function (block) {
  var scale_scaleDelta_value = block.getFieldValue('scaleDelta');
		
return 'scale(%d)\n'.format(scale_scaleDelta_value);

};
	
Blockly.Lua['scaleTo'] = function (block) {
  var scaleTo_scale_value = block.getFieldValue('scale');
		
return 'scaleTo(%d)\n'.format(scaleTo_scale_value);

};
	
Blockly.Lua['focus'] = function (block) {
  var focus_name_value = block.getFieldValue('name');
		
return 'focus("%s")\n'.format(focus_name_value);

};
	
Blockly.Lua['getScale'] = function (block) {
  
return 'getScale()\n'.format();

};
	
Blockly.Lua['getPlayTime'] = function (block) {
  
return 'getPlayTime()\n'.format();

};
	
Blockly.Lua['moveForward'] = function (block) {
  var moveForward_dist_value = block.getFieldValue('dist');
		
var moveForward_duration_value = block.getFieldValue('duration');
		
return 'moveForward(%d, %d)\n'.format(moveForward_dist_value,moveForward_duration_value);

};
	
Blockly.Lua['turn'] = function (block) {
  var turn_degree_value = block.getFieldValue('degree');
		
return 'turn(%d)\n'.format(turn_degree_value);

};
	
Blockly.Lua['turnTo'] = function (block) {
  var turnTo_degree_value = block.getFieldValue('degree');
		
return 'turnTo(%d)\n'.format(turnTo_degree_value);

};
	
Blockly.Lua['turnToTarget'] = function (block) {
  var turnToTarget_targetName_value = block.getFieldValue('targetName');
		
return 'turnTo("%s")\n'.format(turnToTarget_targetName_value);

};
	
Blockly.Lua['move'] = function (block) {
  var move_x_value = block.getFieldValue('x');
		
var move_y_value = block.getFieldValue('y');
		
var move_z_value = block.getFieldValue('z');
		
var move_duration_value = block.getFieldValue('duration');
		
return 'move(%s, %s, %s, %s)\n'.format(move_x_value,move_y_value,move_z_value,move_duration_value);

};
	
Blockly.Lua['moveTo'] = function (block) {
  var moveTo_x_value = block.getFieldValue('x');
		
var moveTo_y_value = block.getFieldValue('y');
		
var moveTo_z_value = block.getFieldValue('z');
		
var moveTo_duration_value = block.getFieldValue('duration');
		
return 'moveTo(%s, %s, %s)\n'.format(moveTo_x_value,moveTo_y_value,moveTo_z_value,moveTo_duration_value);

};
	
Blockly.Lua['moveToTarget'] = function (block) {
  var moveToTarget_targetName_value = block.getFieldValue('targetName');
		
return 'moveTo("%s")\n'.format(moveToTarget_targetName_value);

};
	
Blockly.Lua['walk'] = function (block) {
  var walk_x_value = block.getFieldValue('x');
		
var walk_y_value = block.getFieldValue('y');
		
var walk_z_value = block.getFieldValue('z');
		
var walk_duration_value = block.getFieldValue('duration');
		
return 'walk(%s, %s, %s, %s)\n'.format(walk_x_value,walk_y_value,walk_z_value,walk_duration_value);

};
	
Blockly.Lua['walkForward'] = function (block) {
  var walkForward_dist_value = block.getFieldValue('dist');
		
var walkForward_duration_value = block.getFieldValue('duration');
		
return 'walkForward(%s, %s)\n'.format(walkForward_dist_value,walkForward_duration_value);

};
	
Blockly.Lua['velocity'] = function (block) {
  var velocity_cmd_text_value = block.getFieldValue('cmd_text');
		
return 'velocity("%s")\n'.format(velocity_cmd_text_value);

};
	
Blockly.Lua['bounce'] = function (block) {
  
return 'bounce()\n'.format();

};
	
Blockly.Lua['getX'] = function (block) {
  
return 'getX()\n'.format();

};
	
Blockly.Lua['getY'] = function (block) {
  
return 'getY()\n'.format();

};
	
Blockly.Lua['getZ'] = function (block) {
  
return 'getZ()\n'.format();

};
	
Blockly.Lua['getFacing'] = function (block) {
  
return 'getFacing()\n'.format();

};
	
Blockly.Lua['registerClickEvent'] = function (block) {
  var registerClickEvent_statement = Blockly.Lua.statementToCode(block, 'input') || '';
		
return 'registerClickEvent(function()\n%send)\n'.format(registerClickEvent_statement);

};
	
Blockly.Lua['registerKeyPressedEvent'] = function (block) {
  var registerKeyPressedEvent_keyname_value = block.getFieldValue('keyname');
		
var registerKeyPressedEvent_statement = Blockly.Lua.statementToCode(block, 'input') || '';
		
return 'registerKeyPressedEvent("%s", function()\n%send)\n'.format(registerKeyPressedEvent_keyname_value,registerKeyPressedEvent_statement);

};
	
Blockly.Lua['registerAnimationEvent'] = function (block) {
  var registerAnimationEvent_time_value = block.getFieldValue('time');
		
var registerAnimationEvent_statement = Blockly.Lua.statementToCode(block, 'input') || '';
		
return 'registerAnimationEvent(%d, function()\n%send)\n'.format(registerAnimationEvent_time_value,registerAnimationEvent_statement);

};
	
Blockly.Lua['registerBroadcastEvent'] = function (block) {
  var registerBroadcastEvent_msg_value = block.getFieldValue('msg');
		
var registerBroadcastEvent_statement = Blockly.Lua.statementToCode(block, 'input') || '';
		
return 'registerBroadcastEvent("%s", function()\n%send)\n'.format(registerBroadcastEvent_msg_value,registerBroadcastEvent_statement);

};
	
Blockly.Lua['broadcast'] = function (block) {
  var broadcast_msg_value = block.getFieldValue('msg');
		
return 'broadcast("%s")\n'.format(broadcast_msg_value);

};
	
Blockly.Lua['broadcastAndWait'] = function (block) {
  var broadcastAndWait_msg_value = block.getFieldValue('msg');
		
return 'broadcastAndWait("%s")\n'.format(broadcastAndWait_msg_value);

};
	
Blockly.Lua['wait'] = function (block) {
  var wait_time_value = block.getFieldValue('time');
		
return 'wait(%s)\n'.format(wait_time_value);

};
	
Blockly.Lua['repeat'] = function (block) {
  var repeat_times_value = block.getFieldValue('times');
		
var repeat_statement = Blockly.Lua.statementToCode(block, 'input') || '';
		
return 'for i=1, %d do\n%send\n'.format(repeat_times_value,repeat_statement);

};
	
Blockly.Lua['forever'] = function (block) {
  var forever_statement = Blockly.Lua.statementToCode(block, 'input') || '';
		
return 'while(true) do\n%send\n'.format(forever_statement);

};
	
Blockly.Lua['if_else'] = function (block) {
  var if_else_expression_value = block.getFieldValue('expression');
		
var if_else_statement = Blockly.Lua.statementToCode(block, 'input_true') || '';
		
var if_else_statement = Blockly.Lua.statementToCode(block, 'input_else') || '';
		
return 'if(%s) then\n%selse\n%send\n'.format(if_else_expression_value,if_else_statement,if_else_statement);

};
	
Blockly.Lua['forKeyValue'] = function (block) {
  var forKeyValue_key_value = block.getFieldValue('key');
		
var forKeyValue_value_value = block.getFieldValue('value');
		
var forKeyValue_data_value = block.getFieldValue('data');
		
var forKeyValue_statement = Blockly.Lua.statementToCode(block, 'input') || '';
		
return 'for %s, %s in pairs(%s) do\n%send\n'.format(forKeyValue_key_value,forKeyValue_value_value,forKeyValue_data_value,forKeyValue_statement);

};
	
Blockly.Lua['forIndexValue'] = function (block) {
  var forIndexValue_i_value = block.getFieldValue('i');
		
var forIndexValue_item_value = block.getFieldValue('item');
		
var forIndexValue_data_value = block.getFieldValue('data');
		
var forIndexValue_statement = Blockly.Lua.statementToCode(block, 'input') || '';
		
return 'for %s, %s in ipairs(%s) do\n%send\n'.format(forIndexValue_i_value,forIndexValue_item_value,forIndexValue_data_value,forIndexValue_statement);

};
	
Blockly.Lua['registerCloneEvent'] = function (block) {
  var registerCloneEvent_statement = Blockly.Lua.statementToCode(block, 'input') || '';
		
return 'registerCloneEvent(function()\n%send)\n'.format(registerCloneEvent_statement);

};
	
Blockly.Lua['clone'] = function (block) {
  var clone_input_value = block.getFieldValue('input');
		
return 'clone("%s")\n'.format(clone_input_value);

};
	
Blockly.Lua['delete'] = function (block) {
  
return 'delete()\n'.format();

};
	
Blockly.Lua['run'] = function (block) {
  var run_statement = Blockly.Lua.statementToCode(block, 'input') || '';
		
return 'run(function()\n%send)\n'.format(run_statement);

};
	
Blockly.Lua['isTouching'] = function (block) {
  var isTouching_input_value = block.getFieldValue('input');
		
return 'isTouching("%s")\n'.format(isTouching_input_value);

};
	
Blockly.Lua['distanceTo'] = function (block) {
  var distanceTo_input_value = block.getFieldValue('input');
		
return 'distanceTo("%s")\n'.format(distanceTo_input_value);

};
	
Blockly.Lua['isKeyPressed'] = function (block) {
  var isKeyPressed_input_value = block.getFieldValue('input');
		
return 'isKeyPressed("%s")\n'.format(isKeyPressed_input_value);

};
	
Blockly.Lua['isMouseDown'] = function (block) {
  
return 'isMouseDown()\n'.format();

};
	
Blockly.Lua['mousePickBlock'] = function (block) {
  
return 'mousePickBlock()\n'.format();

};
	
Blockly.Lua['timer'] = function (block) {
  
return 'getTimer()\n'.format();

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
  var playNote_note_value = block.getFieldValue('note');
		
var playNote_beat_value = block.getFieldValue('beat');
		
return 'playNote("%s", %s)\n'.format(playNote_note_value,playNote_beat_value);

};
	
Blockly.Lua['playMusic'] = function (block) {
  var playMusic_filename_value = block.getFieldValue('filename');
		
return 'playMusic("%s")\n'.format(playMusic_filename_value);

};
	
Blockly.Lua['playSound'] = function (block) {
  var playSound_filename_value = block.getFieldValue('filename');
		
return 'playSound("%s")\n'.format(playSound_filename_value);

};
	
Blockly.Lua['addition'] = function (block) {
  var addition_left_value = block.getFieldValue('left');
		
var addition_right_value = block.getFieldValue('right');
		
return '(%s) + (%s)\n'.format(addition_left_value,addition_right_value);

};
	
Blockly.Lua['random'] = function (block) {
  var random_from_value = block.getFieldValue('from');
		
var random_to_value = block.getFieldValue('to');
		
return 'math.random(%s,%s)\n'.format(random_from_value,random_to_value);

};
	
Blockly.Lua['equal'] = function (block) {
  var equal_left_value = block.getFieldValue('left');
		
var equal_right_value = block.getFieldValue('right');
		
return '(%s) == (%s)\n'.format(equal_left_value,equal_right_value);

};
	
Blockly.Lua['and'] = function (block) {
  var and_left_value = block.getFieldValue('left');
		
var and_right_value = block.getFieldValue('right');
		
return '(%s) and (%s)\n'.format(and_left_value,and_right_value);

};
	
Blockly.Lua['or'] = function (block) {
  var or_left_value = block.getFieldValue('left');
		
var or_right_value = block.getFieldValue('right');
		
return '(%s) or (%s)\n'.format(or_left_value,or_right_value);

};
	
Blockly.Lua['not'] = function (block) {
  var not_left_value = block.getFieldValue('left');
		
return '(not %s)\n'.format(not_left_value);

};
	
Blockly.Lua['join'] = function (block) {
  var join_left_value = block.getFieldValue('left');
		
var join_right_value = block.getFieldValue('right');
		
return '("%s".."%s")\n'.format(join_left_value,join_right_value);

};
	
Blockly.Lua['lengthOf'] = function (block) {
  var lengthOf_left_value = block.getFieldValue('left');
		
return '(#"%s")\n'.format(lengthOf_left_value);

};
	
Blockly.Lua['mod'] = function (block) {
  var mod_left_value = block.getFieldValue('left');
		
var mod_right_value = block.getFieldValue('right');
		
return '(%s%%s)\n'.format(mod_left_value,mod_right_value);

};
	
Blockly.Lua['round'] = function (block) {
  var round_left_value = block.getFieldValue('left');
		
return 'math.floor(%s+0.5)\n'.format(round_left_value);

};
	
Blockly.Lua['math.sqrt'] = function (block) {
  var math_sqrt_left_value = block.getFieldValue('left');
		
return 'math.sqrt(%s)\n'.format(math_sqrt_left_value);

};
	