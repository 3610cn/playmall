define(function (require) {

    var InputControl = require('esui/InputControl');
    var Panel = require('esui/Panel');
    var u = require('underscore');
    var $ = require('jquery');
    var lib = require('esui/lib');
    var esui = require('esui/main');
    var eoo = require('eoo');

    var exports = {};

    var ImageList = eoo.create(
        InputControl,
        {
            /**
             * 控件类型，始终为`"ImageList"`
             *
             * @type {string}
             * @override
             */
            type: 'ImageList',

            constructor: function(options) {

                this.$super(arguments);

                // 存储上一次控件的值
                this.lastValue = '';
            },

            initStructure: function(main) {
                this.$super(arguments);

                if (!this.name) {
                    this.name = this.main.getAttribute('name') || '';
                }

                this.disposeChildren();
                this.main.innerHTML = '';

                var datasource = this.datasource;
                if (!datasource || !datasource.length) {
                    return;
                }

                var name = this.name + new Date().getTime().toString(32);
                var value = this.value || (this.defaultFirst && datasource[0].value) || '';
                this.lastValue = value;

                if (!name) {
                    throw new Error("can't find name");
                }

                for (var i = 0; i < datasource.length; i++) {
                    addChild.call(this, datasource[i]);
                }

            },

            initEvents: function() {
                this.$super(arguments);

                var me = this;

                // 删除
                $(this.main).on(
                    'click',
                    function (event) {
                        if ($(event.target).is('.close-button')) {
                            var itemClass = me.helper.getPartClassName('item');
                            $(event.target).parent('.' + itemClass).remove();
                        }
                    }
                )
            },

            repaint: require('esui/painters').createRepaint(
                InputControl.prototype.repaint,
                {
                    name: ['rawValue'],
                    paint: function (imageList, text) {
                    }
                }
            ),

            getRawValue: function() {
                var result = [];
                $(this.main).children().each(
                    function (index, node) {
                        result.push($(node).attr('value'));
                    }
                );
                return result.join(',');
            },

            addItem: function(datasourceItem) {
                addChild.call(this, datasourceItem);
            },

            getCount: function() {
                if (!this.children) {
                    return 0;
                } else {
                    return this.children.length;
                }
            },

            dispose: function() {
                for (var i = 0; i < this.getCount(); i++) {
                    this.children[i].onclick = null;
                }

                this.$super(arguments);
            }
        }
    );

    var tpl = [
        '<div class="${classes}" id="${id}" value="${value}">',
        '${content}',
        '<div class="ui-icon close-button"></div>',
        '</div>'
    ].join('');


    function addChild(item) {

        var customClass = item.customClass;
        customClass = customClass ? ' ' + customClass : '';

        var selectedClass = item.value === this.rawValue
            ? ' ' + this.helper.getPartClassName('selected') : '';
        customClass += selectedClass;

        $(this.main).append(
            lib.format(
                tpl,
                {
                    classes: this.helper.getPartClassName('item') + customClass,
                    content: item.content,
                    value: item.value
                }
            )
        );
    }

    function removeChild(event) {
    }

    esui.register(ImageList);
    return ImageList;
});
