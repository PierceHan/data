package com.zjp.service;

import com.zjp.model.GeryPrice;
import com.zjp.model.web.ApiResponse;

/**
 * Created by hanguoan on 2019/3/16.
 */
public interface PriceService {
    ApiResponse getPrice();

    ApiResponse getGeryList(GeryPrice geryPrice);
}
