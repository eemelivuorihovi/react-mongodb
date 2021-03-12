package com.eemeli.reactmongodb.config;

import com.eemeli.reactmongodb.service.geo.PostcodeGenerator;
import com.eemeli.reactmongodb.service.geo.PostcodesClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {

    @Bean
    public PostcodesClient postcodesClient() {
        return PostcodesClient.connect();
    }

    @Bean
    public PostcodeGenerator postcodeGenerator() {
        return PostcodeGenerator.connect();
    }
}
