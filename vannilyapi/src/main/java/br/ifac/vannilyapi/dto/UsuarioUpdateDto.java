package br.ifac.vannilyapi.dto;

public record UsuarioUpdateDto(

        Long id,
        String nome,
        String numeroTelefone,
        String email,
        String usuario,
        String tipoUsuario
) {}
