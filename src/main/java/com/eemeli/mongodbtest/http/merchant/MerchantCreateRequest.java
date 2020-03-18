package com.eemeli.mongodbtest.http.merchant;

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
public class MerchantCreateRequest {
    private String name;
    private String description;
    private List<String> tags = new ArrayList<>();
}
