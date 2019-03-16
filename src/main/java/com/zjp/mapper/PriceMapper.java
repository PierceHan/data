package com.zjp.mapper;

import com.zjp.model.GeryPrice;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Created by hanguoan on 2019/3/16.
 */
public interface PriceMapper {
    List<GeryPrice> getGeryList();
}
