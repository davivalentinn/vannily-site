package br.ifac.vannilyapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.ifac.vannilyapi.dto.ProdutoCreateDto;
import br.ifac.vannilyapi.dto.ProdutoGetDto;
import br.ifac.vannilyapi.dto.ProdutoUpdateDto;
import br.ifac.vannilyapi.model.Produto;

@Mapper(componentModel = "spring",
        uses = { ProdutoRoupaMapper.class, ProdutoJogoMapper.class })
public interface ProdutoMapper {

    @Mapping(source = "categoria.id", target = "idCategoria")
    ProdutoUpdateDto toUpdateDto(Produto produto);

    @Mapping(source = "idCategoria", target = "categoria.id")
    @Mapping(target = "id", ignore = true)
    Produto toEntity(ProdutoCreateDto dto);

    @Mapping(source = "categoria.nome", target = "categoriaNome")
    @Mapping(source = "produtoRoupa", target = "roupa")
    @Mapping(source = "produtoJogo", target = "jogo")
    ProdutoGetDto toGetDto(Produto produto);
}


