package com.zjp.model.web;

import java.util.List;

/**
 * Created by hanguoan on 2019/3/16.
 */
public class Data<T> {

    private T greyListModels;
    private String total;

    public T getGreyListModels() {
        return greyListModels;
    }

    public void setGreyListModels(T greyListModels) {
        this.greyListModels = greyListModels;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }
}
