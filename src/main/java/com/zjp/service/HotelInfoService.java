package com.zjp.service;

import com.zjp.model.HotelBasicInfo;
import com.zjp.model.web.ApiData;

import java.util.List;
import java.util.Map;

/**
 * Created by hanguoan on 2019/5/1.
 */
public interface HotelInfoService {
    int createOrder(HotelBasicInfo hotelBasicInfo);

    Map deleteOrder(String id);

    HotelBasicInfo updateOrder(HotelBasicInfo hotelBasicInfo);

    ApiData selectOrder(HotelBasicInfo hotelBasicInfo);

    List<HotelBasicInfo> selectHotelAll();
}

