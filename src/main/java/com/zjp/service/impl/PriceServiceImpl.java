package com.zjp.service.impl;

import com.zjp.mapper.PriceMapper;
import com.zjp.model.FinanceFollow;
import com.zjp.model.GeryPrice;
import com.zjp.model.en.CodeEnum;
import com.zjp.model.web.ApiResponse;
import com.zjp.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by hanguoan on 2019/3/16.
 */
@Service
public class PriceServiceImpl implements PriceService {

    @Autowired
    private PriceMapper priceMapper;

    @Override
    public ApiResponse getPrice() {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        Map<String,FinanceFollow> map = new HashMap();
        map.put("GetFollowTotal",new FinanceFollow());
        apiResponse.setResult(map);
        return apiResponse;
    }

    @Override
    public ApiResponse getGeryList( ) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        Map<String,Object> map = new HashMap();
        List<GeryPrice> geryPrices = priceMapper.getGeryListDynamic();
        map.put("GetFollowTotal",geryPrices);
        Random random = new Random();
        map.put("total",priceMapper.countGeryListDynamic());
        apiResponse.setResult(map);
        return apiResponse;
    }
}
