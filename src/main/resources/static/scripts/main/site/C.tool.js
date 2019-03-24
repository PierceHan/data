var Tool = null
define(function (require, exports, module) {
    Tool = function (opts) {
        this.opts = opts || {};

        /*
         * 去掉年份 形如：2015-3-01/2005-12-22 | 2015-3-04 00:00:00 | 2015-3-04 | 2015-3
         * param str: 字符串
         * param sp: 分隔符
         */
        this.cutYear = function (str, sp) {
            try {
                var tmp = str.match(/\//g) || [];
                sp = sp || tmp.length > 1 ? '-' : '\/';
                var s = str.split(sp);
                return strToDate(s[0]).format('mm-dd') + (s[1] ? (sp + strToDate(s[1]).format('mm-dd')) : '');
            } catch (e) {
                //console.log('Date is not Available');
                return str;
            }
        };

        /*
         * 显示提示内容
         * param objs: 容器对象(组)
         * param type: 类型 loading|load-err
         * param opts.height: 高度，默认400px
         * param opts.msg: 提示内容
         */
        this.showStatus = function (objs, type, opts) {
            opts = opts || {};

            $.each(objs, function (k, obj) {
                var isTable = $(obj).closest('table').length > 0 ? true : false,
                    tableOpen = parseInt($(obj).height()) > $(obj).closest('.charts_box').height(), // table是否展开
                    height = opts.height || (isTable ? (tableOpen ? $(obj).closest('.charts_box').height() : ($(obj).height() > 10 ? $(obj).height() : '33px')) : ($(obj).height() || $(obj).parent().height() || '400px'));

                if (type == 'error') {
                    height = !isTable ? height : '33px';
                    $(obj).empty();
                } else {
                    $(obj).find('[class^=load]').remove();
                }

                msg = getMsg($(obj), parseInt(height), isTable, opts.msg);

                if ($(obj).children(':eq(0)').length > 0) {
                    $(obj).children(':eq(0)').before(msg);
                } else {
                    $(obj).html(msg);
                }

                $(obj).children(':eq(0)');
            });

            function getMsg(o, h, it, m) {
                m = type == 'loading' ? ('<div class="loading" style="height: ' + h + 'px;line-height: ' + h + 'px"></div>') : ('<div class="load-err" style="height: ' + h + 'px;line-height: ' + h + 'px"><div><span><e>' + (m || '查询无数据，请更改查询条件') + '</e></span><img src="img/v2/' + (h > 256 ? 'no-data.jpg' : 'no-data-tb.jpg') + '"></div>' + '</div>');
                if (it) {
                    var sum = 0;
                    $.each(o.closest('table').find('tr:eq(0)').find('th,td'), function () {
                        sum += $(this).attr('colspan') * 1 || 1;
                    })
                    m = '<tr class="load_tb" style="border: 1px solid #fff;"><td style="border: 1px solid #fff;padding: 0;" colspan="' + sum + '">' + m + '</td></tr>';
                }
                return m;
            }
        };

        /*
         * string转日期 形如：2015-3-01|2015/3/4|2015-4
         *
         */
        function strToDate(d) {
            d = d.replace(/\-/g, '\/');
            var t = d.split('\/');

            if (t.length < 3) {
                return d;
            } else {
                return new Date(d);
            }
        };


    }

    Tool.prototype = {

        /*
         * 保留2位小数
         *
         */
        cut2Dec: function (s) {
            s = (s || '0') + '';
            if (s.indexOf('.') < 0) {
                return s;
            }
            return s.substr(0, s.indexOf('.') + 3);
        },

        /*
         * 添加（%）
         *
         */
        addPercent: function (s) {
            return (s ? s : '0') + '%';
        },

        /*
         * 封装table内容
         * ret : {} || {LIST: {}, ORDER:[]}
         * 内容 rule : [{
         *   index: [1,2,3],
         *    callback: function(v){
         *        return v + '%';
         *    }
         * }];
         * 样式规则 style : [{
         *   index: [1,2,3],
         *   style: 'width:90px',
         *   class: 'className'
         * }];
         */
        initTable: function (ret, rule, styles) {
            var res = ["<tr>"],
                rule = rule || [],
                styles = styles || [],
                i = 0;

            var list = ret.ORDER ? ret.ORDER : ret;
            jQuery.each(list, function (k, _v) {
                var v = ret.ORDER ? ret.LIST[_v] : _v;
                jQuery.each(rule, function (sy, cb) {
                    if (cb.index.indexOf(i) > -1) {
                        v = cb.callback.call(this, v);
                    }
                });
                var _style = '', _class = '';
                jQuery.each(styles, function (sr, sf) {
                    if (sf.index.indexOf(i) > -1) {
                        _style += sf.style ? sf.style + ';' : '';
                        _class += sf.class ? sf.class + ' ' : '';
                    }
                });
                if (v * 1 == v) {
                    v = Ctrip.parseNumber(v);
                }
                res.push('<td' + (_class ? ' class="' + _class + '"' : '') + (_style ? ' style="' + _style + '"' : '') + '>' + v + '</td>');
                i++;
            })
            res.push('</tr>')
            return res.join('');
        },

        /**
         * 接口空处理
         *
         */
        showNull: function (code) {
            code = code || 'Other';
            if (jQuery('.no-data').length > 0) return;
            var errCode = {
                'A0000': '成功',
                'B0000': '查询无数据',
                'E0000': '服务器未知错误',
                'Other': '请重试'
            };
            jQuery('.data-box').append('<span class="no-data">' + (errCode[code] ? errCode[code] : code) + '</span>');
            setTimeout(function () {
                jQuery('.no-data').remove();
            }, 5000);
        },

        /**
         * 数字输入限制
         *{target: objs,type:number|pocy|other,values:[],decimal: 2, max:最大值}
         */
        limitKeys: function (opts, callback) {
            opts = opts || {};
            var type = opts.type || 'number',
                max = opts.max || Number.MAX_VALUE,
                min = opts.min || 0,
                decimal = opts.decimal || null;
            var which_allow = [37, 39, 86, 8, 9, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
            if (min < 0) {
                which_allow = which_allow.concat([109, 189]);
            }
            if (type == 'pocy') {
                which_allow = which_allow.concat([190, 110]);
            } else if (type == 'other') {
                which_allow = opts.values;
            }
            $(opts.target).on('keydown', function (e) {
                if (which_allow.indexOf(e.which) == -1) {
                    e.preventDefault();
                }
                else if ((e.which == 110 || e.which == 190) && $(this).val().indexOf('.') > -1 || e.which == 86 && !e.ctrlKey) {
                    e.preventDefault();
                } else if (min < 0 && (e.which == 109 || e.which == 189) && $(this).val().indexOf('-') > -1) {
                    e.preventDefault();
                } else if (decimal && (e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 105) && new RegExp('\\.[0-9]{' + decimal + '}').test($(this).val())) {
                    e.preventDefault();
                }
            }).on('keyup', function (e) {
                if (e.which == 37 || e.which == 39) { return; }//释放箭头方向键
                $(this).val($(this).val().replace(/\,/g, ''))
                if ($(this).val() * 1 > max) {
                    $(this).val(max||'')
                }
                if ($(this).val() * 1 < min) {
                    $(this).val(min||'')
                }
            }).on('blur', function (e) {
                var flag = new Validate().checkNumber($(this), opts.msg || "请输入正确数字", 3, true).isVal();
                if (callback && flag) {
                    callback.call(this);
                }
            })
        },

        /**
         * 天数差
         * startDate：起始日期
         * endData：结束日期
         * type：返回类型（second，minute，hour，day）
         */
        timeSpan: function (startDate, endDate, type) {
            var type = type || 'day';
            var ts = new Date(endDate).getTime() - new Date(startDate).getTime();

            var result = 0;
            if (type == 'second') {
                result = ts / 1000;
            } else if (type == 'minute') {
                result = ts / (1000 * 60);
            } else if (type == 'hour') {
                result = ts / (1000 * 60 * 60);
            } else if (type == 'day') {
                result = ts / (1000 * 60 * 60 * 24);
            }

            return result;
        },

        /**
        * 百分数进度条
        * opts {title, obj, percent, color, width}
        * title 标题, obj 区域div , percent 百分比 , color 颜色, width 宽度, ext 单位, label 回调函数, indicator 指标
        */
        addPercentDiv: function (opts) {
            opts = opts || {};
            var indicator = opts.indicator || 100,
                percent = Math.round((opts.percent * 1 || 0) / indicator * 10000) / 100,
                label = opts.label ? opts.label(percent) : percent + (opts.ext || ''),
                color = opts.color || '',
                width = opts.width || '',
                str = ['<strong>', opts.title || '', '</strong>',
                        '<div class="ofl-progress" ', 'title="', label, '" style="', (width ? 'width: ' + width + ';' : ''), (color ? 'border: 2px solid ' + color + ';' : ''), '">',
                            '<span style="width: ', percent, '%;', (color ? 'background-color: ' + color + ';' : ''), '"></span>',
                            (function () {
                                if (percent > 40) {
                                    return '<label class="perct" style="width: ' + percent + '%;" js-text="box">' + label + '</label>';
                                }

                                return '<label style="color: ' + color + ';" js-text="box">' + label + '</label>';
                            })(),
                            '</label>',
                        '</div>'];

            $(opts.obj).html(str.join(''));
        }
    }

    return new Tool();
});
