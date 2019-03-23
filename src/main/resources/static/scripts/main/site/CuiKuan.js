var pageVar = {
    N: 0,
    descrow: 4,
    px: 1,
    debtdescrow: 4,
    errordescrow: 2,
    debtpx: 1,
    errorpx: 1,
    tag_page: 0,
    debttag_page: 0,
    errortag_page: 0,

    total: 0,
    hoteldowncount: 0,
    hotelcount: 0,
    debttotal: 0,
    debthotelcount: 0,

    errortotal: 0,
    errorhotelcount: 0,

    followtotal: 0,
    followhotelcount: 0,
    followtag_page: 0,

    init: function () {

        if ($('[js-click="changeTab"].current').data('id') == "2") {

            this.ReconciliationTotal();
            this.inittabledate();
        }
        else if ($('[js-click="changeTab"].current').data('id') == "3") {
            this.ErrorTotal();
            this.initerrortabledate();
        }
        else if ($('[js-click="changeTab"].current').data('id') == "4") {
            this.DebtTotal();
            this.initdebttabledate();
        }
        else if ($('[js-click="changeTab"].current').data('id') == "1") {
            this.FollowTotal();
            this.initfollowtabledate();
        }
        else if ($('[js-click="changeTab"].current').data('id') == "5") {
            this.AdjustTotal();
            this.initAdjustTable();
        }


    },

    ReconciliationTotal: function () {
        var self = this,
            $ = jQuery,
            ret;
        chart = new Chart();
        $('#day_pre').html("83%");
        $('#now_date').html("3-26");
        $('#end_date').html("3-31");

        $('#last_pre').html("91%");
        $('#confirmcounts_last').html("6355");
        $('#totalcounts_last').html("6897");

        $('#now_pre').html("7510");
        $('#confirmcounts').html("8966");
        $('#totalcounts').html("9067");
        self.request({ op: 'GetReconciliationTotal' }, function (data) {

            ret = data.result[0];
        $('#day_pre').html("83%");
        $('#now_date').html("3-26");
        $('#end_date').html("3-31");

        $('#last_pre').html("91%");
        $('#confirmcounts_last').html("6355");
        $('#totalcounts_last').html("6897");

        $('#now_pre').html("7510");
        $('#confirmcounts').html("8966");
        $('#totalcounts').html("9067");
//            $('#day_pre').html(ret.day_pre);
//            $('#now_date').html(ret.now_date);
//            $('#end_date').html(ret.end_date);
//
//            $('#last_pre').html(ret.last_pre);
//            $('#confirmcounts_last').html(ret.confirmcounts_last);
//            $('#totalcounts_last').html(ret.totalcounts_last);
//
//            $('#now_pre').html(ret.now_pre);
//            $('#confirmcounts').html(ret.confirmcounts);
//            $('#totalcounts').html(ret.totalcounts);
//            $('#ebkTotal').html(ret.ebkTotal);
//            $('#ebkHighStar').html(ret.ebkHighStar);
//            $('#ebkLowStar').html(ret.ebkLowStar);
            //Ctrip.getWatermarkUrl($('#confirmcounts_last').parents(".progress"), '', "#b2bcca", '实时', "0 10px", "auto 200px");
            //Ctrip.getWatermarkUrl($('#last_pre').parents(".percentage"), '', "#b2bcca", '实时', "0 10px", "auto 200px");
            //Ctrip.getWatermarkUrl($('#now_pre').parents(".percentage"), '', "#b2bcca", '实时', "0 10px", "auto 200px");
            //Ctrip.getWatermarkUrl($('#confirmcounts').parents(".progress"), '', "#b2bcca", '实时', "0 10px", "auto 200px");
            //Ctrip.getWatermarkUrl($('#totalcounts').parents(".progress"), '', "#b2bcca", '实时', "0 10px", "auto 200px");
        }, function () {
            new Tool().showStatus($('[id=Acount_total]'), 'error');
        });
    },
    //加载酒店列表
    inittabledate: function (a, b, c, d) {
        var $ = jQuery,
            self = this,
            chart = new Chart(),
            tool = new Tool(),
            res;
        $('#pager').empty();
        //$('#hotelcounts').html("...");

        if (b != undefined)
            pageVar.descrow = b
        if (c != undefined)
            pageVar.px = c
        if (d != undefined)
            pageVar.tag_page = d
        new Tool().showStatus($('[id=ReconciliationTable]'), 'loading');
        self.request({ op: "GetReconciliationTable", pageno: a || 1, descrow: pageVar.descrow, px: pageVar.px, tagpage: pageVar.tag_page }, function (data) {
           debugger;
            var ret = data.result;
            if (!ret) return;
            $('#ReconciliationTable').html('');
            if (ret.AbroadGroup == "True") {
                $('.abroadGroup').show();
            } else {

                $('.abroadGroup').hide();
            }
            $.each(ret["reconciliationEntities"], function (k, v) {
                $('#ReconciliationTable').append(tool.initTable(v,
                    [{
                        index: [1],
                        callback: function (str) {
                            return '<span>' + str + '</span>';
                        }
                    },
                        {
                            index: [2],
                            callback: function (str) {
                                return '<span style="display: block;overflow: hidden;text-align: left;text-overflow: ellipsis;white-space: nowrap;width: 200px;" title="' + str + '" >' + str + '</span>';
                            }
                        },
                        {
                            index: [3],
                            callback: function (str) {
                                return '<span>' + str + '</span>';
                            }
                        }]));

            })
            if (pageVar.tag_page == 0) {
                pageVar.total = ret["totalcounts"];
                pageVar.hotelcount = ret["hotelcounts"];
            }
            $('#hotelcounts').html(pageVar.hotelcount);
            $('#AcountTotal').html(pageVar.total);
            //$('#hotelcounts').html(pageVar.Get12Lenghotelcount_leave);
            Ctrip.Pager('#pager', { total: pageVar.total, current: ret["pageno"], perpage: 20 }, function (p) {
                self.inittabledate(p, pageVar.descrow, pageVar.px, pageVar.tag_page);
            })
            $('#ReconciliationTable .loading').hide();
            pageVar.tag_page = 0;
        }, function (data) {
            new Tool().showStatus($('[id=ReconciliationTable]'), 'error');
        })

    },

//    DebtTotal: function () {
//        var self = this,
//            $ = jQuery,
//            ret;
////        chart = new Chart();
//        $('#last_debt').html("567218");
//        $('#hist_debt').html("674207");
//
//        $('#debthotelcounts').html("3450");
//        $('#debtAcountTotal').html("4532");
//
//        self.request({ op: 'GetDebtTotal' }, function (data) {
//            ret = data.data;
//            $('#last_debt').html(Ctrip.parseNumber(ret["当月欠款金额"] * 1.0));
//            $('#hist_debt').html(Ctrip.parseNumber(ret["历史欠款金额"] * 1.0));
//
//            $('#three_debt').html(Ctrip.parseNumber(ret["3个月内欠款金额"] * 1.0));
//
//        }, function () {
//            new Tool().showStatus($('[id=Debt_total]'), 'error');
//        });
//    },

    //应收调整页头表格
//    AdjustTotal: function () {
//        var self = this,
//            $ = jQuery,
//            ret;
////        chart = new Chart();
//        $('#last_debt').html("673932.98");
//        $('#hist_debt').html("4595205");
//
//        $('#debthotelcounts').html("145920");
//        $('#debtAcountTotal').html("458031");
//
//        self.request({ op: 'GetAdjustTotal' }, function (data) {
//            ret = data.data;
//            $('#adjustHotel').html(Ctrip.parseNumber(ret["调整酒店家数"] * 1.0));
//            $('#adjustMoney').html(Ctrip.parseNumber(ret["调整金额（人民币）"] * 1.0));
//
//        }, function () {
//            new Tool().showStatus($('[id=Adjust_total]'), 'error');
//        });
//    },


    //加载催款酒店列表
    initdebttabledate: function (a, b, c, d) {
        var $ = jQuery,
            self = this,
//            chart = new Chart(),
            tool = new Tool(),
            res;
        $('#debtpager').empty();
        //$('#hotelcounts').html("...");

        if (b != undefined)
            pageVar.debtdescrow = b
        if (c != undefined)
            pageVar.debtpx = c
        if (d != undefined)
            pageVar.debttag_page = d
        new Tool().showStatus($('[id=DebtTable]'), 'loading');
        self.request({ op: "GetDebtTable", pageno: a || 1, descrow: pageVar.debtdescrow, px: pageVar.debtpx, tagpage: pageVar.debttag_page }, function (data) {
            var ret = data.data;
            if (!ret) return;
            $('#DebtTable').html('');
            if (ret.AbroadGroup == "True") {
                $('.abroadGroup').show();
            } else {
                $('.abroadGroup').hide();
            }
            $.each(ret["tabledate"], function (k, v) {
                $('#DebtTable').append(tool.initTable(v,
                    [{
                        index: [1],
                        callback: function (str) {
                            return '<span>' + str + '</span>';
                        }
                    },
                        {
                            index: [2],
                            callback: function (str) {
                                return '<span style="display: block;overflow: hidden;text-align: left;text-overflow: ellipsis;white-space: nowrap;width: 200px;" title="' + str + '" >' + str + '</span>';
                            }
                        },
                        {
                            index: [3],
                            callback: function (str) {
                                return '<span>' + str + '</span>';
                            }
                        },
                        {
                            index: [10],
                            callback: function (str) {
                                if (str != 0)
                                    return '<span>' + str + '</span>';
                                else {
                                    return '<span>-</span>';
                                }
                            }
                        }]));

            })
            if (pageVar.debttag_page == 0) {
                pageVar.debttotal = ret["totalcounts"];
                pageVar.debthotelcount = ret["hotelcounts"];
            }
            $('#debthotelcounts').html(pageVar.debthotelcount);
            $('#debtAcountTotal').html(pageVar.debttotal);
            //$('#hotelcounts').html(pageVar.Get12Lenghotelcount_leave);
            Ctrip.Pager('#debtpager', { total: pageVar.debttotal, current: ret["pageno"], perpage: 20 }, function (p) {
                self.initdebttabledate(p, pageVar.debtdescrow, pageVar.debtpx, pageVar.debttag_page);
            })
            $('#DebtTable .loading').hide();
            pageVar.debttag_page = 0;
        }, function (data) {
            new Tool().showStatus($('[id=DebtTable]'), 'error');
        })

    },


    initAdjustTable: function (a, b, c, d) {
        var $ = jQuery,
            self = this,
//            chart = new Chart(),
            tool = new Tool(),
            res;
        $('#adjustpager').empty();
        //$('#hotelcounts').html("...");

        if (b != undefined)
            pageVar.debtdescrow = b
        if (c != undefined)
            pageVar.debtpx = c
        if (d != undefined)
            pageVar.debttag_page = d
        new Tool().showStatus($('[id=AdjustTable]'), 'loading');
        self.request({
            op: "GetAdjustTable", pageno: a || 1,
            descrow: pageVar.debtdescrow,
            px: pageVar.debtpx,
            tagpage: pageVar.debttag_page,

            isdelete: $('[name="isdelete"]:checked').val() || '',
            adjustname: $('[id="adjustname"]').val() || '',
            groupname: $('[id="groupname"]').val() || '',
            employeename: $('[id="employeename"]').val() || '',
            begindate: $('[js-time="begin"]').val() || '',
            enddate: $('[js-time="end"]').val() || '',

        }, function (data) {


            var ret = data.data;
            if (!ret) return;
            $('#AdjustTable').html('');
            //if (ret.AbroadGroup == "True") {
            //    $('.abroadGroup').show();
            //} else {
            //    $('.abroadGroup').hide();
            //}
            $.each(ret["tabledate"], function (k, v) {

                var CommissionBatchId, hotelid;
                if (v["批次号"] != null) {


                    CommissionBatchId = v["批次号"];



                }

                $('#AdjustTable').append(tool.initTable(v,
                    [{
                        index: [1],
                        callback: function (str) {
                            return '<span>' + str + '</span>';
                        }
                    },
                        {
                            index: [2],
                            callback: function (str) {
                                return '<span style="display: block;overflow: hidden;text-align: center;text-overflow: ellipsis;white-space: nowrap;" title="' + str + '" >' + str + '</span>';
                            }
                        },
                        {
                            index: [3],
                            callback: function (str) {
                                return '<span>' + str + '</span>';
                            }
                        },
                        {
                            index: [5],
                            callback: function (str) {
                                return '<a href="' + 'http://offline.order.audit.hotel.ctripcorp.com/Account-Vendor-SettlementWeb/TransitPage.aspx?type=cd&companyID=' + str + '&batchID=' + CommissionBatchId + '" target="_blank">' + str + '</a>';
                            }
                        },
                        {
                            index: [10],
                            callback: function (str) {
                                if (str != 0)
                                    return '<span>' + str + '</span>';
                                else {
                                    return '<span>-</span>';
                                }
                            }
                        }, {
                        index: [13],
                        callback: function (str) {
                            return '<span>' + str + '</span>';
                        }
                    },

                    ]));

            })
            if (pageVar.debttag_page == 0) {

                pageVar.adjusttotal = ret["totalcounts"];
                pageVar.adjusthotelcount = ret["hotelcounts"];
            }
            $('#adjusthotelcounts').html(pageVar.adjusthotelcount);
            $('#adjustAcountTotal').html(pageVar.adjusttotal);
            //$('#hotelcounts').html(pageVar.Get12Lenghotelcount_leave);


            Ctrip.Pager('#adjustpager', { total: pageVar.adjusttotal, current: ret["pageno"], perpage: 20 }, function (p) {
                self.initAdjustTable(p, pageVar.debtdescrow, pageVar.debtpx, pageVar.debttag_page);
            })
            $('#AdjustTable .loading').hide();
            pageVar.debttag_page = 0;
        }, function (data) {
            new Tool().showStatus($('[id=AdjustTable]'), 'error');
        })

    },
    ErrorTotal: function () {
        var self = this,
            $ = jQuery,
            ret;
        chart = new Chart();

        $('#error_lasmonth').html("-");
        $('#aveerror_thrmonth').html("-");
        $('#errhotel_current').html("-");
        //$('#errhotel_total').html("-");
        self.request({ op: 'GetErrorTotal' }, function (data) {
            ret = data.data;
            var tagface = ret["当月误差率"] * 1.0;
            if (tagface >= -0.4) {
                $('#error_lasmonth').parent().find('i').removeClass().addClass('ico-good');
            }
            else {
                $('#error_lasmonth').parent().find('i').removeClass().addClass('ico-bad');
            }
            $('#error_lasmonth').html(ret["当月误差率"]);
            $('#aveerror_thrmonth').html(ret["3个月部门平均误差率"]);
            $('#errhotel_current').html(ret["当月误差酒店数"]);
            //$('#errhotel_total').html(ret["总家数"]);

        }, function () {
            new Tool().showStatus($('[id=Error_total]'), 'error');
        });
    },

    //加载误差酒店列表
    initerrortabledate: function (a, b, c, d) {
        var $ = jQuery,
            self = this,
            chart = new Chart(),
            tool = new Tool(),
            res;
        $('#errorpager').empty();
        //$('#hotelcounts').html("...");

        if (b != undefined)
            pageVar.errordescrow = b
        if (c != undefined)
            pageVar.errorpx = c
        if (d != undefined)
            pageVar.errortag_page = d
        new Tool().showStatus($('[id=ErrorTable]'), 'loading');
        self.request({ op: "GetErrorTable", pageno: a || 1, descrow: pageVar.errordescrow, px: pageVar.errorpx, tagpage: pageVar.errortag_page }, function (data) {
            var ret = data.data;
            if (!ret) return;
            $('#ErrorTable').html('');
            $.each(ret["tabledate"], function (k, v) {
                $('#ErrorTable').append(tool.initTable(v,
                    [{
                        index: [1],
                        callback: function (str) {
                            return '<a js-click="cont-link" href="Web/html/Finance/FinanceSingleHotel.aspx" data-hotelid="' + str + '" data-needback="true" data-page="error">' + str + '</a>';
                        }
                    },
                        {
                            index: [2],
                            callback: function (str) {
                                return '<span style="display: block;overflow: hidden;text-align: left;text-overflow: ellipsis;white-space: nowrap;width: 200px;" title="' + str + '" >' + str + '</span>';
                            }
                        },
                        {
                            index: [10],
                            callback: function (str) {
                                if (str != 0)
                                    return '<span>' + str + '</span>';
                                else {
                                    return '<span>-</span>';
                                }
                            }
                        }]));

            })
            if (pageVar.errortag_page == 0) {
                pageVar.errortotal = ret["totalcounts"];
                pageVar.errorhotelcount = ret["hotelcounts"];
            }
            $('#errorhotelcounts').html(pageVar.errorhotelcount);
            $('#errorAcountTotal').html(pageVar.errortotal);
            //$('#hotelcounts').html(pageVar.Get12Lenghotelcount_leave);
            Ctrip.Pager('#errorpager', { total: pageVar.errortotal, current: ret["pageno"], perpage: 20 }, function (p) {
                self.initerrortabledate(p, pageVar.errordescrow, pageVar.errorpx, pageVar.errortag_page);
            })
            $('#ErrorTable .loading').hide();
            pageVar.errortag_page = 0;
        }, function (data) {
            new Tool().showStatus($('[id=ErrorTable]'), 'error');
        })
    },

    initfollowtabledate: function (a, d) {

        var $ = jQuery,
            self = this,
            chart = new Chart(),
            tool = new Tool(),
            res;
        $('#followpager').empty();
        var enddate = self.getLastMonthLast();

        $('#followTitle').html($('td.followchoose').find("h4").text());

        var opname = "", linkurl = "";
        if ($('td.followchoose').attr('id') == "OrderOutOfSystem")
            linkurl = 'http://htlint.ctripcorp.com/OrderOperate/Order/OrderDetail/';
        else if ($('td.followchoose').attr('id') == "HotelNoticeUnfinished")
            linkurl = 'http://offline.order.audit.hotel.ctripcorp.com/AccHotelFG/Notice/HotelScheduledNotice.aspx?radarfinance=1&mrn=230&ms=W&stb=2014-01-01&cen={1}&ci={2}';
        else if ($('td.followchoose').attr('id') == "CSPMessageUnRead")
            linkurl = 'http://offline.order.audit.hotel.ctripcorp.com/Account-Vendor-SettlementWeb/EBooking/EBookingMessageBoard.aspx?TypeModel=S&PostSettlementProviderId={0}&SettlementProviderId={0}&MerchantID=6&SettlementItemID=602';
        else if ($('td.followchoose').attr('id') == "RefundProcessingDetail") {
            $('.off-tab').show();
            linkurl = 'http://offline.order.audit.hotel.ctripcorp.com/settlementacchotelpp/bill/FailureAccBillHeadList.aspx?module=5234';
        }
        else if ($('td.followchoose').attr('id') == "HotelInvoiceChanges")
            linkurl = 'http://offline.order.audit.hotel.ctripcorp.com/Account-Vendor-SettlementWeb/Provider/ProviderInvoiceTitle.aspx?SettlementProviderId={0}';
        else if ($('td.followchoose').attr('id') == "OrderOutOfBatch")
            linkurl = 'http://offline.order.audit.hotel.ctripcorp.com/Account-Vendor-SettlementWeb/TransitPage.aspx?type=cmo&companyid={2}';
        else if ($('td.followchoose').attr('id') == "HotelBatchNotClosed")
            linkurl = 'http://offline.order.audit.hotel.ctripcorp.com/Account-Vendor-SettlementWeb/Monitor/MonitorBatchList.aspx?MerchantID=6&OperateType=2&radarfinance=1&en={1}&begin=2000-01-01&end=' + enddate;
        else if ($('td.followchoose').attr('id') == "HotelInvoiceNotSubmitted")
            linkurl = 'http://offline.order.audit.hotel.ctripcorp.com/Account-Vendor-SettlementWeb/TransitPage.aspx?type=cd&companyID={0}&batchID={1}';
        else if ($('td.followchoose').attr('id') == "HotelSystemUneven")
            linkurl = 'http://offline.order.audit.hotel.ctripcorp.com/Account-Vendor-SettlementWeb/TransitPage.aspx?type=cd&companyID={0}&batchID={1}';
        else if ($('td.followchoose').attr('id') == "HotelAmountUnclaimed")
            linkurl = 'http://offline.order.audit.hotel.ctripcorp.com/Account-Vendor-SettlementWeb/Commission/CollectionBillList.aspx?radarfinance=1&ci={2}&rdbegin=2014-01-01';
        else
            linkurl = '';
        opname = "Get" + $('td.followchoose').attr('id') + "Table";

        //$('#hotelcounts').html("...");

        if (d != undefined)
            pageVar.followtag_page = d
        new Tool().showStatus($('[id=FollowTable]'), 'loading');
        self.request({ op: opname, pageno: a || 1, tagpage: pageVar.followtag_page }, function (data) {
debugger;
            var ret = data.result.hotelNoticeUnfinisheds;
            if (!ret) return;
            $('#FollowTable').html('');
            var ret_hotelcount=data.result.hotelcounts;
            var ret_totalcount=data.result.totalcounts;
            var ret_pageno = data.pageIndex;
            if (opname == 'GetCommissionBatchDetailTable') {

                $.each(ret, function (k, v) {

                    var SettlementProviderId, hotelid, UserName;
                    if (v["companyid"] != null && (v["companyid"]+'').indexOf('|') != -1) {
                        var arr = [];
                        arr = v["companyid"].split('|');
                        hotelid = arr[0];
                        SettlementProviderId = arr[1]
                    } else {
                        hotelid = v["companyid"];
                        SettlementProviderId = "";
                    }
                    UserName = ret["username"];
                    $('#FollowTable').append(tool.initTable(v,
                        [{
                            index: [1],
                            callback: function (str) {
                                if ($('td.followchoose').attr('id') == "HotelInvoiceNotSubmitted" || $('td.followchoose').attr('id') == "HotelSystemUneven" || linkurl == '') {
                                    return '<span>' + hotelid + '</span>';
                                } else if ($('td.followchoose').attr('id') == "OrderOutOfSystem") {
                                    return '<a href="' + linkurl + str + '" target="_blank">' + str + '</a>';
                                } else {
                                    return '<a href="' + Ctrip.format(linkurl, SettlementProviderId, UserName, hotelid) + '" target="_blank">' + hotelid + '</a>';
                                }
                            }
                        },
                            {
                                index: [2],
                                callback: function (str) {
                                    if ($('td.followchoose').attr('id') != "OrderOutOfSystem" && $('td.followchoose').attr('id') != "OrderOutOfBatch") {
                                        return '<span style="display: block;overflow: hidden;text-align: left;text-overflow: ellipsis;white-space: nowrap;width: 300px;" title="' + str + '" >' + str + '</span>';
                                    } else {
                                        return str;
                                    }
                                }
                            },
                            {
                                index: [3],
                                callback: function (str) {
                                    if ($('td.followchoose').attr('id') == "HotelAdvances") {
                                        return '<a href="' + 'http://htlint.ctripcorp.com/OrderOperate/Order/OrderDetail/' + str + '" target="_blank">' + str + '</a>';
                                    }
                                    else if ($('td.followchoose').attr('id') == "HotelInvoiceNotSubmitted" || $('td.followchoose').attr('id') == "HotelSystemUneven") {
                                        console.log(str);
                                        return '<a href="' + Ctrip.format(linkurl, hotelid, str.substr(str.indexOf(",批次ID") + 5)) + '" target="_blank">' + str.substring(0, str.indexOf(",批次ID")) + '</a>';
                                    } else if ($('td.followchoose').attr('id') == "OrderOutOfBatch") {
                                        return "<span>" + str + "</span>";
                                    } else {
                                        return str;
                                    }
                                }
                            },
                            {
                                index: [9],
                                callback: function (str) {
                                    if ($('td.followchoose').attr('id') == "OrderOutOfSystem") {
                                        return '<a href="' + 'http://offline.order.audit.hotel.ctripcorp.com/AccHotelFG/Modify/AccFGAccModifyCost.aspx?flag=S&orderid=' + str + '" target="_blank">修改底价</a>';
                                    } else if ($('td.followchoose').attr('id') == "OrderOutOfBatch") {
                                        return "<span>" + str + "</span>";
                                    } else {
                                        return str;
                                    }
                                }
                            },
                            {
                                index: [10],
                                callback: function (str) {
                                    if ($('td.followchoose').attr('id') == "OrderOutOfBatch") {
                                        return "<span>" + str + "</span>";
                                    } else {
                                        return str;
                                    }
                                }
                            }
                        ]));

                })
            } else {
                // $.each(ret["tabledate"], function (k, v) {
                $.each(ret, function (k, v) {
                    var SettlementProviderId, hotelid, UserName;
                    if (v["hotelID"] != null && v["hotelID"].indexOf('|') != -1) {
                        var arr = [];
                        arr = v["hotelID"].split('|');
                        hotelid = arr[0];
                        SettlementProviderId = arr[1]
                    } else {
                        hotelid = v["hotelID"];
                        SettlementProviderId = "";
                    }
                    UserName = ret["username"];
                    $('#FollowTable').append(tool.initTable(v,
                        [{
                            index: [1],

                            callback: function (str) {
                                if ($('td.followchoose').attr('id') == "HotelInvoiceNotSubmitted" || $('td.followchoose').attr('id') == "HotelSystemUneven" || linkurl == '') {
                                    return '<span>' + hotelid + '</span>';
                                } else if ($('td.followchoose').attr('id') == "OrderOutOfSystem") {
                                    return '<a href="' + linkurl + str + '" target="_blank">' + str + '</a>';
                                } else {
                                    return '<a href="' + Ctrip.format(linkurl, SettlementProviderId, UserName, hotelid) + '" target="_blank">' + hotelid + '</a>';
                                }
                            }
                        },
                            {
                                index: [2],
                                callback: function (str) {
                                    if ($('td.followchoose').attr('id') != "OrderOutOfSystem" && $('td.followchoose').attr('id') != "OrderOutOfBatch") {
                                        return '<span style="display: block;overflow: hidden;text-align: left;text-overflow: ellipsis;white-space: nowrap;width: 300px;" title="' + str + '" >' + str + '</span>';
                                    } else {
                                        return str;
                                    }
                                }
                            },
                            {
                                index: [3],
                                callback: function (str) {
                                    if ($('td.followchoose').attr('id') == "HotelAdvances") {
                                        return '<a href="' + 'http://htlint.ctripcorp.com/OrderOperate/Order/OrderDetail/' + str + '" target="_blank">' + str + '</a>';
                                    }
                                    else if ($('td.followchoose').attr('id') == "HotelInvoiceNotSubmitted" || $('td.followchoose').attr('id') == "HotelSystemUneven") {
                                        console.log(str);
                                        return '<a href="' + Ctrip.format(linkurl, hotelid, str.substr(str.indexOf(",批次ID") + 5)) + '" target="_blank">' + str.substring(0, str.indexOf(",批次ID")) + '</a>';
                                    } else if ($('td.followchoose').attr('id') == "OrderOutOfBatch") {
                                        return "<span>" + str + "</span>";
                                    } else {
                                        return str;
                                    }
                                }
                            },
                            {
                                index: [9],
                                callback: function (str) {
                                    if ($('td.followchoose').attr('id') == "OrderOutOfSystem") {
                                        return '<a href="' + 'http://offline.order.audit.hotel.ctripcorp.com/AccHotelFG/Modify/AccFGAccModifyCost.aspx?flag=S&orderid=' + str + '" target="_blank">修改底价</a>';
                                    } else if ($('td.followchoose').attr('id') == "OrderOutOfBatch") {
                                        return "<span>" + str + "</span>";
                                    } else {
                                        return str;
                                    }
                                }
                            },
                            {
                                index: [10],
                                callback: function (str) {
                                    if ($('td.followchoose').attr('id') == "OrderOutOfBatch") {
                                        return "<span>" + str + "</span>";
                                    } else {
                                        return str;
                                    }
                                }
                            }
                        ]));

                })
            }



            if (pageVar.followtag_page == 0) {

                if (opname == "GetHotelSystemUnevenTable" || opname == "GetHotelInvoiceNotSubmittedTable" || opname == "GetHotelAdvancesTable") {
                    pageVar.followtotal = ret["totalcounts"];

                }
                else {
                    if (opname == 'GetCommissionBatchDetailTable') {
                        pageVar.followtotal = ret_totalcount;
                        pageVar.followhotelcount = ret_hotelcount;
                    } else {
                        // pageVar.followtotal = ret["hotelcounts"];
                        // pageVar.followhotelcount = ret["hotelcounts"];
                        pageVar.followtotal = ret_totalcount;
                        pageVar.followhotelcount = ret_hotelcount;
                    }


                }

            }


            $('#followhotelcounts').html(pageVar.followhotelcount);

            if (!$("#isShowTotal").hasClass("false")) {
                $('#followAcountTotal').html( pageVar.followtotal);
            }

            //$('#hotelcounts').html(pageVar.Get12Lenghotelcount_leave);
            if (opname == 'GetCommissionBatchDetailTable') {
                Ctrip.Pager('#followpager', { total: pageVar.followtotal, current: ret_pageno ,perpage: 20 }, function (p) {
                    self.initfollowtabledate(p, pageVar.followtag_page);
                })
            } else {
                Ctrip.Pager('#followpager', { total: pageVar.followtotal, current: ret["pageno"], perpage: 20 }, function (p) {
                    self.initfollowtabledate(p, pageVar.followtag_page);
                })
            }

            $('#FollowTable .loading').hide();
            pageVar.followtag_page = 0;
        }, function (data) {
            new Tool().showStatus($('[id=FollowTable]'), 'error');
        })
    },

    FollowTotal: function () {
        var self = this,
            $ = jQuery,
            ret;
//        chart = new Chart();

        $('#OrderOutOfSystem').find('p').html("1258");
        $('#HotelNoticeUnfinished').find('p').html("259");
        $('#CSPMessageUnRead').find('p').html("39");
        $('#RefundProcessingDetail').find('p').html("258");
        $('#HotelInvoiceChanges').find('p').html("589");
        $('#HotelAdvances').find('p').html("240");

        $('#OrderOutOfBatch').find('p').html("5932");
        $('#HotelBatchNotClosed').find('p').html("235");
        $('#HotelInvoiceNotSubmitted').find('p').html("366");
        $('#HotelSystemUneven').find('p').html("350");
        $('#HotelAmountUnclaimed').find('p').html("129");
        $('#CommissionBatchDetail').find('p').html("789");

        self.request({ op: 'GetFollowTotal' }, function (data) {
        debugger;
            ret = data.result[0];

//            $('#OrderOutOfSystem').find('p').html(ret["orderOutOfSystem"]);
                                                                                       //            $('#HotelNoticeUnfinished').find('p').html(ret["hotelNoticeUnfinished"]);
                                                                                       //            $('#CSPMessageUnRead').find('p').html(ret["cspmessageUnRead"]);
                                                                                       //            $('#RefundProcessingDetail').find('p').html(ret["refundProcessingDetail"]);
                                                                                       //            $('#HotelInvoiceChanges').find('p').html(ret["hotelInvoiceChanges"]);
                                                                                       //            $('#HotelAdvances').find('p').html(ret["hotelAdvances"]);
                                                                                       //
                                                                                       //            $('#OrderOutOfBatch').find('p').html(ret["orderOutOfBatch"]);
                                                                                       //            $('#HotelBatchNotClosed').find('p').html(ret["hotelBatchNotClosed"]);
                                                                                       //
                                                                                       //            $('#HotelInvoiceNotSubmitted').find('p').html(ret["hotelInvoiceNotSubmitted"]);
                                                                                       //            $('#HotelSystemUneven').find('p').html(ret["hotelSystemUneven"]);
                                                                                       //            $('#HotelAmountUnclaimed').find('p').html(ret["hotelAmountUnclaimed"]);
                                                                                       //            $('#CommissionBatchDetail').find('p').html(ret["commissionBatchDetail"]);


$('#OrderOutOfSystem').find('p').html(5);
            $('#HotelNoticeUnfinished').find('p').html(6);
            $('#CSPMessageUnRead').find('p').html(24);
            $('#RefundProcessingDetail').find('p').html(28);
            $('#HotelInvoiceChanges').find('p').html(3306);
            $('#HotelAdvances').find('p').html(259);

            $('#OrderOutOfBatch').find('p').html(298);
            $('#HotelBatchNotClosed').find('p').html(ret["hotelBatchNotClosed"]);

            $('#HotelInvoiceNotSubmitted').find('p').html(ret["hotelInvoiceNotSubmitted"]);
            $('#HotelSystemUneven').find('p').html(ret["hotelSystemUneven"]);
            $('#HotelAmountUnclaimed').find('p').html(ret["hotelAmountUnclaimed"]);
            $('#CommissionBatchDetail').find('p').html(ret["commissionBatchDetail"]);
            //Ctrip.getWatermarkUrl($('#HotelNoticeUnfinished'), '', "#b2bcca", '实时', "30px 20px", "auto 300px");
            //Ctrip.getWatermarkUrl($('#CSPMessageUnRead'), '', "#b2bcca", '实时', "30px 20px", "auto 300px");

        }, function () {
            new Tool().showStatus($('[id=Follow_total]'), 'error');
        });
    },

    /**
     * 统一请求
     *
     */
    request: function (data, success, error) {


        var self = this,
            $ = jQuery,
            list_status = [],
            list_bookable = [];

        $('[name="bookingbatchauditstatus"]:checked').each(function () {
            list_status.push($(this).val());
        });
        $('[name="isbookable"]:checked').each(function () {
            list_bookable.push($(this).val());
        });

        if ($('[js-click="changeTab"].current').data('id') == "2") {
            if (isNaN($('[name="condtion_ta_commission"]').val()) || isNaN($('[name="condtion_tb_commission"]').val())) {
                alert("请输入正确的金额");
                $('.loading').hide();
                return;
            }
            data = $.extend({
                commissiom: self.getBothValue('[name="condtion_ta_commission"]', '[name="condtion_tb_commission"]'),
                reconciliation: self.getBothValue('[name="condtion_na_reconciliation"]', '[name="condtion_nb_reconciliation"]'),
                remittancecycle: self.getBothValue('[name="condtion_na_remittancecycle"]', '[name="condtion_nb_remittancecycle"]'),
                bookingbatchauditstatus: list_status.join(','),
                isbookable: list_bookable.join(',')
            }, data);
        }
        else {
            if ($('[js-click="changeTab"].current').data('id') == "4") {
                if (isNaN($('[name="condtion_ta_outstandingamount"]').val()) || isNaN($('[name="condtion_tb_outstandingamount"]').val())) {
                    alert("请输入正确的金额");
                    $('.loading').hide();
                    return;
                }

                data = $.extend({
                    outstandingamount: self.getBothValue('[name="condtion_ta_outstandingamount"]', '[name="condtion_tb_outstandingamount"]'),
                    outstandingbatchenum: self.getBothValue('[name="condtion_na_outstandingbatchenum"]', '[name="condtion_nb_outstandingbatchenum"]')
                }, data);
            }
        }

        console.log("cur");
        if ($('.followchoose').id = "RefundProcessingDetail") {
            console.log("cur");
            data = $.extend({
                update: $('.off-tab .cur').data("value")
            }, data);
            console.log(data);
        }


        $.ajax({
            type: "post",
            dataType: "application/json;charset=UTF-8",
            url: '/finance/FinanceHtl/'+data.op,
            data: data,
            success: function (data) {
debugger;
                if (data.code == 'A0001') {

                    success && success(data);
                } else {


                    $('#adjusthotelcounts').html(0);
                    $('#adjustAcountTotal').html(0);

                    error && error(data);

                }

            },
            error: function (data) {
                console.log('ERR----', data);
                error && error(data);
            },
            complete: function () {
                //self.N = self.N + 1;
                //if (self.N == self.Count) {
                //    $('[js-click="searchBtn"]').removeClass('btn-dis');
                //}
            }
        });

    },
    getBothValue: function (obj1, obj2) {
        if ($(obj1).val() == '' && $(obj2).val() == '') {
            return '';
        }
        var s = [];
        if ($(obj1).val()) {
            s.push($(obj1).val());
        }
        if ($(obj2).val()) {
            s.push($(obj2).val());
        }
        return s.join(',');
    },
    getItem: function (type, valueSuffix, yAxis) {
        return {
            type: type || 'column',
            yAxis: yAxis || 0,
            data: [],
            tooltip: {
                valueSuffix: valueSuffix || ''
            }

        }
    },
    getLastMonthLast: function () {
        var nowdays = new Date();
        var year = nowdays.getFullYear();
        var month = nowdays.getMonth();
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        if (month < 10) {
            month = "0" + month;
        }
        //var firstDay = year + "-" + month + "-" + "01";//上个月的第一天
        var myDate = new Date(year, month, 0);
        return lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天
    }

};

jQuery(document).ready(function () {
    var $ = jQuery;
    pageVar.init();

    //下载
    $('[js-click="pdfBtn2"]').click(function (e) {
        var list_status = [],
            list_bookable = [];

        $('[name="bookingbatchauditstatus"]:checked').each(function () {
            list_status.push($(this).val());
        });
        $('[name="isbookable"]:checked').each(function () {
            list_bookable.push($(this).val());
        });
        if (isNaN($('[name="condtion_ta_commission"]').val()) || isNaN($('[name="condtion_tb_commission"]').val())) {
            alert("请输入正确的金额");
            $('.loading').hide();
            return;
        }

        var commissiom = pageVar.getBothValue('[name="condtion_ta_commission"]', '[name="condtion_tb_commission"]'),
            reconciliation = pageVar.getBothValue('[name="condtion_na_reconciliation"]', '[name="condtion_nb_reconciliation"]'),
            remittancecycle = pageVar.getBothValue('[name="condtion_na_remittancecycle"]', '[name="condtion_nb_remittancecycle"]'),
            bookingbatchauditstatus = list_status.join(','),
            isbookable = list_bookable.join(',');
        window.open("Services/Finance/Finance.ashx?op=DownLoadReconciliationTable&commissiom=" + commissiom + "&reconciliation=" + reconciliation + "&remittancecycle=" + remittancecycle + "&bookingbatchauditstatus=" + bookingbatchauditstatus + "&isbookable=" + isbookable);
    });

    $('[js-click="pdfBtn4"]').click(function (e) {
        if (isNaN($('[name="condtion_ta_outstandingamount"]').val()) || isNaN($('[name="condtion_tb_outstandingamount"]').val())) {
            alert("请输入正确的金额");
            $('.loading').hide();
            return;
        }
        var outstandingamount = pageVar.getBothValue('[name="condtion_ta_outstandingamount"]', '[name="condtion_tb_outstandingamount"]'),
            outstandingbatchenum = pageVar.getBothValue('[name="condtion_na_outstandingbatchenum"]', '[name="condtion_nb_outstandingbatchenum"]')

        window.open("Services/Finance/Finance.ashx?op=DownLoadDebtTable&outstandingamount=" + outstandingamount + "&outstandingbatchenum=" + outstandingbatchenum);
    });
    $('[js-click="pdfBtn5"]').click(function (e) {

        var isdelete = [], adjustname = [], groupname = [], employeename = [], begindate = [], enddate = [];
        $('[name="isdelete"]:checked').each(function () {
            isdelete.push($(this).val());
        });
        $('[id="adjustname"]').each(function () {
            adjustname.push($(this).val());
        });
        $('[id="groupname"]').each(function () {
            groupname.push($(this).val());
        });
        $('[id="employeename"]').each(function () {

            employeename.push($(this).val());
        });
        $('[id="begindate"]').each(function () {

            begindate.push($(this).val());
        });
        $('[id="enddate"]').each(function () {
            enddate.push($(this).val());
        });





        window.open("Services/Finance/Finance.ashx?op=DownLoadAdjusTable&isdelete=" + isdelete[0] + "&adjustname=" + adjustname + "&groupname=" + groupname + "&employeename=" + employeename + "&begindate=" + begindate + "&enddate=" + enddate);
    });

    $('[js-click="pdfBtn3"]').click(function (e) {

        window.open("Services/Finance/Finance.ashx?op=DownLoadErrorTable");
    });

    $('[js-click="pdfBtn1"]').click(function (e) {
        var tablename = $('td.followchoose').attr('id');
        if (tablename == "RefundProcessingDetail") {
            var update = $('.off-tab .cur').data("value");
            window.open("Services/Finance/Finance.ashx?op=DownLoadFollowTable&tablename=" + tablename + "&update=" + update);
        } else {
            window.open("Services/Finance/Finance.ashx?op=DownLoadFollowTable&tablename=" + tablename);
        }
    });


    $('[js-click="showAdvancedOpts"]').click(function () {
        var $self = $(this);
        $('.condition-box').slideToggle(function () {
            $self.toggleClass('up');
        });

    });
    $('[js-click="clear"]').click(function () {
        $(this).parent().find('input').val('');
    });
    $('[js-click="conditionOk"]').click(function (e) {
        var flag = new Validate().checkNumber($('[name^=condtion_]'), "请输入正确数字", 3, true);
        if (flag && !$(this).hasClass('btn-dis')) {
            if ($('[js-click="changeTab"].current').data('id') == "2") {
                pageVar.inittabledate();
                $('.off-screen-cont').click();
            }
            else {
                if ($('[js-click="changeTab"].current').data('id') == "4") {
                    pageVar.initdebttabledate();
                    $('.off-screen-cont').click();
                }
                if ($('[js-click="changeTab"].current').data('id') == "5") {

                    pageVar.initAdjustTable();
                    $('.off-screen-cont').click();
                }
            }

        } else {
            alertErr("输入正确的格式！");
        }
    })

    $('#ajax-content table .sort').click(function () {
        if ($('[js-click="changeTab"].current').data('id') == "2") {
            var $target = $(this).find('i');
            $target.hasClass("sort-down") ? pageVar.inittabledate(1, $target.data('value'), 2, 1) : pageVar.inittabledate(1, $target.data('value'), 1, 1);
            $(this).siblings().find('i').removeClass();
            if (!$target.hasClass('sort-up')) {
                $target.addClass('sort-up')
            }
            $target[$target.hasClass("sort-down") ? 'removeClass' : 'addClass']("sort-down")
        }
        else if ($('[js-click="changeTab"].current').data('id') == "3") {
            var $target = $(this).find('i');
            $target.hasClass("sort-down") ? pageVar.initerrortabledate(1, $target.data('value'), 2, 1) : pageVar.initerrortabledate(1, $target.data('value'), 1, 1);
            $(this).siblings().find('i').removeClass();
            if (!$target.hasClass('sort-up')) {
                $target.addClass('sort-up')
            }
            $target[$target.hasClass("sort-down") ? 'removeClass' : 'addClass']("sort-down")
        }
        else if ($('[js-click="changeTab"].current').data('id') == "4") {
            var $target = $(this).find('i');
            $target.hasClass("sort-down") ? pageVar.initdebttabledate(1, $target.data('value'), 2, 1) : pageVar.initdebttabledate(1, $target.data('value'), 1, 1);
            $(this).siblings().find('i').removeClass();
            if (!$target.hasClass('sort-up')) {
                $target.addClass('sort-up')
            }
            $target[$target.hasClass("sort-down") ? 'removeClass' : 'addClass']("sort-down")
        }
        else if ($('[js-click="changeTab"].current').data('id') == "5") {
            var $target = $(this).find('i');
            $target.hasClass("sort-down") ? pageVar.initAdjustTable(1, $target.data('value'), 2, 1) : pageVar.initAdjustTable(1, $target.data('value'), 1, 1);
            $(this).siblings().find('i').removeClass();
            if (!$target.hasClass('sort-up')) {
                $target.addClass('sort-up')
            }
            $target[$target.hasClass("sort-down") ? 'removeClass' : 'addClass']("sort-down")
        }


    })

    $(function () {
        new Tool().limitKeys({ target: '[name^=condtion_n]', type: 'number' }, setValue);
        new Tool().limitKeys({ target: '[name^=condtion_p]', type: 'pocy', max: 100 }, setValue);
        new Tool().limitKeys({ target: '[name^=condtion_t]', type: 'pocy', decimal: 2, max: Number.MAX_VALUE, min: -Number.MAX_VALUE }, setValue);

        function setValue() {
            var objs = $(this).parent().find('input[type="text"]'),
                val1 = objs.eq(0).val(),
                val2 = objs.eq(1).val();
            if (val1 != '' && val2 != '') {
                objs.eq(0).val(Math.min(val1, val2));
                objs.eq(1).val(Math.max(val1, val2));
            }
            if (val2 && val1 == '') {
                objs.eq(0).val(0);
            }
        }
    })

    $('.devoops_tabsa').on('click', '[js-click="changeTab"]', function (e) {
        $(this).addClass('current').siblings().removeClass('current');
        $('[js-text="tab1"]').hide();
        $('[js-text="tab2"]').hide();
        $('[js-text="tab3"]').hide();
        $('[js-text="tab4"]').hide();
        $('[js-text="tab5"]').hide();
        $('[js-text="tab' + $(this).data('id') + '"]').show();


        if ($(this).data('id') == "1") {
            $('#Follow_total tbody').find('tr').find('td').removeClass('followchoose')
            $('#Follow_total tbody').find('tr:first').find('td:first').addClass('followchoose');
            $("#isShowTotal").removeClass("false");
            $("#isShowTotal").show();
            $("#followMeasureWords").html("单，");
            $("#isShowTotal").removeClass("false");
            $("#isShowTotal").show();
            $("#followMeasureWords").html("单，");
            $('#follow_charts_box').find('tr').html('<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>预订通知未完成条数</th>');
        }

        pageVar.init();
    });

    $('.follow_tabs').on('click', '[js-click="changeFollowTab"]', function (e) {
        $('.off-tab').hide();
        $(this).parent().siblings('tr').children().removeClass('followchoose');
        $(this).addClass('followchoose').siblings().removeClass('followchoose');

        $('#followTitle').html($(this).find("h4").text());
        $('#follow_charts_box').find('tr').empty();

        //十二个需跟进表格表头
        var OrderOutOfSystemHeader = '<th>序号</th><th>订单号</th><th>入住时间</th><th>离店时间</th><th>面价</th><th>底价</th><th>佣金</th><th>间夜量</th><th>单位佣金</th><th>操作</th>';//'<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>系统外订单</th>'
        var HotelNoticeUnfinishedHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>预订通知未完成条数</th>';
        var CSPMessageUnReadHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>EBK留言处理未完成条数</th>';
        var RefundProcessingDetailHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>付款单号数</th><th>进入时间</th>';
        var HotelInvoiceChangesHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>发票修改申请数</th>';
        var HotelAdvancesHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>订单号</th><th>垫款合计金额</th><th>垫款最早进入时间</th>';

        var OrderOutOfBatchHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>订单号</th><th>入住时间</th><th>离店时间</th><th>佣金结算周期</th><th>按月</th><th>订单进入批次外时间</th><th>结算员</th><th>组别</th><th>集团</th><th>省份</th><th>城市</th>';//'<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>现付批次外订单数</th>';
        var HotelBatchNotClosedHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th>';
        var HotelInvoiceNotSubmittedHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>批次名称</th>';
        var HotelSystemUnevenHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>批次名称</th>';
        var HotelAmountUnclaimedHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>明款未领用金额</th>';
        var CommissionBatchDetailHeader = '<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>批量发送方式</th><th>现付对账邮箱</th><th>现付对账传真</th><th>发送状态</th><th>失败原因</th>';

        //前六个需跟进表格
        if ($(this).attr("id") == "OrderOutOfSystem") {
            $("#isShowTotal").removeClass("false");
            $("#isShowTotal").show();
            $("#followMeasureWords").html("单，");
            $('#follow_charts_box').find('tr').html(OrderOutOfSystemHeader);
        }

        if ($(this).attr("id") == "HotelNoticeUnfinished") {
            $("#isShowTotal").removeClass("false");
            $("#isShowTotal").show();
            $("#followMeasureWords").html("条，");
            $('#follow_charts_box').find('tr').html(HotelNoticeUnfinishedHeader);
        }

        if ($(this).attr("id") == "CSPMessageUnRead") {
            $("#isShowTotal").removeClass("false");
            $("#isShowTotal").show();
            $("#followMeasureWords").html("条，");
            $('#follow_charts_box').find('tr').html(CSPMessageUnReadHeader);
        }

        if ($(this).attr("id") == "RefundProcessingDetail") {
            $("#isShowTotal").addClass("false");
            $("#isShowTotal").hide();
            $('#follow_charts_box').find('tr').html(RefundProcessingDetailHeader);
            $('.off-tab').show();
        }

        if ($(this).attr("id") == "HotelInvoiceChanges") {
            $("#isShowTotal").removeClass("false");
            $("#isShowTotal").show();
            $("#followMeasureWords").html("条，");
            $('#follow_charts_box').find('tr').html(HotelInvoiceChangesHeader);
        }

        if ($(this).attr("id") == "HotelAdvances") {
            $("#isShowTotal").removeClass("false");
            $("#isShowTotal").show();
            $('#follow_charts_box').find('tr').html(HotelAdvancesHeader);
        }


        //后六个需跟进表格
        if ($(this).attr("id") == "OrderOutOfBatch") {

            $("#isShowTotal").removeClass("false");
            $("#isShowTotal").show();
            $("#followMeasureWords").html("单，");
            $('#follow_charts_box').find('tr').html(OrderOutOfBatchHeader);
        }

        if ($(this).attr("id") == "HotelBatchNotClosed") {
            $("#isShowTotal").addClass("false");
            $("#isShowTotal").hide();
            $('#follow_charts_box').find('tr').html(HotelBatchNotClosedHeader);
        }

        if ($(this).attr("id") == "HotelInvoiceNotSubmitted") {
            $("#isShowTotal").addClass("false");
            $("#isShowTotal").hide();
            $('#follow_charts_box').find('tr').html(HotelInvoiceNotSubmittedHeader);
        }

        if ($(this).attr("id") == "HotelSystemUneven") {
            $("#isShowTotal").addClass("false");
            $("#isShowTotal").hide();
            $('#follow_charts_box').find('tr').html(HotelSystemUnevenHeader);
        }

        if ($(this).attr("id") == "HotelAmountUnclaimed") {
            $("#isShowTotal").addClass("false");
            $("#isShowTotal").hide();
            $('#follow_charts_box').find('tr').html(HotelAmountUnclaimedHeader);
        }

        if ($(this).attr("id") == "CommissionBatchDetail") {

            $("#isShowTotal").addClass("false");
            $("#isShowTotal").hide();
            $('#follow_charts_box').find('tr').html(CommissionBatchDetailHeader);
        }
        pageVar.initfollowtabledate();

    });

    //$("#OrderOutOfSystem").click(function () {
    //    $('.charts_box').find('tr').empty().html('<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>系统外订单</th>');

    //});

    //$("#HotelNoticeUnfinished").click(function () {
    //    $('.charts_box').find('tr').empty().html('<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>预订通知未完成条数</th>');

    //});

    //$("#CSPMessageUnRead").click(function () {
    //    $('.charts_box').find('tr').empty().html('<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>EBK留言处理未完成条数</th>');
    //});

    //$("#RefundProcessingDetail").click(function () {
    //    $('.charts_box').find('tr').empty().html('<th>序号</th><th>酒店ID</th><th style="width: 150px">酒店名称</th><th>付款单号数</th><th>进入时间</th>');
    //});

    //退票未处理 - 已更新/未更新
    $('.returnUpdate').click(function () {
        $('.returnUpdate').removeClass("cur");
        $(this).addClass("cur");
        pageVar.initfollowtabledate();
    })

});

