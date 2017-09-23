/**
 * loader(加载器)
 * @param _files 参数说明：加载的文件数组。
 * @param succes 参数说明：文件加载成功后的回调函数。
 * 依赖：jQuery
 * 说明：检查css、js是否加载，未加载则按文件数组顺序加载文件。
 * 作者：卓楠竣
 * 邮箱：znjmails@qq.com
 * 示例：
 * $.loader(['__ADMIN_JS__/apps.js', '__ADMIN_JS__/common.js?20170706'],function(){
 *      //这里写加载完成后需要执行的代码或方法
 * })
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
        loader: function(fileArray, succes) {
            // 查询文件是否已加载
            if(fileArray.length>0){
                // 未加载的文件
                var file_array = [];
                // 遍历判断是否已加载
                for (var item = 0; item < fileArray.length; item++){
                    var url = fileArray[item];
                    // 判断是js还是css
                    if(isContains(url, '.js')){
                        if ($("script[src='"+url+"']").length == 0){
                            file_array.push(url);
                        };
                    }else if(isContains(url, '.css')){
                        if ($("link[href='"+url+"']").length == 0){
                            file_array.push(url);
                        };
                    };
                };
            }else {
                succes();
            };
            // 如果有未加载的文件则加载新的文件，否则执行加载成功回调函数
            if(file_array.length>0){
                var loaded_count=0;
                for(var i=0;i< file_array.length;i++){
                    loadFile(file_array[i],function(){
                        loaded_count++;
                        if(loaded_count==file_array.length){
                            succes();
                        };
                    });
                };
            }else {
                succes();
            };
            /**
             * 加载JS文件
             * @param url: 文件路径
             * @param success: 加载成功回调函数
             */
            function loadFile(url, success) {
                var fileObj=null;
                if(isContains(url, '.js')){
                    fileObj=document.createElement('script');
                    fileObj.type = "text/javascript";
                    fileObj.src = url;
                }else if(isContains(url, '.css')){
                    fileObj=document.createElement('link');
                    fileObj.href = url;
                    fileObj.type = "text/css";
                    fileObj.rel="stylesheet";
                };
                // 文档加载完成后执行
                fileObj.onload = fileObj.onreadystatechange = function() {
                    //如果文件加载完成则执行回调函数
                    if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                        success();
                    }
                };
                // 将加载的文件标签插入head标签中
                document.getElementsByTagName('head')[0].appendChild(fileObj);
            };

            /**
             * 判断两个字符串是否为包含关系，如果是则返回true，否则返回false
             * @param str: 父字符串
             * @param substr: 子字符串
             */
            function isContains(str, substr) {
                return new RegExp(substr).test(str.toLowerCase());
            };
        }
    });
}));