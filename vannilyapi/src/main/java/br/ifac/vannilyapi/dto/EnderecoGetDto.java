package br.ifac.vannilyapi.dto;

public record EnderecoGetDto(
        Long id,
        Long idUsuario,
        String cep,
        String pais,
        String estado,
        String cidade,
        String bairro,
        String rua,
        String numero,
        String complemento
) {}
