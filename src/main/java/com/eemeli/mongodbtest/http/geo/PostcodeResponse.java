package com.eemeli.mongodbtest.http.geo;

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

    public boolean isOkResponse() {
        return this.status == 200;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PostcodeResult {
        private String postcode;
        private BigDecimal latitude;
        private BigDecimal longitude;
    }
}
