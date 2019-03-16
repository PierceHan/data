package com.zjp.service.impl;

import com.zjp.mapper.PriceMapper;
import com.zjp.model.FinanceFollow;
import com.zjp.model.GeryPrice;
import com.zjp.model.en.CodeEnum;
import com.zjp.model.web.ApiResponse;
import com.zjp.model.web.Data;
import com.zjp.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ApiResponse getGeryList() {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        Data<FinanceFollow> data = new Data<>();
        List<GeryPrice> geryPrices = priceMapper.getGeryList();
        data.setTotal(String.valueOf(Math.random()*1000));
        apiResponse.setResult(new Data<FinanceFollow>());
        return apiResponse;
    }
}
