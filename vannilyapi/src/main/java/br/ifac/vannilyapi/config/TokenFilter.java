package br.ifac.vannilyapi.config;

import java.io.IOException;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class TokenFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserDetailsService userDetailsService;

    // Rotas públicas
    private static final List<String> PUBLICAS = List.of(
            "/login/autenticar",
            "/usuarios/inserir",
            "/produto",
            "/produto-roupa",
            "/produto-jogo"
    );

    public TokenFilter(TokenService tokenService, @Lazy UserDetailsService userDetailsService) {
        this.tokenService = tokenService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        String method = request.getMethod();

        if (method.equals("OPTIONS")) return true;

        // qualquer rota que comece com uma pública
        return PUBLICAS.stream().anyMatch(path::startsWith);
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String token = recuperarToken(request);

        if (token != null) {
            try {
                String email = tokenService.validarToken(token);

                if (email != null) {
                    UserDetails user = userDetailsService.loadUserByUsername(email);

                    var auth = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception e) {
                System.err.println("Erro ao validar token: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }

        return null;
    }
}
