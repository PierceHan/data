package com.zjp.model;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by hanguoan on 2019/4/13.
 */
@Getter
@Setter
public class HotelBasicInfo extends BaseEntity {

    private String name;
    private String city;
    private String cbd;
    private String star;
    private String rank;

}
