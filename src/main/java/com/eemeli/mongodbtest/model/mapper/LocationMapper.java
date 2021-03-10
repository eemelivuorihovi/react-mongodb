package com.eemeli.mongodbtest.model.mapper;

import com.eemeli.mongodbtest.domain.Location;
import com.eemeli.mongodbtest.model.LocationDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocationMapper extends EntityMapper<LocationDTO, Location> {

    Location toEntity(LocationDTO dto);

    LocationDTO toDto(Location entity);

}
