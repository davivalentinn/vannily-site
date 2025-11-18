package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.model.ProdutoJogo;
import br.ifac.vannilyapi.service.ProdutoJogoService;

@RestController
@RequestMapping("/produto-jogo")
public class ProdutoJogoController {

    private final ProdutoJogoService servico;

    public ProdutoJogoController(ProdutoJogoService servico) {
        this.servico = servico;
    }

    @GetMapping(value = "/consultar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProdutoJogo>> consultar(@RequestParam(required = false) String termoBusca) {
        List<ProdutoJogo> registros = servico.consultar(termoBusca);
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ProdutoJogo> consultarPorId(@PathVariable Long id) {
        ProdutoJogo registro = servico.consultar(id);
        if (registro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(registro);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/inserir", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Long> inserir(@RequestBody @Validated ProdutoJogo produtoJogo) {
        ProdutoJogo registro = servico.salvar(produtoJogo);
        return ResponseEntity.created(null).body(registro.getId());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/atualizar", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> atualizar(@RequestBody @Validated ProdutoJogo produtoJogo) {
        servico.salvar(produtoJogo);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/remover/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.remover(id);
        return ResponseEntity.ok().build();
    }

    // Buscar por produto pai
    @GetMapping(value = "/produto/{produtoId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProdutoJogo>> buscarPorProduto(@PathVariable Long produtoId) {
        List<ProdutoJogo> registros = servico.buscarPorProduto(produtoId);
        return ResponseEntity.ok(registros);
    }

    // Filtrar por tema ou gênero
    @GetMapping(value = "/filtrar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProdutoJogo>> filtrar(
            @RequestParam(required = false) String tema,
            @RequestParam(required = false) String genero) {
        List<ProdutoJogo> registros = servico.buscarPorTemaOuGenero(tema, genero);
        return ResponseEntity.ok(registros);
    }
}
