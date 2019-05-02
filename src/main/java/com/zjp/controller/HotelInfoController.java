package com.zjp.controller;

import com.zjp.model.HotelBasicInfo;
import com.zjp.model.OrderInfo;
import com.zjp.model.en.CodeEnum;
import com.zjp.model.web.ApiData;
import com.zjp.model.web.ApiResponse;
import com.zjp.service.HotelInfoService;
import com.zjp.service.OrderInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Created by hanguoan on 2019/5/1.
 */
@Api(tags = "酒店基础信息接口")
@RestController
public class HotelInfoController {

    @Autowired
    private HotelInfoService hotelInfoService;

    private <T> ApiResponse<T> createResult(T t){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        apiResponse.setResult(t);
        return apiResponse;
    }

    @ApiOperation(value = "创建酒店基础信息")
    @RequestMapping(value = "/basichotel/create",method = RequestMethod.POST)
    public ApiResponse createOrder(@RequestBody HotelBasicInfo hotelBasicInfo){
        HotelBasicInfo result = hotelInfoService.createOrder(hotelBasicInfo);
        return createResult(result);
    }

    @ApiOperation(value = "删除酒店信息")
    @RequestMapping(value = "/basichotel/{id}",method = RequestMethod.DELETE)
    public ApiResponse deleteOrder(@PathVariable String id){
        Map result = hotelInfoService.deleteOrder(id);
        return createResult(result);
    }

    @ApiOperation(value = "修改酒店信息")
    @RequestMapping(value = "/basichotel/edit",method = RequestMethod.PUT)
    public ApiResponse updateOrder(@RequestBody HotelBasicInfo hotelBasicInfo){
        HotelBasicInfo result = hotelInfoService.updateOrder(hotelBasicInfo);
        return createResult(result);
    }

    @ApiOperation(value = "查找酒店信息")
    @RequestMapping(value = "/basichotel/hotels",method = RequestMethod.POST)
    public ApiResponse selectOrder(@RequestBody HotelBasicInfo hotelBasicInfo){
        ApiData result = hotelInfoService.selectOrder(hotelBasicInfo);
        return createResult(result);
    }

    @ApiOperation(value = "加载所有酒店信息")
    @RequestMapping(value = "/basichotel/list",method = RequestMethod.POST)
    public ApiResponse selectHotelAll(){
        List<HotelBasicInfo> result = hotelInfoService.selectHotelAll();
        return createResult(result);
    }

}
