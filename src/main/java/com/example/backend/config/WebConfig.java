// package com.example.backend.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
// import org.springframework.web.servlet.config.annotation.EnableWebMvc;
// @Configuration
// @EnableWebMvc
// public class WebConfig implements WebMvcConfigurer {

//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/") // Allow all endpoints
//                 .allowedOrigins("http://localhost:8081") // Allowed origin
//                 .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
//                 .allowedHeaders("*") // Allow all headers
//                 .allowCredentials(true); // Allow sending credentials (e.g., cookies)
//     }
// }