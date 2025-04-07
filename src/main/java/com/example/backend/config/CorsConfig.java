// package com.example.backend.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class CorsConfig {
//     @Bean
//     public WebMvcConfigurer corsConfigurer() {
//         return new WebMvcConfigurer() {
//             @Override
//             public void addCorsMappings(CorsRegistry registry) {
//                 registry.addMapping("/**")  // Adjust based on your API
//                         .allowedOrigins("http://localhost:8081") // Allow frontend
//                         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS","HEAD","PATCH") // Allow these methods
//                         .allowedHeaders("*")
//                         .allowCredentials(true);
//             }
//         };
//     }
// }
package com.example.backend.config;

// import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins("http://localhost:8081") // Allowed origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH") // Allowed HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow sending credentials (e.g., cookies)
    }
}
