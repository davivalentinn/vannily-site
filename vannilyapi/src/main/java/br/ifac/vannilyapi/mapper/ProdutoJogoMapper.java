package br.ifac.vannilyapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import br.ifac.vannilyapi.dto.*;
import br.ifac.vannilyapi.model.ProdutoJogo;

@Mapper(componentModel = "spring")
public interface ProdutoJogoMapper {

    @Mapping(source = "produto.id", target = "produtoId")
    ProdutoJogoGetDto toGetDto(ProdutoJogo entity);

    @Mapping(source = "produtoId", target = "produto.id")
    @Mapping(target = "id", ignore = true)
    ProdutoJogo toEntity(ProdutoJogoCreateDto dto);

    @Mapping(source = "produtoId", target = "produto.id")
    ProdutoJogo toEntity(ProdutoJogoUpdateDto dto);
}
