package br.ifac.vannilyapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ProdutoDto(

        Long id,

        @NotBlank(message = "Nome é obrigatório")
        @Size(max = 255, message = "Nome deve ter no máximo 255 caracteres")
        String nome,

        @Size(max = 500, message = "URL da imagem deve ter no máximo 500 caracteres")
        String imagem,

        @NotNull(message = "Preço é obrigatório")
        @Positive(message = "Preço deve ser maior que zero")
        Double preco,

        @PositiveOrZero(message = "Desconto não pode ser negativo")
        Double desconto,

        @PositiveOrZero(message = "Unidades não podem ser negativas")
        Integer unidades,

        String descricao,

        @Size(max = 255, message = "Fornecedor deve ter no máximo 255 caracteres")
        String fornecedor,

        @Size(max = 255, message = "Transportadora deve ter no máximo 255 caracteres")
        String transportadora,

        @NotNull(message = "Categoria é obrigatória")
        Long idCategoria,

        @Size(max = 100, message = "Tema deve ter no máximo 100 caracteres")
        String tema,

        @Size(max = 100, message = "Gênero deve ter no máximo 100 caracteres")
        String genero

) { }
