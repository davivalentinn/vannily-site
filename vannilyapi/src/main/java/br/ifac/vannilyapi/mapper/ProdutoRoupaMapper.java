package br.ifac.vannilyapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.ifac.vannilyapi.dto.ProdutoRoupaCreateDto;
import br.ifac.vannilyapi.dto.ProdutoRoupaGetDto;
import br.ifac.vannilyapi.dto.ProdutoRoupaUpdateDto;
import br.ifac.vannilyapi.model.ProdutoRoupa;
import br.ifac.vannilyapi.model.Produto;

@Mapper(componentModel = "spring")
public interface ProdutoRoupaMapper {

    @Mapping(source = "produtoId", target = "produto")
    @Mapping(target = "id", ignore = true)
    ProdutoRoupa toEntity(ProdutoRoupaCreateDto dto);

    @Mapping(source = "produtoId", target = "produto")
    ProdutoRoupa toEntity(ProdutoRoupaUpdateDto dto);

    @Mapping(source = "produto.id", target = "produtoId")
    ProdutoRoupaGetDto toResponseDto(ProdutoRoupa entity);

    // Método auxiliar requerido pelo MapStruct
    default Produto map(Long produtoId) {
        if (produtoId == null) return null;
        Produto produto = new Produto();
        produto.setId(produtoId);
        return produto;
    }
}
