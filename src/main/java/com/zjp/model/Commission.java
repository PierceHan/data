package com.zjp.model;

/**
 * Created by hanguoan on 2019/3/24.
 */
public class Commission {

    private String rownum;
    private String hotelId;
    private String hotelName;
    private String commissionYearMonth;
    private String debt;
    private String debtBatch;
    private String deduction;
    private String notRecipients;
    private String recentFollow;

    public String getHotelId() {
        return hotelId;
    }

    public void setHotelId(String hotelId) {
        this.hotelId = hotelId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getRownum() {
        return rownum;
    }

    public void setRownum(String rownum) {
        this.rownum = rownum;
    }

    public String getCommissionYearMonth() {
        return commissionYearMonth;
    }

    public void setCommissionYearMonth(String commissionYearMonth) {
        this.commissionYearMonth = commissionYearMonth;
    }

    public String getDebt() {
        return debt;
    }

    public void setDebt(String debt) {
        this.debt = debt;
    }

    public String getDebtBatch() {
        return debtBatch;
    }

    public void setDebtBatch(String debtBatch) {
        this.debtBatch = debtBatch;
    }

    public String getDeduction() {
        return deduction;
    }

    public void setDeduction(String deduction) {
        this.deduction = deduction;
    }

    public String getNotRecipients() {
        return notRecipients;
    }

    public void setNotRecipients(String notRecipients) {
        this.notRecipients = notRecipients;
    }

    public String getRecentFollow() {
        return recentFollow;
    }

    public void setRecentFollow(String recentFollow) {
        this.recentFollow = recentFollow;
    }
}
