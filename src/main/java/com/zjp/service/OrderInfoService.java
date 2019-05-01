package com.zjp.service;

import com.zjp.model.OrderInfo;
import com.zjp.model.web.ApiData;

import java.util.Map;

/**
 * Created by hanguoan on 2019/4/13.
 */
public interface OrderInfoService {
    OrderInfo createOrder(OrderInfo orderInfo);

    Map deleteOrder(String id);

    OrderInfo updateOrder(OrderInfo orderInfo);

    ApiData selectOrder(OrderInfo orderInfo);
}
