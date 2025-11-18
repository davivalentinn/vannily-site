package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.dto.ProdutoRoupaCreateDto;
import br.ifac.vannilyapi.dto.ProdutoRoupaGetDto;
import br.ifac.vannilyapi.dto.ProdutoRoupaUpdateDto;
import br.ifac.vannilyapi.mapper.ProdutoRoupaMapper;
import br.ifac.vannilyapi.service.ProdutoRoupaService;

@RestController
@RequestMapping("/produto-roupa")
public class ProdutoRoupaController {

    private final ProdutoRoupaService servico;
    private final ProdutoRoupaMapper mapper;

    public ProdutoRoupaController(ProdutoRoupaService servico, ProdutoRoupaMapper mapper) {
        this.servico = servico;
        this.mapper = mapper;
    }

    @GetMapping("/consultar")
    public ResponseEntity<List<ProdutoRoupaGetDto>> consultar(@RequestParam(required = false) String termoBusca) {
        var registros = servico.consultar(termoBusca);
        var dtos = registros.stream().map(mapper::toResponseDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ProdutoRoupaGetDto> consultarPorId(@PathVariable Long id) {
        var registro = servico.consultar(id);
        if (registro == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(mapper.toResponseDto(registro));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/inserir")
    public ResponseEntity<Long> inserir(@RequestBody @Validated ProdutoRoupaCreateDto dto) {
        var entity = mapper.toEntity(dto);
        var registro = servico.salvar(entity);
        return ResponseEntity.created(null).body(registro.getId());
    }
  
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/atualizar")
    public ResponseEntity<Void> atualizar(@RequestBody @Validated ProdutoRoupaUpdateDto dto) {
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

    @GetMapping(value = "/produto/{produtoId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProdutoRoupaGetDto>> buscarPorProduto(@PathVariable Long produtoId) {
        var registros = servico.buscarPorProduto(produtoId);
        var dtos = registros.stream().map(mapper::toResponseDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<ProdutoRoupaGetDto>> filtrar(
            @RequestParam(required = false) String tamanho,
            @RequestParam(required = false) String cor,
            @RequestParam(required = false) String modelo) {

        var registros = servico.buscarPorTamanhoCorOuModelo(tamanho, cor, modelo);
        var dtos = registros.stream().map(mapper::toResponseDto).toList();
        return ResponseEntity.ok(dtos);
    }
    
}
