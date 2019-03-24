
var pageVar = {
    tablefirst: 1,
    tableRolefirst: 1,

    initdebttabledate: function (a, b, c, d) {
        var $ = jQuery,
            self = this,

            res;
            debugger;
            id_search = $("#J_UserNumber").val() || '',
        $('#debtpager').empty();

       self.request("detaillist", {
                   id_search: id_search,
               }, function (data)   {

            var ret = data.result;
            if (!ret) return;
            $('#DebtTable').html('');
            if (ret.AbroadGroup == "True") {
                $('.abroadGroup').show();
            } else {
                $('.abroadGroup').hide();
            }
            $.each(ret.GetFollowTotal, function (k, v) {

                    $("#DebtTable").append($('<tr/>')
                   				.append($('<td/>').html(v.orderID))
                   				.append($('<td/>').html(v.userID))
                   			    .append($('<td/>').html(v.roomID))
                   			    .append($('<td/>').html(v.source))
                                   .append($('<td/>').html(v.maxPrice))
                                   .append($('<td/>').html(v.minPrice))
                                   .append($('<td/>').html(v.updateDate))

                           );


            })
            if (pageVar.debttag_page == 0) {
                pageVar.debttotal = ret["totalcounts"];
                pageVar.debthotelcount = ret["hotelcounts"];
            }
            $('#debthotelcounts').html(pageVar.debthotelcount);
            $('#debtAcountTotal').html(pageVar.debttotal);
            //$('#hotelcounts').html(pageVar.Get12Lenghotelcount_leave);

            $('#DebtTable .loading').hide();
            pageVar.debttag_page = 0;
        }, function (data) {
            new Tool().showStatus($('[id=DebtTable]'), 'error');
        })

    },

    /**
     * 统一请求
     *
     */
    request: function (action,data, success, error) {
        debugger;
        var self = this,
            $ = jQuery;
        $.ajax({
            type: "post",
            dataType: "json",
            // url: 'permission/user/' + action,
            url: '/warnPrice/warnpricegreylist/detaillist',
            data: data,

            success: function (data) {
            debugger;
                if (data.code == 'A0001') {
                    success && success(data);
                } else {
                    error && error(data);
                }
            },
            error: function (data) {
              debugger;
                console.log('ERRwarn', data);

                success && success(data);
                error && error(data);
            },
            complete: function () {
                $(window).trigger('resize');
            }
        });
    },
    requestJson: function (action, data, success, error) {
        var self = this,
            $ = jQuery;
        $.ajax({
            type: "post",
            dataType: "json",
            processData: false,
            contentType: "application/json; charset=utf-8",
            // url: '/permission/user/' + action,
            url: 'warnPrice/warnpricegreylist/detaillist',
            data: JSON.stringify(data),
            success: function (data) {
                if (data.code == 'A0001') {
                    success && success(data);
                } else {
                    error && error(data);
                }
            },
            error: function (data) {
                console.log('ERR----', data);
                error && error(data);
            },
            complete: function () {
                $(window).trigger('resize');
            }
        });
    }
};

$(function () {
    pageVar.initdebttabledate();

    $('#J_UserNumber').bind("keypress", function (event) {
        if (event.keyCode == 13) {
            pageVar.initdebttabledate();
        }
    })
    $('[js-click="searchBtn"]').click(function () {
        pageVar.initdebttabledate();
    })

});