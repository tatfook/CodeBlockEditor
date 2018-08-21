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
    -- add a menu item to NPL code wiki's "Tools:blockeditor"
	NPL.load("(gl)script/apps/WebServer/WebServer.lua");
	WebServer:GetFilters():add_filter( 'wp_nav_menu_objects', function(sorted_menu_items)
		sorted_menu_items[sorted_menu_items:size()+1] = {
			url="blockeditor",
			menu_item_parent="Tools",
			title="Code Block Editor",
			id="blockeditor",
		};
		return sorted_menu_items;
	end);
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