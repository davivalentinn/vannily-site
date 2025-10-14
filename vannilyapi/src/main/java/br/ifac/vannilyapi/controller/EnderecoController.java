package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.model.Endereco;
import br.ifac.vannilyapi.service.EnderecoService;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {

    private final EnderecoService servico;

    public EnderecoController(EnderecoService servico) {
        this.servico = servico;
    }

    @GetMapping(value = "/consultar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Endereco>> consultar(@RequestParam(required = false) String termoBusca) {
        List<Endereco> registros = servico.consultar(termoBusca);
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<Endereco> consultarPorId(@PathVariable Long id) {
        Endereco registro = servico.consultar(id);
        if (registro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(registro);
    }

    @PostMapping(value = "/inserir", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Long> inserir(@RequestBody @Validated Endereco endereco) {
        Endereco registro = servico.salvar(endereco);
        return ResponseEntity.created(null).body(registro.getId());
    }

    @PutMapping(value = "/atualizar", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> atualizar(@RequestBody @Validated Endereco endereco) {
        servico.salvar(endereco);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/remover/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.remover(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/usuario/{usuarioId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Endereco>> buscarPorUsuario(@PathVariable Long usuarioId) {
        List<Endereco> registros = servico.buscarPorUsuario(usuarioId);
        return ResponseEntity.ok(registros);
    }

    @GetMapping(value = "/filtrar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Endereco>> filtrar(
            @RequestParam(required = false) String cidade,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String pais) {
        List<Endereco> registros = servico.buscarPorCidadeEstadoOuPais(cidade, estado, pais);
        return ResponseEntity.ok(registros);
    }
}
