package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.dto.ProdutoCreateDto;
import br.ifac.vannilyapi.dto.ProdutoGetDto;
import br.ifac.vannilyapi.mapper.ProdutoMapper;
import br.ifac.vannilyapi.service.ProdutoService;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    private final ProdutoService service;
    private final ProdutoMapper mapper;

    public ProdutoController(ProdutoService service, ProdutoMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping("/consultar")
        public ResponseEntity<List<ProdutoGetDto>> consultar(@RequestParam(required = false) String termoBusca) {
        var registros = service.consultar(termoBusca);
        var dtos = registros.stream().map(mapper::toGetDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping(value = "/consultar", params = "page")
    public ResponseEntity<Page<ProdutoGetDto>> consultar(
        @RequestParam(required = false) String termoBusca,
        @SortDefault(sort = "nome", direction = Sort.Direction.ASC)
        @ParameterObject Pageable paginacao
    ) {
        var page = service.consultar(termoBusca, paginacao);
        var dtos = page.map(mapper::toGetDto);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ProdutoGetDto> consultar(@PathVariable Long id) {
        var registro = service.consultar(id);
        if (registro == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(mapper.toGetDto(registro));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/inserir", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> inserir(
        @RequestBody @Validated ProdutoCreateDto dto
    ) {
        var entity = mapper.toEntity(dto);
        var salvo = service.salvar(entity);
        return ResponseEntity.status(201).body(salvo.getId());
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/atualizar")
    public ResponseEntity<Void> atualizar(
        @RequestBody @Validated ProdutoCreateDto dto
    ) {
        var entity = mapper.toEntity(dto);
        service.salvar(entity);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/remover/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        if (!service.existePorId(id)) return ResponseEntity.notFound().build();
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<ProdutoGetDto>> buscarPorCategoria(@PathVariable Long categoriaId) {
        var registros = service.buscarPorCategoria(categoriaId);
        var dtos = registros.stream().map(mapper::toGetDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/promocoes")
    public ResponseEntity<List<ProdutoGetDto>> buscarPromocoes() {
        var registros = service.buscarPromocoes();
        return ResponseEntity.ok(registros.stream().map(mapper::toGetDto).toList());
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<ProdutoGetDto>> filtrar(
        @RequestParam(required = false) String tema,
        @RequestParam(required = false) String genero
    ) {
        var registros = service.buscarPorTemaOuGenero(tema, genero);
        return ResponseEntity.ok(registros.stream().map(mapper::toGetDto).toList());
    }
}
