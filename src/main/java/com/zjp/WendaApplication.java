package com.zjp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
@SpringBootApplication
public class WendaApplication extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(WendaApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(WendaApplication.class, args);
    }
}
