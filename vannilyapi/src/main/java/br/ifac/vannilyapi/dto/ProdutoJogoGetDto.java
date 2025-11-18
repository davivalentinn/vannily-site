package br.ifac.vannilyapi.dto;

public record ProdutoJogoGetDto(
        Long id,
        Long produtoId,
        String tema,
        String genero,
        Integer qtdPessoas,
        String classificacaoIndicativa,
        String duracao,
        String tipoBaralho,
        String tamanhoCartas,
        String materialCartas,
        String tipoJogo,
        Integer numeroCartas,
        Boolean ilustrado,
        Integer qtdPecas,
        String tamanhoTabuleiro,
        String materialTabuleiro,
        String tipoTabuleiro,
        String complexidade,
        Boolean possuiCartas
) {}
