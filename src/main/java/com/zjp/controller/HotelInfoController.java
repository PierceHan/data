package com.zjp.controller;

import com.sun.xml.internal.bind.v2.model.core.ID;
import com.zjp.model.HotelBasicInfo;
import com.zjp.model.OrderInfo;
import com.zjp.model.en.CodeEnum;
import com.zjp.model.web.ApiData;
import com.zjp.model.web.ApiResponse;
import com.zjp.service.HotelInfoService;
import com.zjp.service.OrderInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

/**
 * Created by hanguoan on 2019/5/1.
 */
@Api(tags = "酒店基础信息接口")
@RestController
public class HotelInfoController {

    @Autowired
    private HotelInfoService hotelInfoService;

    private <T> ApiResponse<T> createResult(T t){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        apiResponse.setResult(t);
        return apiResponse;
    }

    @ApiOperation(value = "创建酒店基础信息")
    @RequestMapping(value = "/basichotel/create",method = RequestMethod.POST)
    public ApiResponse createOrder(@RequestParam(required = false) String Name,
                                   @RequestParam(required = false) String City,
                                   @RequestParam(required = false) String Zone,
                                   @RequestParam(required = false) String Star,
                                   @RequestParam(required = false) String Rank,
                                   @RequestParam(required = false) String Person,
                                   @RequestParam(required = false) String Phone,
                                   @RequestParam(required = false) String Time,
                                   @RequestParam(required = false) String pagedesc) throws ParseException {
        HotelBasicInfo hotelBasicInfo = new HotelBasicInfo();
        hotelBasicInfo.setCity(City);
        hotelBasicInfo.setName(Name);
        hotelBasicInfo.setZone(Zone);
        hotelBasicInfo.setStar(Star);
        hotelBasicInfo.setPagedesc(Person);
        hotelBasicInfo.setRank(Rank);
        hotelBasicInfo.setPhone(Phone);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (Time!=null){
            hotelBasicInfo.setTime(simpleDateFormat.parse(Time));
        }
        int result = hotelInfoService.createOrder(hotelBasicInfo);
        if (result==1){
            return createResult(result);
        }
        return createResult(null);
    }

    @ApiOperation(value = "删除酒店信息")
    @RequestMapping(value = "/basichotel/{id}",method = RequestMethod.DELETE)
    public ApiResponse deleteOrder(@PathVariable String id){
        Map result = hotelInfoService.deleteOrder(id);
        return createResult(result);
    }

    @ApiOperation(value = "修改酒店信息")
    @RequestMapping(value = "/basichotel/edit",method = RequestMethod.PUT)
    public ApiResponse updateOrder(@RequestParam(required = false) String Name,
                                   @RequestParam(required = false) String ID,
                                   @RequestParam(required = false) String City,
                                   @RequestParam(required = false) String Zone,
                                   @RequestParam(required = false) String Star,
                                   @RequestParam(required = false) String Rank,
                                   @RequestParam(required = false) String Person,
                                   @RequestParam(required = false) String Phone,
                                   @RequestParam(required = false) String Time,
                                   @RequestParam(required = false) String pagedesc) throws ParseException {
        HotelBasicInfo hotelBasicInfo = new HotelBasicInfo();
        hotelBasicInfo.setID(ID);
        hotelBasicInfo.setCity(City);
        hotelBasicInfo.setName(Name);
        hotelBasicInfo.setZone(Zone);
        hotelBasicInfo.setStar(Star);
        hotelBasicInfo.setPagedesc(Person);
        hotelBasicInfo.setRank(Rank);
        hotelBasicInfo.setPhone(Phone);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (Time!=null){
            hotelBasicInfo.setTime(simpleDateFormat.parse(Time));
        }
        HotelBasicInfo result = hotelInfoService.updateOrder(hotelBasicInfo);
        return createResult(result);
    }

    @ApiOperation(value = "查找酒店信息")
    @RequestMapping(value = "/basichotel/hotels",method = RequestMethod.POST)
    public ApiResponse selectOrder(@RequestParam(required = false) String Name,
                                   @RequestParam(required = false) String ID,
                                   @RequestParam(required = false) String City,
                                   @RequestParam(required = false) String Zone,
                                   @RequestParam(required = false) String Star,
                                   @RequestParam(required = false) String Rank,
                                   @RequestParam(required = false) String Person,
                                   @RequestParam(required = false) String Phone,
                                   @RequestParam(required = false) String Time,
                                   @RequestParam(required = false) String pagedesc) throws ParseException {
        HotelBasicInfo hotelBasicInfo = new HotelBasicInfo();
        hotelBasicInfo.setID(ID);
        hotelBasicInfo.setCity(City);
        hotelBasicInfo.setName(Name);
        hotelBasicInfo.setZone(Zone);
        hotelBasicInfo.setStar(Star);
        hotelBasicInfo.setPagedesc(Person);
        hotelBasicInfo.setRank(Rank);
        hotelBasicInfo.setPhone(Phone);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (Time!=null){
            hotelBasicInfo.setTime(simpleDateFormat.parse(Time));
        }
        ApiData result = hotelInfoService.selectOrder(hotelBasicInfo);
        return createResult(result);
    }

    @ApiOperation(value = "加载所有酒店信息")
    @RequestMapping(value = "/basichotel/list",method = RequestMethod.POST)
    public ApiResponse selectHotelAll(){
        List<HotelBasicInfo> result = hotelInfoService.selectHotelAll();
        return createResult(result);
    }

}
