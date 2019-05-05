package com.zjp.service;

import com.zjp.model.HotelBasicInfo;
import com.zjp.model.PersonEntity;
import com.zjp.model.web.ApiData;

import java.util.List;
import java.util.Map;

/**
 * Created by zjp on 2019/5/1.
 */
public interface HotelInfoService {
    int createOrder(HotelBasicInfo hotelBasicInfo);

    Map deleteOrder(String id);

    HotelBasicInfo updateOrder(HotelBasicInfo hotelBasicInfo);

    ApiData selectOrder(HotelBasicInfo hotelBasicInfo);

    List<HotelBasicInfo> selectHotelAll();


    int createPerson(PersonEntity personEntity);

    int deletePerson(String id);

    int updatePerson(PersonEntity personEntity);

    List<PersonEntity>  selectSinglePerson(String  ID);
    List<PersonEntity> selectPersonAll(String id);


}

