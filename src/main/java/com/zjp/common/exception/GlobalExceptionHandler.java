package com.zjp.common.exception;
import com.zjp.common.WebResponse;
import com.zjp.config.ConfigProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletResponse;

/**
 * 统一异常处理
 * <p>
 * 将返回一个json对象，包含错误信息
 * <p>
 * Created by zhang on 2017/6/16.
 */

@ControllerAdvice
public class GlobalExceptionHandler {

    private static Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class.getName());
    @Autowired
    private ConfigProperties configProperties;


    @ExceptionHandler(value = DataException.class)
    @ResponseBody
    public WebResponse jsonErrorHandler(HttpServletResponse resp, DataException exception) throws Exception {

        WebResponse webResponse = new WebResponse();
        webResponse.setMessage(exception.getMessage());
        webResponse.setCode(exception.getExceptionName().getCode());
        resp.setStatus(exception.getExceptionName().getCode());

        return webResponse;

    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public WebResponse exceptionHandler(Exception ex) {

        WebResponse webResponse = new WebResponse();
        webResponse.setCode(400);
        webResponse.setMessage(ClassUtils.getShortName(ex.getClass()));
        logger.error("request failed!", ex);

        return webResponse;
    }

}
