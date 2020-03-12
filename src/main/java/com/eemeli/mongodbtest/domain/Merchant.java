package com.eemeli.mongodbtest.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@Builder
@Document
public class Merchant {
    @Id
    @MongoId(targetType = FieldType.OBJECT_ID)
    private String id;
    private String name;
    private String description;
}
