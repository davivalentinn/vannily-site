package br.ifac.vannilyapi.dto;

public record LoginResponseDto(
    String token,
    String email,
    String role
) {}
