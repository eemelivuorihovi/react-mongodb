package com.eemeli.mongodbtest.http.converters.merchant;

import com.eemeli.mongodbtest.domain.Location;
import com.eemeli.mongodbtest.domain.Merchant;
import com.eemeli.mongodbtest.http.geo.PostcodeResponse;
import com.eemeli.mongodbtest.http.merchant.MerchantSaveRequest;
import com.eemeli.mongodbtest.service.geo.PostcodeService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class MerchantConverter implements Converter<MerchantSaveRequest, Merchant> {

    private final PostcodeService postcodeService;

    public MerchantConverter(PostcodeService postcodeService) {
        this.postcodeService = postcodeService;
    }

    @Override
    public Merchant convert(MerchantSaveRequest request) {
        final Merchant.MerchantBuilder builder = Merchant.builder();
        builder.id(request.getId());
        builder.name(request.getName());
        builder.description(request.getDescription());
        builder.tags(request.getTags());

        final Location location = getLocation(request.getPostcode());
        builder.location(location);
        return builder.build();
    }

    private Location getLocation(String postcode) {
        final PostcodeResponse.PostcodeResult result = postcodeService.getPostcodeResponse(postcode);
        final String formatted = formatPostcode(result.getPostcode());
        return Location.builder()
                .postcode(formatted)
                .lat(result.getLatitude())
                .lng(result.getLongitude())
                .build();
    }

    private String formatPostcode(String postcode) {
        final StringBuilder builder = new StringBuilder(postcode);

        int index = postcode.length() > 5 ? 3 : 2;
        builder.insert(index, " ");
        return builder.toString();
    }
}
