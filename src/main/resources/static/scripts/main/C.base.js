/**
 * 应用程序 基础
 * 介绍：用于存放全局公共方法、属性
 * Author xumb@Ctrip.com 2015-04-14 Copyright© 1999-2015, ctrip.com. All rights reserved
 * 依赖jQuery
 */
var Ctrip = {},
      console = console || { log: function () { } };

define(function (require, exports, module) {
    require('lib/echarts.lib');
    require('lib/mvc');

    Ctrip = {
        PARAM: {},//用于存储页面与页面之间数据
        DARANGE: {}, //用于存储各个系统可选择的时间范围
        From: {}, // 用于存储页面跳转来源
        USER: { Email: "", UserNumber: "", UserName: "", RealName: "" },
        userEid:'',
        AjaxList: {},
        // 加载JS方法
        LoadJS: function (url) {
            var _script = document.createElement('script');
            _script.type = 'text/javascript';
            _script.src = url;
            document.getElementById('ajax-content').appendChild(_script);
        },
        // 复制Object
        copyObject: function (_j, from) {
            try{
                $.each(from, function (k, v) {
                    _j[k] = v || _j[k];
                });
            } catch (e) {
                console.log(e);
            }
        },

        /**
         * 获取昨天日期
         */
        getYesterday: function () {
            var d = new Date();
            d.setDate(d.getDate() - 1);
            return d;
        },

        /**
         * 获取距离日期date最近的12个月
         */
        get12Month: function (maxdate, mindate) {
            return this._months({
                maxdate:maxdate, mindate: mindate,n:11
            });
        },

        _months: function (opts) {
            console.log(opts);
            var maxdate = opts.maxdate,
                mindate = opts.mindate,
                n = opts.n;
            if (typeof maxdate != "object") {
                maxdate = maxdate.replace(/\-/g, '\/');
                maxdate = new Date(maxdate);
            }
            maxdate = new Date(maxdate.format('yyyy-mm') + '-01');

            var months = [maxdate.format('yyyy-mm')];
            for (var i = 0; i < n; i++) {
                maxdate.setMonth(maxdate.getMonth() - 1);
                months.unshift(maxdate.format('yyyy-mm'));

                if (typeof mindate != 'undefined') {
                    if (typeof mindate != "object") {
                        mindate = mindate.replace(/\-/g, '\/');
                        mindate = new Date(mindate);
                    }
                    mindate = new Date(mindate.format('yyyy-mm') + '-01');
                    if (maxdate.format('yyyy-mm') == mindate.format('yyyy-mm')) {
                        break;
                    }
                }

            }

            return months;
        },
        /**
         * 获取今年日期
         */
        getYearMonth: function (maxdate, mindate) {
            var n = 11;
            if (typeof maxdate != "object") {
                maxdate = maxdate.replace(/\-/g, '\/');
                maxdate = new Date(maxdate);
                n = maxdate.getMonth();
            }

            return this._months({
                maxdate: maxdate, mindate: mindate, n: n
            });
        },
        
        getWatermarkUrl: function (el, bg, color, text, bgPos, bgSize, font) {
            //debugger;
            var baseUrl = '';
            var wdh = 400;
            var hgh = 280;
            if (font) {
                wdh = font[0];
                hgh = font[1];
            }
            var back = (bg == '') ? '' : bg;
            var baseTxt = (text=='')?this.userEid:text;
            var textcolor = (color == '') ? '#ffffff' : color;
            function convertImageToCanvas() {
                var canvas = document.createElement("canvas");
                canvas.width = wdh;
                canvas.height = hgh;
                var endX = 45;
                var endY = 38;
                var ctx = canvas.getContext("2d");
                ctx.beginPath();
                if (back != '') {
                    ctx.fillStyle = back;
                    ctx.fillRect(0, 0, wdh, hgh);
                }
                ctx.fillStyle = textcolor;
                ctx.font = "18pt 楷体";
                ctx.textAlign = "center";
                ctx.translate(endX, endY);
                ctx.rotate(Math.PI / 6);
                ctx.fillText(baseTxt, 0, 0);
                ctx.restore();
                return canvas.toDataURL("image/png")
            }
            //return convertImageToCanvas()
            $(el).css({ backgroundImage: "url(" + convertImageToCanvas() + ")", backgroundPosition: bgPos, backgroundSize: bgSize })
        },
        getEid: function () {
            var eid = '';
            var cookies = this.getCookie("Hdata");
            var cookieArr = cookies.split("&");
            console.log(cookieArr);
            for (var i = 0; i < cookieArr.length; i++) {
                var itemArr = cookieArr[i].split("=");
                if (itemArr[0] == 'UserNumber') {
                    eid = itemArr[1]
                }
            }
            this.userEid = eid
        },
        /**
         * 获取最近日期
         * {type,begin,end,max,LastDate}
         */
        getRecent: function (opts, callback) {
            opts = opts || 'week';
            opts = typeof opts == 'string' ? { type: opts } : (opts || {});
            if (opts.type == 'recentMonth') {
                this.getRecentMonth(opts, callback);
                return;
            }
            var $ = jQuery,
                type = (opts.type || 'week').toLowerCase(),
                $begin = $(opts.begin || '[js-time="begin"]'),
                $end = $(opts.end || '[js-time="end"]'),
                max = opts.max || null;

            var _s = max && new Date(max) < new Date() ? new Date(max) : new Date(),
                _e = max && new Date(max) < new Date() ? new Date(max) : new Date();
            switch (type) {
                case 'week':
                    _s.setDate(_s.getDate() - 8);
                    break;
                case 'month':
                    _s.setMonth(_s.getMonth() - 1);
                    break;
                case 'month2':
                    _s.setMonth(_s.getMonth() - 2);
                    break;
                case 'quota':
                    _s.setMonth(_s.getMonth() - 3);
                    break;
                case 'halfyear':
                    _s.setMonth(_s.getMonth() - 6);
                    break;
                case 'days':
                    var wd = opts.today || false,
                        d = opts.days * 1 ? opts.days * 1 + 1 : 1;
                    _s.setDate(_s.getDate() - (opts.days * 1 || 1));
                    break;
                case 'lastday':
                    _s.setDate(_s.getDate());
                    break;
                case 'nextweek':
                    _s.setDate(_s.getDate() + 1);
                    _e.setDate(_e.getDate() + 9);
                    break;
                case 'week-7':
                    _s.setDate(_s.getDate() - 7);
                    break;
                default:
                    _s.setDate(_s.getDate() - 8);
            }
            $begin.val(_s.format('yyyy-mm-dd')).css('color', '');
            if (!opts.LastDate)
                _e.setDate(_e.getDate() - 1);
            $end.val(_e.format('yyyy-mm-dd')).css('color', '');

            callback && callback();
        },
        //initVisualizationTable: function (resault) {
        //    if(!resault.columnData){
        //        console.error('缺少关键的列名以及筛选项，此为必选项：columnData[{...},{},{}...]')
        //    }else{
        //        var column= resault.columnData;
        //    }
        //    var data = 
        //        {
        //          supportRemind: true
        //        , height: 'auto'
        //        , i18n: 'zh-cn'
        //        , textConfig: {
        //            'page-go': {
        //                'zh-cn': '跳转',
        //                'en-us': 'Go '
        //            }
        //        }
        //        , supportSetTop: false
        //        , gridManagerName: resault['name'].split('=')[1]
        //        , disableCache: true  //是否禁用记忆功能
        //        , disableOrder: false
        //        , supportSorting: true
        //        , supportCheckbox: false  //是否禁用全选
        //        , supportDrag: true
        //        , supportAjaxPage: false
        //        , emptyTemplate: '<div class="gm-emptyTemplate">什么也没有</div>'
        //        , ajax_data: {data:[]}
        //        , isCombSorting: false
        //        //, pageSize: 20
        //        //, query: { ex: '用户自定义的查询参数,格式:{key:value}' } //ajax请求的参数
        //        , columnData:column
        //        , pagingAfter: function (query) {
        //            console.log('Event: 分页后', query);
        //            resault.pagingAfter&&resault.pagingAfter(query)
        //        }
        //        , sortingAfter: function (query) {
        //            console.log('Event: 排序后', query);
        //            resault.sortingAfter&&resault.sortingAfter(query)
        //        }
                
        //        }
        //    $.each(resault['data'], function (k,v) {
        //        data[k] = v;
        //    })
        //    var table = document.querySelector(resault['name']);
        //    table.GM('init',data, function (query) {
        //        // 渲染完成后的回调函数
        //        console.log(query);
        //    });

        //    <div calss="">
        //                <button style="background:#1984B6;color:#fff;border:1px solid #1984B6;margin:4px;" class="" id="tableFilterBtn">自定义字段</button>
        //                <button style="background:#8BC34A;color:#fff;border:1px solid #8BC34A;margin:4px;border-radius:5px;display:none;" class="" id="tableFilterAllBtn">全选</button>
        //                <button style="background:#F44336;color:#fff;border:1px solid #F44336;margin:4px;border-radius:5px;display:none;" class="" id="tableFilterNoBtn">清空</button>
        //            </div>
        //},
        //setTableHideCol: function () {

        //},
        //setTableShowCol: function () {

        //},
        /**
         * 初始化日期，（当天在本月大于20号，选中本月1号-今，否则选中上月1-30号）
         * param: _str 字符串或数字
         * 
         */
        getRecentMonth: function (opts, callback) {
            opts = opts || {};
            var max = opts.max || null,
                $begin = $('[js-time="begin"]'),
                $end = $('[js-time="end"]'),
                _s = max && (new Date(max) < new Date()) ? new Date(max) : new Date(),
                _e = max && (new Date(max) < new Date()) ? new Date(max) : new Date();

            if (typeof opts == 'object') {
                $begin = $(opts.begin || $begin);
                $end = $(opts.end || $end);
            }

            if (_e.getDate() >= 20) {
                _s.setDate(1);
            } else {
                _s.setMonth(_s.getMonth() - 1);
                _s.setDate(1);
                _e.setDate(0);
            }
            $begin.val(_s.format('yyyy-mm-dd'));
            $end.val(_e.format('yyyy-mm-dd'));

            callback && callback();
        },

        /**
         * 格式化大数字 加,千分位
         * param: _str 字符串或数字
         * param: n 保留小数点位数
         */
        parseNumber: function (_str, n) {
            try {
                _str = _str || '0';
                n = !isNaN(n * 1) ? n * 1 : 2; // 保留有数字位数
                var mark = _str * 1 >= 0 ? '' : '-', // 正负数
                    str = (_str + '').indexOf('.') > 0 ? (Math.abs((_str * 1).toFixed(n)) + '') : Math.abs(_str) + ''; // 保留有效数字的绝对值

                var res = str.indexOf('.') > 0 ? '.' + str.replace(/^[\S\s]*\./, '') : '', // 小数部分
                    src = str.replace(/\.[\S\s]*$/, ''); // 整数部分

                if (src.length < 3) {
                    src = src;
                } else if (src.length % 3 == 0) {
                    src = src.match(/[0-9]{3}/g).join(',');
                } else {
                    src = src.substr(0, src.length % 3) + ',' + src.substr(src.length % 3).match(/[0-9]{3}/g).join(',');
                }

                return mark + src + res;
            } catch (e) {
                return _str;
            }
        },

        /**
         * 格式化大数字 加万、亿
         * param: str 字符串或数字
         * param: n 保留小数点位数
         * param: unit 是否有单位
         */
        addUnit: function (str, n, unit) {
            n = !isNaN(n * 1) ? n * 1 : 1;
            try {
                str = str * 1 || 0,
                _ext = str >= 0 ? '' : '-';
                str = Math.abs(str);
                if (str >= 100000000) {
                    str = Math.round(str / 100000000 * Math.pow(10, n)) / Math.pow(10, n) + (typeof unit != 'undefined' ? unit : '亿');
                    //} else if (str >= 10000000) {
                    //    str = Math.round(str / 1000000) + '百万';
                } else if (str >= 10000) {
                    str = Math.round(str / 10000 * Math.pow(10, n)) / Math.pow(10, n) + (typeof unit != 'undefined' ? unit : '万');
                } else if (str >= 1000) {
                    str = Math.round(str);
                } else {
                    str = this.parseNumber(str, n);
                }
            } catch (e) {
            }
            return _ext + str;
        },
        addUnit10: function (str, n, unit) {
            n = !isNaN(n * 1) ? n * 1 : 1;
            var isCNLang = (window.location.href.indexOf("_CN") != -1) ? true : false;
            try {
                str = str * 1 || 0,
                _ext = str >= 0 ? '' : '-';
                str = Math.abs(str);
                if (isCNLang) {
                    var keep = n || 1;
                    if (str >= 100000000) {                        
                        str = Math.round(str / 100000000 * Math.pow(10, keep)) / Math.pow(10, keep) + (typeof unit != 'undefined' ? unit : '亿');
                        //} else if (str >= 10000000) {
                        //    str = Math.round(str / 1000000) + '百万';
                    } else if (str >= 10000) {
                        str = Math.round(str / 10000 * Math.pow(10, keep)) / Math.pow(10, keep) + (typeof unit != 'undefined' ? unit : '万');
                    } else if (str >= 1000) {
                        str = Math.round(str);
                    } else {
                        str = this.parseNumber(str, n);
                    }
                } else {
                    var keep = n || 1;
                    if (str >= 1000000) {
                        str = Math.round(str / 1000000 * Math.pow(10, keep)) / Math.pow(10, keep) + (typeof unit != 'undefined' ? unit : 'M');
                        //} else if (str >= 10000000) {
                        //    str = Math.round(str / 1000000) + '百万';
                    } else if (str >= 10000) {
                        str = Math.round(str / 1000 * Math.pow(10, keep)) / Math.pow(10, keep) + (typeof unit != 'undefined' ? unit : 'K');
                    } else if (str >= 1000) {
                        str = Math.round(str);
                    } else {
                        str = this.parseNumber(str, keep);
                    }
                }
            } catch (e) {
            }
            return _ext + str;
        },
        /**
         * 英语格式化大数字 加thousand、million
         * param: str 字符串或数字
         * param: n 保留小数点位数
         * param: unit 是否有单位
         */
        addUnit_EN: function (str, n, unit) {
            n = !isNaN(n * 1) ? n * 1 : 1;
            try {
                str = str * 1 || 0,
                _ext = str >= 0 ? '' : '-';
                str = Math.abs(str);
                if (str >= 1000000) {
                    str = Math.round(str / 1000000 * Math.pow(10, n)) / Math.pow(10, n) + (typeof unit != 'undefined' ? unit : 'M');
                    //} else if (str >= 10000000) {
                    //    str = Math.round(str / 1000000) + '百万';
                } else if (str >= 10000) {
                    str = Math.round(str / 1000 * Math.pow(10, n)) / Math.pow(10, n) + (typeof unit != 'undefined' ? unit : 'K');
                } else if (str >= 1000) {
                    str = Math.round(str);
                } else {
                    str = this.parseNumber(str, n);
                }
            } catch (e) {
            }
            return _ext + str;
        },

        /**
         * 万、亿话数字还原
         * param: v 字符串
         */
        unitValue: function (v) {
            v = (v || "").replace(/\,/g, '');
            try {
                if (v.indexOf('亿') > -1) {
                    v = v.replace('亿', '') * 100000000
                    //} else if (v.indexOf('百万') > -1) {
                    //    v = v.replace('百万', '') * 1000000
                } else if (v.indexOf('万') > -1) {
                    v = v.replace('万', '') * 10000
                }
            } catch (e) {
            }
            return v * 1 || 0;
        },

        /**
         * 取大于数n的保留前两位后补充0的最小数（如1010，运算后1100）
         * param: n 字符串或数字
         * param: n 保留小数点位数
         */
        ceilNumber: function (n, m) {
            n = n * 1;
            if (isNaN(n)) return n;
            m = m * 1 == m ? m : 2;

            try {
                var mark = n >= 0 ? '' : '-', // 正负数
                    n = Math.abs(n);
                n = Math.ceil(n);
                var l = ('' + n).length;

                return 1 * (mark + (Math.ceil(n / Math.pow(10, l - m))) * Math.pow(10, l - m));
            } catch (e) {
                return n;
            }
        },
        drag:{

            class_name: null,  //允许放置的容器
            permit
                
              : false,	//是否允许移动标识

            _x: 0,             //节点x坐标
            _y: 0,			    //节点y坐标
            _left: 0,          //光标与节点坐标的距离
            _top: 0,           //光标与节点坐标的距离

            old_elm: null,     //拖拽原节点
            tmp_elm: null,     //跟随光标移动的临时节点
            new_elm: null,     //拖拽完成后添加的新节点

            //初始化
            init: function (className,changeEvent) {
                //debugger;
                //允许拖拽节点的父容器的classname(可按照需要，修改为id或其他)
                this.class_name = className;
                var self = this;
                //监听鼠标按下事件，动态绑定要拖拽的节点（因为节点可能是动态添加的）
                $(this.class_name).on('mousedown', 'ul li', function (event) {
                    //当在允许拖拽的节点上监听到点击事件，将标识设置为可以拖拽
                    self.permitDrag = true;
                    //获取到拖拽的原节点对象
                    self.old_elm = $(this);
                    //执行开始拖拽的操作
                    //debugger;
                    self.mousedown(event);
                    return false;
                });

                //监听鼠标移动
                $(document).mousemove(function (event) {
                    //判断拖拽标识是否为允许，否则不进行操作
                    if (!self.permitDrag) return false;
                    //执行移动的操作
                    self.mousemove(event);
                    return false;
                });

                //监听鼠标放开
                $(document).mouseup(function (event) {
                    //判断拖拽标识是否为允许，否则不进行操作
                    if (!self.permitDrag) return false;
                    //拖拽结束后恢复标识到初始状态
                    self.permitDrag = false;
                    //执行拖拽结束后的操作
                    self.mouseup(event, changeEvent);
                    return false;
                });

            },

            //按下鼠标 执行的操作
            mousedown: function (event) {

                //console.log('我被mousedown了');
                //1.克隆临时节点，跟随鼠标进行移动
                this.tmp_elm = $(this.old_elm).clone();

                //2.计算 节点 和 光标 的坐标
                this._x = $(this.old_elm).offset().left;
                this._y = $(this.old_elm).offset().top;

                var e = event || window.event;
                this._left = e.pageX - this._x;
                this._top = e.pageY - this._y;

                //3.修改克隆节点的坐标，实现跟随鼠标进行移动的效果
                $(this.tmp_elm).css({
                    'position': 'absolute',
                    'background-color': '#FF8C69',
                    'left': this._x,
                    'top': this._y,
                });

                //4.添加临时节点
                tmp = $(this.old_elm).parent().append(this.tmp_elm);
                this.tmp_elm = $(tmp).find(this.tmp_elm);
                $(this.tmp_elm).css('cursor', 'move');

            },

            //移动鼠标 执行的操作
            mousemove: function (event) {
                
                //console.log('我被mousemove了');

                //2.计算坐标
                var e = event || window.event;
                var x = e.pageX - this._left;
                var y = e.pageY - this._top;
                var maxL = $(document).width() - $(this.old_elm).outerWidth();
                var maxT = $(document).height() - $(this.old_elm).outerHeight();
                //不允许超出浏览器范围
                x = x < 0 ? 0 : x;
                x = x > maxL ? maxL : x;
                y = y < 0 ? 0 : y;
                y = y > maxT ? maxT : y;
                var self = this;
                //3.修改克隆节点的坐标
                $(this.tmp_elm).css({
                    'left': x,
                    'top': y,
                });

                //判断当前容器是否允许放置节点
                $.each($(this.class_name + ' ul'), function (index, value) {

                    //获取容器的坐标范围 (区域)
                    var box_x = $(value).offset().left;     //容器左上角x坐标
                    var box_y = $(value).offset().top;      //容器左上角y坐标
                    var box_width = $(value).outerWidth();  //容器宽
                    var box_height = $(value).outerHeight();//容器高

                    //给可以放置的容器加背景色
                    if (e.pageX > box_x && e.pageX < box_x - 0 + box_width && e.pageY > box_y && e.pageY < box_y - 0 + box_height) {

                        //判断是否不在原来的容器下（使用坐标进行判断：x、y任意一个坐标不等于原坐标，则表示不是原来的容器）
                        if ($(value).offset().left !== self.old_elm.parent().offset().left
                        || $(value).offset().top !== self.old_elm.parent().offset().top) {

                            $(value).css('background-color', '#FFEFD5');
                        }
                    } else {
                        //恢复容器原背景色
                        $(value).css('background-color', '#fff');
                    }

                });

            },

            //放开鼠标 执行的操作
            mouseup: function (event, changeEvent) {

                //console.log('我被mouseup了');
                //移除临时节点
                $(this.tmp_elm).remove();

                //判断所在区域是否允许放置节点
                var e = event || window.event;
                var self = this;
                $.each($(this.class_name + ' ul'), function (index, value) {

                    //获取容器的坐标范围 (区域)
                    var box_x = $(value).offset().left;     //容器左上角x坐标
                    var box_y = $(value).offset().top;      //容器左上角y坐标
                    var box_width = $(value).outerWidth();  //容器宽
                    var box_height = $(value).outerHeight();//容器高

                    //判断放开鼠标位置是否想允许放置的容器范围内
                    if (e.pageX > box_x && e.pageX < box_x - 0 + box_width && e.pageY > box_y && e.pageY < box_y - 0 + box_height) {

                        //判断是否不在原来的容器下（使用坐标进行判断：x、y任意一个坐标不等于原坐标，则表示不是原来的容器）
                        if ($(value).offset().left !== self.old_elm.parent().offset().left
                        || $(value).offset().top !== self.old_elm.parent().offset().top) {
                            //向目标容器添加节点并删除原节点
                            tmp = $(self.old_elm).clone();
                            var newObj = $(value).append(tmp);
                            $(self.old_elm).remove();
                            //获取新添加节点的对象
                            self.new_elm = $(newObj).find(tmp);
                            changeEvent && changeEvent();

                        }
                    }
                    //恢复容器原背景色
                    $(value).css('background-color', '#fff');
                });

            },

        },
        /**
         * 获取URL参数
         * 
         */
        getParameter: function (s) {
            //
;
            var url = location.href.split('?');
            if (url.length > 1) {
                url = location.href.split('?')[url.length-1];
            }else{
                url='';
            }
            var reg = new RegExp("(^|&)" + s + "=([^&]*)(&|$)", "i");
            var r = url.match(reg);

            if (r != null) {
                return unescape(r[2]);
            }

            return '';
        },

        /**
         * 获取模板
         * 
         */
        getTemplate: function (content, opts) {
            opts = opts || {};
            var txt = $(content).text();

            $.each(opts, function (k, v) {
                txt = txt.replace(new RegExp('{{' + k + '}}', "g"), v);
            })

            return txt;
        },

        /**
         * 设置COOKIE
         * key 设置key
         * v 设置cookie值
         * t 过期日期距离当前日期天数（可不传）
         */
        setCookie: function (k, v, t) {
            var d = new Date();
            if (t) {
                d.setDate(d.getDate() + t);
                document.cookie = k + "=" + v + ";expires=" + d.toGMTString();
            } else {
                document.cookie = k + "=" + v + ";";
            }

        },

        /**
         * 获取COOKIE
         * 
         */
        getCookie: function (k) {
            var strCookie = document.cookie;
            var arrCookie = strCookie.split(";");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split(/\=/);
                if (arr[0].replace(/^\s*|\s*$/g, '') == k)
                    return arrCookie[i].replace(new RegExp('^[\\S\\s]*' + k + '='), '');
            }
            return "";
        },

        /**
         * HTML5本地存储
         * 
         */
        setLocalSave: function (k, v) {
            var localSet = window.localStorage;
            if (localSet) {
                localSet.setItem(k, v);
            } else {
                this.setCookie(k, v);
            }
        },

        /**
         * 读取HTML5本地存储
         * 
         */
        getLocalSave: function (k) {
            var localSet = window.localStorage;
            if (localSet) {
                return localSet.getItem(k) || '';
            } else {
                return this.getCookie(k) || '';
            }
        },

        /**
         * 判断是否为空，为空返回true
         * 
         */
        isEmpty: function (svar) {
            switch (typeof svar) {
                case 'string':
                    if (svar != '') { return false }; break;
                case 'object':
                    for (var n in svar) { return false }; break;
                case 'boolean':
                    return svar; break;
                case 'undefined':
                    return true; break;
                case 'number':
                    if (svar) { return false }; break;
                default:
                    return false;
            }

            return true;
        },

        /**
         * 加载最大、最小日期
         * 
         */
        loadDateRange: function (data, callback) {
            var $ = jQuery,
                url = data.url || '',
                maxDate = data.maxDate || null,
                minDate = data.minDate || null,
                min_m = data.min_m || null;

            if (!url) {
                callback && callback();
                return;
            }
            try {
                var range_type = new Date().getDate() + encodeURI(JSON.stringify(data));
                data && delete data['url'];

                if (Ctrip.DARANGE[range_type]) {
                    setDate();
                    return;
                }
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: url,
                    data: $.extend({}, data),
                    success: function (data) {
                        if (data.code == 'A0001') {
                            Ctrip.DARANGE[range_type] = {
                                MAX: data.data["max_date"] && data.data["max_date"].replace(/\-/g, '\/') || maxDate || null,
                                MIN: data.data["min_date"] && data.data["min_date"].replace(/\-/g, '\/') || minDate || null,
                                MIN_M: data.data["min_m"] && data.data["min_m"].replace(/\-/g, '\/') || minDate || null
                            }
                            setDate();
                        }
                    },
                    error: function (data) {
                        console.log('ERR----', data);
                        callback && callback();
                    }
                });
            } catch (e) {
                callback && callback();
            }

            function setDate() {
                $(window).trigger('reset_time_picker', {
                    maxDate: Ctrip.DARANGE[range_type]['MAX'],
                    minDate: Ctrip.DARANGE[range_type]['MIN'],
                    min_m: Ctrip.DARANGE[range_type]['MIN_M']
                });
                callback && callback(Ctrip.DARANGE[range_type]);
            }
        },

        //消息弹层提示
        ShowMessage: function (msg, life, func) {
            msg = msg || '';
            if (!life) {
                var life = 2000;
            }

            if ($('#messageDiv').length == 0) {
                $('<div id="messageDiv"><span>' + msg + '</span></div>').appendTo('body');
            } else {
                $('#messageDiv').empty().append('<span>' + msg + '</span>');
            }

            $('#messageDiv').fadeIn('fast');

            setTimeout(function () {
                $('#messageDiv').fadeOut();
                func && func();
            }, life);
        },

        //错误消息弹层提示
        ShowError: function (msg, life, func) {
            this.ShowMessage(msg, life, func);
            $('#messageDiv span').addClass('error');
        },

        /**
         * 分页器
         * content 页面位置DOM
         * opts{total,current,perpage} total: 记录总条数,current: 当前页,perpage: 每页数据个数
         * callback 点击页面函数
         */
        Pager: function (content, opts, callback) {
            total = opts.total * 1 || 0,
            current = opts.current * 1 || 1,
            perpage = opts.perpage * 1 || 20;
            $(content).empty();
            var totalPage = Math.ceil(total / perpage),
                side = 3,
                ht = ['<div class="pager-box">'];
            if (totalPage <= 1) return;
            try {
                $(content).empty();
                if (current > 3) {
                    ht.push('<a data-page="1" _ping_back_="page" href="javascript:void(0);" title="第一页">&lt;&lt;</a><a _ping_back_="page" data-page="' + (current - 1) + '" href="javascript:void(0);" title="上一页">&lt;</a>');
                }
                if (totalPage >= current) {
                    for (var i = (current - side > 1 ? current - side : 1) ; i <= (current + side > totalPage ? totalPage : current + side) ; i++) {
                        if (i == current) {
                            ht.push('<span data-page="' + i + '" class="current" href="javascript:void(0);" title="第' + i + '页">' + i + '</span>');
                        } else {
                            ht.push('<a data-page="' + i + '" _ping_back_="page" href="javascript:void(0);"  title="第' + i + '页">' + i + '</a>');
                        }
                    }
                }
                if (totalPage > current + side) {
                    ht.push('<a data-page="' + (current + 1) + '" _ping_back_="page" href="javascript:void(0);" title="下一页">&gt;</a><a _ping_back_="page" data-page="' + totalPage + '" href="javascript:void(0);" title="尾页">&gt;&gt;</a>');
                }

            } catch (e) {
                console.log('err---', e);
            }

            ht.push('</div>');
            $(content).html(ht.join(''));
            $(content).find('a[data-page]').click(function (e) {
                var slf = this;
                if ($(this).hasClass("current")) return;
                setTimeout(function () {
                    callback && callback($(slf).data('page'));
                }, 30)
            })
        },

        /**
         * 自动滚动增加数字
         * count 增加幅度
         * callback 回调
         */
        rollNumber: function (count, callback) {
            if (count == 0) {
                Ctrip.time_adder && clearTimeout(Ctrip.time_adder);
                return;
            }
            var step = 1;

            if (count > 10000) {
                step = 10000;
            } else if (count > 1000) {
                step = 1000;
            } else if (count > 100) {
                step = 100;
            } else if (count > 10) {
                step = 10;
            } else if (count < 0) {
                step = count;
            }
            count = count - step;
            callback && callback(step);
            Ctrip.time_adder = setTimeout(function () {
                Ctrip.rollNumber(count, callback);
            }, 250);
        },

       /*jquery.format调用方法 
            var text = "a{0}b{0}c{1}d\nqq{0}"; 
            var text2 = $.format(text, 1, 2); 
            alert(text2); 
        */
        format : function (source, params) { 
            if (arguments.length == 1) 
                return function () { 
                    var args = $.makeArray(arguments); 
                    args.unshift(source); 
                    return $.format.apply(this, args); 
                }; 
            if (arguments.length > 2 && params.constructor != Array) { 
                params = $.makeArray(arguments).slice(1); 
            } 
            if (params.constructor != Array) { 
                params = [params]; 
            } 
            $.each(params, function (i, n) { 
                source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n); 
            }); 
            return source; 
        },
        /**
         * checkbox全选单选
         * allBtn 全选按钮
         * list 所有涉及的复选框
         */
        // 
        bindCheck: function(allBtn, list){
            $(list).change(function () {
                if ($(list).toArray().every(function (a) {
                        return $(a).prop('checked');
                })) {
                    $(allBtn).prop('checked', true).data('checked', true);
                } else {
                    $(allBtn).prop('checked', false).data('checked', false);
                }
            });

            $(allBtn).change(function () {
                var chk = typeof $(this).prop('checked') != 'undefined'? $(this).prop('checked') : $(this).data('checked');
                $(list).each(function () {
                    $(this).prop('checked', chk);
                })
            });
        },
        /**
         * 添加全局loading
         */
        showLoading: function () {
            this.removeLoading();
            $('body').append('<div class="shadow" js-text="load-shadow" style="height: auto;"><div style="height: ' + $(window).height() + 'px; line-height: ' + $(window).height() + 'px; background-color: #000;" class="loading"></div></div>')
        },
        /**
         * 删除全局loading
         */
        removeLoading: function () {
            $('[js-text="load-shadow"]').remove();
        }
    }

    require('common/C.chart');
    require('common/C.dialog');
    require('common/C.tool');
    require('common/C.validate');
    echart = require('common/C.eChart');
    ohpchart = require('common/C.ohpChart');

    Date.prototype.format = function (format) {
        format = format.toLowerCase();
        var o = {
            "m+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "i+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "ms": this.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

    Array.prototype.remove = function (ele, callback) {
        if (this.length <= 0 || !ele) return this;
        if (this.indexOf(ele) > -1) {
            this.splice(this.indexOf(ele), 1);
        } else if (this.indexOf(ele + '') > -1) {
            this.splice(this.indexOf(ele + ''), 1);
        }
        callback && callback();
        return this;
    }

    /**
     * msg: 提示内容
     * callback: 回调，比如提示后刷新页面，关闭对话框等
     * seconds: 消息消失时间间隔，毫秒计
     */
    alert = function (msg, func, sec) {
        Ctrip.ShowMessage(msg, sec, func);
    }

    alertErr = function (msg, func, sec) {
        Ctrip.ShowError(msg, sec, func);
    }

    $.fn.extend({
        "preventScroll": function () {
            var _this = this.get(0);
            if (sys.browser == 'firefox') {
                _this.addEventListener('DOMMouseScroll', function (e) {
                    _this.scrollTop += e.detail > 0 ? 50 : -50;
                    e.preventDefault();
                }, false);
            } else {
                _this.onmousewheel = function (e) {
                    e = e || window.event;
                    _this.scrollTop += e.wheelDelta > 0 ? -50 : 50;
                    return false;
                };
            }
            return this;
        }
    });

})
