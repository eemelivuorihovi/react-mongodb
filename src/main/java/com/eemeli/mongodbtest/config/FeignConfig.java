package com.eemeli.mongodbtest.config;

import com.eemeli.mongodbtest.service.geo.PostcodesClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {

    @Bean
    public PostcodesClient postcodesClient() {
        return PostcodesClient.connect();
    }
}
