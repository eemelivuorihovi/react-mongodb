package com.eemeli.mongodbtest.service.geo;

import com.eemeli.mongodbtest.http.geo.PostcodeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.Optional;

@Service
public class PostcodeService {

    private static final String UTF_8 = "UTF-8";

    private final PostcodesClient postcodesClient;
    private final PostcodeGenerator postcodeGenerator;

    @Autowired
    public PostcodeService(PostcodesClient postcodesClient, PostcodeGenerator postcodeGenerator) {
        this.postcodesClient = postcodesClient;
        this.postcodeGenerator = postcodeGenerator;
    }

    public PostcodeResponse.PostcodeResult getPostcodeResponse(String postcode) {
        final boolean postcodePresent = Optional.ofNullable(postcode).filter(s -> !s.isEmpty()).isPresent();
        if (!postcodePresent) {
            return generateRandomPostcode();
        }

        try {
            final String normalised = normalisePostcode(postcode);
            final PostcodeResponse response = postcodesClient.postcode(normalised);
            return response.getResult();
        }
        catch (Exception e) {
            return generateRandomPostcode();
        }
    }

    private PostcodeResponse.PostcodeResult generateRandomPostcode() {
        final String response = postcodeGenerator.getLiverpoolPostcode();
        final String[] parts = response.replaceAll("\\s+", "").split(",");

        final BigDecimal lat = new BigDecimal(parts[1]);
        final BigDecimal lon = new BigDecimal(parts[2]);
        return PostcodeResponse.PostcodeResult.builder()
                        .postcode(parts[0])
                        .latitude(lat)
                        .longitude(lon)
                        .build();

    }

    private String normalisePostcode(String postcode) throws UnsupportedEncodingException {
        return URLEncoder.encode(postcode.replaceAll("\\s+", ""), UTF_8);
    }
}
