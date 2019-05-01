package com.zjp.service;

import com.zjp.model.HotelBasicInfo;

import java.util.Map;

/**
 * Created by hanguoan on 2019/3/23.
 */
public interface HotelService {
    Map getHotelScore(String pageno);

    Map getCommissionScore(String descrow, String outstandingamount, String outstandingbatchenum);

    HotelBasicInfo createHotel(HotelBasicInfo hotelBasicInfo);
}
