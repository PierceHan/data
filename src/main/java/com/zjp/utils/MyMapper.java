package com.zjp.utils;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/***************************************************************************************
 * Project:        ocm-service
 * <p>
 * Copyright ©
 * <p>
 * **************************************************************************************
 * <p>
 * Header Name: WellJoint
 * <p>
 * Description:
 * <p>
 * Revision History:
 * Modification
 * Author                  Date(MM/DD/YYYY)             JiraID            Description of Changes
 * ----------------      ------------------------       -------------     ----------------------
 * zhanglu               2017/8/8-21:27
 ****************************************************************************************/
public interface MyMapper<T> extends Mapper<T>, MySqlMapper<T> {

    //FIXME 特别注意，该接口不能被扫描到，否则会出错

}
