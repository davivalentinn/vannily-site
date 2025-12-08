package br.ifac.vannilyapi.controller;

import br.ifac.vannilyapi.dto.FavoritoCreateDto;
import br.ifac.vannilyapi.service.FavoritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/favoritos")
public class FavoritoController {

    private final FavoritoService favoritoService;

    public FavoritoController(FavoritoService favoritoService) {
        this.favoritoService = favoritoService;
    }

    @PostMapping
    public ResponseEntity<?> adicionar(@RequestBody FavoritoCreateDto dto) {
        return ResponseEntity.ok(favoritoService.adicionarFavorito(dto));
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<?> listar(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(favoritoService.listarFavoritos(usuarioId));
    }

    @DeleteMapping("/{usuarioId}/{produtoId}")
    public ResponseEntity<?> remover(@PathVariable Long usuarioId, @PathVariable Long produtoId) {
        favoritoService.removerFavorito(usuarioId, produtoId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/limpar/{usuarioId}")
    public ResponseEntity<?> limpar(@PathVariable Long usuarioId) {
        favoritoService.limparFavoritos(usuarioId);
        return ResponseEntity.ok().build();
    }

}
