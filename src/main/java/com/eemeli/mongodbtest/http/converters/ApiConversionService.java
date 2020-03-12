package com.eemeli.mongodbtest.http.converters;

import com.eemeli.mongodbtest.http.converters.merchant.MerchantConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.support.GenericConversionService;
import org.springframework.stereotype.Component;

@Component
public class ApiConversionService extends GenericConversionService implements ConversionService {

    @Autowired
    public ApiConversionService(MerchantConverter merchantConverter) {
        addConverter(merchantConverter);
    }
}
