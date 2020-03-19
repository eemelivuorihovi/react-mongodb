package com.eemeli.mongodbtest.service.geo;

import com.eemeli.mongodbtest.http.geo.PostcodeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Service
public class PostcodeService {

    private static final String UTF_8 = "UTF-8";

    private final PostcodesClient postcodesClient;

    @Autowired
    public PostcodeService(PostcodesClient postcodesClient) {
        this.postcodesClient = postcodesClient;
    }

    public PostcodeResponse getPostcodeResponse(String postcode) throws UnsupportedEncodingException {
        final String normalised = normalisePostcode(postcode);
        return postcodesClient.postcode(normalised);
    }

    private String normalisePostcode(String postcode) throws UnsupportedEncodingException {
        return URLEncoder.encode(postcode.replaceAll("\\s+", ""), UTF_8);
    }
}
