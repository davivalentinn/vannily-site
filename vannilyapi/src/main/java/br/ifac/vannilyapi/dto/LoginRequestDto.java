package br.ifac.vannilyapi.dto;

public record LoginRequestDto(
    String email,
    String senha
) {}
