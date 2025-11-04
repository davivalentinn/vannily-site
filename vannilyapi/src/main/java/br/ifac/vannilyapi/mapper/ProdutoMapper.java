package br.ifac.vannilyapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.ifac.vannilyapi.dto.ProdutoDto;
import br.ifac.vannilyapi.model.Produto;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    @Mapping(source = "categoria.id", target = "idCategoria")
    ProdutoDto toDto(Produto entity);

    @Mapping(source = "idCategoria", target = "categoria.id")
    @Mapping(target = "categoria.nome", ignore = true)
    Produto toEntity(ProdutoDto dto);
}
