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
                    key: 'name',
                    width: '80px',
                    align: 'center',
                    text: '用户名'

                }, {
                    key: 'pass',
                    width: '80px',
                    align: 'center',
                    text: '用户密码'
                }, {
                    key: 'realName',
                    width: '80px',
                    align: 'center',
                    text: '用户姓名'
                }, {
                    key: 'email',
                    width: '80px',
                    align: 'center',
                    text: '用户邮箱'
                }, {
                    key: 'permission',
                    width: '80px',
                    align: 'center',
                    text: '用户权限'
                }, {
                    key: 'dept',
                    width: '80px',
                    align: 'center',
                    text: '部门'
                }, {
                    key: '',
                    width: '150px',
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
            idSer= $("#J_UserNumber").val() || '',
            container = $("#ajax-content .charts_box");

        self.request("list", {
            id: idSer,
            PageIndex: page || 1,
        }, function (data) {
            var ret = data.result;
            if (!ret) return;
            // debugger
            if (pageVar.tablefirst) {
                pageVar.tablefirst = false;
                pageVar.initTableDate({"data": ret["data"], "totals": ret["recordsTotal"]});
            } else {
                var table = document.querySelector('table[grid-manager="UserList"]');
                table.GM('setAjaxData', {"data": ret["data"], "totals": ret["recordsTotal"]});
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
            UserID: userID
        }, function (data) {
            var ret = data.result.data[0];
            if (!ret) return;
            $('#txtName').val(ret.name);
            $('#txtPass').val(ret.pass);
            $('#txtRealName').val(ret.realName);
            $('#txtEmail').val(ret.email);
            $('#txtPermission').val(ret.permission);
            $('#txtDept').val(ret.dept);
//            $('#txtRealName').attr('disabled',true)

        }, function (data) {

        });
    },

    saveUser: function () {
        var self = this;

        self.request("edit", {
            name: $('#txtName').val(),
            pass: $('#txtPass').val(),
            realName: $('#txtRealName').val(),
             email: $('#txtEmail').val(),
             permisson: $('#txtPermission').val(),
             dept: $('#txtDept').val(),
        }, function (data) {
            var ret = data.result;
            if (ret) {
                alert("保存成功")；
                $('#compose-modal').html($('#J_template_editUser').text());
                pageVar.loadData();
            } else {
                 alert("保存成功")；
            }
            setTimeout(function () { $('.btn-danger').trigger('click'); }, 1000);
        }, function (data) {
              alert("保存成功")；
        });
    },
    updatePage: function (pageid) {
        var self = this;
        self.request("updatePage", {
             name: $('#txtName').val(),
                        pass: $('#txtPass').val(),
                        realName: $('#txtRealName').val(),
                         email: $('#txtEmail').val(),
                         permisson: $('#txtPermission').val(),
                         dept: $('#txtDept').val()

        }, function (data) {
            var ret = data.result;
            if (ret) {
                $('#compose-modal').html($(''));
                  alert("保存成功")；
                $('#compose-modal').html($('#J_template_editUser').text());
                setTimeout(function () { $('.btn-danger').trigger('click'); }, 1000);
                pageVar.loadData();
            } else {
                alert("保存失败")
            }
        }, function (data) {
            alert("保存失败")
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
            url: '/person/' + action,
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
            url: '/person/' + action,
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

            if (!$('#txtName').val()) {
               alert("用户名不可为空")
            } else if (!$('#txtPass').val()) {
                Ctrip.ShowMessage("用户密码不可为空");
            } else {
                    pageVar.saveUser();
            }


        });

    });


    $('body').on('change', '#selSystemID', function () {
        var uid = $('#treeUserPermission').attr('data-id');
        pageVar.LoadUserPermission(uid)
    })
});