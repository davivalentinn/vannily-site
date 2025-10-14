package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.model.ProdutoRoupa;
import br.ifac.vannilyapi.service.ProdutoRoupaService;

@RestController
@RequestMapping("/produto-roupa")
public class ProdutoRoupaController {

    private final ProdutoRoupaService servico;

    public ProdutoRoupaController(ProdutoRoupaService servico) {
        this.servico = servico;
    }

    @GetMapping(value = "/consultar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProdutoRoupa>> consultar(@RequestParam(required = false) String termoBusca) {
        List<ProdutoRoupa> registros = servico.consultar(termoBusca);
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ProdutoRoupa> consultarPorId(@PathVariable Long id) {
        ProdutoRoupa registro = servico.consultar(id);
        if (registro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(registro);
    }

    @PostMapping(value = "/inserir", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Long> inserir(@RequestBody @Validated ProdutoRoupa produtoRoupa) {
        ProdutoRoupa registro = servico.salvar(produtoRoupa);
        return ResponseEntity.created(null).body(registro.getId());
    }

    @PutMapping(value = "/atualizar", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> atualizar(@RequestBody @Validated ProdutoRoupa produtoRoupa) {
        servico.salvar(produtoRoupa);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/remover/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.remover(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/produto/{produtoId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProdutoRoupa>> buscarPorProduto(@PathVariable Long produtoId) {
        List<ProdutoRoupa> registros = servico.buscarPorProduto(produtoId);
        return ResponseEntity.ok(registros);
    }

    @GetMapping(value = "/filtrar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProdutoRoupa>> filtrar(
            @RequestParam(required = false) String tamanho,
            @RequestParam(required = false) String cor,
            @RequestParam(required = false) String modelo) {
        List<ProdutoRoupa> registros = servico.buscarPorTamanhoCorOuModelo(tamanho, cor, modelo);
        return ResponseEntity.ok(registros);
    }
}
