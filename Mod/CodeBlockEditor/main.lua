--[[
Title: 
Author(s): leio
Date: 2018/6/19
Desc: 
use the lib:
------------------------------------------------------------
NPL.load("(gl)Mod/CodeBlockEditor/main.lua");
local CodeBlockEditor = commonlib.gettable("Mod.CodeBlockEditor");
    ------------------------------------------------------------
]]
local CodeBlockEditor = commonlib.inherit(commonlib.gettable("Mod.ModBase"),commonlib.gettable("Mod.CodeBlockEditor"));

function CodeBlockEditor:ctor()
end

-- virtual function get mod name

function CodeBlockEditor:GetName()
    return "CodeBlockEditor"
end

-- virtual function get mod description 

function CodeBlockEditor:GetDesc()
    return "CodeBlockEditor is a plugin in paracraft"
end

function CodeBlockEditor:init()
    LOG.std(nil, "info", "CodeBlockEditor", "plugin initialized");
end

function CodeBlockEditor:OnLogin()
end
-- called when a new world is loaded. 

function CodeBlockEditor:OnWorldLoad()
end
-- called when a world is unloaded. 

function CodeBlockEditor:OnLeaveWorld()
end

function CodeBlockEditor:OnDestroy()
end

function CodeBlockEditor:handleMouseEvent(event)
end

function CodeBlockEditor:handleKeyEvent(event)
end