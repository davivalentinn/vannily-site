package br.ifac.vannilyapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.ifac.vannilyapi.dto.CategoriaCreateDto;
import br.ifac.vannilyapi.dto.CategoriaGetDto;
import br.ifac.vannilyapi.dto.CategoriaUpdateDto;
import br.ifac.vannilyapi.model.Categoria;

@Mapper(componentModel = "spring")
public interface CategoriaMapper {

    CategoriaGetDto toDto(Categoria categoria);
    
    @Mapping(target = "id", ignore = true)
    Categoria toEntity(CategoriaCreateDto dto);

    Categoria toEntity(CategoriaUpdateDto dto);
}
