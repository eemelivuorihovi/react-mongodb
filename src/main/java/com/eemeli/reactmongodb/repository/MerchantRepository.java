package com.eemeli.reactmongodb.repository;

import com.eemeli.reactmongodb.domain.Merchant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MerchantRepository extends MongoRepository<Merchant, String> {
}
