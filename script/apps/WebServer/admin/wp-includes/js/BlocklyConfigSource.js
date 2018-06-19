Blockly.paracraft_blockly_config_source = [
  {
      "func_description": "set(\"%s\", \"%s\")",
      "message0": "设置全局变量%1为%2",
      "canRun": true,
      "examples": [
        {
            "desc": "也可以用_G.a",
            "code": "_G.a = _G.a or 1\nwhile(true) do\n    _G.a = a + 1\n    set(\"a\", get(\"a\") + 1)\n    say(a)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#459197",
      "category": "Data",
      "type": "set",
      "arg0": [
        {
            "type": "field_input",
            "name": "key",
            "text": "test"
        },
        {
            "type": "field_input",
            "name": "value",
            "text": "hello"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "showVariable(\"%s\")",
      "message0": "显示全局变量%1",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "_G.score = 1\n_G.msg = \"hello\"\nshowVariable(\"score\", \"Your Score\")\nshowVariable(\"msg\", \"\", \"#ff0000\")\nwhile(true) do\n   _G.score = _G.score + 1\n   wait(0.01)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#459197",
      "category": "Data",
      "type": "showVariable",
      "arg0": [
        {
            "type": "field_input",
            "name": "name",
            "text": "score"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "hideVariable(\"%s\")",
      "message0": "隐藏全局变量%1",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "_G.score = 1\nshowVariable(\"score\")\nwait(1);\nhideVariable(\"score\")\n",
            "canRun": true
        }
      ],
      "colour": "#459197",
      "category": "Data",
      "type": "hideVariable",
      "arg0": [
        {
            "type": "field_input",
            "name": "name",
            "text": "score"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "log(\"%s\")",
      "message0": "输出日志%1",
      "canRun": true,
      "examples": [
        {
            "desc": "查看log.txt或F11看日志",
            "code": "log(123)\nlog(\"hello\")\nsomething = {any=\"object\"}\nlog(something)\n",
            "canRun": true
        }
      ],
      "colour": "#459197",
      "category": "Data",
      "type": "log",
      "arg0": [
        {
            "type": "field_input",
            "name": "obj",
            "text": "hello"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "setActorValue(\"%s\", \"%s\")",
      "color": "#cc0000",
      "canRun": false,
      "colour": "#459197",
      "examples": [
        {
            "desc": "",
            "code": "registerCloneEvent(function(name)\n    setActorValue(\"name\", name)\n    moveForward(1);\nend)\nregisterClickEvent(function()\n    local myname = getActorValue(\"name\")\n    say(\"my name is \"..myname)\nend)\nsetActorValue(\"name\", \"Default\")\nclone(\"myself\", \"Cloned\")\nsay(\"click us!\")\n",
            "canRun": true
        }
      ],
      "message0": "设置角色属性%1为%2",
      "helpUrl": "",
      "type": "setActorValue",
      "arg0": [
        {
            "type": "field_input",
            "name": "key",
            "text": "test"
        },
        {
            "type": "field_input",
            "name": "value",
            "text": "hello"
        }
      ],
      "category": "Data"
  },
  {
      "func_description": "getActorValue(\"%s\")",
      "message0": "获取角色属性%1",
      "category": "Data",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "registerCloneEvent(function(msg)\n    setActorValue(\"name\", msg.name)\n    moveForward(msg.dist);\nend)\nregisterClickEvent(function()\n    local myname = getActorValue(\"name\")\n    say(\"my name is \"..myname)\nend)\nsetActorValue(\"name\", \"Default\")\nclone(\"myself\", {name = \"clone1\", dist=1})\nclone(nil, {name = \"clone2\", dist=2})\nsay(\"click us!\")\n",
            "canRun": true
        }
      ],
      "colour": "#459197",
      "canRun": false,
      "type": "getActorValue",
      "helpUrl": "",
      "arg0": [
        {
            "type": "field_input",
            "name": "key",
            "text": "test"
        }
      ]
  },
  {
      "func_description": "say(\"%s\", %s)",
      "message0": "说 %1 持续 %2 秒",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "say(\"Jump!\", 2)\nmove(0,1,0)\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "category": "Looks",
      "type": "sayAndWait",
      "arg0": [
        {
            "type": "field_input",
            "name": "text",
            "text": "hello!"
        },
        {
            "type": "field_number",
            "name": "duration",
            "text": 2
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "say(\"%s\")",
      "message0": "说 %1",
      "canRun": true,
      "examples": [
        {
            "desc": "在人物头顶说些话",
            "code": "say(\"Hello!\")\nwait(1)\nsay(\"\")\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "category": "Looks",
      "type": "say",
      "arg0": [
        {
            "type": "field_input",
            "name": "text",
            "text": "hello!"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "tip(\"%s\")",
      "message0": "提示文字%1",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "tip(\"Start Game in 3!\")\nwait(1)\ntip(\"Start Game in 2!\")\nwait(1)\ntip(\"Start Game in 1!\")\nwait(1)\ntip(\"\")\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "category": "Looks",
      "type": "tip",
      "arg0": [
        {
            "type": "field_input",
            "name": "text",
            "text": "Start Game!"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "show()",
      "message0": "显示",
      "helpUrl": "",
      "colour": "#7abb55",
      "arg0": [],
      "type": "show",
      "canRun": true,
      "category": "Looks"
  },
  {
      "func_description": "hide()",
      "message0": "隐藏",
      "helpUrl": "",
      "colour": "#7abb55",
      "arg0": [],
      "type": "hide",
      "canRun": true,
      "category": "Looks"
  },
  {
      "func_description": "anim(%d, %d)",
      "message0": "播放动作 %1 等待 %2 秒",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "anim(4)\nmove(3, 0, 0, 2)\nanim(0)\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "category": "Looks",
      "type": "anim",
      "arg0": [
        {
            "type": "field_number",
            "name": "animId",
            "text": 4
        },
        {
            "type": "field_number",
            "name": "duration",
            "text": 2
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "play(%d, %d)",
      "message0": "播放从%1到%2毫秒",
      "canRun": true,
      "examples": [
        {
            "desc": "播放电影方块中的角色动画",
            "code": "play(10, 1000)\nsay(\"No looping\", 1)\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "category": "Looks",
      "type": "play",
      "arg0": [
        {
            "type": "field_number",
            "name": "timeFrom",
            "text": 10
        },
        {
            "type": "field_number",
            "name": "timeTo",
            "text": 1000
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "playLoop(%d, %d)",
      "message0": "循环播放从%1到%2毫秒",
      "canRun": true,
      "examples": [
        {
            "desc": "播放电影方块中的角色动画",
            "code": "playLoop(10, 1000)\nsay(\"Looping\", 3)\nstop()\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "category": "Looks",
      "type": "playLoop",
      "arg0": [
        {
            "type": "field_number",
            "name": "timeFrom",
            "text": 10
        },
        {
            "type": "field_number",
            "name": "timeTo",
            "text": 1000
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "stop()",
      "message0": "停止播放",
      "canRun": true,
      "examples": [
        {
            "desc": "播放/暂停角色动画",
            "code": "playLoop(10, 1000)\nwait(2)\nstop()\nturn(15)\nplayLoop(10, 1000)\nwait(2)\nstop()\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "category": "Looks",
      "type": "stop",
      "arg0": [],
      "helpUrl": ""
  },
  {
      "func_description": "scale(%d)",
      "message0": "放缩百分之%1",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "scale(50)\nwait(1)\nscale(-50)\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "category": "Looks",
      "type": "scale",
      "arg0": [
        {
            "type": "field_number",
            "name": "scaleDelta",
            "text": 10
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "scaleTo(%d)",
      "message0": "放缩到百分之%1",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "for i=1, 20 do\n    scale(10)\nend\nscaleTo(50)\nwait(0.5)\nscaleTo(200)\nwait(0.5)\nscaleTo(100)\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "category": "Looks",
      "type": "scaleTo",
      "arg0": [
        {
            "type": "field_number",
            "name": "scale",
            "text": 100
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "focus(\"%s\")",
      "color": "#cc0000",
      "canRun": true,
      "colour": "#7abb55",
      "examples": [
        {
            "desc": "",
            "code": "focus()\nmoveForward(2,2)\nfocus(\"player\")\n",
            "canRun": true
        }
      ],
      "message0": "观看此角色%1",
      "helpUrl": "",
      "type": "focus",
      "arg0": [
        {
            "type": "field_input",
            "name": "name",
            "text": "myself"
        }
      ],
      "category": "Looks"
  },
  {
      "func_description": "getScale()",
      "message0": "放缩尺寸",
      "category": "Looks",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "while(true) do\n    if(getScale() >= 200) then\n        scaleTo(100)\n    else\n        scale(10)\n    end\nend\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "canRun": false,
      "type": "getScale",
      "helpUrl": "",
      "arg0": []
  },
  {
      "func_description": "getPlayTime()",
      "message0": "动画时间",
      "category": "Looks",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "playLoop(10, 2000)\nwhile(true) do\n    if(getPlayTime() > 1000) then\n        say(\"hi\")\n    else\n        say(\"\")\n    end\n    wait(0.01);\nend\n",
            "canRun": true
        }
      ],
      "colour": "#7abb55",
      "canRun": false,
      "type": "getPlayTime",
      "helpUrl": "",
      "arg0": []
  },
  {
      "func_description": "moveForward(%d, %d)",
      "message0": "前进%1格 在%2秒内",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "turn(30);\nfor i=1, 20 do\n    moveForward(0.05)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "category": "Motion",
      "type": "moveForward",
      "arg0": [
        {
            "type": "field_number",
            "name": "dist",
            "text": 1
        },
        {
            "type": "field_number",
            "name": "duration",
            "text": 0.5
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "turn(%d)",
      "message0": "旋转%1度",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "turnTo(-60)\nfor i=1, 100 do\n    turn(-3)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "category": "Motion",
      "type": "turn",
      "arg0": [
        {
            "type": "field_number",
            "name": "degree",
            "text": 15
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "turnTo(%d)",
      "message0": "旋转到%1方向",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "turnTo(-60)\nwait(1)\nturnTo(0)\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "category": "Motion",
      "type": "turnTo",
      "arg0": [
        {
            "type": "field_number",
            "name": "degree",
            "text": 90
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "turnTo(\"%s\")",
      "message0": "转向%1",
      "canRun": true,
      "examples": [
        {
            "desc": "转向鼠标,主角,指定角色",
            "code": "turnTo(\"mouse-pointer\")\nmoveForward(1, 1)\nturnTo(\"@p\")\nmoveForward(1, 1)\nturnTo(\"frog\")\nmoveForward(1, 1)\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "category": "Motion",
      "type": "turnToTarget",
      "arg0": [
        {
            "type": "field_input",
            "name": "targetName",
            "text": "mouse-pointer"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "move(%s, %s, %s, %s)",
      "message0": "位移%1 %2 %3 在%4秒内",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "turnTo(0)\nmove(0.5,1,0, 0.5)\nmove(1,-1,0, 0.5)\nsay(\"jump!\", 1)\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "category": "Motion",
      "type": "move",
      "arg0": [
        {
            "type": "field_number",
            "name": "x",
            "text": 1
        },
        {
            "type": "field_number",
            "name": "y",
            "text": 0
        },
        {
            "type": "field_number",
            "name": "z",
            "text": 0
        },
        {
            "type": "field_number",
            "name": "duration",
            "text": 0.5
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "moveTo(%s, %s, %s)",
      "isDynamicNPLCode": true,
      "helpUrl": "",
      "colour": "#0078d7",
      "examples": [
        {
            "desc": "",
            "code": "moveTo(19257,5,19174)\nmoveTo(\"mouse-pointer\")\nmoveTo(\"@p\")\nmoveTo(\"frog\")\n",
            "canRun": false
        }
      ],
      "canRun": true,
      "message0": "瞬移到%1 %2 %3 %4",
      "type": "moveTo",
      "arg0": [
        {
            "type": "field_number",
            "name": "x"
        },
        {
            "type": "field_number",
            "name": "y"
        },
        {
            "type": "field_number",
            "name": "z"
        },
        {
            "type": "field_number",
            "name": "duration",
            "text": 0.5
        }
      ],
      "category": "Motion"
  },
  {
      "func_description": "moveTo(\"%s\")",
      "message0": "瞬移到%1",
      "canRun": true,
      "examples": [
        {
            "desc": "瞬移到主角，鼠标，指定角色",
            "code": "say(\"current player\", 1)\nmoveTo(\"@p\")\nsay(\"mouse-pointer\", 1)\nmoveTo(\"mouse-pointer\")\nsay(\"the frog actor if any\", 1)\nmoveTo(\"frog\")\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "category": "Motion",
      "type": "moveToTarget",
      "arg0": [
        {
            "type": "field_input",
            "name": "targetName",
            "text": "mouse-pointer"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "walk(%s, %s, %s, %s)",
      "message0": "行走%1 %2 %3持续%4秒",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "walk(1,0) -- x,z\nwalk(0,1) -- x,z\nwalk(-1,0,-1) -- x,y,z\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "category": "Motion",
      "type": "walk",
      "arg0": [
        {
            "type": "field_number",
            "name": "x",
            "text": 1
        },
        {
            "type": "field_number",
            "name": "y",
            "text": 0
        },
        {
            "type": "field_number",
            "name": "z",
            "text": 0
        },
        {
            "type": "field_number",
            "name": "duration",
            "text": 0.5
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "walkForward(%s, %s)",
      "message0": "向前走%1持续%2秒",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "turnTo(0)\nwalkForward(1)\nturn(180)\nwalkForward(1, 0.5)\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "category": "Motion",
      "type": "walkForward",
      "arg0": [
        {
            "type": "field_number",
            "name": "dist",
            "text": 1
        },
        {
            "type": "field_number",
            "name": "duration",
            "text": 0.5
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "velocity(\"%s\")",
      "message0": "速度%1",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "velocity(\"~ 10 ~\")\nwait(0.3)\nvelocity(\"add 2 ~ 2\")\nwait(2)\nvelocity(\"0 0 0\")\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "category": "Motion",
      "type": "velocity",
      "arg0": [
        {
            "type": "field_input",
            "name": "cmd_text",
            "text": "~ 5 ~"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "bounce()",
      "message0": "反弹",
      "canRun": true,
      "examples": [
        {
            "desc": "遇到方块反弹",
            "code": "turnTo(45)\nwhile(true) do\n    moveForward(0.02)\n    if(isTouching(\"block\")) then\n        bounce()\n    end\nend\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "category": "Motion",
      "type": "bounce",
      "arg0": [],
      "helpUrl": ""
  },
  {
      "func_description": "getX()",
      "message0": "X坐标",
      "category": "Motion",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "while(true) do\n    say(getX())\nend\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "canRun": false,
      "type": "getX",
      "helpUrl": "",
      "arg0": []
  },
  {
      "func_description": "getY()",
      "message0": "Y坐标",
      "category": "Motion",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "while(true) do\n    say(getY())\n    if(getY()<3) then\n        tip(\"Game Over!\")\n    end\nend\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "canRun": false,
      "type": "getY",
      "helpUrl": "",
      "arg0": []
  },
  {
      "func_description": "getZ()",
      "message0": "Z坐标",
      "category": "Motion",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "while(true) do\n    say(getZ())\nend\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "canRun": false,
      "type": "getZ",
      "helpUrl": "",
      "arg0": []
  },
  {
      "func_description": "getFacing()",
      "message0": "方向",
      "category": "Motion",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "while(true) do\n    say(getFacing())\nend\n",
            "canRun": true
        }
      ],
      "colour": "#0078d7",
      "canRun": false,
      "type": "getFacing",
      "helpUrl": "",
      "arg0": []
  },
  {
      "func_description": "",
      "message0": "当演员被点击时%1",
      "canRun": false,
      "examples": [
        {
            "desc": "",
            "code": "registerClickEvent(function()\n    for i=1, 20 do\n        scale(10)\n    end\n    for i=1, 20 do\n        scale(-10)\n    end\nend)\n",
            "canRun": true
        }
      ],
      "colour": "#764bcc",
      "category": "Events",
      "type": "registerClickEvent",
      "arg0": [
        {
            "type": "input_statement",
            "name": "input",
            "text": ""
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "",
      "message0": "当%1键按下时%2",
      "canRun": false,
      "examples": [
        {
            "desc": "空格跳跃",
            "code": "registerKeyPressedEvent(\"space\",function()\n    say(\"Jump!\", 1)\n    move(0,1,0, 0.5)\n    move(0,-1,0, 0.5)\n    walkForward(0)\nend)\n",
            "canRun": true
        }
      ],
      "colour": "#764bcc",
      "category": "Events",
      "type": "registerKeyPressedEvent",
      "arg0": [
        {
            "type": "field_input",
            "name": "keyname",
            "text": "space"
        },
        {
            "type": "input_statement",
            "name": "input",
            "text": ""
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "",
      "message0": "当动画在%1帧时%2",
      "canRun": false,
      "examples": [
        {
            "desc": "",
            "code": "registerAnimationEvent(10, function()\n    say(\"anim started\", 3)\nend)\nregisterAnimationEvent(1000, function()\n    say(\"anim stopped\", 1)\nend)\nregisterClickEvent(function()\n    play(10, 1000)\nend);\nsay(\"click me!\")\n",
            "canRun": true
        }
      ],
      "colour": "#764bcc",
      "category": "Events",
      "type": "registerAnimationEvent",
      "arg0": [
        {
            "type": "field_number",
            "name": "time",
            "text": 1000
        },
        {
            "type": "input_statement",
            "name": "input",
            "text": ""
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "",
      "color": "#00cc00",
      "canRun": false,
      "colour": "#764bcc",
      "examples": [
        {
            "desc": "",
            "code": "registerBroadcastEvent(\"jump\", function()\n    move(0,1,0)\n    wait(1)\n    move(0,-1,0)\nend)\nregisterClickEvent(function()\n    broadcastAndWait(\"jump\")\n    say(\"That was fun!\", 2)\nend)\nsay(\"click to jump!\")\n",
            "canRun": true
        }
      ],
      "message0": "当收到%1消息时%2",
      "helpUrl": "",
      "type": "registerBroadcastEvent",
      "arg0": [
        {
            "type": "field_input",
            "name": "msg",
            "text": "message0"
        },
        {
            "type": "input_statement",
            "name": "input",
            "text": ""
        }
      ],
      "category": "Events"
  },
  {
      "func_description": "",
      "color": "#00cc00",
      "canRun": false,
      "colour": "#764bcc",
      "examples": [
        {
            "desc": "",
            "code": "registerBroadcastEvent(\"hello\", function(msg)\n    say(\"hello\"..msg)\n    move(0,1,0, 0.5)\n    move(0,-1,0, 0.5)\n    say(\"bye\")\nend)\nfor i=1, 2 do\n    broadcast(\"hello\", i)\n    wait(0.5)\nend\n",
            "canRun": true
        }
      ],
      "message0": "广播%1消息",
      "helpUrl": "",
      "type": "broadcast",
      "arg0": [
        {
            "type": "field_input",
            "name": "msg",
            "text": "message0"
        }
      ],
      "category": "Events"
  },
  {
      "func_description": "",
      "color": "#00cc00",
      "canRun": false,
      "colour": "#764bcc",
      "examples": [
        {
            "desc": "",
            "code": "registerBroadcastEvent(\"hi\", function()\n    say(\"hi\")\n    wait(1)\n    say(\"bye\")\n    wait(1)\nend)\nfor i=1, 2 do\n    broadcastAndWait(\"hi\")\nend\n",
            "canRun": true
        }
      ],
      "message0": "广播%1消息并等待返回",
      "helpUrl": "",
      "type": "broadcastAndWait",
      "arg0": [
        {
            "type": "field_input",
            "name": "msg",
            "text": "message0"
        }
      ],
      "category": "Events"
  },
  {
      "func_description": "wait(%s)",
      "message0": "等待%1秒",
      "canRun": false,
      "examples": [
        {
            "desc": "",
            "code": "say(\"hi\")\nwait(1)\nsay(\"bye\", 1)\n",
            "canRun": true
        }
      ],
      "colour": "#d83b01",
      "category": "Control",
      "type": "wait",
      "arg0": [
        {
            "type": "field_number",
            "name": "time",
            "text": 1
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "for i=1, %d do\\n%send",
      "message0": "重复%1次%2",
      "canRun": false,
      "examples": [
        {
            "desc": "",
            "code": "for i=1, 10 do\n    moveForward(0.1)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#d83b01",
      "category": "Control",
      "type": "repeat",
      "arg0": [
        {
            "type": "field_number",
            "name": "times",
            "text": 10
        },
        {
            "type": "input_statement",
            "name": "input",
            "text": ""
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "while(true) do\\n%send",
      "message0": "永远重复%1",
      "canRun": false,
      "examples": [
        {
            "desc": "",
            "code": "while(true) do\n    moveForward(0.01)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#d83b01",
      "category": "Control",
      "type": "forever",
      "arg0": [
        {
            "type": "input_statement",
            "name": "input",
            "text": ""
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "if(%s) then\\n%selse\\n%send",
      "message0": "如果%1那么%2否则%3",
      "canRun": false,
      "examples": [
        {
            "desc": "",
            "code": "while(true) do\n    if(distanceTo(\"mouse-pointer\")<3) then\n        say(\"mouse-pointer\")\n    else\n        say(\"\")\n    end\n    wait(0.01)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#d83b01",
      "category": "Control",
      "type": "if_else",
      "arg0": [
        {
            "type": "input_expression",
            "name": "expression",
            "text": ""
        },
        {
            "type": "input_statement",
            "name": "input_true",
            "text": ""
        },
        {
            "type": "input_statement",
            "name": "input_else",
            "text": ""
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "for %s, %s in pairs(%s) do\\n%send",
      "message0": "每个%1,%2在%3%4",
      "canRun": false,
      "examples": [
        {
            "desc": "",
            "code": "myData = {\n    key1=\"value1\", \n    key2=\"value2\",\n    key2=\"value2\",\n}\nfor k, v in pairs(myData) do\n    say(v, 1);\nend\n",
            "canRun": true
        }
      ],
      "colour": "#d83b01",
      "category": "Control",
      "type": "forKeyValue",
      "arg0": [
        {
            "type": "field_input",
            "name": "key",
            "text": "key"
        },
        {
            "type": "field_input",
            "name": "value",
            "text": "value"
        },
        {
            "type": "field_input",
            "name": "data",
            "text": "data"
        },
        {
            "type": "input_statement",
            "name": "input",
            "text": ""
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "for %s, %s in ipairs(%s) do\\n%send",
      "message0": "每个%1,%2在数组%3%4",
      "canRun": false,
      "examples": [
        {
            "desc": "",
            "code": "myData = {\n    {x=1, y=0, z=0, duration=0.5},\n    {x=0, y=0, z=1, duration=0.5},\n    {x=-1, y=0, z=-1, duration=1},\n}\nfor i, item in ipairs(myData) do\n    move(item.x, item.y, item.z, item.duration)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#d83b01",
      "category": "Control",
      "type": "forIndexValue",
      "arg0": [
        {
            "type": "field_input",
            "name": "i",
            "text": "index"
        },
        {
            "type": "field_input",
            "name": "item",
            "text": "item"
        },
        {
            "type": "field_input",
            "name": "data",
            "text": "data"
        },
        {
            "type": "input_statement",
            "name": "input",
            "text": ""
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "registerCloneEvent(function()\\n%send)",
      "color": "#cc0000",
      "canRun": false,
      "colour": "#d83b01",
      "examples": [
        {
            "desc": "",
            "code": "registerCloneEvent(function(msg)\n    move(msg or 1, 0, 0, 0.5)\n    wait(1)\n    delete()\nend)\nclone()\nclone(\"myself\", 2)\nclone(\"myself\", 3)\n",
            "canRun": true
        }
      ],
      "message0": "当演员被复制时%1",
      "helpUrl": "",
      "type": "registerCloneEvent",
      "arg0": [
        {
            "type": "input_statement",
            "name": "input",
            "text": ""
        }
      ],
      "category": "Control"
  },
  {
      "func_description": "clone(\"%s\")",
      "color": "#cc0000",
      "canRun": false,
      "colour": "#d83b01",
      "examples": [
        {
            "desc": "",
            "code": "registerClickEvent(function()\n    move(1,0,0, 0.5)\nend)\nclone()\nclone()\nsay(\"click\")\n",
            "canRun": true
        }
      ],
      "message0": "复制角色%1",
      "helpUrl": "",
      "type": "clone",
      "arg0": [
        {
            "type": "field_input",
            "name": "input",
            "text": "myself"
        }
      ],
      "category": "Control"
  },
  {
      "func_description": "delete()",
      "color": "#cc0000",
      "category": "Control",
      "colour": "#d83b01",
      "examples": [
        {
            "desc": "",
            "code": "move(1,0)\nsay(\"Default actor will be deleted!\", 1)\ndelete()\nregisterCloneEvent(function()\n    say(\"This clone will be deleted!\", 1)\n    delete()\nend)\nfor i=1, 100 do\n    clone()\n    wait(2)\nend\n",
            "canRun": true
        }
      ],
      "canRun": false,
      "helpUrl": "",
      "type": "delete",
      "arg0": [],
      "message0": "删除角色"
  },
  {
      "func_description": "run(function()\\n%send)",
      "color": "#00cc00",
      "canRun": false,
      "colour": "#d83b01",
      "examples": [
        {
            "desc": "",
            "code": "run(function()\n    say(\"follow mouse pointer!\")\n    while(true) do\n        if(distanceTo(\"mouse-pointer\") < 7) then\n            turnTo(\"mouse-pointer\");\n        elseif(distanceTo(\"@p\") > 14) then\n            moveTo(\"@p\")\n        end\n    end\nend)\nrun(function()\n    while(true) do\n        moveForward(0.02)\n    end\nend)\n",
            "canRun": true
        }
      ],
      "message0": "并行执行%1",
      "helpUrl": "",
      "type": "run",
      "arg0": [
        {
            "type": "input_statement",
            "name": "input",
            "text": ""
        }
      ],
      "category": "Control"
  },
  {
      "func_description": "",
      "message0": "是否碰到%1",
      "category": "Sensing",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "是否和方块与人物有接触",
            "code": "turnTo(45)\nwhile(true) do\n    moveForward(0.1)\n    if(isTouching(62)) then\n        say(\"grass block!\", 1)\n    elseif(isTouching(\"block\")) then\n        bounce()\n    elseif(isTouching(\"box\")) then\n        bounce()\n    end\nend\n",
            "canRun": true
        }
      ],
      "colour": "#69b090",
      "canRun": false,
      "type": "isTouching",
      "helpUrl": "",
      "arg0": [
        {
            "type": "field_input",
            "name": "input",
            "text": "block"
        }
      ]
  },
  {
      "func_description": "",
      "message0": "到%1的距离",
      "category": "Sensing",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "while(true) do\n    if(distanceTo(\"mouse-pointer\") < 3) then\n        say(\"mouse-pointer\")\n    elseif(distanceTo(\"@p\") < 10) then\n        say(\"player\")\n    elseif(distanceTo(\"@p\") > 10) then\n        say(\"nothing\")\n    end\n    wait(0.01)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#69b090",
      "canRun": false,
      "type": "distanceTo",
      "helpUrl": "",
      "arg0": [
        {
            "type": "field_input",
            "name": "input",
            "text": "mouse-pointer"
        }
      ]
  },
  {
      "func_description": "",
      "message0": "%1键是否按下",
      "category": "Sensing",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "say(\"press left/right key to move me!\")\nwhile(true) do\n    if(isKeyPressed(\"left\")) then\n        move(0, 0.1)\n        say(\"\")\n    elseif(isKeyPressed(\"right\")) then\n        move(0, -0.1)\n        say(\"\")\n    end\nend\n",
            "canRun": true
        }
      ],
      "colour": "#69b090",
      "canRun": false,
      "type": "isKeyPressed",
      "helpUrl": "",
      "arg0": [
        {
            "type": "field_input",
            "name": "input",
            "text": "space"
        }
      ]
  },
  {
      "func_description": "",
      "message0": "鼠标是否按下",
      "category": "Sensing",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "点击任意位置传送",
            "code": "say(\"click anywhere\")\nwhile(true) do\n    if(isMouseDown()) then\n        moveTo(\"mouse-pointer\")\n        wait(0.3)\n    end\nend\n",
            "canRun": true
        }
      ],
      "colour": "#69b090",
      "canRun": false,
      "type": "isMouseDown",
      "helpUrl": "",
      "arg0": []
  },
  {
      "func_description": "",
      "message0": "鼠标选取",
      "category": "Sensing",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "点击任意位置传送",
            "code": "while(true) do\n    local x, y, z, blockid = mousePickBlock();\n    if(x) then\n        say(format(\"%s %s %s :%d\", x, y, z, blockid))\n    end\nend\n",
            "canRun": true
        }
      ],
      "colour": "#69b090",
      "canRun": false,
      "type": "mousePickBlock",
      "helpUrl": "",
      "arg0": []
  },
  {
      "func_description": "",
      "message0": "计时器",
      "category": "Sensing",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "resetTimer()\nwhile(getTimer()<5) do\n    moveForward(0.02)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#69b090",
      "canRun": false,
      "type": "timer",
      "helpUrl": "",
      "arg0": []
  },
  {
      "func_description": "",
      "message0": "重置计时器",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "resetTimer()\nwhile(getTimer()<2) do\n    wait(0.5);\nend\nsay(\"hi\", 2)\n",
            "canRun": true
        }
      ],
      "colour": "#69b090",
      "category": "Sensing",
      "type": "resetTimer",
      "arg0": [],
      "helpUrl": ""
  },
  {
      "func_description": "",
      "message0": "设置为游戏模式 %1",
      "helpUrl": "",
      "colour": "#69b090",
      "arg0": [
        {
            "type": "field_input",
            "name": "mode",
            "text": "game"
        }
      ],
      "type": "modeGame",
      "canRun": true,
      "category": "Sensing"
  },
  {
      "func_description": "",
      "message0": "设置为编辑模式 %1",
      "helpUrl": "",
      "colour": "#69b090",
      "arg0": [
        {
            "type": "field_input",
            "name": "mode",
            "text": "edit"
        }
      ],
      "type": "modeEdit",
      "canRun": true,
      "category": "Sensing"
  },
  {
      "func_description": "",
      "message0": "播放音符%1持续%2节拍",
      "canRun": true,
      "examples": [
        {
            "desc": "",
            "code": "while (true) do\n    playNote(\"1\", 0.5)\n    playNote(\"2\", 0.5)\n    playNote(\"3\", 0.5)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#8f6d40",
      "category": "Sound",
      "type": "playNote",
      "arg0": [
        {
            "type": "field_input",
            "name": "note",
            "text": "7"
        },
        {
            "type": "field_number",
            "name": "beat",
            "text": 0.25
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "",
      "message0": "播放背景音乐%1",
      "canRun": true,
      "examples": [
        {
            "desc": "播放音乐后停止",
            "code": "playMusic(\"2\")\nwait(5)\nplayMusic()\n",
            "canRun": true
        }
      ],
      "colour": "#8f6d40",
      "category": "Sound",
      "type": "playMusic",
      "arg0": [
        {
            "type": "field_input",
            "name": "filename",
            "text": "1"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "",
      "message0": "播放MP3音乐%1",
      "canRun": true,
      "examples": [
        {
            "desc": "播放音乐后停止",
            "code": "playSound(\"break\")\nwait(1)\nplaySound(\"click\")\n",
            "canRun": true
        }
      ],
      "colour": "#8f6d40",
      "category": "Sound",
      "type": "playSound",
      "arg0": [
        {
            "type": "field_input",
            "name": "filename",
            "text": "break"
        }
      ],
      "helpUrl": ""
  },
  {
      "func_description": "",
      "message0": "%1+%2",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "数字的加减乘除",
            "code": "say(\"1+1=?\")\nwait(1)\nsay(1+1)\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "addition",
      "helpUrl": "",
      "arg0": [
        {
            "type": "input_expression",
            "name": "left",
            "text": ""
        },
        {
            "type": "input_expression",
            "name": "right",
            "text": ""
        }
      ]
  },
  {
      "func_description": "",
      "message0": "随机选择从%1到%2",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "while(true) do\n    say(math.random(1,100))\n    wait(0.5)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "random",
      "helpUrl": "",
      "arg0": [
        {
            "type": "field_number",
            "name": "from",
            "text": "1"
        },
        {
            "type": "field_number",
            "name": "to",
            "text": "10"
        }
      ]
  },
  {
      "func_description": "",
      "message0": "%1==%2",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "比较两个数值",
            "code": "while(true) do\n    a = math.random(0,10)\n    if(a==0) then\n        say(a)\n    elseif(a<=3) then\n        say(a..\"<=3\")\n    elseif(a>6) then\n        say(a..\">6\")\n    else\n        say(\"3<\"..a..\"<=6\")\n    end\n    wait(2)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "equal",
      "helpUrl": "",
      "arg0": [
        {
            "type": "input_expression",
            "name": "left",
            "text": ""
        },
        {
            "type": "input_expression",
            "name": "right",
            "text": ""
        }
      ]
  },
  {
      "func_description": "",
      "message0": "%1 与 %2",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "同时满足条件",
            "code": "while(true) do\n    a = math.random(0,10)\n    if(3<a and a<=6) then\n        say(\"3<\"..a..\"<=6\")\n    else\n        say(a)\n    end\n    wait(2)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "and",
      "helpUrl": "",
      "arg0": [
        {
            "type": "input_expression",
            "name": "left",
            "text": ""
        },
        {
            "type": "input_expression",
            "name": "right",
            "text": ""
        }
      ]
  },
  {
      "func_description": "",
      "message0": "%1 或 %2",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "左边或右边满足条件",
            "code": "while(true) do\n    a = math.random(0,10)\n    if(a<=3 or a>6) then\n        say(a)\n    else\n        say(\"3<\"..a..\"<=6\")\n    end\n    wait(2)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "or",
      "helpUrl": "",
      "arg0": [
        {
            "type": "input_expression",
            "name": "left",
            "text": ""
        },
        {
            "type": "input_expression",
            "name": "right",
            "text": ""
        }
      ]
  },
  {
      "func_description": "",
      "message0": "不满足%1",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "是否不为真",
            "code": "while(true) do\n    a = math.random(0,10)\n    if((not (3<=a)) or (not (a>6))) then\n        say(\"3<\"..a..\"<=6\")\n    else\n        say(a)\n    end\n    wait(2)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "not",
      "helpUrl": "",
      "arg0": [
        {
            "type": "input_expression",
            "name": "left",
            "text": ""
        }
      ]
  },
  {
      "func_description": "",
      "message0": "连接字符串%1和%2",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "say(\"hello \"..\"world\"..\"!!!\")\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "join",
      "helpUrl": "",
      "arg0": [
        {
            "type": "field_input",
            "name": "left",
            "text": "hello"
        },
        {
            "type": "field_input",
            "name": "right",
            "text": "world"
        }
      ]
  },
  {
      "func_description": "",
      "message0": "字符串%1的长度",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "say(\"length of hello is \"..(#\"hello\"));\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "lengthOf",
      "helpUrl": "",
      "arg0": [
        {
            "type": "field_input",
            "name": "left",
            "text": "hello"
        }
      ]
  },
  {
      "func_description": "",
      "message0": "%1模%2",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "say(\"66%10==\"..(66%10))\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "mod",
      "helpUrl": "",
      "arg0": [
        {
            "type": "field_number",
            "name": "left",
            "text": "66"
        },
        {
            "type": "field_number",
            "name": "right",
            "text": "10"
        }
      ]
  },
  {
      "func_description": "",
      "message0": "四舍五入取整%1",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "while(true) do\n    a = math.random(0,10) / 10\n    b = math.floor(a+0.5)\n    say(a..\"=>\"..b)\n    wait(2)\nend\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "round",
      "helpUrl": "",
      "arg0": [
        {
            "type": "field_number",
            "name": "left",
            "text": 5.5
        }
      ]
  },
  {
      "func_description": "",
      "message0": "开根号%1",
      "category": "Operators",
      "output": { "type": "field_number" },
      "examples": [
        {
            "desc": "",
            "code": "say(\"math.sqrt(9)==\"..math.sqrt(9), 1)\nsay(\"math.cos(1)==\"..math.cos(1), 1)\nsay(\"math.abs(-1)==\"..math.abs(1), 1)\n",
            "canRun": true
        }
      ],
      "colour": "#569138",
      "canRun": false,
      "type": "math.sqrt",
      "helpUrl": "",
      "arg0": [
        {
            "type": "field_number",
            "name": "left",
            "text": 9
        }
      ]
  }
]