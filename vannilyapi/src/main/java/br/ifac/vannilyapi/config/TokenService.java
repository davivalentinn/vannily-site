package br.ifac.vannilyapi.config;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import br.ifac.vannilyapi.model.Usuario;

@Service
public class TokenService {

    @Value("${jwt.secret:scrp-secret-key-2024}")
    private String secret;

    private Instant gerarDataExpiracao() {
        return LocalDateTime.now()
                .plusHours(2)
                .atZone(ZoneId.systemDefault())
                .toInstant();
    }

    public String criarToken(Usuario usuario) {
        try {
            Algorithm algoritmo = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer("VANNILY-API")
                    .withSubject(usuario.getEmail())
                    .withClaim("id", usuario.getId())
                    .withClaim("nome", usuario.getNome())
                    .withClaim("tipoUsuario", usuario.getTipoUsuario().name())
                    .withExpiresAt(gerarDataExpiracao())
                    .sign(algoritmo);

        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar token JWT", e);
        }
    }

    public String validarToken(String token) {
        try {
            Algorithm algoritmo = Algorithm.HMAC256(secret);
            return JWT.require(algoritmo)
                    .withIssuer("VANNILY-API")
                    .build()
                    .verify(token)
                    .getSubject(); 
        } catch (JWTVerificationException e) {
            return null;
        }
    }
}
