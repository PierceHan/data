package com.zjp.controller;

import com.zjp.model.GeryPrice;
import com.zjp.model.web.ApiResponse;
import com.zjp.service.PriceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by hanguoan on 2019/3/16.
 */
@Api(tags = "价格项目接口")
@RestController
public class PriceController {

    @Autowired
    private PriceService priceService;

    @ApiOperation(value = "获得")
    @RequestMapping(value = "/finance/FinanceHtl/GetFollowTotal",method = RequestMethod.POST)
    public ApiResponse getPrice(){
        return priceService.getPrice();
    }

   /* @ApiOperation(value = "获得")
    @RequestMapping(value = "/finance/FinanceHtl/GetFollowTotal",method = RequestMethod.POST)
    public ApiResponse getGeryList(@RequestBody GeryPrice geryPrice){
        return priceService.getGeryList(geryPrice);
    }*/


//    @ApiOperation(value = "获得")
//    @RequestMapping(value = "/finance/FinanceHtl/GetFollowTotal",method = RequestMethod.POST)
//    public ApiResponse getGeryList(){
//        return priceService.getGeryList();
//    }



    @RequestMapping(value = "/warnPrice/warnpricegreylist/detaillist", method = RequestMethod.POST)
    public ApiResponse reg(@RequestParam(value = "id_search",required = false) String id_search) throws Exception {
        //其他业务
        return priceService.getGeryList(id_search);
    }


}
