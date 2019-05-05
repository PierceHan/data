package com.zjp.service.impl;

import com.zjp.common.exception.DataException;
import com.zjp.mapper.HotelInfoMapper;
import com.zjp.model.HotelBasicInfo;
import com.zjp.model.PersonEntity;
import com.zjp.model.web.ApiData;
import com.zjp.service.HotelInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by hanguoan on 2019/5/1.
 */
@Service
public class HotelInfoServiceImpl implements HotelInfoService {

    @Autowired
    private HotelInfoMapper hotelInfoMapper;

    @Override
    public int createOrder(HotelBasicInfo hotelBasicInfo) {
        String id = UUID.randomUUID().toString().replaceAll("-", "");
        hotelBasicInfo.setID(id);
        int result = hotelInfoMapper.insert(hotelBasicInfo);
        return result;
    }

    @Override
    public Map deleteOrder(String id) {
        int result = hotelInfoMapper.deleteByPrimaryKey(id);
        Map map = new HashMap();
        if (result>0){
            map.put("result","success");
            return map;
        }
        throw new DataException(String.format("删除失败,没有对应的数据id:%s",id), DataException.ExceptionName.NoData);
    }

    @Override
    public HotelBasicInfo updateOrder(HotelBasicInfo hotelBasicInfo) {
        int result = hotelInfoMapper.updateByPrimaryKeySelective(hotelBasicInfo);
        if (result>0){
            return hotelInfoMapper.selectByPrimaryKey(hotelBasicInfo.getID());
        }
        throw new DataException(String.format("更新失败,没有对应的数据,Data:%s",hotelBasicInfo), DataException.ExceptionName.NoData);
    }

    @Override
    public ApiData selectOrder(HotelBasicInfo hotelBasicInfo) {
        List<HotelBasicInfo> orderInfos = hotelInfoMapper.select(hotelBasicInfo);
        int count = hotelInfoMapper.selectCount(hotelBasicInfo);
        ApiData apiData = new ApiData();
        apiData.setResult(orderInfos);
        apiData.setTotal(String.valueOf(count));
        return apiData;
    }

    @Override
    public List<HotelBasicInfo> selectHotelAll() {
        return hotelInfoMapper.selectAll();
    }

    @Override
    public int createPerson(PersonEntity personEntity) {
//        int result = hotelInfoMapper.insert(personEntity);
//        return result;
        return 0;
    }

    @Override
    public int deletePerson(String id) {
        return 0;
    }

    @Override
    public int updatePerson(PersonEntity personEntity) {
        return 0;
    }

    @Override
    public List<PersonEntity> selectSinglePerson(String ID) {
        return null;
    }

    @Override
    public List<PersonEntity> selectPersonAll(String id) {
        return null;
    }

}
