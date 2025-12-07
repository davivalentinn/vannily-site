package br.ifac.vannilyapi.dto;

import java.util.List;

public record CarrinhoResponseDto(
        Long carrinhoId,
        Long usuarioId,
        List<CarrinhoItemResponseDto> itens,
        Double total
) {}
