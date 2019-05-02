package com.zjp.model;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by hanguoan on 2019/4/13.
 */
@Getter
@Setter
@Table(name = "t_hotelbasicinfo")
public class HotelBasicInfo {

    @Column(name = "id")
    private String ID;
    @Column(name = "name")
    private String Name;
    @Column(name = "city")
    private String City;
    @Column(name = "cbd")
    private String Zone;
    @Column(name = "star")
    private String Star;
    @Column(name = "rank")
    private String Rank;
    private String Person;
    private String Phone;
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date Time;
    private String pagedesc;


}
