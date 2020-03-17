package com.eemeli.mongodbtest.domain.tag;

public enum MerchantTag {
    ANTIQUE("Antique"),
    COLLECTORS("Collector's Items"),
    FOOD("Food"),
    MISC("Miscellaneous");

    String display;

    MerchantTag(String display) {
        this.display = display;
    }
}
