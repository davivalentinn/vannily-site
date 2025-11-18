package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.dto.CategoriaCreateDto;
import br.ifac.vannilyapi.dto.CategoriaGetDto;
import br.ifac.vannilyapi.dto.CategoriaUpdateDto;
import br.ifac.vannilyapi.mapper.CategoriaMapper;
import br.ifac.vannilyapi.service.CategoriaService;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    private final CategoriaService servico;
    private final CategoriaMapper mapper;

    public CategoriaController(CategoriaService servico, CategoriaMapper mapper) {
        this.servico = servico;
        this.mapper = mapper;
    }

    @GetMapping("/consultar")
    public ResponseEntity<List<CategoriaGetDto>> consultar(@RequestParam(required = false) String termoBusca) {
        var registros = servico.consultar(termoBusca);
        var dtos = registros.stream().map(mapper::toDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping(value = "/consultar", params = "page")
    public ResponseEntity<Page<CategoriaGetDto>> consultarComPaginacao(
            @RequestParam(required = false) String termoBusca,
            @SortDefault(sort = "nome", direction = Sort.Direction.ASC) Pageable paginacao) {

        Page<CategoriaGetDto> dtos = servico.consultar(termoBusca, paginacao)
                .map(mapper::toDto);

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<CategoriaGetDto> consultarPorId(@PathVariable Long id) {
        var registro = servico.consultar(id);
        return (registro == null) ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(mapper.toDto(registro));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/inserir")
    public ResponseEntity<Long> inserir(@RequestBody @Validated CategoriaCreateDto dto) {
        var entidade = mapper.toEntity(dto);
        var salvo = servico.salvar(entidade);
        return ResponseEntity.created(null).body(salvo.getId());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/atualizar")
    public ResponseEntity<Void> atualizar(@RequestBody @Validated CategoriaUpdateDto dto) {
        servico.salvar(mapper.toEntity(dto));
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/remover/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.remover(id);
        return ResponseEntity.ok().build();
    }
}
