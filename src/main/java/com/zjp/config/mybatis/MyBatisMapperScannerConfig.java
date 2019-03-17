package com.zjp.config.mybatis;

import com.zjp.utils.MyMapper;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tk.mybatis.spring.mapper.MapperScannerConfigurer;

import java.util.Properties;

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
 * MyBatis扫描接口，使用的tk.mybatis.spring.mapper.MapperScannerConfigurer
 * 如果你不使用通用Mapper，可以改为org.xxx...
 *
 * <p>
 * Revision History:
 * Modification
 * Author                  Date(MM/DD/YYYY)             JiraID            Description of Changes
 * ----------------      ------------------------       -------------     ----------------------
 * zhanglu               2017/8/9-16:03
 * zhanglu               2017/8/17-11:03                WEL-2770          修改分页配置
 ****************************************************************************************/

@Configuration
//  注意，由于MapperScannerConfigurer执行的比较早，所以必须有下面的注解
@AutoConfigureAfter(MybatisAutoConfiguration.class)
public class MyBatisMapperScannerConfig {

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
        mapperScannerConfigurer.setBasePackage("com.zjp.mapper");
        Properties properties = new Properties();

        // 这里要特别注意，不要把MyMapper放到 basePackage 中，也就是不能同其他Mapper一样被扫描到。
        properties.setProperty("mappers", MyMapper.class.getName());

        properties.setProperty("notEmpty", "false");
        properties.setProperty("IDENTITY", "select replace(uuid(), '-', '')");
        properties.setProperty("ORDER", "BEFORE");
        properties.setProperty("reasonable", "true");
        properties.setProperty("supportMethodsArguments", "true");
        properties.setProperty("params", "count=countSql");
        properties.setProperty("helperDialect", "mysql");

        mapperScannerConfigurer.setProperties(properties);

        return mapperScannerConfigurer;
    }


}
