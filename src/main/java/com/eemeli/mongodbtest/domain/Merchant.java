package com.eemeli.mongodbtest.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document
public class Merchant {
    private String id;
    private String name;
    private String description;
}
