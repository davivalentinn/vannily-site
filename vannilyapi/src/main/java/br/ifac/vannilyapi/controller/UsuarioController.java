package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.model.Usuario;
import br.ifac.vannilyapi.service.UsuarioService;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService servico;

    public UsuarioController(UsuarioService servico) {
        this.servico = servico;
    }

    @GetMapping(value = "/consultar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Usuario>> consultar(@RequestParam(required = false) String termoBusca) {
        List<Usuario> registros = servico.consultar(termoBusca);
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<Usuario> consultarPorId(@PathVariable Long id) {
        Usuario registro = servico.consultar(id);
        if (registro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(registro);
    }

    @PostMapping(value = "/inserir", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Long> inserir(@RequestBody @Validated Usuario usuario) {
        Usuario registro = servico.salvar(usuario);
        return ResponseEntity.created(null).body(registro.getId());
    }

    @PutMapping(value = "/atualizar", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> atualizar(@RequestBody @Validated Usuario usuario) {
        servico.salvar(usuario);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/remover/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.remover(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/buscar-usuario", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Usuario> buscarPorUsuario(@RequestParam String usuario) {
        Usuario registro = servico.buscarPorUsuario(usuario);
        if (registro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(registro);
    }

    @GetMapping(value = "/buscar-email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Usuario> buscarPorEmail(@RequestParam String email) {
        Usuario registro = servico.buscarPorEmail(email);
        if (registro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(registro);
    }

    @GetMapping(value = "/existe-email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> existeEmail(@RequestParam String email) {
        return ResponseEntity.ok(servico.existeEmail(email));
    }

    @GetMapping(value = "/existe-usuario", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> existeUsuario(@RequestParam String usuario) {
        return ResponseEntity.ok(servico.existeUsuario(usuario));
    }
}
