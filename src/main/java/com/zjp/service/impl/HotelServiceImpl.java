package com.zjp.service.impl;

import com.alibaba.druid.util.StringUtils;
import com.github.pagehelper.PageHelper;
import com.zjp.mapper.HotelMapper;
import com.zjp.model.Commission;
import com.zjp.model.HotelScore;
import com.zjp.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by hanguoan on 2019/3/23.
 */
@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelMapper hotelMapper;

    @Override
    public Map getHotelScore(String pageno) {
        int total = hotelMapper.countHotelScore();
        PageHelper.startPage(Integer.parseInt(pageno),20);
        List<HotelScore> hotelScores = hotelMapper.getHotelScore();
        int i = 1+(Integer.parseInt(pageno)-1)*20;
        for (HotelScore hotelScore : hotelScores) {
            hotelScore.setRownum(String.valueOf(i));
            i++;
        }
        Map result = new HashMap();
        result.put("total",total);
        result.put("result",hotelScores);
        return result;
    }

    @Override
    public Map getCommissionScore(String descrow, String outstandingamount, String outstandingbatchenum) {
        String sort = null;
        if (descrow==null || "".equals(descrow)){
            sort = "recent_follow";
        }else if (descrow.equals("1")){
            sort = "commission_year_month";
        }else if (descrow.equals("2")){
            sort = "not_recipients";
        }else {
            sort = "recent_follow";
        }
        int total = hotelMapper.countCommissionScore(sort,outstandingamount,outstandingbatchenum);
        List<Commission> commissions = hotelMapper.getCommissionScore(sort,outstandingamount,outstandingbatchenum);
        Map result = new HashMap();
        result.put("total",total);
        result.put("result",commissions);
        return result;
    }

}
