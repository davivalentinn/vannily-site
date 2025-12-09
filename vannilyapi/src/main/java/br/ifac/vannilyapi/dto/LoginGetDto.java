package br.ifac.vannilyapi.dto;

import br.ifac.vannilyapi.model.TipoUsuario;

public record LoginGetDto(
    Long id,
    String token,
    String email,
    String nome,
    String usuario,
    TipoUsuario tipoUsuario
) {}


