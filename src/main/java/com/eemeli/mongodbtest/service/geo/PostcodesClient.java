package com.eemeli.mongodbtest.service.geo;

import com.eemeli.mongodbtest.http.geo.PostcodeResponse;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import feign.*;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;
import feign.okhttp.OkHttpClient;
import feign.slf4j.Slf4jLogger;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Headers({
        "Accept: application/json",
        "Content-Type: application/json"
})
public interface PostcodesClient {

    @RequestLine("GET /{postcode}")
    PostcodeResponse postcode(@Param("postcode") String postcode);

    static PostcodesClient connect() {
        final Gson gson = new GsonBuilder()
                .registerTypeAdapter(LocalDateTime.class, (JsonDeserializer<LocalDateTime>) (json, type, jsonDeserializationContext) ->
                        ZonedDateTime.parse(json.getAsJsonPrimitive().getAsString()).toLocalDateTime())
                .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
                .create();

        return Feign.builder()
                .client(new OkHttpClient())
                .encoder(new GsonEncoder(gson))
                .decoder(new GsonDecoder(gson))
                .logger(new Slf4jLogger(PostcodesClient.class))
                .logLevel(Logger.Level.FULL)
                .options(new Request.Options(500, 6000))
                .target(PostcodesClient.class, "http://api.postcodes.io/postcodes");
    }
}
