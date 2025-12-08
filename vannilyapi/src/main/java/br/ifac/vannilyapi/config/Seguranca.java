package br.ifac.vannilyapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class Seguranca {

    private final TokenFilter tokenFilter;

    public Seguranca(@Lazy TokenFilter tokenFilter) {
        this.tokenFilter = tokenFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(req -> {

                    // -----------------------
                    // 📌 ROTAS PÚBLICAS
                    // -----------------------
                    req.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();

                    // Login / Registro
                    req.requestMatchers(HttpMethod.POST, "/login/autenticar").permitAll();
                    req.requestMatchers(HttpMethod.POST, "/usuarios/inserir").permitAll();

                    // Produtos (público)
                    req.requestMatchers(HttpMethod.GET, "/produto/**").permitAll();
                    req.requestMatchers(HttpMethod.GET, "/produto-roupa/**").permitAll();
                    req.requestMatchers(HttpMethod.GET, "/produto-jogo/**").permitAll();

                    // -----------------------
                    // 📌 ROTAS QUE EXIGEM LOGIN
                    // -----------------------
                    req.requestMatchers("/carrinho/**").authenticated();
                    req.requestMatchers("/favoritos/**").authenticated();

                    req.anyRequest().authenticated();
                })

                .addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
            throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
