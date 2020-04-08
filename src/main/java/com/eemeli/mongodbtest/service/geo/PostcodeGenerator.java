package com.eemeli.mongodbtest.service.geo;

import feign.Feign;
import feign.Logger;
import feign.Request;
import feign.RequestLine;
import feign.okhttp.OkHttpClient;
import feign.slf4j.Slf4jLogger;

public interface PostcodeGenerator {

    @RequestLine("GET ?startWith=L")
    String getLiverpoolPostcode();

    static PostcodeGenerator connect() {
        return Feign.builder()
                .client(new OkHttpClient())
                .logger(new Slf4jLogger(PostcodeGenerator.class))
                .logLevel(Logger.Level.FULL)
                .options(new Request.Options(500, 6000))
                .target(PostcodeGenerator.class, "https://www.doogal.co.uk/CreateRandomPostcode.ashx");
    }
}
