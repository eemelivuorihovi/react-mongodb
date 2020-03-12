package com.eemeli.mongodbtest.repository;

import com.eemeli.mongodbtest.domain.Merchant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MerchantRepository extends MongoRepository<Merchant, String> {
    Merchant findByName(String name);
}
