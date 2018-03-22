// ==UserScript==
// @name         机核文章页视频自动隐藏
// @namespace    https://github.com/silevilence/enhances-g-cores
// @version      1.0
// @description  自动隐藏文章页面上的视频（被自动播放烦得不要不要的）
// @author       Silevilence
// @match        http*://www.g-cores.com/articles/*
// @supportURL   https://github.com/silevilence/enhances-g-cores/issues
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=silevilence@outlook.com&item_name=Greasy+Fork+donation
// ==/UserScript==

(function () {
    'use strict';

    // 获取所有iframe，每个iframe包含一个视频
    let videos = $('iframe');
    // 用each针对每个视频进行单独的隐藏处理，处理方式模仿机核的剧透隐藏功能
    videos.each(function () {
        // 获取父级div一边进行后续操作
        let div = $(this).parent();
        // 获取外层html并作为字符串保存在一个隐藏的textarea中
        let str = this.outerHTML;
        let textarea = document.createElement('textarea');
        // noinspection SpellCheckingInspection
        $(textarea).addClass('j_storyshow_textareaEmbed');
        $(textarea).hide();
        $(textarea).text(str);
        // 删除视频的iframe标签
        $(this).remove();
        // 生成一个显示隐藏内容的a标签
        let a = document.createElement('a');
        $(a).attr('href', 'javascript:;');
        $(a).text('这是插件自动隐藏的视频，点击以显示');
        // noinspection SpellCheckingInspection
        $(a).addClass('story_elem-embed_manual j_storyshow_showEmbed');
        // 设置a标签的点击事件，参考了机核本身的源码
        $(function () {
            $(a).click(function () {
                $(this).hide();
                // noinspection SpellCheckingInspection
                let e = $(this).siblings('.j_storyshow_textareaEmbed');
                e.replaceWith(e.val());
            });
        });
        // 对父级div通过前端插入的方式依次放入a和textarea
        div.prepend($(a));
        div.prepend($(textarea));
    });
})();