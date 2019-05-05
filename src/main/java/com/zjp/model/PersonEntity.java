package com.zjp.model;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "t_user")
public class PersonEntity {
    @Column(name = "id")
    private String name;
    private String pass;
    @Column(name = "realName")
    private String realName;
    private String email;
    private String permission;
    private String dept;

    public void setName(String name) {
        this.name = name;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getName() {
        return name;
    }

    public String getPass() {
        return pass;
    }

    public String getRealName() {
        return realName;
    }

    public String getEmail() {
        return email;
    }

    public String getPermission() {
        return permission;
    }

    public String getDept() {
        return dept;
    }
}
