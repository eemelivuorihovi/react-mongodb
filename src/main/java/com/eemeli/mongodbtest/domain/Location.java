package com.eemeli.mongodbtest.domain;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class Location {
    private String postcode;
    private BigDecimal lat;
    private BigDecimal lng;
}
