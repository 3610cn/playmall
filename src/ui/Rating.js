/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file Rating, 评分控件
 * @author maoquan
 */
define(
    function (require) {
        var esui = require('esui');
        var $ = require('jquery');
        var u = require('underscore');
        var lib = require('esui/lib');
        var InputControl = require('esui/InputControl');
        var eoo = require('eoo');
        var painters = require('esui/painters');

        var ITEM_TPL = '<span index="${index}" class="${starClass}"></span>';

        /**
         * Rating
         *
         * @extends InputControl
         * @constructor
         */
        var Rating = eoo.create(
            InputControl,
            {

                constructor: function () {
                    this.$super(arguments);
                },

                /**
                 * 控件类型，始终为`"Rating"`
                 *
                 * @type {string}
                 * @readonly
                 * @override
                 */
                type: 'Rating',

                /**
                 * 初始化配置
                 *
                 * @protected
                 * @override
                 */
                initOptions: function (options) {
                    var properties = {
                    };
                    u.extend(properties, Rating.defaultProperties, options);

                    properties.name = properties.name || this.main.getAttribute('name');
                    this.setProperties(properties);
                },

                /**
                 * 初始化DOM结构
                 *
                 * @protected
                 * @override
                 */
                initStructure: function () {

                },

                /**
                 * 初始化事件交互
                 *
                 * @protected
                 * @override
                 */
                initEvents: function () {
                    var controlHelper = this.helper;
                    controlHelper.addDOMEvent(
                        this.main,
                        'click',
                        this.rate
                    );
                },

                /**
                 * 获取控件表单值
                 * @return {string} 组件的值
                 */
                getRawValue: function () {
                    return this.rawValue;
                },

                /**
                 * 重渲染
                 *
                 * @method
                 * @protected
                 * @override
                 */
                repaint: painters.createRepaint(
                    InputControl.prototype.repaint,
                    {
                        name: ['rawValue'],
                        paint: function (rating, rawValue) {
                            var html = [];
                            for (var i = 1; i <= rating.total; i++) {
                                var starClass = i <= rawValue ? 'ui-icon-star' : 'ui-icon-star-o';
                                html.push(
                                    lib.format(
                                        ITEM_TPL,
                                        {
                                            index: i,
                                            starClass: starClass
                                        }
                                    )
                                );
                            }
                            rating.main.innerHTML = html.join('');
                        }
                    }
                ),

                rate: function (e) {
                    var target = e.target;
                    var targetValue = parseInt($(target).attr('index'));
                    // 如果点击在当前已选中的星星上，则选中星星-1
                    if (targetValue === this.rawValue)  {
                        targetValue--;
                    }
                    this.setProperties(
                        {
                            rawValue: targetValue
                        }
                    );
                    e.preventDefault();
                }
            }
        );

        Rating.defaultProperties = {
            // 一共多少颗星
            total: 5
        };

        esui.register(Rating);
        return Rating;
    }
);
