package com.zjp.mapper;

import com.zjp.model.HotelScore;

import java.util.List;

/**
 * Created by hanguoan on 2019/3/23.
 */
public interface HotelMapper {
    List<HotelScore> getHotelScore();

    int countHotelScore();
}
