package br.ifac.vannilyapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.ifac.vannilyapi.dto.*;
import br.ifac.vannilyapi.model.Endereco;

@Mapper(componentModel = "spring")
public interface EnderecoMapper {

    @Mapping(source = "usuario.id", target = "idUsuario")
    EnderecoGetDto toResponseDto(Endereco endereco);

    @Mapping(source = "idUsuario", target = "usuario.id")
    @Mapping(target = "id", ignore = true)
    Endereco toEntity(EnderecoCreateDto dto);

    @Mapping(source = "idUsuario", target = "usuario.id")
    Endereco toEntity(EnderecoUpdateDto dto);
}
