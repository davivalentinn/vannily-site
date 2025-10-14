package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.data.web.SortDefault.SortDefaults;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.model.Produto;
import br.ifac.vannilyapi.service.ProdutoService;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    private final ProdutoService servico;

    public ProdutoController(ProdutoService servico) {
        this.servico = servico;
    }

    @GetMapping(value = "/consultar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Produto>> consultar(@RequestParam(required = false) String termoBusca) {
        List<Produto> registros = servico.consultar(termoBusca);
        return ResponseEntity.ok(registros);
    }

    @GetMapping(value = "/consultar", params = "page", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<Produto>> consultarComPaginacao(
            @RequestParam(required = false) String termoBusca,
            @SortDefaults({
                    @SortDefault(sort = "nome", direction = Sort.Direction.ASC)
            }) Pageable paginacao) {
        Page<Produto> registros = servico.consultar(termoBusca, paginacao);
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<Produto> consultarPorId(@PathVariable Long id) {
        Produto registro = servico.consultar(id);
        if (registro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(registro);
    }

    @PostMapping(value = "/inserir", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Long> inserir(@RequestBody @Validated Produto produto) {
        Produto registro = servico.salvar(produto);
        return ResponseEntity.created(null).body(registro.getId());
    }

    @PutMapping(value = "/atualizar", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> atualizar(@RequestBody @Validated Produto produto) {
        servico.salvar(produto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/remover/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.remover(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/categoria/{categoriaId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Produto>> buscarPorCategoria(@PathVariable Long categoriaId) {
        List<Produto> registros = servico.buscarPorCategoria(categoriaId);
        return ResponseEntity.ok(registros);
    }

    @GetMapping(value = "/promocoes", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Produto>> buscarPromocoes() {
        List<Produto> registros = servico.buscarPromocoes();
        return ResponseEntity.ok(registros);
    }

    @GetMapping(value = "/filtrar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Produto>> filtrar(
            @RequestParam(required = false) String tema,
            @RequestParam(required = false) String genero) {
        List<Produto> registros = servico.buscarPorTemaOuGenero(tema, genero);
        return ResponseEntity.ok(registros);
    }
}
