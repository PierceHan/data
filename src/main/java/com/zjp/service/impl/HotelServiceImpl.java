package com.zjp.service.impl;

import com.alibaba.druid.util.StringUtils;
import com.github.pagehelper.PageHelper;
import com.zjp.mapper.HotelMapper;
import com.zjp.model.Commission;
import com.zjp.model.HotelBasicInfo;
import com.zjp.model.HotelScore;
import com.zjp.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zjp on 2019/3/23.
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
        result.put("pageno",pageno);
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
        int minosdm = 0,maxosdm=0,minosdb=0,maxosdb=0;
        if (!StringUtils.isEmpty(outstandingamount)){
            String[] strings = outstandingamount.split(",");
            minosdm = Integer.parseInt(strings[0]);
            if (strings.length>1){
                maxosdm = Integer.parseInt(strings[1]);
            }
        }
        if (!StringUtils.isEmpty(outstandingbatchenum)){
            String[] strings = outstandingbatchenum.split(",");
            minosdb = Integer.parseInt(strings[0]);
            if (strings.length>1){
                maxosdb = Integer.parseInt(strings[1]);
            }
        }
        int total = hotelMapper.countCommissionScore(sort,minosdm,maxosdm,minosdb,maxosdb);
        List<Commission> commissions = hotelMapper.getCommissionScore(sort,minosdm,maxosdm,minosdb,maxosdb);
        int i = 1;
        for (Commission hotelScore : commissions) {
            hotelScore.setRownum(String.valueOf(i));
            i++;
        }
        Map result = new HashMap();
        result.put("total",total);
        result.put("result",commissions);
        return result;
    }

    @Override
    public HotelBasicInfo createHotel(HotelBasicInfo hotelBasicInfo) {

        return null;
    }

}
