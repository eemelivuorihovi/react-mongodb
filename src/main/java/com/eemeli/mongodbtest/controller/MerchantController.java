package com.eemeli.mongodbtest.controller;

import com.eemeli.mongodbtest.domain.Merchant;
import com.eemeli.mongodbtest.http.ApiResponse;
import com.eemeli.mongodbtest.model.MerchantDTO;
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

    public MerchantController(MerchantService merchantService) {
        this.merchantService = merchantService;
    }

    @GetMapping()
    public ResponseEntity<ApiResponse> getMerchants() {
        final List<MerchantDTO> merchants = merchantService.findAll();
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .data(merchants)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getMerchant(@PathVariable("id") String id) {
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

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> save(@RequestBody MerchantDTO request) {
        final MerchantDTO saved = merchantService.save(request);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .data(saved)
                        .build()
        );
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<ApiResponse> delete(@PathVariable("id") String id) {
        merchantService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .build()
        );
    }

    private ResponseEntity<ApiResponse> getBadRequestResponse(String id) {
        return ResponseEntity.badRequest().body(
                ApiResponse.builder()
                        .success(false)
                        .message("No merchant found for id: " + id)
                        .build()
        );
    }
}
