package com.zjp.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Created by hanguoan on 2019/3/16.
 */
@Getter
@Setter
@ToString
public class GeryPrice {

    private String orderID;
    private String userID;
    private String roomID;
    private String Source;
    private String UpdateDate;
    private String MinPrice;
    private String MaxPrice;
    private String exceptionPrice;

}
