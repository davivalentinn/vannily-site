package br.ifac.vannilyapi.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import br.ifac.vannilyapi.dto.EnderecoCreateDto;
import br.ifac.vannilyapi.dto.EnderecoGetDto;
import br.ifac.vannilyapi.dto.EnderecoUpdateDto;
import br.ifac.vannilyapi.mapper.EnderecoMapper;
import br.ifac.vannilyapi.model.Endereco;
import br.ifac.vannilyapi.service.EnderecoService;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {

    private final EnderecoService servico;
    private final EnderecoMapper mapper;

    public EnderecoController(EnderecoService servico, EnderecoMapper mapper) {
        this.servico = servico;
        this.mapper = mapper;
    }

    @GetMapping("/consultar")
    public ResponseEntity<List<EnderecoGetDto>> consultar(@RequestParam(required = false) String termoBusca) {
        var registros = servico.consultar(termoBusca);
        var dtos = registros.stream().map(mapper::toResponseDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<EnderecoGetDto> consultarPorId(@PathVariable Long id) {
        var registro = servico.consultar(id);
        if (registro == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(mapper.toResponseDto(registro));
    }

    @PostMapping("/inserir")
    public ResponseEntity<Long> inserir(@RequestBody @Validated EnderecoCreateDto dto) {
        var entidade = mapper.toEntity(dto);
        var registro = servico.salvar(entidade);
        return ResponseEntity.created(null).body(registro.getId());
    }

    @PutMapping("/atualizar")
    public ResponseEntity<Void> atualizar(@RequestBody @Validated EnderecoUpdateDto dto) {
        var entidade = mapper.toEntity(dto);
        servico.salvar(entidade);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/remover/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.remover(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<EnderecoGetDto>> buscarPorUsuario(@PathVariable Long usuarioId) {
        var registros = servico.buscarPorUsuario(usuarioId);
        var dtos = registros.stream().map(mapper::toResponseDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping(value = "/filtrar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EnderecoGetDto>> filtrar(
            @RequestParam(required = false) String cidade,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String pais) {

        List<Endereco> registros = servico.buscarPorCidadeEstadoOuPais(cidade, estado, pais);
        List<EnderecoGetDto> dtos = registros.stream().map(mapper::toResponseDto).toList();

        return ResponseEntity.ok(dtos);
    }

}
