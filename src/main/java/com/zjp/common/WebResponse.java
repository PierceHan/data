package com.zjp.common;

/***************************************************************************************
 *
 *  Project:        custom-module
 *
 *  Copyright ©     
 *
 ***************************************************************************************
 *
 *  Header Name: WellJoint
 *
 *  Description:
 *
 *  异常结果响应
 *
 *  Revision History:
 *                                   Modification
 *   Author                  Date(MM/DD/YYYY)             JiraID            Description of Changes
 *   ----------------      ------------------------       -------------     ----------------------
 *   zhanglu               2018/9/5-10:21
 *
 ****************************************************************************************/
public class WebResponse {

    private int code;
    private String message;

    @Override
    public String toString() {
        return "WebResponse{" +
                "code=" + code +
                ", message='" + message + '\'' +
                '}';
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
