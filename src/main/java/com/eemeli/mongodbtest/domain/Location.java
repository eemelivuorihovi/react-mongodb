package com.eemeli.mongodbtest.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    private String postcode;
    private BigDecimal lat;
    private BigDecimal lng;
}
