package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.dto.ProdutoJogoCreateDto;
import br.ifac.vannilyapi.dto.ProdutoJogoGetDto;
import br.ifac.vannilyapi.dto.ProdutoJogoUpdateDto;
import br.ifac.vannilyapi.mapper.ProdutoJogoMapper;
import br.ifac.vannilyapi.service.ProdutoJogoService;

@RestController
@RequestMapping("/produto-jogo")
public class ProdutoJogoController {

    private final ProdutoJogoService servico;
    private final ProdutoJogoMapper mapper;

    public ProdutoJogoController(ProdutoJogoService servico, ProdutoJogoMapper mapper) {
        this.servico = servico;
        this.mapper = mapper;
    }

    @GetMapping("/consultar")
    public ResponseEntity<List<ProdutoJogoGetDto>> consultar(@RequestParam(required = false) String termoBusca) {
        var registros = servico.consultar(termoBusca);
        var dtos = registros.stream().map(mapper::toGetDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ProdutoJogoGetDto> consultarPorId(@PathVariable Long id) {
        var registro = servico.consultar(id);
        if (registro == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(mapper.toGetDto(registro));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/inserir")
    public ResponseEntity<Long> inserir(@RequestBody @Validated ProdutoJogoCreateDto dto) {
        var entidade = mapper.toEntity(dto);
        var salvo = servico.salvar(entidade);
        return ResponseEntity.created(null).body(salvo.getId());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/atualizar")
    public ResponseEntity<Void> atualizar(@RequestBody @Validated ProdutoJogoUpdateDto dto) {
        servico.salvar(mapper.toEntity(dto));
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
    public ResponseEntity<List<ProdutoJogoGetDto>> buscarPorProduto(@PathVariable Long produtoId) {
        var registros = servico.buscarPorProduto(produtoId);
        return ResponseEntity.ok(registros.stream().map(mapper::toGetDto).toList());
    }

    // Filtrar por tema ou gênero
    @GetMapping("/filtrar")
    public ResponseEntity<List<ProdutoJogoGetDto>> filtrar(
            @RequestParam(required = false) String tema,
            @RequestParam(required = false) String genero) {
        var registros = servico.buscarPorTemaOuGenero(tema, genero);
        return ResponseEntity.ok(registros.stream().map(mapper::toGetDto).toList());
    }
}
