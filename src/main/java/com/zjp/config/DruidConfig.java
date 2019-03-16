package com.zjp.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.sql.SQLException;

/**
 * druid配置
 * <p>
 * Created by zhang on 2017/5/18.
 */

@Configuration
@EnableTransactionManagement
public class DruidConfig {

    @Autowired
    private ConfigProperties configProperties;

//    private Class<? extends DataSource> dataSourceType;

    @Bean(name = "dataSource")
    @Primary
    public DataSource masterDataSource() {
        DruidDataSource druidDataSource = new DruidDataSource();

        druidDataSource.setDriverClassName(configProperties.getClassName());
        druidDataSource.setUrl(configProperties.getDbUrl());
        druidDataSource.setUsername(configProperties.getDbUsername());
        druidDataSource.setPassword(configProperties.getDbPassword());

        druidDataSource.setValidationQuery("select 1");
        druidDataSource.setMaxActive(30);
        druidDataSource.setInitialSize(10);
        // 配置获取连接等待超时的时间
        druidDataSource.setMaxWait(60000);
        druidDataSource.setMinIdle(10);
        // 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
        druidDataSource.setTimeBetweenEvictionRunsMillis(60000);
        //配置一个连接在池中最小生存的时间，单位是毫秒
        druidDataSource.setMinEvictableIdleTimeMillis(300000);
        druidDataSource.setTestWhileIdle(true);
        //申请连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能
        druidDataSource.setTestOnBorrow(false);
        //归还连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能
        druidDataSource.setTestOnReturn(false);
        druidDataSource.setPoolPreparedStatements(true);
        druidDataSource.setMaxPoolPreparedStatementPerConnectionSize(20);

        try {
            druidDataSource.setFilters("stat");
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return druidDataSource;
    }

//    @Bean(name = "slaveDataSource")
//    public DataSource slaveDataSource() {
//        DruidDataSource druidDataSource = new DruidDataSource();
//
//        druidDataSource.setDriverClassName(configProperties.getClassName());
//        druidDataSource.setUrl(configProperties.getDbSlaveUrl());
//        druidDataSource.setUsername(configProperties.getDbSlaveUsername());
//        druidDataSource.setPassword(configProperties.getDbSlavePassword());
//
//        druidDataSource.setValidationQuery("select 1");
//        druidDataSource.setMaxActive(30);
//        druidDataSource.setInitialSize(10);
//        // 配置获取连接等待超时的时间
//        druidDataSource.setMaxWait(60000);
//        druidDataSource.setMinIdle(10);
//        // 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
//        druidDataSource.setTimeBetweenEvictionRunsMillis(60000);
//        //配置一个连接在池中最小生存的时间，单位是毫秒
//        druidDataSource.setMinEvictableIdleTimeMillis(300000);
//        druidDataSource.setTestWhileIdle(true);
//        //申请连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能
//        druidDataSource.setTestOnBorrow(false);
//        //归还连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能
//        druidDataSource.setTestOnReturn(false);
//        druidDataSource.setPoolPreparedStatements(true);
//        druidDataSource.setMaxPoolPreparedStatementPerConnectionSize(20);
//
//        try {
//            druidDataSource.setFilters("stat");
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//
//        return druidDataSource;
//
//    }


    @Bean
    public ServletRegistrationBean druidServlet() {
        ServletRegistrationBean reg = new ServletRegistrationBean();
        reg.setServlet(new StatViewServlet());
        // 登录URL http://localhost:8080/d/login.html
        reg.addUrlMappings("/druid/*");
        // 设置白名单
//        reg.addInitParameter("allow", "10.105.0.220");
        // 设置黑名单
        reg.addInitParameter("deny", "");
        // 设置登录查看信息的账号密码.
//        reg.addInitParameter("loginUsername", "admin");
//        reg.addInitParameter("loginPassword", "admin");
        return reg;
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new WebStatFilter());
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.addInitParameter("exclusions",
                "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
        return filterRegistrationBean;
    }

}
