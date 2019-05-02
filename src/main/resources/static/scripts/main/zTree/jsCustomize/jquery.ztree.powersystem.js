(function ($) {

    var setting = {
        check: {
            enable: true,
            chkDisabledInherit: true
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: beforeClick,
            onClick: onClick
        }
    };

    var zNodes = [
			{ id: 1, pId: 0, name: "随意勾选 111111", open: true, click: false },
			{ id: 11, pId: 1, name: "随意勾选 1-1", open: true },
			{ id: 111, pId: 11, name: "disabled 1-1-1", chkDisabled: true },
			{ id: 112, pId: 11, name: "随意勾选 1-1-2" },
			{ id: 12, pId: 1, name: "disabled 1-2", chkDisabled: true, checked: true, open: true },
			{ id: 121, pId: 12, name: "disabled 1-2-1", checked: true },
			{ id: 122, pId: 12, name: "disabled 1-2-2" },
			{ id: 2, pId: 0, name: "随意勾选 2", checked: true, open: true },
			{ id: 21, pId: 2, name: "随意勾选 2-1" },
			{ id: 22, pId: 2, name: "随意勾选 2-2", open: true },
			{ id: 221, pId: 22, name: "随意勾选 2-2-1", checked: true },
			{ id: 222, pId: 22, name: "随意勾选 2-2-2" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
			{ id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
			{ id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
			{ id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
			{ id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3" }

		];

    function disabledNode(e) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			disabled = e.data.disabled,
			nodes = zTree.getSelectedNodes(),
			inheritParent = false, inheritChildren = false;
        if (nodes.length == 0) {
            alert("请先选择一个节点");
        }
        if (disabled) {
            inheritParent = $("#py").attr("checked");
            inheritChildren = $("#sy").attr("checked");
        } else {
            inheritParent = $("#pn").attr("checked");
            inheritChildren = $("#sn").attr("checked");
        }

        for (var i = 0, l = nodes.length; i < l; i++) {
            zTree.setChkDisabled(nodes[i], disabled, inheritParent, inheritChildren);
        }
    }

    var log, className = "dark";

    function onClick(event, treeId, treeNode, clickFlag) {
        //showLog("[ " + getTime() + " onClick ]&nbsp;&nbsp;clickFlag = " + clickFlag + " (" + (clickFlag === 1 ? "普通选中" : (clickFlag === 0 ? "<b>取消选中</b>" : "<b>追加选中</b>")) + ")");
    }

    function beforeClick(treeId, treeNode, clickFlag) {
        className = (className === "dark" ? "" : "dark");
        //showLog("[ " + getTime() + " beforeClick ]&nbsp;&nbsp;" + treeNode.name);
        $("#txtName").val(treeNode.name);
        return (treeNode.click != false);
    }

    function getTime() {
        var now = new Date(),
			h = now.getHours(),
			m = now.getMinutes(),
			s = now.getSeconds();
        return (h + ":" + m + ":" + s);
    }

    function showLog(str) {
        if (!log) log = $("#log");
        log.append("<li class='" + className + "'>" + str + "</li>");
        if (log.children("li").length > 8) {
            log.get(0).removeChild(log.children("li")[0]);
        }
    }
    $(document).ready(function () {

        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        $.fn.zTree.init($("#ztreeUser"), setting, zNodes);
        $.fn.zTree.init($("#ztreeRole"), setting, zNodes);


        $("#disabledTrue").bind("click", { disabled: true }, disabledNode);
        $("#disabledFalse").bind("click", { disabled: false }, disabledNode);
    });


})(jQuery);