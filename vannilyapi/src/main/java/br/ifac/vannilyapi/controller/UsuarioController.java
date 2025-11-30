package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.dto.UsuarioCreateDto;
import br.ifac.vannilyapi.dto.UsuarioGetDto;
import br.ifac.vannilyapi.dto.UsuarioUpdateDto;
import br.ifac.vannilyapi.mapper.UsuarioMapper;
import br.ifac.vannilyapi.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService servico;
    private final UsuarioMapper mapper;

     public UsuarioController(UsuarioService servico, UsuarioMapper mapper) {
        this.servico = servico;
        this.mapper = mapper;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/consultar")
    public ResponseEntity<List<UsuarioGetDto>> consultar(@RequestParam(required = false) String termoBusca) {
        var registros = servico.consultar(termoBusca);
        var dtos = registros.stream().map(mapper::toResponseDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/consultar/{id}")
    public ResponseEntity<UsuarioGetDto> consultarPorId(@PathVariable Long id) {
        var registro = servico.consultar(id);
        if (registro == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(mapper.toResponseDto(registro));
    }

    @PostMapping("/inserir")
    public ResponseEntity<Long> inserir(@Validated @RequestBody UsuarioCreateDto dto) {
        var entity = mapper.toEntity(dto);
        var salvo = servico.salvar(entity);
        return ResponseEntity.status(201).body(salvo.getId());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/atualizar")
    public ResponseEntity<Void> atualizar(@Validated @RequestBody UsuarioUpdateDto dto) {
        var entity = mapper.toEntity(dto);
        servico.salvar(entity);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/remover/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.remover(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/buscar-usuario")
    public ResponseEntity<UsuarioGetDto> buscarPorUsuario(@RequestParam String usuario) {
        var registro = servico.buscarPorUsuario(usuario);
        if (registro == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(mapper.toResponseDto(registro));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/buscar-email")
    public ResponseEntity<UsuarioGetDto> buscarPorEmail(@RequestParam String email) {
        var registro = servico.buscarPorEmail(email);
        if (registro == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(mapper.toResponseDto(registro));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/existe-email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> existeEmail(@RequestParam String email) {
        return ResponseEntity.ok(servico.existeEmail(email));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/existe-usuario", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> existeUsuario(@RequestParam String usuario) {
        return ResponseEntity.ok(servico.existeUsuario(usuario));
    }
}
