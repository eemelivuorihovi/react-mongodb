package com.eemeli.reactmongodb.http.geo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostcodeResponse {

    private int status;
    private PostcodeResult result;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PostcodeResult {
        private String postcode;
        private BigDecimal latitude;
        private BigDecimal longitude;
    }
}
