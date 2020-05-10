//package com.bookstore.config;
//
//import com.google.api.client.util.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.LocalTime;
//
//@Configuration
//@EnableSwagger2
//public class SwaggerConfiguration {
//
//    @Value("${spring.springfox.path-mapping:/}")
//    private String pathMapping;
//
//    @Bean
//    public Docket settlementsApi() {
//        return new Docket(DocumentationType.SWAGGER_2).select()
//                .apis(RequestHandlerSelectors.basePackage("com.bookstore.controller")).build()
//                .directModelSubstitute(LocalDateTime.class, String.class)
//                .directModelSubstitute(LocalDate.class, String.class)
//                .directModelSubstitute(LocalTime.class, String.class)
//                .pathMapping(pathMapping);
//    }
//}
