package com.zjp.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * Created by hanguoan on 2018/10/8.
 */
@Component
public class ConfigProperties implements EnvironmentAware {

    private static Logger logger = LoggerFactory.getLogger(ConfigProperties.class);

//    // redis
//    private int redisPort;
//    private String redisPwd;
//    private String redisNodes;
//    private String redisMaster;

    // database
    private String className = "com.mysql.jdbc.Driver";
    private String dbUrl;
    private String dbUsername;
    private String dbPassword;

//    private String dbSlaveUrl;
//    private String dbSlaveUsername;
//    private String dbSlavePassword;

//    private String ocmUrl;
//    private String masterUrl;


    @Override
    public void setEnvironment(Environment environment) {
//        if (null != environment.getProperty("redis_port")) {
//            redisPort = Integer.valueOf(environment.getProperty("redis_port"));
//        }
//        if (null != environment.getProperty("redis_password")) {
//            redisPwd = environment.getProperty("redis_password");
//        }
//
//        if (!StringUtils.isEmpty(environment.getProperty("redis_nodes")))
//            redisNodes = environment.getProperty("redis_nodes");
//
//        if (!StringUtils.isEmpty(environment.getProperty("redis_master")))
//            redisMaster = environment.getProperty("redis_master");

        dbUrl = environment.getProperty("db_url");
        dbUsername = environment.getProperty("db_username");
        dbPassword = environment.getProperty("db_password");

        logger.info("init config properties, dbUrl: [" + dbUrl + "] dbUsername: [" + dbUsername + "]");

        if (environment.getProperty("db_slave_url") != null
                && environment.getProperty("db_slave_username") != null
                && environment.getProperty("db_slave_password") != null) {

//            dbSlaveUrl = environment.getProperty("db_slave_url");
//            dbSlaveUsername = environment.getProperty("db_slave_username");
//            dbSlavePassword = environment.getProperty("db_slave_password");
//
//            logger.info("init config properties, dbSlaveUrl: [" + dbSlaveUrl + "] dbSlaveUsername: [" + dbSlaveUsername + "]");

        } else {
            logger.warn("dbSlaveUrl or dbSlaveUsername or dbSlavePassword not set!");
        }

//        ocmUrl = environment.getProperty("ocm_url");
//        masterUrl = environment.getProperty("master_url");

    }

//    public String getMasterUrl() {
//        return masterUrl;
//    }
//
//    public String getOcmUrl() {
//        return ocmUrl;
//    }

//    public int getRedisPort() {
//        return redisPort;
//    }
//
//    public String getRedisPwd() {
//        return redisPwd;
//    }
//
//    public String getRedisNodes() {
//        return redisNodes;
//    }
//
//    public String getRedisMaster() {
//        return redisMaster;
//    }

    public String getClassName() {
        return className;
    }

    public String getDbUrl() {
        return dbUrl;
    }

    public String getDbUsername() {
        return dbUsername;
    }

    public String getDbPassword() {
        return dbPassword;
    }

//    public String getDbSlaveUrl() {
//        return dbSlaveUrl;
//    }
//
//    public String getDbSlaveUsername() {
//        return dbSlaveUsername;
//    }
//
//    public String getDbSlavePassword() {
//        return dbSlavePassword;
//    }
}
