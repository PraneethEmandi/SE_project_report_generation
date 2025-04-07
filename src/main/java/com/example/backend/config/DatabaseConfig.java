package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;

@Configuration
public class DatabaseConfig {
    @Bean
    public DataSource getDataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:mysql://localhost:3306/se_lab")
                .username("root")
                .password("vicky@007")
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }
}
