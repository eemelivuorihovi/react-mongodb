package com.eemeli.mongodbtest.controller;

import com.eemeli.mongodbtest.domain.Merchant;
import com.eemeli.mongodbtest.http.MerchantCreateRequest;
import com.eemeli.mongodbtest.service.MerchantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
        return ResponseEntity.ok(merchants);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMerchant(@RequestBody MerchantCreateRequest request) {
        final String uuid = UUID.randomUUID().toString();

        final Optional<Merchant> existingMerchant = merchantService.findById(uuid);
        if (existingMerchant.isPresent()) {
            return ResponseEntity.badRequest()
                    .body("this is probably my fault");
        }

        final Merchant saved =
                merchantService.save(
                        Merchant.builder()
                                .id(uuid)
                                .description(request.getDescription())
                                .name(request.getName())
                                .build()
                );

        return ResponseEntity.ok(saved);
    }
}
