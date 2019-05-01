package com.zjp.controller;

import com.zjp.model.HotelBasicInfo;
import com.zjp.model.HotelScore;
import com.zjp.model.en.CodeEnum;
import com.zjp.model.web.ApiResponse;
import com.zjp.service.HotelService;
import io.swagger.annotations.ApiOperation;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Created by hanguoan on 2019/3/23.
 */
@RestController
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @ApiOperation(value = "获得酒店信息")
    @RequestMapping(value = "/finance/FinanceHtl/GetFollowTable",method = RequestMethod.POST)
    public ApiResponse getHotelScore(@RequestParam(value = "pageno") String pageno){

        Map hotelScores = hotelService.getHotelScore(pageno);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        apiResponse.setResult(hotelScores);
        return apiResponse;
    }

    @ApiOperation(value = "获得佣金数据")
    @RequestMapping(value = "/finance/FinanceHtl/GetDebtTable",method = RequestMethod.POST)
    public ApiResponse getCommissionScore(@RequestParam(value = "descrow",required = false) String descrow,
                                          @RequestParam(value = "outstandingamount",required = false) String outstandingamount,
                                          @RequestParam(value = "outstandingbatchenum",required = false) String outstandingbatchenum){
        Map hotelScores = hotelService.getCommissionScore(descrow,outstandingamount,outstandingbatchenum);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        apiResponse.setResult(hotelScores);
        return apiResponse;
    }

    @ApiOperation(value = "获得佣金数据")
    @RequestMapping(value = "/hotels",method = RequestMethod.POST)
    public ApiResponse createHotel(@RequestBody HotelBasicInfo hotelBasicInfo){
        HotelBasicInfo result = hotelService.createHotel(hotelBasicInfo);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        apiResponse.setResult(result);
        return apiResponse;
    }

}
