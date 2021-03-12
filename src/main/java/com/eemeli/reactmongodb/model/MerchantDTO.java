package com.eemeli.reactmongodb.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MerchantDTO {
    private String id;
    private String name;
    private String description;
    private LocationDTO location;
    private List<String> tags = new ArrayList<>();
}
