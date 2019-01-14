/**
Author: leio
Date: 2018/12/19
*/
define([
    "js/Mod/CodeBlockEditor/blockly/BlocklySourceLoader",
], function (BlocklySourceLoader) {
    var BlocklySourceLoaderFactory = {}
    /**
     * Create a loader
     * @param {string} path 
     * @param {string} locale - "en" "zh_cn"
     * @param callback
     */
    BlocklySourceLoaderFactory.create = function (path, locale, callback) {
        // this is a fixed rule
        //var path = "text!app/blockly/" + type + "/" + type + ".config.json";
        require([path], function (data) {
            data = JSON.parse(data);
            var input = data[locale];
            if (input) {
                var loader = new BlocklySourceLoader(input);
                loader.load(function () {
                    callback && callback(loader);
                });
            }
        })
    }
    return BlocklySourceLoaderFactory;
})