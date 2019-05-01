package com.zjp.controller;

import com.zjp.model.en.CodeEnum;
import com.zjp.model.web.ApiResponse;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class AjaxServiceController {

    @RequestMapping(value = "/Grid/SaveEmployees", method = RequestMethod.POST)
    @ResponseBody
    public ApiResponse getCommissionScore(HttpServletRequest request){

        return null;
    }

    @RequestMapping(value = "GetGridData", method = RequestMethod.POST)
    @ResponseBody
    public String GetGridData(HttpServletRequest request, HttpServletResponse response) throws Exception
    {
        //查询条件
        String key = request.getParameter("key");
        //分页
        int pageIndex = Integer.parseInt(request.getParameter("pageIndex"));
        int pageSize = Integer.parseInt(request.getParameter("pageSize"));
        //字段排序
        String sortField = request.getParameter("sortField");
        String sortOrder = request.getParameter("sortOrder");

//        HashMap result = new Test.TestDB().SearchEmployees(key, pageIndex, pageSize, sortField, sortOrder);
//        String json = Test.JSON.Encode(result);
//        return json;
        return null;
    }
}
