/**
 * ADM 2.0
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file UMEditor控件
 * @author maoquan(maoquan0515@163.com)
 */
define(
    function (require) {
        var lib = require('esui/lib');
        var helper = require('esui/controlHelper');
        var InputControl = require('esui/InputControl');

        /**
         * UMEditor控件
         *
         * @param {Object=} options 初始化参数
         * @extends esui/InputControl
         * @constructor
         */
        function UMEditor(options) {
            InputControl.apply(this, arguments);
        }

        UMEditor.prototype.type = 'UMEditor';

        UMEditor.prototype.styleType = 'UMEditor';

        // UMEditor实例
        UMEditor.prototype.editor = null;

        function initEditor() {
            var frame = this.main.firstChild;
            this.editor = frame.contentWindow.editor;
            var me = this;
            this.editor.addListener(
                'ready',
                function (editor) {
                    me.editor.setContent(me.content || '');
                    me.editor.setHeight(me.height * 0.8);
                }
            );
        }

        /**
         * 初始化DOM结构
         *
         * @protected
         * @override
         */
        UMEditor.prototype.initStructure = function () {
            this.main.innerHTML = '<iframe id="umeditor" src="/ueditor.html" width="' + this.width + '" height="' + this.height + '" vspace="0" hspace="0" allowTransparency="true" scrolling="no" marginWidth="0" marginHeight="0" frameborder="0" style="border:0; vertical-align:bottom; margin:0; display:block;"></iframe>';
            helper.addDOMEvent(this, this.main.firstChild, 'load', initEditor);
        }

        /**
         * 初始化参数
         *
         * @param {Object=} options 构造函数传入的参数
         * @override
         * @protected
         */
        UMEditor.prototype.initOptions = function (options) {
            var properties = {};
            lib.extend(properties, options);
            this.setProperties(properties);
        };

        var paint = require('esui/painters');
        /**
         * 渲染自身
         *
         * @override
         * @protected
         */
        UMEditor.prototype.repaint = helper.createRepaint(
            InputControl.prototype.repaint
        );

        UMEditor.prototype.getRawValue = function () {
            if (this.editor) {
                return this.editor.getContent();
            }
            return null;
        };

        lib.inherits(UMEditor, InputControl);
        require('esui').register(UMEditor);
        return UMEditor;
    }
);
