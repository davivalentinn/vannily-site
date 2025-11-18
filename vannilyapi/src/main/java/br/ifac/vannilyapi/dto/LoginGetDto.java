package br.ifac.vannilyapi.dto;

public record LoginGetDto(
    String token,
    String email,
    String role
) {}

