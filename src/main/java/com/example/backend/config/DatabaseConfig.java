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
                .url("jdbc:mysql://localhost:3306/SE_workingdata")
                .username("root")
                .password("peace")
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }
}
