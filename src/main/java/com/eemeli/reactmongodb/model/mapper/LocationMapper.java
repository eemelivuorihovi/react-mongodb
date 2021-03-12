package com.eemeli.reactmongodb.model.mapper;

import com.eemeli.reactmongodb.domain.Location;
import com.eemeli.reactmongodb.model.LocationDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocationMapper extends EntityMapper<LocationDTO, Location> {

    Location toEntity(LocationDTO dto);

    LocationDTO toDto(Location entity);

}
