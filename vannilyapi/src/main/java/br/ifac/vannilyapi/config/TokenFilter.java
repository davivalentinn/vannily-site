package br.ifac.vannilyapi.config;

import java.io.IOException;

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

    public TokenFilter(TokenService tokenService, @Lazy UserDetailsService userDetailsService) {
        this.tokenService = tokenService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        String method = request.getMethod();

        // NÃO aplicar filtro para rotas públicas
        return path.equals("/login/autenticar") ||
                (path.equals("/usuarios/inserir") && method.equals("POST")) ||
                path.startsWith("/produto/consultar") ||
                path.startsWith("/produto/promocoes") ||
                path.startsWith("/produto/categoria/") ||          
                path.startsWith("/produto/recentes") ||           
                path.startsWith("/produto/todos") ||              
                path.startsWith("/produto/filtrar") ||             
                path.startsWith("/produto/completo/") ||
                path.startsWith("/produto-roupa/consultar/") ||
                path.startsWith("/produto-jogo/consultar/") ||
                method.equals("OPTIONS");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

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
                // Token inválido - continuar sem autenticação
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        return null;
    }
}