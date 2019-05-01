package com.zjp.controller;

import com.zjp.model.HotelBasicInfo;
import com.zjp.model.OrderInfo;
import com.zjp.model.en.CodeEnum;
import com.zjp.model.web.ApiData;
import com.zjp.model.web.ApiResponse;
import com.zjp.service.OrderInfoService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Created by hanguoan on 2019/4/13.
 */
@RestController
public class OrderInfoContoller {

    @Autowired
    private OrderInfoService orderInfoService;

    private <T> ApiResponse<T> createResult(T t){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        apiResponse.setResult(t);
        return apiResponse;
    }

    @ApiOperation(value = "创建订单信息")
    @RequestMapping(value = "/orders",method = RequestMethod.POST)
    public ApiResponse createOrder(@RequestBody OrderInfo orderInfo){
        OrderInfo result = orderInfoService.createOrder(orderInfo);
        return createResult(result);
    }

    @ApiOperation(value = "删除订单信息")
    @RequestMapping(value = "/orders/{id}",method = RequestMethod.DELETE)
    public ApiResponse deleteOrder(@PathVariable String id){
        Map result = orderInfoService.deleteOrder(id);
        return createResult(result);
    }

    @ApiOperation(value = "修改订单信息")
    @RequestMapping(value = "/orders",method = RequestMethod.PUT)
    public ApiResponse updateOrder(@RequestBody OrderInfo orderInfo){
        OrderInfo result = orderInfoService.updateOrder(orderInfo);
        return createResult(result);
    }

    @ApiOperation(value = "查找订单信息")
    @RequestMapping(value = "/select/orders",method = RequestMethod.POST)
    public ApiResponse selectOrder(@RequestBody OrderInfo orderInfo){
        ApiData result = orderInfoService.selectOrder(orderInfo);
        return createResult(result);
    }


}
