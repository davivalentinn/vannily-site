package br.ifac.vannilyapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import br.ifac.vannilyapi.dto.UsuarioCreateDto;
import br.ifac.vannilyapi.dto.UsuarioGetDto;
import br.ifac.vannilyapi.dto.UsuarioUpdateDto;
import br.ifac.vannilyapi.model.Usuario;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioGetDto toResponseDto(Usuario usuario);

    UsuarioUpdateDto toUpdateDto(Usuario usuario);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dataCriacao", ignore = true)
    Usuario toEntity(UsuarioCreateDto dto);

    @Mapping(target = "senha", ignore = true)
    @Mapping(target = "dataCriacao", ignore = true)
    Usuario toEntity(UsuarioUpdateDto dto);

}
