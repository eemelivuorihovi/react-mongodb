package com.eemeli.mongodbtest.controller;

import com.eemeli.mongodbtest.domain.Merchant;
import com.eemeli.mongodbtest.http.ApiResponse;
import com.eemeli.mongodbtest.http.merchant.MerchantCreateRequest;
import com.eemeli.mongodbtest.service.MerchantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/merchant")
public class MerchantController {

    private final MerchantService merchantService;

    public MerchantController(MerchantService merchantService) {
        this.merchantService = merchantService;
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
            return ResponseEntity.badRequest().body(
                    ApiResponse.builder()
                    .success(false)
                    .message("No merchant found for id: " + id)
                    .build()
            );
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
        final Merchant saved =
                merchantService.save(
                        Merchant.builder()
                                .description(request.getDescription())
                                .name(request.getName())
                                .build()
                );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .data(saved)
                        .build()
        );
    }
}
