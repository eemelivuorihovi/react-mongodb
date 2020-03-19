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
        try {
            final PostcodeResponse response = postcodeService.getPostcodeResponse(postcode);
            if (!response.isOkResponse()) {
                return Location.builder()
                        .postcode(postcode)
                        .build();
            }

            final PostcodeResponse.PostcodeResult result = response.getResult();
            return Location.builder()
                    .postcode(result.getPostcode())
                    .lat(result.getLatitude())
                    .lng(result.getLongitude())
                    .build();
        }
        catch (Exception e) {
            return Location.builder()
                    .postcode(postcode)
                    .build();
        }
    }
}
