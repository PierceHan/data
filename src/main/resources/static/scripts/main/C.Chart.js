/**
 * 图表工具
 * 介绍：用于存放全局公共方法、属性
 * Author xumb@Ctrip.com 2015-05-12 Copyright© 1999-2015, ctrip.com. All rights reserved
 * 
 */
define(function (require, exports, module) {
    var highchart = require('lib/highcharts');
    Chart = function (opts) {

        opts = opts || {};
        this.colors = getColors(opts.type);

        function getColors(type) {
            if (location.href.indexOf('Quota') > -1 || location.href.indexOf('VirtualRoom') > -1 || location.href.indexOf('MagicCube') > -1
                || location.href.indexOf('Tenma') > -1) {
                type = 'Quota';
            }

            if (typeof type == 'undefined' || type == 'buyout') {//崔老板
                return ['#4CAEDB', '#77D8D9', '#4FBF4F', '#99DA59', '#7B7BEB', '#D76FD3', '#F54747', '#F26691', '#F8794C', '#FDC45B', '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500'];
            } else {//徐老板
                return ['#FDC45B', '#77D8D9', '#F8794C', '#4CAEDB', '#F26691', '#99DA59', '#F54747', '#4FBF4F', '#D76FD3', '#7B7BEB', '#F7A08A', '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500'];
            }
        }

        this.init = function () {
            highchart.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });
            highchart.theme = {
                chart: {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    plotBackgroundColor: 'rgba(0, 0, 0, 0)',
                    //plotShadow: true,
                    plotBorderWidth: 1,
                    style: {
                        fontSize: '16px',
                        fontFamily: 'Microsoft YAHEI'
                    }
                },
                title: {
                    style: {
                        color: '#000',
                        font: 'bold 16px "Microsoft YAHEI", Verdana, sans-serif'
                    }
                },
                subtitle: {
                    style: {
                        color: '#666666',
                        font: 'bold 12px "Microsoft YAHEI", Verdana, sans-serif'
                    }
                },
                xAxis: {
                    //gridLineWidth: 1,
                    lineColor: '#000',
                    tickColor: '#000',
                    labels: {
                        style: {
                            color: '#000'
                        }
                    },
                    title: {
                        style: {
                            color: '#333',
                            fontWeight: 'bold',
                            fontSize: '12px'
                        }
                    }
                },
                yAxis: {
                    //minorTickInterval: 'auto',
                    lineColor: '#000',
                    lineWidth: 1,
                    tickWidth: 1,
                    tickColor: '#000',
                    labels: {
                        style: {
                            color: '#000'
                        }
                    },
                    title: {
                        style: {
                            color: '#333',
                            fontWeight: 'normal',
                            fontSize: '12px'
                        }
                    }
                },
                legend: {
                    itemStyle: {
                        font: '9pt Microsoft YAHEI, Verdana, sans-serif',
                        color: 'black'

                    },
                    itemHoverStyle: {
                        color: '#039'
                    },
                    itemHiddenStyle: {
                        color: 'gray'
                    }
                },

                navigation: {
                    buttonOptions: {
                        theme: {
                            stroke: '#CCCCCC'
                        }
                    }
                }
            };

            Highcharts.setOptions(Highcharts.theme);
        };

        this.init();
    };


    Chart.prototype = {
        /**
         * 折线图
         *
         * 识别格式 {title:'', timeline:['a','b','c'], data:{'name':[1,2,3,3,4]}, color: ['red','blue']}
         *
         */
        line: function (contId, data) {

            
            jQuery('#' + contId).empty();
            //jQuery("#" + contId).css({ backgroundImage: "url(" + Ctrip.getWatermarkUrl("","#e4e2e2") + ")", backgroundPosition: "0 10px", backgroundSize: "auto 135px", });
            Ctrip.getWatermarkUrl(jQuery("#" + contId), '', "#e4e2e2", '', "0 10px", "auto 135px");

            if (typeof data == "undefined") {
                console.log('数据为空，请检查');
                return;
            }

            var result = [],
                colors = data.color || [],
                serieVisible = data['serieVisible'] || {};
            jQuery.each(data.data, function (key, item) {
                
                var it = jQuery.isArray(item) ? item : item['data'] || [];
                jQuery.each(it, function (k, v) {
                    if (typeof v == 'object' && v && v['marker']) {
                        it[k]['marker']['states'] = {
                            hover: {
                                fillColor: v['marker']['fillColor'] || null
                            }
                        }
                    }
                })
                var visab = typeof serieVisible[key] == 'undefined' ? true : serieVisible[key];
                result.push($.extend({ name: key, color: colors.shift() || null, visible: visab }, item, { data: it }));
            });
            data['timeline'] = data['timeline'] || [];

            jQuery('#' + contId).highcharts({
                chart: {
                    type: 'spline',
                    reflow: true
                },
                colors: this.colors,
                title: {
                    text: data.title || ''
                },
                xAxis: {
                    title: {
                        text: data['xAxisName'] || ''
                    },
                    tickInterval: data['tickInterval'] || (data['timeline'].length > 15 ? 5 : 1),
                    categories: data['timeline'],
                    plotLines: data['plotLines'] || null,
                    labels: {
                        rotation: data['rotation'] || (data['timeline'].length > 15 && data['tickInterval'] ? '-45' : null)//调节倾斜角度偏移
                    }
                },

                yAxis: {
                    title: {
                        text: data['yAxisName'] || ''
                    },
                    min: !isNaN(data['yMin'] * 1) ? data['yMin'] * 1 : null,
                    max: !isNaN(data['yMax'] * 1) ? data['yMax'] * 1 : null,
                    labels: {
                        formatter: data['yLabelFormat'] || function () {
                            return data.yLabel != '%' ? Ctrip.addUnit(this.value, 2) : this.value + (data.yLabel || '');
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true,
                    valueSuffix: data.yLabel || '',
                    useHTML: data['tipFormat'] ? true : false,
                    formatter: data['tipFormat'] || null
                },
                plotOptions: {
                    spline: {
                        lineWidth: !isNaN(data['lineWidth'] * 1) ? data['lineWidth'] : 2,
                        states: {//鼠标划上
                            hover: {
                                lineWidthPlus: !isNaN(data['lineWidth'] * 1) ? data['lineWidth'] : 1
                            }
                        },
                        events: {
                            legendItemClick: data['legendItemClick'] || null
                        },
                        dataLabels: {
                            zIndex: 5,
                            enabled: data['dataLabel'] || false,
                            formatter: data['dataLabelFormat'] || function () {
                                return Ctrip.addUnit(this.y, 2) + (data.yLabel || '');
                            }
                        },
                        marker: {
                            enabled: data['timeline'].length > 65 ? false : true,
                            radius: data['markerRadius'] || 4,
                            lineWidth: 1,
                            states: {//鼠标经过点
                                hover: {
                                    //enabled: false,
                                    radius: 6
                                }
                            }
                        }
                    },
                    series: {
                        cursor: data['ItemClick'] ? 'pointer' : 'default',
                        events: {
                            legendItemClick: data['legendItemClick'] || (data['clickAble'] == true ? null : false),
                            click: data['ItemClick'] || null
                        }
                    },
                    column: data['plotOptionscolumn']
                },
                legend: {
                    itemStyle: {
                        cursor: data['clickAble'] ? 'pointer' : 'default',
                    }
                },
                series: result
            });
            var func = jQuery('#' + contId).highcharts().container.onclick;
            jQuery('#' + contId).highcharts().container.onclick = function (e) {
                func && func(e); jQuery('#' + contId).trigger('click')
            };

            return jQuery('#' + contId).highcharts();
        },

        /**
         * 柱状图
         *
         * 识别格式 {title:'', timeline:['a','b','c'], data:{'name':[1,2,3,3,4]}, color: ['red','blue']}
         */
        column: function (contId, data, callback) {
            jQuery('#' + contId).empty();
            //jQuery("#" + contId).css({ backgroundImage: "url(" + Ctrip.getWatermarkUrl("","#e4e2e2") + ")", backgroundPosition: "0 10px", backgroundSize: "auto 135px", });
            Ctrip.getWatermarkUrl(jQuery("#" + contId), '', "#e4e2e2", '', "0 10px", "auto 135px");

            if (typeof data == "undefined") {
                console.log('数据为空，请检查');
                return;
            }
            var result = [],
                colors = data.color || [],
                dataLabel = data.dataLabel || [],
                serieVisible = data['serieVisible'] || {};

            jQuery.each(data.data, function (key, item) {
                var tmp = [];
                $.each(item, function (k, v) {
                    tmp.push(v);
                })
                var visab = typeof serieVisible[key] == 'undefined' ? true : serieVisible[key];
                result.push({ name: key, data: tmp, color: (colors.shift() || null), dataLabels: (dataLabel.shift() || {}), visible: visab });
            });

            jQuery('#' + contId).highcharts({
                chart: {
                    type: 'column'
                },
                colors: this.colors,
                title: {
                    text: data.title || ''
                },
                xAxis: {
                    title: {
                        text: data['xAxisName'] || ''
                    },
                    plotLines: data['plotLines'] || null,
                    categories: data['timeline'].length > 0 ? data['timeline'] : ['-'],
                    labels: {
                        formatter: data['xLabelFormat'] || null,
                        rotation: data['rotation'] || null//调节倾斜角度偏移
                    },
                },
                yAxis: {
                    title: {
                        text: data['yAxisName'] || ''
                    },
                    min: !isNaN(data['yMin'] * 1) ? data['yMin'] * 1 : null,
                    max: !isNaN(data['yMax'] * 1) ? data['yMax'] * 1 : null,
                    labels: {
                        formatter: data['yLabelFormat'] || function () {
                            return data.yLabel != '%' ? Ctrip.addUnit(this.value, 2) : this.value + (data.yLabel || '');
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true,
                    valueSuffix: data.yLabel || '',
                    useHTML: data['tipFormat'] ? true : false,
                    formatter: data['tipFormat'] || null
                },
                plotOptions: {
                    column: {
                        stacking: data['isStack'] ? 'normal' : null,
                        grouping: data['overlap'] ? false : true, // 柱状图是否重叠
                        dataLabels: {
                            zIndex: 5,
                            enabled: typeof data['enabled'] != 'undefined' ? data['enabled'] : true,
                            color: '#000',
                            formatter: data['dataLabelFormat'] || function () {
                                return Ctrip.addUnit(this.y, 2) + (data.yLabel || '');
                            },
                            rotation: -1,
                            y: -10
                        }
                    },
                    series: {
                        cursor: data['ItemClick'] ? 'pointer' : 'default',
                        events: {
                            legendItemClick: data['legendItemClick'] || (data['clickAble'] == true ? null : false),
                            click: data['ItemClick'] || null
                        }
                    }
                },
                legend: {
                    itemStyle: {
                        cursor: data['clickAble'] ? 'pointer' : 'default'
                    }
                },
                series: result
            });
            var func = jQuery('#' + contId).highcharts().container.onclick;
            jQuery('#' + contId).highcharts().container.onclick = function (e) {
                func && func(e); jQuery('#' + contId).trigger('click')
            };

            return jQuery('#' + contId).highcharts();
        },

        /**
         * 饼图
         *
         * {title,data,click,pieSize,showLegend,labelDistance}
         * 
         * 识别格式 {"PP-HPP":53.16,"FG-HTL":40.29,"PP-SHT":3.88,"PP-HTL":2.66}
         */
        pie: function (contId, data) {
            jQuery('#' + contId).empty();
            //jQuery("#" + contId).css({ backgroundImage: "url(" + Ctrip.getWatermarkUrl("","#e4e2e2") + ")", backgroundPosition: "0 10px", backgroundSize: "auto 135px", });
            Ctrip.getWatermarkUrl(jQuery("#" + contId), '', "#e4e2e2", '', "0 10px", "auto 135px");

            var result = [],
                title = data.title,
                serieVisible = data['serieVisible'] || {};
            jQuery.each(data.data, function (key, item) {
                var visab = typeof serieVisible[key] == 'undefined' ? true : serieVisible[key];
                result.push({
                    name: key,
                    y: Math.round(item * 1),
                    visible: visab
                });
            })
            jQuery('#' + contId).highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    width: data['width'] * 1 || null,
                    height: data['height'] * 1 || null,
                    margin: data['margin'] || null,
                },
                colors: this.colors,
                title: {
                    text: title || ''
                },
                tooltip: {
                    formatter: data['tipFormat'] || function () {
                        return (this.key + ' <br><span style="color:' + this.point.color + '" x="8" dy="15"> ● </span> <b>' + Ctrip.parseNumber(this.percentage, 1) + '%</b><br>');
                    }
                },
                plotOptions: {
                    pie: {
                        size: data.pieSize || null,
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            zIndex: 5,
                            enabled: true,
                            //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            formatter: data['dataLabelFormat'] || function () {
                                return ('<span style="color:' + this.point.color + '" x="8" dy="15"> ● </span> <b>' + this.key + ': ' + Ctrip.parseNumber(this.percentage, 1) + '%</b><br>');
                            },
                            distance: data.labelDistance || 20
                        },
                        showInLegend: data.showLegend || false,
                        events: {
                            cursor: data['ItemClick'] ? 'pointer' : 'default',
                            click: data['ItemClick'] || function (e) {
                                data.click && data.click(e.point.name);
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    data: result
                }]
            });
            var func = jQuery('#' + contId).highcharts().container.onclick;
            jQuery('#' + contId).highcharts().container.onclick = function (e) {
                func && func(e); jQuery('#' + contId).trigger('click')
            };

            return jQuery('#' + contId).highcharts();
        },

        /**
         * 横向柱状图
         *
         * 识别格式 {title:'', timeline:['a','b','c'], data:{'name':[1,2,3,3,4]}, color: ['red','blue']}
         */
        crossColumn: function (contId, data, callback) {
            jQuery('#' + contId).empty();
            //jQuery("#" + contId).css({ backgroundImage: "url(" + Ctrip.getWatermarkUrl("","#e4e2e2") + ")", backgroundPosition: "0 10px", backgroundSize: "auto 135px", });
            Ctrip.getWatermarkUrl(jQuery("#" + contId), '', "#e4e2e2", '', "0 10px", "auto 135px");


            if (typeof data == "undefined") {
                console.log('数据为空，请检查');
                return;
            }
            var result = [],
                colors = data.color || [],
                datalabel = data["itemLabel"] || [];

            jQuery.each(data.data, function (key, item) {
                var tmp = [];
                $.each(item, function (k, v) {
                    tmp.push(v);
                })
                result.push({ name: key, data: tmp, color: colors.shift() || null, dataLabels: datalabel.shift() || {} });
            });

            jQuery('#' + contId).highcharts({
                chart: {
                    type: 'bar',
                    style: {
                        fontFamily: 'Microsoft Yahei'
                    }
                },
                colors: this.colors,
                title: {
                    text: data['title'] || ''
                },
                xAxis: {
                    title: {
                        text: data['xAxisName'] || ''
                    },
                    categories: data['timeline']
                },
                yAxis: {
                    title: {
                        text: data['yAxisName'] || ''
                    },
                    min: !isNaN(data['yMin'] * 1) ? data['yMin'] * 1 : null,
                    max: !isNaN(data['yMax'] * 1) ? data['yMax'] * 1 : null,
                    labels: {
                        formatter: data['yLabelFormat'] || function () {
                            return data.yLabel != '%' ? Ctrip.addUnit(this.value, 2) : this.value + (data.yLabel || '');
                        },
                        overflow: 'justify',
                        rotation: data['rotation'] || null //调节倾斜角度偏移
                    }
                },
                tooltip: {
                    valueSuffix: data.yLabel || '',
                    useHTML: data['tipFormat'] ? true : false,
                    formatter: data['tipFormat'] || null
                },
                legend: {
                    
                    enabled: data['hideLegend'] ? false : true,
                    
                },
                plotOptions: {
                    bar: {
                        dataLabels: data["dataLabels"] || {
                            zIndex: 5,
                            enabled: true,
                            color: '#000',
                            formatter: data['dataLabelFormat'] || function () {
                                return Ctrip.addUnit(this.y) + (data.yLabel || '');
                            }
                        }
                    },
                    series: {
                        cursor: data['ItemClick'] ? 'pointer' : 'default',
                        events: {
                            click: data['ItemClick'] || null
                        },
                        pointWidth: data['pointWidth'] || 30
                    }
                },
                series: result
            });
            var func = jQuery('#' + contId).highcharts().container.onclick;
            jQuery('#' + contId).highcharts().container.onclick = function (e) {
                func && func(e); jQuery('#' + contId).trigger('click')
            };

            return jQuery('#' + contId).highcharts();
        },

        /**
         * 堆叠柱状图
         *
         * 识别格式 {title:'', timeline:['a','b','c'], data:{'name':[1,2,3,3,4]}}
         */
        stackColumn: function (contId, data, callback) {
            jQuery('#' + contId).empty();
            //jQuery("#" + contId).css({ backgroundImage: "url(" + Ctrip.getWatermarkUrl("","#e4e2e2") + ")", backgroundPosition: "0 10px", backgroundSize: "auto 135px", });
            Ctrip.getWatermarkUrl(jQuery("#" + contId), '', "#e4e2e2", '', "0 10px", "auto 135px");

            if (typeof data == "undefined") {
                console.log('数据为空，请检查');
                return;
            }
            var result = [],
                colors = data.color || [],
                datalabel = data["itemLabel"] || [];

            jQuery.each(data.data, function (key, item) {
                result.push({ name: key, data: item, color: colors.shift() || null, dataLabels: datalabel.shift() || {} });
            });

            jQuery('#' + contId).highcharts({
                chart: {
                    type: 'column'
                },
                colors: this.colors,
                title: {
                    text: data.title || ''
                },
                xAxis: {
                    title: {
                        text: data['xAxisName'] || ''
                    },
                    categories: data['timeline']
                },
                yAxis: {
                    title: {
                        text: data['yAxisName'] || ''
                    },
                    min: !isNaN(data['yMin'] * 1) ? data['yMin'] * 1 : null,
                    max: !isNaN(data['yMax'] * 1) ? data['yMax'] * 1 : null,
                    stackLabels: data['stackLabels'] || false,
                    labels: {
                        formatter: data['yLabelFormat'] || function () {
                            return data.yLabel != '%' ? Ctrip.addUnit(this.value, 2) : this.value + (data.yLabel || '');
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true,
                    useHTML: data['tipFormat'] ? true : false,
                    formatter: data['tipFormat'] || null
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            zIndex: 5,
                            enabled: true,
                            color: '#000',
                            formatter: data['dataLabelFormat'] || function () {
                                return Ctrip.addUnit(this.y) + (data.yLabel || '');
                            }
                        }
                    },
                    series: {
                        cursor: data['ItemClick'] ? 'pointer' : 'default',
                        events: {
                            click: data['ItemClick'] || null
                        }
                    }
                },
                series: result
            });
            var func = jQuery('#' + contId).highcharts().container.onclick;
            jQuery('#' + contId).highcharts().container.onclick = function (e) {
                func && func(e); jQuery('#' + contId).trigger('click')
            };

            return jQuery('#' + contId).highcharts();
        },

        /**
         * 横向堆叠柱状图
         *
         * 识别格式 {title:'', timeline:['a','b','c'], data:{'name':[1,2,3,3,4]}}
         */
        stackCrossCol: function (contId, data, callback) {
            jQuery('#' + contId).empty();
            //jQuery("#" + contId).css({ backgroundImage: "url(" + Ctrip.getWatermarkUrl("","#e4e2e2") + ")", backgroundPosition: "0 10px", backgroundSize: "auto 135px", });
            Ctrip.getWatermarkUrl(jQuery("#" + contId), '', "#e4e2e2", '', "0 10px", "auto 135px");

            var result = [],
                title = data.title;
            jQuery.each(data.data, function (key, item) {
                result.push({ name: key, data: item });
            });
            jQuery('#' + contId).highcharts({
                chart: {
                    type: 'bar'
                },
                colors: this.colors,
                title: {
                    text: title || ''
                },
                tooltip: {
                    //shared: true,
                    crosshairs: true,
                    //pointFormat: '<b>{series.name}</b>: {point.y} ( {point.percentage:.2f}% )<br>',
                    formatter: function () {
                        var seriesObjs = this.series.chart.series;
                        var curName = this.series.name,
                            curX = this.x,
                                str = [];
                        for (var i = 0; i < seriesObjs.length; i++) {
                            if (!seriesObjs[i].visible) { continue; }
                            for (var j = 0; j < seriesObjs[i].data.length; j++) {
                                if (curX == seriesObjs[i].data[j].category) {
                                    str.unshift('<br><tspan style="fill:' + seriesObjs[i].color + '" x="8" dy="15"> ● </tspan>' +
                                        '<span' + (curName == seriesObjs[i].name ? ' style="color:' + seriesObjs[i].color + ';font-weight: bold;"' : '') + '> ' +
                                            seriesObjs[i].name + ': ' + Highcharts.numberFormat(seriesObjs[i].data[j].y, 0) + (data.yLabel || '') +
                                        '</span>');// +( seriesObjs[i].data[j].percentage);
                                }
                            }
                        }
                        str.unshift(this.x);
                        comsole.log('ss')
                        return str.join('');
                    },
                    style: {
                        lineHeight: '20px',
                        zIndex: 9999
                    }
                },
                xAxis: {
                    title: {
                        text: data['xAxisName'] || ''
                    },
                    categories: data.timeline
                },
                yAxis: {
                    min: !isNaN(data['yMin'] * 1) ? data['yMin'] * 1 : null,
                    max: !isNaN(data['yMax'] * 1) ? data['yMax'] * 1 : null,
                    title: {
                        text: data['yAxisName'] || ''
                    }
                },
                legend: {
                    //backgroundColor: '#FFFFFF',
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'percent',
                        cursor: data['ItemClick'] ? 'pointer' : 'default',
                        events: {
                            click: data['ItemClick'] || null
                        }
                    }
                },
                series: result
            });
            var func = jQuery('#' + contId).highcharts().container.onclick;
            jQuery('#' + contId).highcharts().container.onclick = function (e) {
                func && func(e); jQuery('#' + contId).trigger('click')
            };

            return jQuery('#' + contId).highcharts();
        },

        /**
         * 多Y轴
         *
         * 识别格式 { title: '各基础房型的产量、卖价、底价', data: {  }, timeline: [] , yNameLeft: '产量', yNameRight: '价格', yLeftLabel: '', yRightLabel: '元'}
         */
        doubleY: function (contId, data, callback) {
            var $ = jQuery;
            $('#' + contId).empty();
            //jQuery("#" + contId).css({ backgroundImage: "url(" + Ctrip.getWatermarkUrl("","#e4e2e2") + ")", backgroundPosition: "0 10px", backgroundSize: "auto 135px", });
            Ctrip.getWatermarkUrl(jQuery("#" + contId), '', "#e4e2e2", '', "0 10px", "auto 135px");


            var result = [],
                colors = data.color || [],
                serieVisible = data['serieVisible'] || {},
                datalabel = data["itemLabel"] || [];
            try {
                $.each(data.data, function (k, item) {
                    $.each(item.data, function (i, v) {
                        if (typeof v == 'object' && v && v['marker']) {
                            item.data[i]['marker']['states'] = {
                                hover: {
                                    fillColor: v['marker']['fillColor'] || null
                                }
                            }
                        }
                    });
                    var visab = typeof serieVisible[k] == 'undefined' ? true : serieVisible[k];
                    result.push($.extend({ name: k, color: colors.shift() || null, visible: visab, dataLabels: datalabel.shift() || {} }, item));
                });
            } catch (e) {
                console.log("11");
                console.log(e);
            }

            console.log(jQuery('#' + contId).highcharts());

            $('#' + contId).highcharts({
                chart: {
                    width: data.width
                },
                title: {
                    text: data.title || ''
                },
                colors: this.colors,
                xAxis: [{
                    lineColor: data['YplotLines'] ? null : '#000',
                    categories: data.timeline || [],
                    plotLines: data['plotLines'] || null,
                    tickInterval: data['tickInterval'] || (data['timeline'].length > 15 ? 5 : 1),
                    labels: {
                        formatter: data['xLabelFormat'] ||null,
                        rotation: data['rotation'] || (data['timeline'].length > 15 && data['tickInterval'] ? '-45' : null), //调节倾斜角度偏移
                        //format: "{value.length>5?(value.Substring(0,5)+'...'):value}"
                        //format: '{value}km'
                    }
                }],
                yAxis: [{
                    title: {
                        text: data.yNameLeft || ''
                    },
                    ceiling: data['ceilL'] || null,
                    floor: data['floorL'] || null,
                    plotLines: data['YplotLines'] || [],
                    min: !isNaN(data['yMinL'] * 1) ? data['yMinL'] * 1 : null,
                    max: !isNaN(data['yMaxL'] * 1) ? data['yMaxL'] * 1 : null,
                    tickPositions: data['tickPositionsL'] || null,
                    stackLabels: data['stackLabels'] || false,
                    tickAmount:6,
                    labels: {
                        formatter: data['yLabelFormatL'] || function () {
                            return (data.yLeftLabel != '%' ? (data.lg == "EN" ? Ctrip.parseNumber(this.value) : Ctrip.addUnit(this.value, 2)) : this.value) + (data.yLeftLabel || '');
                        }
                    }
                }, {
                    title: {
                        text: data.yNameRight || ''
                    },
                    ceiling: data['ceilR'] || null,
                    floor: data['floorR'] || null,
                    min: !isNaN(data['yMinR'] * 1) ? data['yMinR'] * 1 : null,
                    max: !isNaN(data['yMaxR'] * 1) ? data['yMaxR'] * 1 : null,
                    tickPositions: data['tickPositionsR'] || null,
                    tickAmount: 6,
                    labels: {
                        formatter: data['yLabelFormatR'] || function () {
                            return (data.yRightLabel != '%' ? Ctrip.addUnit(this.value, 2) : this.value) + (data.yRightLabel || '');
                        }
                    },
                    opposite: true
                }],
                plotOptions: {
                    spline: {
                        lineWidth: !isNaN(data['lineWidth'] * 1) ? data['lineWidth'] : 2,
                        states: {//鼠标划上
                            hover: {
                                lineWidthPlus: !isNaN(data['lineWidth'] * 1) ? data['lineWidth'] : 1
                            }
                        },
                        marker: {
                            radius: data['markerRadius'] || 4,
                            lineWidth: 1,
                            states: {//鼠标经过点
                                hover: {
                                    //enabled: false,
                                    radius: 6
                                }
                            }
                        },
                        dataLabels: {
                            zIndex: 5,
                            enabled: data['dataLableR'] ? true : false
                        },
                        zIndex: 2
                    },
                    column: {
                        stacking: data['isStack'] ? 'normal' : null,
                        grouping: data['overlap'] ? false : true, // 柱状图是否重叠
                        dataLabels: {
                            zIndex: 5,
                            enabled: data['dataLableL'] ? true : false,
                            rotation: -1,
                            y: -10
                        },
                        zIndex: 1
                    },
                    series: {
                        events: {
                            legendItemClick: data['legendItemClick'] || (data['clickAble'] == true ? null : false)
                        }
                    }
                },
                legend: {
                    itemStyle: {
                        cursor: data['clickAble'] ? 'pointer' : 'default'
                    }
                },
                tooltip: {
                    shared: true,
                    crosshairs: true,
                    formatter: data['tipFormat'] || null
                },
                series: result || []
            });

            var func = jQuery('#' + contId).highcharts().container.onclick;
            jQuery('#' + contId).highcharts().container.onclick = function (e) {
                func && func(e); jQuery('#' + contId).trigger('click')
            };

            return jQuery('#' + contId).highcharts();
        },

        /**
         * 区域图
         *
         * 识别格式 {title:'', timeline:['a','b','c'], data:{'name':[1,2,3,3,4]}, color: ['red','blue']}
         */
        area: function (contId, data, callback) {

            jQuery('#' + contId).empty();
            //jQuery("#" + contId).css({ backgroundImage: "url(" + Ctrip.getWatermarkUrl("","#e4e2e2") + ")", backgroundPosition: "0 10px", backgroundSize: "auto 135px", });
            Ctrip.getWatermarkUrl(jQuery("#" + contId), '', "#e4e2e2", '', "0 10px", "auto 135px");

            if (typeof data == "undefined") {
                console.log('数据为空，请检查');
                return;
            }
            var result = [],
                colors = data.color || [];
            jQuery.each(data.data, function (key, item) {
                jQuery.each(item, function (k, v) {
                    if (typeof v == 'object' && v && v['marker']) {
                        item[k]['marker']['states'] = {
                            hover: {
                                fillColor: v['marker']['fillColor'] || null
                            }
                        }
                    }
                })
                result.push({ name: key, data: item, color: colors.shift() || null });
            });
            data['timeline'] = data['timeline'] || [];

            $('#' + contId).highcharts({
                chart: {
                    type: 'area'
                },
                colors: this.colors,
                title: {
                    text: data.title || ''
                },
                xAxis: {
                    title: {
                        text: data['xAxisName'] || ''
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    },
                    categories: data.timeline || []
                },
                yAxis: {
                    tickInterval: data['tickInterval'] || null,
                    min: !isNaN(data['yMin'] * 1) ? data['yMin'] * 1 : null,
                    max: !isNaN(data['yMax'] * 1) ? data['yMax'] * 1 : null,
                    title: {
                        text: data['yAxisName'] || ''
                    },
                    labels: {
                        formatter: data['yLabelFormat'] || function () {
                            return (data.yLabel != '%' ? Ctrip.addUnit(this.value, 2) : this.value) + (data.yLabel || '');
                        }
                    },
                    allowDecimals: data['allowDecimals'] === false ? false : true
                },
                tooltip: {
                    formatter: data['tipFormat'] || function (a, b) {
                        return this.series.name + '<br>' + this.key + ': ' + this.y;
                    }
                },
                legend: {
                    enabled: data['legendEnabled'] === false ? false : true
                },
                plotOptions: {
                    area: {
                        dataLabels: {
                            zIndex: 5,
                            enabled: true,
                            formatter: data['dataLabelFormat'] || function () {
                                return Ctrip.addUnit(this.y) + (data.yLabel || '');
                            }
                        }
                    },
                    series: {
                        cursor: data['ItemClick'] ? 'pointer' : 'default',
                        events: {
                            click: data['ItemClick'] || null
                        }
                    }
                },
                series: result
            });
            var func = jQuery('#' + contId).highcharts().container.onclick;
            jQuery('#' + contId).highcharts().container.onclick = function (e) {
                func && func(e); jQuery('#' + contId).trigger('click')
            };

            return jQuery('#' + contId).highcharts();
        }
    }

    //return new Chart();

})

