//@ sourceURL=script/apps/pages/permission/user.js
var pageVar = {
    tablefirst: 1,
    tableRolefirst: 1,
    confirmNum:0,
    editor:null,
    initTableDate: function (data) {
        var ajaxData1 = data || {
            "data": []
        };
        var table = document.querySelector('table[grid-manager="UserList"]');

        table.GM('init', {
            supportRemind: true
            , height: 'auto'
            , i18n: 'zh-cn'
            , textConfig: {
                'page-go': {
                    'zh-cn': '跳转',
                    'en-us': 'Go '
                }
            }
            , supportSetTop: false
            , gridManagerName: 'UserList'
            , disableCache: true  //是否禁用记忆功能
            , disableOrder: false
            , supportSorting: true
            , supportCheckbox: false  //是否禁用全选
            , supportDrag: true
            , supportAjaxPage: true
            , supportAutoOrder: false
            , emptyTemplate: '<div class="gm-emptyTemplate">什么也没有</div>'
            , ajax_data: ajaxData1
            , isCombSorting: false
            , pageSize: 20
            , columnData: [
                {
                    key: 'id',
                    width: '80px',
                    align: 'center',
                    text: '酒店ID'
                }, {
                    key: 'name',
                    width: '80px',
                    align: 'center',
                    text: '酒店名称'
                }, {
                    key: 'cbd',
                    width: '80px',
                    align: 'center',
                    text: '商圈'
                }, {
                    key: 'city',
                    width: '80px',
                    align: 'center',
                    text: '城市'
                }, {
                    key: 'rank',
                    width: '80px',
                    align: 'center',
                    text: '酒店排名'
                }, {
                    key: 'star',
                    width: '80px',
                    align: 'center',
                    text: '星级'
                }, {
                    key: '',
                    width: '200px',
                    align: 'center',
                    text: '编辑',
                    template: function (operation, rowObject) {  //operation:当前key所对应的单条数据；rowObject：单个一行完整数据
                        return '<button style=" margin-left:10px;" data-userid="' + rowObject.id + '" data-operation="editPage" type="button" class="btn btn-primary" data-toggle="modal" data-target="#compose-modal"><span>修改</span></button>' +
                            '<button style=" margin-left:10px;" data-userid="' + rowObject.id + '" data-operation="deletePage" type="button" class="btn btn-primary"><span>删除</span></button>'
                    },
                }]
            , pagingBefore: function (query) {
                console.log('Event: 分页前', query);
            }
            , pagingAfter: function (query) {
                pageVar.loadData(query.cPage);
            }
            , sortingBefore: function (query) {
                console.log('Event: 排序前', query);
            }
            , sortingAfter: function (query) {
                console.log('Event: 排序后', query);
            }
            , ajax_success: function (data) {
                console.log('Event: ajax_success', data);
            }
        }, function (query) {
            // 渲染完成后的回调函数
            console.log(query);
        });
    },
    loadData: function (page) {
        var self = this,
            obj = $('table[grid-manager]'),
            pagename = $("#J_UserNumber").val() || '',
            container = $("#ajax-content .charts_box");

//        new Tool().showStatus(container, 'loading');
        self.request("list", {
            pagename: pagename,
            PageIndex: page || 1,
        }, function (data) {
            var ret = data.result;
            if (!ret) return;
            // debugger
            if (pageVar.tablefirst) {
                pageVar.tablefirst = false;
                pageVar.initTableDate({"data": ret, "totals":100});
            } else {
                var table = document.querySelector('table[grid-manager="UserList"]');
                table.GM('setAjaxData', {"data": ret, "totals": 100});
            }

            $('#ajax-content .box-content button').click(function () {
                var pageId = $(this).attr('data-userid');
                $('#txtSelectedUserID').val(pageId);
                if ($(this).data('operation') == 'editPage') {

                    $('#compose-modal').html($('#J_template_editUser').text());


                    // $('#txtURL').html('<input type="text" id="txtURL" class="form-control" style="width:450px" readonly />');


                    $('#J_SaveUser').click(function () {
                        self.updatePage(pageId);
                    });
                    self.loadSingleUserByID(pageId);

                } else if ($(this).data('operation') == 'deletePage') {

                    if (confirm("是否确认删除？")) {
                        self.deletePage(pageId);
                    }
                }
                self.loadData();
            });

            container.find('.loading').remove();
        }, function (data) {
            var table = document.querySelector('table[grid-manager="UserList"]');
            table.GM('setAjaxData', {"data": [], "totals": ''});
        })
    },


    loadSingleUserByID: function (userID) {
        var self = this;
        self.request("single", {
            id: userID
        }, function (data) {
            var ret = data.result.data[0];
            if (!ret) return;
            $('#txtID').val(ret.pagename);
            $('#txtName').val(ret.URL);
            $('#txtzone').val(ret.pagename);
            $('#txtstar').val(ret.URL);
            $('#txtRank').val(ret.pagename);
            $('#txtPerson').val(ret.URL);
            $('#txtPhone').val(ret.pagename);
            $('#txtTime').val(ret.URL);
            $('#txtpagedesc').val(ret.URL);
            $('#txtpagedesc').attr('disabled',true)
            // var editor;
            pageVar.editor = KindEditor.create('textarea[name="contentzjp"]', {
                resizeType : 1,
                allowPreviewEmoticons : false,
                allowImageUpload : false,
                items : [
                    'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                    'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                    'insertunorderedlist', '|', 'emoticons', 'image', 'link']
            });
            pageVar.editor.html(ret.pagedesc);
            // $('#txtpagedesc').html(ret.pagedesc);
            $('#txtTP').val(ret.TP);
        }, function (data) {

        });
    },

    saveUser: function () {
        var self = this;

        self.request("edit", {
            ID: $('#txtID').val(),
            Name: $('#txtName').val(),
            zone: $('#txtzone').val(),
            star: $('#txtstar').val(),
            Rank: $('#txtRank').val(),
            Person: $('#txtPerson').val(),
            Phone: $('#txtPhone').val(),
            Time: $('#txtTime').val(),

             pagedesc: pageVar.editor.html(),
            // pagedesc:editor.val()
        }, function (data) {
            var ret = data.result;
            if (ret) {
                Ctrip.ShowMessage(data.msg);
                $('#compose-modal').html($('#J_template_editUser').text());
                pageVar.loadData();
            } else {
                Ctrip.ShowMessage("保存失败");
            }
            setTimeout(function () { $('.btn-danger').trigger('click'); }, 1000);
        }, function (data) {
            Ctrip.ShowMessage("保存失败");
        });
    },
    updatePage: function (pageid) {
        var self = this;
        self.request("updatePage", {
            pagename: $('#txtpagename').val(),
            URL: $('#txtURL').val(),
            TP: $('#txtTP').val(),
            pagedesc: pageVar.editor.html(),
            pageid: pageid
        }, function (data) {
            var ret = data.result;
            if (ret) {
                $('#compose-modal').html($(''));
                Ctrip.ShowMessage(data.msg);
                $('#compose-modal').html($('#J_template_editUser').text());
                setTimeout(function () { $('.btn-danger').trigger('click'); }, 1000);
                pageVar.loadData();
            } else {
                Ctrip.ShowMessage("保存失败");
            }
        }, function (data) {
            Ctrip.ShowMessage("保存失败");
        });

    },
    deletePage: function (pageid) {
        var self = this;
        self.request("deletePage", {
            pageid: pageid
        }, function (data) {
            var ret = data.result;
            if (ret) {
                Ctrip.ShowMessage(data.msg);
                pageVar.loadData();
            } else {
                Ctrip.ShowMessage("删除失败");
            }
        }, function (data) {
            Ctrip.ShowMessage("删除失败");
        });
    },
    /**
     * 统一请求
     *
     */
    request: function (action, data, success, error) {
        var self = this,
            $ = jQuery;
        $.ajax({
            type: "post",
            dataType: "json",
            //url: '/select/hotels' + action,
            url: '/basichotel/'+action,
            data: data,
            success: function (data) {
                if (data.code == 'A0001' || data.code == 'B0001') {
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
    },
    doAddPage: function (page) {

    },
    requestJson: function (action, data, success, error) {
        var self = this;
        // debugger;
        $ = jQuery;
        $.ajax({
            type: "post",
            dataType: "json",
            processData: false,
            contentType: "application/json; charset=utf-8",
            url: '/powerManagement/pageDetail/' + action,
            data: JSON.stringify(data),
            success: function (data) {
                if (data.code == 'A0001' || data.code == 'B0001') {
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
    pageVar.loadData();

    $('#J_UserNumber').bind("keypress", function (event) {
        if (event.keyCode == 13) {
            pageVar.loadData();
        }
    });
    $('[js-click="searchBtn"]').click(function () {
        pageVar.loadData();
    });
    $('#J_addPage').click(function () {
        $('#txtSelectedUserID').val('');
        $('#compose-modal').html($('#J_template_editUser').text());
        // var editor;
        // debugger
        // KindEditor.ready(function(K) {
        //     debugger
        pageVar.editor = KindEditor.create('textarea[name="contentzjp"]', {
            resizeType : 1,
            allowPreviewEmoticons : false,
            allowImageUpload : false,
            items : [
                'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist', '|', 'emoticons', 'image', 'link']
        });
        // });
        debugger
        $('#J_SaveUser').click(function () {

            if (!$('#txtpagename').val()) {
                Ctrip.ShowMessage("酒店ID不可为空");
            } else if (!$('#txtURL').val()) {
                Ctrip.ShowMessage("酒店名称不可为空");
            } else {
                // debugger
                if(pageVar.confirmNum==1){
                    pageVar.saveUser();
                    pageVar.confirmNum=0
                }else{
                    Ctrip.ShowMessage("URL保存后不可修改，请确认URL正确！");
                    pageVar.confirmNum++
                }
            }


        });

    });


    $('body').on('change', '#selSystemID', function () {
        var uid = $('#treeUserPermission').attr('data-id');
        pageVar.LoadUserPermission(uid)
    })
});