# CodeBlockEditor
A blockly web editor for code block 
### Compatibility 
The attributes of definition below are different between npl and blockly json,
It is fixed with the BlocklyLoader.js
```
previousStatement = true -> previousStatement = null
nextStatement = true -> nextStatement = null
output = { type = "field_number" } -> output = "field_number"
output = { type = "null" } -> output = null
arg[0-9] -> args[0-9]

text -> value in "field_number"
```
### Links
 - [define-blocks](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks)
 -[createVariable](https://developers.google.com/blockly/reference/js/Blockly.Workspace#createVariable)
```lua
-- Loading the config source dynamically after running paracraft every time
http://localhost:8099/blockeditor

-- debug
-- Loading the static files which include menu_xml/config_json/execution_js from the folder of [BlocklySourceTemplate] to run blockly
http://localhost:8099/blockeditor?debug=true
-- english version
http://localhost:8099/blockeditor?debug=true&lang=en


-- save file
http://localhost:8099/blockeditor?filename=test/test_block.xml

```
### Preview
![image](https://user-images.githubusercontent.com/5885941/43708153-611999c6-999c-11e8-8232-bdee49664dc7.png)