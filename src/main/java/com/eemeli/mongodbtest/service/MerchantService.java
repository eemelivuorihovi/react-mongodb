package com.eemeli.mongodbtest.service;

import com.eemeli.mongodbtest.domain.Merchant;
import com.eemeli.mongodbtest.repository.MerchantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MerchantService {

    private final MerchantRepository merchantRepository;

    @Autowired
    public MerchantService(MerchantRepository merchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    public Optional<Merchant> findById(String id) {
        return merchantRepository.findById(id);
    }

    public List<Merchant> findAll() {
        return merchantRepository.findAll();
    }

    public Merchant save(Merchant merchant) {
        return merchantRepository.save(merchant);
    }

    public void delete(Merchant merchant) {
        merchantRepository.delete(merchant);
    }
}
