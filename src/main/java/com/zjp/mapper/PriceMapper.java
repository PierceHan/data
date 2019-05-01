package com.zjp.mapper;

import com.zjp.model.GeryPrice;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by hanguoan on 2019/3/16.
 */
public interface PriceMapper {
    List<GeryPrice> getGeryList();

    int countGeryList();

    int countGeryListDynamic( );

    List<GeryPrice> getGeryListDynamic(@Param(value = "id") String id);
}
