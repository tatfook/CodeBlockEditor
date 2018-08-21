/**
 * @author leio
 * @date 2018/6/21
 */
"use strict";
(function (win) {

    define("load-string", [], function () {
        var strings = [],
            re_package_name = /^string_module_(\d+)$/;
        return {
            normalize: function (name, _) {
                if (re_package_name.test(name)) {
                    return name
                }
                var nml = "string_module_" + (strings.push(name) - 1);
                return nml;
            },
            load: function (name, _, onLoad, config) {
                if (re_package_name.test(name)) {
                    onLoad.fromText(strings[name.match(re_package_name)[1]]);
                } else {
                    onLoad.error("Invalid package name: ", name);
                }
            }
        }
    });

    requirejs.config({
        baseUrl: "/",
        paths: {
            "js": "wp-includes/js",
            "angular": "wp-includes/js/angular/angular.min",
            "jquery": "wp-includes/js/jquery/jquery.min",
            "domReady": "wp-includes/js/requirejs/domReady",
            "text": "wp-includes/js/requirejs/text",
            "vs": "wp-includes/js/monaco-editor-0.10.1/package/min/vs",
            "luaparse": "wp-includes/js/luaparse/luaparse",
            "LuaAstParser": "wp-includes/js/Mod/CodeBlockEditor/LuaAstParser",
        },
        shim: {
            "angular": {
                deps: ["jquery"],
                exports: "angular"
            }
        },
        waitSeconds: 10,
    });

    require(["domReady"], function (domReady) {
        domReady(function () {
            require(["angular", "js/Mod/CodeBlockEditor/CodeBlockEditorController"], function (angular, app) {
                angular.bootstrap(document, ["block_editor_app"]);


            });
        });
    });
})(window);