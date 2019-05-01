package com.zjp.common.exception;

/**
 * Created by zhang on 2017/6/16.
 */
public class DataException extends RuntimeException {

    protected ExceptionName exceptionName;

    public enum ExceptionName {

        InvalidParams(406), CallLimit(401), NoData(400);
        private int code;

        ExceptionName(int code) {
            this.code = code;
        }

        public int getCode() {
            return code;
        }
    }

    public DataException(String message, ExceptionName exceptionName) {
        super(message);
        this.exceptionName = exceptionName;
    }

    public DataException(String message) {
        super(message);
    }

    public ExceptionName getExceptionName() {
        return exceptionName;
    }

}
