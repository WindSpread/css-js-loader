/**
 * loader(加载器)
 * @param url [array] 参数说明：查询的链接数组。
 * 依赖：jQuery
 * 说明：查询css、js是否加载，未加载则按参数顺序加载。
 * 注意：请将此插件放在一个单独的script标签中执行。
 * 作者：wind
 * 邮箱：znjmails@qq.com
 * 示例：
 * $.loader(['__ADMIN_JS__/apps.js', '__ADMIN_JS__/common.js?20170706'])
 */
;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    };
}(function ($) {
    $.extend({
        loader: function(url) {
            // 未加载的js链接数组
            var jsurl = [];
            var item = 0;
            var _item = 0;
            // 判断两个字符串是否为包含关系，如果是则返回true，否则返回false
            var isContains = function(str, substr) {
                return new RegExp(substr).test(str);
            };
            if(url.length>0){
                // 遍历判断是否已加载
                while (item < url.length){
                    var _url = url[item];
                    // 判断是js还是css
                    if(isContains(_url, '.js')){
                        if ($("script[src='"+_url+"']").length == 0){
                            jsurl.push(_url);
                        };
                    }else if(isContains(_url, '.css')){
                        if ($("link[href='"+_url+"']").length == 0){
                            jsurl.push(_url);
                        };
                    };
                    item++;
                };
            };
            if(jsurl.length>0){
                // 遍历加载
                while (_item < jsurl.length){
                    var _url = jsurl[_item]
                    // 判断是js还是css
                    if(isContains(_url, '.js')){
                        // 查询当前js所在的script标签
                        var script_dom = $("script")
                        var script_number = script_dom.length-1
                        var father_dom = $(script_dom[script_number])
                        // 在当前js所在的script标签之后加载所需js
                        father_dom.after('<script src="' + _url + '" type="text/javascript"></script>')
                    }else if(isContains(_url, '.css')){
                        // 查询当前js所在的script标签
                        var script_dom = $("script")
                        var script_number = script_dom.length-1
                        var father_dom = $(script_dom[script_number])
                        // 在当前js所在的script标签之后加载所需css
                        father_dom.after('<link href="' + _url + '" rel="stylesheet" />')
                    }
                    _item++;
                };
            };
        }
    });
}));