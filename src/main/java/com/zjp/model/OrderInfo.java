package com.zjp.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Table;
import java.util.Date;

/**
 * Created by hanguoan on 2019/4/13.
 */
@Getter
@Setter
@ToString
@Table(name = "t_orderinfo")
public class OrderInfo extends BaseEntity {

    private String hotelId;
    private String sonHotelId;
    private String houseTypeId;
    private Date checkinTime;
    private Date leaveTime;
    private String interNightVolume;
    private float price;
    private float comission;

}
