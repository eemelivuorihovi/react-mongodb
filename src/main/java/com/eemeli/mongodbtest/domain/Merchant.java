package com.eemeli.mongodbtest.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Data
@Builder
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Merchant {
    @Id
    @MongoId(targetType = FieldType.OBJECT_ID)
    private String id;
    private String name;
    private String description;
    private Location location;
    @Singular
    private List<String> tags;
}
