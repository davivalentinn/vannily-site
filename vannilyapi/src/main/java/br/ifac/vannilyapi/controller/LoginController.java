package br.ifac.vannilyapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.config.PerfilUsuario;
import br.ifac.vannilyapi.config.TokenService;
import br.ifac.vannilyapi.dto.LoginGetDto;
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
    public ResponseEntity<LoginGetDto> autenticar(@RequestBody Usuario usuario) {

        var loginToken = new UsernamePasswordAuthenticationToken(
                usuario.getEmail(),
                usuario.getSenha());
        var autenticacao = authManager.authenticate(loginToken);

        var principal = (PerfilUsuario) autenticacao.getPrincipal();

        var usuarioAutenticado = usuarioService.buscarPorEmail(principal.getUsername());

        var token = tokenService.criarToken(usuarioAutenticado);

        var dto = new LoginGetDto(
                token,
                usuarioAutenticado.getEmail(),
                usuarioAutenticado.getNome());

        return ResponseEntity.ok(dto);
    }

}
