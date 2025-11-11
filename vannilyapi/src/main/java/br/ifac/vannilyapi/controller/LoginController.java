package br.ifac.vannilyapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.config.PerfilUsuario;
import br.ifac.vannilyapi.config.TokenService;
import br.ifac.vannilyapi.model.Usuario;
import br.ifac.vannilyapi.service.UsuarioService;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final AuthenticationManager authManager;
    private final UsuarioService usuarioService;
    private final TokenService tokenService;

    public LoginController(
            AuthenticationManager authManager,
            UsuarioService usuarioService,
            TokenService tokenService) {

        this.authManager = authManager;
        this.usuarioService = usuarioService;
        this.tokenService = tokenService;
    }

    @PostMapping("/autenticar")
    public ResponseEntity<String> autenticar(@RequestBody Usuario usuario) {

        // Autentica o usuário com email e senha
        var loginToken = new UsernamePasswordAuthenticationToken(
                usuario.getEmail(),
                usuario.getSenha()
        );
        var autenticacao = authManager.authenticate(loginToken);

        // Recupera os dados do usuário autenticado
        var principal = (PerfilUsuario) autenticacao.getPrincipal();

        // Busca o usuário no sistema (opcional: atualizar dados, permissões, etc.)
        var usuarioAutenticado = usuarioService.buscarPorEmail(principal.getUsername());

        // Gera o token JWT
        var token = tokenService.criarToken(usuarioAutenticado);

        return ResponseEntity.ok(token);
    }
}
