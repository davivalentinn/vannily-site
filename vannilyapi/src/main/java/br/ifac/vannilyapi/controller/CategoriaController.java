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

import br.ifac.vannilyapi.model.Categoria;
import br.ifac.vannilyapi.service.CategoriaService;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    private final CategoriaService servico;

    public CategoriaController(CategoriaService servico) {
        this.servico = servico;
    }

    @GetMapping(value = "/consultar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Categoria>> consultar(@RequestParam(required = false) String termoBusca) {
        List<Categoria> registros = servico.consultar(termoBusca);
        return ResponseEntity.ok(registros);
    }

    @GetMapping(value = "/consultar", params = "page", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<Categoria>> consultarComPaginacao(
            @RequestParam(required = false) String termoBusca,
            @SortDefaults({
                    @SortDefault(sort = "nome", direction = Sort.Direction.ASC)
            }) Pageable paginacao) {
        Page<Categoria> registros = servico.consultar(termoBusca, paginacao);
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<Categoria> consultarPorId(@PathVariable Long id) {
        Categoria registro = servico.consultar(id);
        if (registro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(registro);
    }

    @PostMapping(value = "/inserir", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Long> inserir(@RequestBody @Validated Categoria categoria) {
        Categoria registro = servico.salvar(categoria);
        return ResponseEntity.created(null).body(registro.getId());
    }

    @PutMapping(value = "/atualizar", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> atualizar(@RequestBody @Validated Categoria categoria) {
        servico.salvar(categoria);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/remover/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.remover(id);
        return ResponseEntity.ok().build();
    }
}
