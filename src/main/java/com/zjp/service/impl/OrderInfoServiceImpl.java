package com.zjp.service.impl;

import com.zjp.common.exception.DataException;
import com.zjp.mapper.OrderInfoMapper;
import com.zjp.model.OrderInfo;
import com.zjp.model.web.ApiData;
import com.zjp.service.OrderInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by hanguoan on 2019/4/13.
 */
@Service
public class OrderInfoServiceImpl implements OrderInfoService {

    @Autowired
    private OrderInfoMapper orderInfoMapper;

    @Override
    public OrderInfo createOrder(OrderInfo orderInfo) {
        String id = UUID.randomUUID().toString().replaceAll("-", "");
        orderInfo.setId(id);
        orderInfoMapper.insert(orderInfo);
        return orderInfoMapper.selectByPrimaryKey(id);
    }

    @Override
    public Map deleteOrder(String id) {
        int result = orderInfoMapper.deleteByPrimaryKey(id);
        Map map = new HashMap();
        if (result>0){
            map.put("result","success");
            return map;
        }
        throw new DataException(String.format("删除失败,没有对应的数据id:%s",id), DataException.ExceptionName.NoData);
    }

    @Override
    public OrderInfo updateOrder(OrderInfo orderInfo) {
        int result = orderInfoMapper.updateByPrimaryKeySelective(orderInfo);
        if (result>0){
            return orderInfoMapper.selectByPrimaryKey(orderInfo.getId());
        }
        throw new DataException(String.format("更新失败,没有对应的数据,Data:%s",orderInfo), DataException.ExceptionName.NoData);
    }

    @Override
    public ApiData selectOrder(OrderInfo orderInfo) {
        List<OrderInfo> orderInfos = orderInfoMapper.select(orderInfo);
        int count = orderInfoMapper.selectCount(orderInfo);
        ApiData apiData = new ApiData();
        apiData.setResult(orderInfos);
        apiData.setTotal(String.valueOf(count));
        return apiData;
    }

    @Override
    public List<OrderInfo> selectOrderAll() {
        return orderInfoMapper.selectAll();
    }

}