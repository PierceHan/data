package com.zjp.model.web;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by hanguoan on 2019/4/13.
 */
@Getter
@Setter
public class ApiData<T> {

    private T result;
    private String total;

    public ApiData() {
    }

    public ApiData(T result, String total) {
        this.result = result;
        this.total = total;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }
}
