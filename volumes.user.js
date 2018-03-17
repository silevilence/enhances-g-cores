// ==UserScript==
// @name         g-cores-volumes
// @name:zh-cn   机核电台页面增强
// @namespace    https://github.com/silevilence/enhances-g-cores
// @version      1.0
// @description  add functions to volumes page of g-cores
// @description:zh-cn  在机核的电台页面上增加（大概）有用的功能
// @author       Silevilence
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js
// @match        http*://www.g-cores.com/volumes/*
// ==/UserScript==

(function () {
    'use strict';

    // 链接调用的总方法，点击后获取所有时间轴图片地址并在新页面展示
    // noinspection ES6ConvertVarToLetConst, JSUnusedLocalSymbols
    var show_img_urls = function () {
        // 首先获取时间轴的图片（在class为audio_dot_img的div下）
        // 根据播放进度有textarea和img的区别，需要全部获取并整合
        // 最后需要加上题图（img.img-responsive）
        let divs = $('div.audio_dot_img');

        // img in textarea
        // noinspection JSValidateTypes
        let textareas = divs.children('textarea');
        // get img urls
        // img标签以文本的方式放在textarea中，取出文本后用引号分割来获取url
        let urls = textareas.map(function () {
            return $(this).text().split(/['"]+/)[1];
        });

        // img in img
        // 已播放前后的图片被解析为img标签，直接获取即可
        // noinspection JSValidateTypes
        let imgs = divs.children('img');
        for (let i of imgs) {
            urls.push(i.attr('src'));
        }

        // 题图
        urls.push($('img.img-responsive').attr('src'));

        // remove _limit in url
        let urls_modified = $.map(urls, function (value) {
            return value.split('_limit').join('');
        });

        // open new tab and show urls
        let str = ['<pre>', urls_modified.join('\n'), '</pre>'];
        let win = window.open('', '_blank');
        win.document.write(str.join('\n'));
    };

    // generate element a and set it to show urls in new tab
    // element a
    let download_link = document.createElement('a');
    // set href to show img urls
    $(download_link).attr('href', 'javascript:show_img_urls();');
    // set contents of element
    $(download_link).html(`<span class="fa fa-download"></span>
    时间轴图片下载`);
    // append element to div
    $('p.story_actions').append(download_link);
})();