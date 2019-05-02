package com.zjp.model;

public class OrderInfoEntity {
    private String oderID;
    private String orderid;
    private String son_hotel_id;
    private String house_type_id;
    private String checkin_time;
    private String leave_time;
    private String Inter_night_volume;
    private String price;
    private String comission;

    public void setOderID(String oderID) {
        this.oderID = oderID;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }

    public void setSon_hotel_id(String son_hotel_id) {
        this.son_hotel_id = son_hotel_id;
    }

    public void setHouse_type_id(String house_type_id) {
        this.house_type_id = house_type_id;
    }

    public void setCheckin_time(String checkin_time) {
        this.checkin_time = checkin_time;
    }

    public void setLeave_time(String leave_time) {
        this.leave_time = leave_time;
    }

    public void setInter_night_volume(String inter_night_volume) {
        Inter_night_volume = inter_night_volume;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setComission(String comission) {
        this.comission = comission;
    }

    public String getOderID() {
        return oderID;
    }

    public String getOrderid() {
        return orderid;
    }

    public String getSon_hotel_id() {
        return son_hotel_id;
    }

    public String getHouse_type_id() {
        return house_type_id;
    }

    public String getCheckin_time() {
        return checkin_time;
    }

    public String getLeave_time() {
        return leave_time;
    }

    public String getInter_night_volume() {
        return Inter_night_volume;
    }

    public String getPrice() {
        return price;
    }

    public String getComission() {
        return comission;
    }
}
