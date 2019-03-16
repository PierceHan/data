package com.zjp.model.en;

/**
 * Created by hanguoan on 2019/3/16.
 */
public enum CodeEnum{

    A0001("A0001");

    CodeEnum(String code){
        this.code = code;
    }

    String code;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
