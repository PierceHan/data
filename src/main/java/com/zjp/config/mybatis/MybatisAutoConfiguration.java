package com.zjp.config.mybatis;

import com.github.pagehelper.PageHelper;
import com.zjp.utils.SpringApplicationContextHolder;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.boot.autoconfigure.SpringBootVFS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.entity.Config;
import tk.mybatis.mapper.mapperhelper.MapperHelper;

import javax.sql.DataSource;
import java.util.Properties;

//import tk.mybatis.mapper.entity.Config;

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
 * zhanglu               2017/7/25-18:24
 ****************************************************************************************/

@Configuration
@ConditionalOnClass({
        SqlSessionFactory.class,
        SqlSessionFactoryBean.class
})
public class MybatisAutoConfiguration {

    private static Logger logger = LoggerFactory.getLogger(MybatisAutoConfiguration.class);

    @Autowired(required = false)
    private Interceptor[] interceptors;

    @javax.annotation.Resource
    @Qualifier("dataSource")
    private DataSource masterDataSource;

    @Bean(name = "sqlSessionFactory")
    @ConditionalOnMissingBean
    public SqlSessionFactory sqlSessionFactory(@Qualifier("dataSource") DataSource dataSource) throws Exception{

        SqlSessionFactoryBean factory = new SqlSessionFactoryBean();
        //下面一句解决spring boot 与mybatis整合，type-aliases-package、type-handlers-package等配置不起作用,导致类加载失败
        factory.setVfs(SpringBootVFS.class);
        factory.setDataSource(dataSource);
        factory.setTypeAliasesPackage("com.wellcloud.dnc.model.pojo");

        //添加XML目录
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        factory.setMapperLocations(resolver.getResources("classpath*:mapper/*.xml"));
//        factory.setTypeHandlersPackage("com.wellcloud.dnc.common.config.mybatis.typeHandler");
        org.apache.ibatis.session.Configuration configuration = new org.apache.ibatis.session.Configuration();
        configuration.setMapUnderscoreToCamelCase(true);
        factory.setConfiguration(configuration);
        return factory.getObject();
    }

    @Bean
    public MapperHelper mapperHelper(){

        MapperHelper mapperHelper = new MapperHelper();
        Config config = new Config();
        config.setIDENTITY("select replace(uuid(), '-', '')");
        config.setOrder("BEFORE");
        config.setNotEmpty(false);


        mapperHelper.setConfig(config);

        mapperHelper.registerMapper(Mapper.class);

        return mapperHelper;

    }

    /**
     * 注册mybatis分页插件
     *
     * @param dataSource
     * @return
     */
    @Bean
    public PageHelper pageHelper(DataSource dataSource) {
        logger.info("注册MyBatis分页插件PageHelper");

        PageHelper pageHelper = new PageHelper();
        Properties props = new Properties();
//        props.setProperty("offsetAsPageNum", "true");
//        props.setProperty("rowBoundsWithCount", "true");
        props.setProperty("reasonable", "true");
        props.setProperty("supportMethodsArguments", "true");
        props.setProperty("helperDialect", "mysql");
        props.setProperty("params", "count=countSql");


        pageHelper.setProperties(props);

        return pageHelper;
    }

//    /**
//     * 把所有数据库都放在路由中
//     *
//     * @return
//     */
//    @Bean(name = "routingDataSourceProxy")
//    public AbstractRoutingDataSource routingDataSourceProxy(){
//
//        Map<Object, Object> targetDataSources = new HashMap<Object, Object>();
//
//        //把所有数据库都放在targetDataSources中,注意key值要和determineCurrentLookupKey()中代码写的一至，
//        //否则切换数据源时找不到正确的数据源
//        targetDataSources.put(DataSourceType.master.getType(), masterDataSource);
//        targetDataSources.put(DataSourceType.slave.getType(), slaveDataSource);
//
//        AbstractRoutingDataSource proxy = new AbstractRoutingDataSource() {
//
//            /**
//             * 这是AbstractRoutingDataSource类中的一个抽象方法，
//             * 而它的返回值是你所要用的数据源dataSource的key值，有了这个key值，
//             * targetDataSources就从中取出对应的DataSource，如果找不到，就用配置默认的数据源。
//             *
//             * @return
//             */
//            @Override
//            protected Object determineCurrentLookupKey() {
//                String typeKey = DataSourceContextHolder.getReadOrWrite();
//                if(typeKey == null){
//                    throw new NullPointerException("dataSource route, dataSource Type can't be null");
//                }
//                if (typeKey.equals(DataSourceType.master.getType())){
//                    return DataSourceType.master.getType();
//                }
//
//                if (typeKey.equals(DataSourceType.slave.getType())){
//                    return DataSourceType.slave.getType();
//                }
//
//                return DataSourceType.master.getType();
//            }
//        };
//        proxy.setDefaultTargetDataSource(masterDataSource);//默认库
//        proxy.setTargetDataSources(targetDataSources);
//
//        return proxy;
//    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

}
