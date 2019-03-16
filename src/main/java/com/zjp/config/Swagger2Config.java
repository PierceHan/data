package com.zjp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by hanguoan on 2018/10/8.
 */

@Configuration
@EnableSwagger2
public class Swagger2Config {

    /**
     *
     * select()函数返回一个ApiSelectorBuilder实例用来控制哪些接口暴露给Swagger来展现
     *
     * @return
     */
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.zjp.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    /**
     * 用来创建该Api的基本信息（这些基本信息会展现在文档页面中）
     *
     * @return
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("black RESTful APIs")
                .description("")
                .contact("zjp")
                .version("1.0")
                .build();
    }

}
