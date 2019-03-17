package com.zjp.model;

import java.util.Random;

/**
 * Created by hanguoan on 2019/3/16.
 */
public class FinanceFollow {
    private Random random = new Random();
    private String orderOutOfSystem = String.valueOf(500+random.nextInt(1500));
    private String hotelNoticeUnfinished = String.valueOf(500+random.nextInt(1500));
    private String cspmessageUnRead = String.valueOf(500+random.nextInt(1500));
    private String refundProcessingDetail = String.valueOf(500+random.nextInt(1500));
    private String hotelInvoiceChanges = String.valueOf(500+random.nextInt(1500));
    private String hotelAdvances = String.valueOf(500+random.nextInt(1500));
    private String orderOutOfBatch = String.valueOf(500+random.nextInt(1500));
    private String hotelBatchNotClosed = String.valueOf(500+random.nextInt(1500));
    private String hotelInvoiceNotSubmitted = String.valueOf(500+random.nextInt(1500));
    private String hotelSystemUneven = String.valueOf(500+random.nextInt(1500));
    private String hotelAmountUnclaimed = String.valueOf(500+random.nextInt(1500));
    private String commissionBatchDetail = String.valueOf(500+random.nextInt(1500));

    public String getOrderOutOfSystem() {
        return orderOutOfSystem;
    }

    public void setOrderOutOfSystem(String orderOutOfSystem) {
        this.orderOutOfSystem = orderOutOfSystem;
    }

    public String getHotelNoticeUnfinished() {
        return hotelNoticeUnfinished;
    }

    public void setHotelNoticeUnfinished(String hotelNoticeUnfinished) {
        this.hotelNoticeUnfinished = hotelNoticeUnfinished;
    }

    public String getCspmessageUnRead() {
        return cspmessageUnRead;
    }

    public void setCspmessageUnRead(String cspmessageUnRead) {
        this.cspmessageUnRead = cspmessageUnRead;
    }

    public String getRefundProcessingDetail() {
        return refundProcessingDetail;
    }

    public void setRefundProcessingDetail(String refundProcessingDetail) {
        this.refundProcessingDetail = refundProcessingDetail;
    }

    public String getHotelInvoiceChanges() {
        return hotelInvoiceChanges;
    }

    public void setHotelInvoiceChanges(String hotelInvoiceChanges) {
        this.hotelInvoiceChanges = hotelInvoiceChanges;
    }

    public String getHotelAdvances() {
        return hotelAdvances;
    }

    public void setHotelAdvances(String hotelAdvances) {
        this.hotelAdvances = hotelAdvances;
    }

    public String getOrderOutOfBatch() {
        return orderOutOfBatch;
    }

    public void setOrderOutOfBatch(String orderOutOfBatch) {
        this.orderOutOfBatch = orderOutOfBatch;
    }

    public String getHotelBatchNotClosed() {
        return hotelBatchNotClosed;
    }

    public void setHotelBatchNotClosed(String hotelBatchNotClosed) {
        this.hotelBatchNotClosed = hotelBatchNotClosed;
    }

    public String getHotelInvoiceNotSubmitted() {
        return hotelInvoiceNotSubmitted;
    }

    public void setHotelInvoiceNotSubmitted(String hotelInvoiceNotSubmitted) {
        this.hotelInvoiceNotSubmitted = hotelInvoiceNotSubmitted;
    }

    public String getHotelSystemUneven() {
        return hotelSystemUneven;
    }

    public void setHotelSystemUneven(String hotelSystemUneven) {
        this.hotelSystemUneven = hotelSystemUneven;
    }

    public String getHotelAmountUnclaimed() {
        return hotelAmountUnclaimed;
    }

    public void setHotelAmountUnclaimed(String hotelAmountUnclaimed) {
        this.hotelAmountUnclaimed = hotelAmountUnclaimed;
    }

    public String getCommissionBatchDetail() {
        return commissionBatchDetail;
    }

    public void setCommissionBatchDetail(String commissionBatchDetail) {
        this.commissionBatchDetail = commissionBatchDetail;
    }
}
