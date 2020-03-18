package com.eemeli.mongodbtest.controller;

import com.eemeli.mongodbtest.domain.Merchant;
import com.eemeli.mongodbtest.http.ApiResponse;
import com.eemeli.mongodbtest.http.converters.ApiConversionService;
import com.eemeli.mongodbtest.http.merchant.MerchantCreateRequest;
import com.eemeli.mongodbtest.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/merchant")
public class MerchantController {

    private final MerchantService merchantService;
    private final ApiConversionService apiConversionService;

    @Autowired
    public MerchantController(MerchantService merchantService, ApiConversionService apiConversionService) {
        this.merchantService = merchantService;
        this.apiConversionService = apiConversionService;
    }

    @GetMapping()
    public ResponseEntity<?> getMerchants() {
        final List<Merchant> merchants = merchantService.findAll();
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .data(merchants)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMerchant(@PathVariable("id") String id) {
        final Optional<Merchant> merchantOptional = merchantService.findById(id);
        if (!merchantOptional.isPresent()) {
            return getBadRequestResponse(id);
        }

        final Merchant merchant = merchantOptional.get();
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .data(merchant)
                        .build()
        );
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMerchant(@RequestBody MerchantCreateRequest request) {
        final Merchant merchant =
                merchantService.save(
                        apiConversionService.convert(request, Merchant.class)
                );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .data(merchant)
                        .build()
        );
    }

    @GetMapping("/{id}/delete")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        final Optional<Merchant> merchantOptional = merchantService.findById(id);
        if (!merchantOptional.isPresent()) {
            return getBadRequestResponse(id);
        }

        final Merchant merchant = merchantOptional.get();
        merchantService.delete(merchant);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .build()
        );
    }

    private ResponseEntity<?> getBadRequestResponse(String id) {
        return ResponseEntity.badRequest().body(
                ApiResponse.builder()
                        .success(false)
                        .message("No merchant found for id: " + id)
                        .build()
        );
    }
}
