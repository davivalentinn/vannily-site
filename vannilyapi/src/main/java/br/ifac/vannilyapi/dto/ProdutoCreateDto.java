package br.ifac.vannilyapi.dto;

import jakarta.validation.constraints.*;

public record ProdutoCreateDto(

        @NotBlank(message = "Nome é obrigatório")
        @Size(max = 255)
        String nome,

        @Size(max = 500)
        String imagem,

        @NotNull
        @Positive
        Double preco,

        @PositiveOrZero
        Double desconto,

        @PositiveOrZero
        Integer unidades,

        String descricao,

        @Size(max = 255)
        String fornecedor,

        @Size(max = 255)
        String transportadora,

        @NotNull
        Long idCategoria,

        @Size(max = 100)
        String tema,

        @Size(max = 100)
        String genero
) {}
