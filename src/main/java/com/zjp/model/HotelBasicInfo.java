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
    private String Time;
    private String pagedesc;

    public void setID(String ID) {
        this.ID = ID;
    }

    public void setName(String name) {
        Name = name;
    }

    public void setCity(String city) {
        City = city;
    }

    public void setZone(String zone) {
        Zone = zone;
    }

    public void setStar(String star) {
        Star = star;
    }

    public void setRank(String rank) {
        Rank = rank;
    }

    public void setPerson(String person) {
        Person = person;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public void setTime(String time) {
        Time = time;
    }

    public void setPagedesc(String pagedesc) {
        this.pagedesc = pagedesc;
    }

    public String getID() {
        return ID;
    }

    public String getName() {
        return Name;
    }

    public String getCity() {
        return City;
    }

    public String getZone() {
        return Zone;
    }

    public String getStar() {
        return Star;
    }

    public String getRank() {
        return Rank;
    }

    public String getPerson() {
        return Person;
    }

    public String getPhone() {
        return Phone;
    }

    public String getTime() {
        return Time;
    }

    public String getPagedesc() {
        return pagedesc;
    }
}
