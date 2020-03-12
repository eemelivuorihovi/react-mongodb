package com.eemeli.mongodbtest.http.converters.merchant;

import com.eemeli.mongodbtest.domain.Merchant;
import com.eemeli.mongodbtest.domain.tag.MerchantTag;
import com.eemeli.mongodbtest.http.merchant.MerchantCreateRequest;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MerchantConverter implements Converter<MerchantCreateRequest, Merchant> {

    @Override
    public Merchant convert(MerchantCreateRequest request) {
        final Merchant.MerchantBuilder builder = Merchant.builder();
        builder.name(request.getName());
        builder.description(request.getDescription());

        final List<MerchantTag> tags =
                request.getTags()
                        .stream()
                        .map(MerchantTag::valueOf)
                        .collect(Collectors.toList());

        builder.tags(tags);
        return builder.build();
    }
}
