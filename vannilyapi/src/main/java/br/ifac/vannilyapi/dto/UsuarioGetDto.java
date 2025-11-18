package br.ifac.vannilyapi.dto;

import java.time.LocalDateTime;

public record UsuarioGetDto(
        Long id,
        String nome,
        String numeroTelefone,
        String email,
        String usuario,
        String tipoUsuario,
        LocalDateTime dataCriacao
) {}
