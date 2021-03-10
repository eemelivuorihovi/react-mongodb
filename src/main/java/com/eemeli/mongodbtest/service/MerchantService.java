package com.eemeli.mongodbtest.service;

import com.eemeli.mongodbtest.domain.Location;
import com.eemeli.mongodbtest.domain.Merchant;
import com.eemeli.mongodbtest.http.geo.PostcodeResponse;
import com.eemeli.mongodbtest.model.LocationDTO;
import com.eemeli.mongodbtest.model.MerchantDTO;
import com.eemeli.mongodbtest.model.mapper.MerchantMapper;
import com.eemeli.mongodbtest.repository.MerchantRepository;
import com.eemeli.mongodbtest.service.geo.PostcodeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MerchantService {

    private final MerchantRepository merchantRepository;
    private final PostcodeService postcodeService;
    private final MerchantMapper merchantMapper;

    public MerchantService(MerchantRepository merchantRepository, PostcodeService postcodeService, MerchantMapper merchantMapper) {
        this.merchantRepository = merchantRepository;
        this.postcodeService = postcodeService;
        this.merchantMapper = merchantMapper;
    }

    public Optional<Merchant> findById(String id) {
        return merchantRepository.findById(id);
    }

    public List<MerchantDTO> findAll() {
        final List<Merchant> merchants = merchantRepository.findAll();
        return merchantMapper.toDto(merchants);
    }

    public MerchantDTO save(MerchantDTO dto) {
        final Merchant merchant = merchantMapper.toEntity(dto);

        final Location location = getLocation(dto.getLocation());
        merchant.setLocation(location);
        return merchantMapper.toDto(merchantRepository.save(merchant));
    }

    public void delete(String id) {
        merchantRepository.deleteById(id);
    }

    private Location getLocation(LocationDTO locationDTO) {
        final PostcodeResponse.PostcodeResult result = postcodeService.getPostcodeResponse(getPostcode(locationDTO));
        return Location.builder()
                .postcode(result.getPostcode())
                .lat(result.getLatitude())
                .lng(result.getLongitude())
                .build();
    }

    private String getPostcode(LocationDTO dto) {
        if (dto == null) {
            return null;
        }

        return dto.getPostcode();
    }
}
