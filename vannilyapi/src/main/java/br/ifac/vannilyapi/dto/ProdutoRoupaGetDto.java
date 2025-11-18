package br.ifac.vannilyapi.dto;

public record ProdutoRoupaGetDto(
        Long id,
        Long produtoId,
        String tamanho,
        String cor,
        String dimensoes,
        String numeroModelo,
        Boolean tipoCapuz,
        String espessuraTecido,
        String materialForro,
        Boolean possuiZiper,
        Boolean resistenteAgua,
        String tipoGola,
        String tipoManga,
        String tecido,
        Boolean possuiBolsos,
        Boolean estampaPersonalizada,
        String modelo
) {}
