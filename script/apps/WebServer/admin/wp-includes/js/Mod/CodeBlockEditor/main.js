/**
 * @author leio
 * @date 2018/6/21
 */
"use strict";
(function (win) {
    requirejs.config({
        baseUrl: "/",
        paths: {
            "js": "wp-includes/js",
            "angular": "wp-includes/js/angular/angular.min",
            "jquery": "wp-includes/js/jquery/jquery.min",
            "domReady": "wp-includes/js/requirejs/domReady",
            "text": "wp-includes/js/requirejs/text",
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