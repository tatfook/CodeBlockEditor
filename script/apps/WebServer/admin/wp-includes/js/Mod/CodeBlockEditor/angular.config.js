/**
 * @author leio
 * @date 2018/6/21
 */
define([
    "jquery",
    "angular",
], function (jquery, angular) {
    var angularBootstrap = false;
    var app = angular.module("block_editor_app",[])
    app.run(function () {
        angularBootstrap = true;
    });
    app.registerController = app.controller;
    
    window.app = app;
    window.getUrlParameter = function (sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split("&"),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split("=");

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    
    return app;
})