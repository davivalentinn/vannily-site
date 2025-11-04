package br.ifac.vannilyapi.config;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class TokenFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final PerfilUsuarioService perfilUsuarioService;

    public TokenFilter(TokenService tokenService, PerfilUsuarioService perfilUsuarioService) {
    this.tokenService = tokenService;
    this.perfilUsuarioService  = perfilUsuarioService;
}



    private String recuperarToken(HttpServletRequest request) {
        var cabecalho = request.getHeader("Authorization");
        if (cabecalho == null || !cabecalho.startsWith("Bearer ")) {
            return null;
        }
        return cabecalho.replace("Bearer ", "");
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        var token = this.recuperarToken(request);
        if (token != null) {
            var login = tokenService.validarToken(token);
            var usuario = perfilUsuarioService.loadUserByUsername(login);

            if (login != null) {
                var tokenAutenticacao = new UsernamePasswordAuthenticationToken(usuario, null,
                        usuario.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(tokenAutenticacao);
            }
        }
        filterChain.doFilter(request, response);
    }
}