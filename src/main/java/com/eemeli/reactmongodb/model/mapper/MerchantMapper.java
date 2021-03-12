package com.eemeli.reactmongodb.model.mapper;

import com.eemeli.reactmongodb.domain.Merchant;
import com.eemeli.reactmongodb.model.MerchantDTO;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = LocationMapper.class)
public interface MerchantMapper extends EntityMapper<MerchantDTO, Merchant> {

    Merchant toEntity(MerchantDTO dto);

    MerchantDTO toDto(Merchant entity);

    List<Merchant> toEntity(List<MerchantDTO> dtoList);

    List<MerchantDTO> toDto(List<Merchant> entityList);

    default Merchant fromId(String id) {
        if (StringUtils.isBlank(id)) {
            return null;
        }

        Merchant m = new Merchant();
        m.setId(id);
        return m;
    }
}
