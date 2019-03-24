package com.zjp.controller;

import com.zjp.model.HotelScore;
import com.zjp.model.en.CodeEnum;
import com.zjp.model.web.ApiResponse;
import com.zjp.service.HotelService;
import io.swagger.annotations.ApiOperation;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    @RequestMapping(value = "/finance/FinanceHtl/FollowTable",method = RequestMethod.GET)
    public ApiResponse getHotelScore(@RequestParam(value = "pageno") String pageno){

        Map hotelScores = hotelService.getHotelScore(pageno);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        apiResponse.setResult(hotelScores);
        return apiResponse;
    }

    @ApiOperation(value = "获得佣金数据")
    @RequestMapping(value = "/finance/FinanceHtl/GetDebtTable",method = RequestMethod.GET)
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

}
