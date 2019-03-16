package com.zjp.model;

/**
 * Created by hanguoan on 2019/3/16.
 */
public class GeryPrice {

    private String orderID;
    private String userID;
    private String roomID;
    private String Source;
    private String UpdateDate;
    private String MinPrice;
    private String MaxPrice;

    @Override
    public String toString() {
        return "GeryPrice{" +
                "orderID=" + orderID +
                ", userID=" + userID +
                ", roomID='" + roomID + '\'' +
                ", Source='" + Source + '\'' +
                ", UpdateDate='" + UpdateDate + '\'' +
                ", MinPrice='" + MinPrice + '\'' +
                ", MaxPrice='" + MaxPrice + '\'' +
                '}';
    }

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getRoomID() {
        return roomID;
    }

    public void setRoomID(String roomID) {
        this.roomID = roomID;
    }

    public String getSource() {
        return Source;
    }

    public void setSource(String source) {
        Source = source;
    }

    public String getUpdateDate() {
        return UpdateDate;
    }

    public void setUpdateDate(String updateDate) {
        UpdateDate = updateDate;
    }

    public String getMinPrice() {
        return MinPrice;
    }

    public void setMinPrice(String minPrice) {
        MinPrice = minPrice;
    }

    public String getMaxPrice() {
        return MaxPrice;
    }

    public void setMaxPrice(String maxPrice) {
        MaxPrice = maxPrice;
    }
}
