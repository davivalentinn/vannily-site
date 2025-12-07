package br.ifac.vannilyapi.controller;

import br.ifac.vannilyapi.dto.AdicionarItemRequestDto;
import br.ifac.vannilyapi.dto.CarrinhoResponseDto;
import br.ifac.vannilyapi.service.CarrinhoService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    private final CarrinhoService carrinhoService;

    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @GetMapping("/{usuarioId}")
    public CarrinhoResponseDto getCarrinho(@PathVariable Long usuarioId) {
        return carrinhoService.buscar(usuarioId);
    }

    @PostMapping("/{usuarioId}/adicionar")
    public CarrinhoResponseDto adicionarItem(
            @PathVariable Long usuarioId,
            @RequestBody AdicionarItemRequestDto dto
    ) {
        return carrinhoService.adicionarItem(usuarioId, dto);
    }

    @DeleteMapping("/{usuarioId}/remover/{produtoId}")
    public CarrinhoResponseDto removerItem(
            @PathVariable Long usuarioId,
            @PathVariable Long produtoId
    ) {
        return carrinhoService.removerItem(usuarioId, produtoId);
    }

    @DeleteMapping("/{usuarioId}/limpar")
    public CarrinhoResponseDto limparCarrinho(@PathVariable Long usuarioId) {
        return carrinhoService.limparCarrinho(usuarioId);
    }

    @PutMapping("/{usuarioId}/atualizar/{produtoId}")
    public CarrinhoResponseDto atualizarQuantidade(
            @PathVariable Long usuarioId,
            @PathVariable Long produtoId,
            @RequestBody Map<String, Integer> body
    ) {
        Integer quantidade = body.get("quantidade");
        if (quantidade == null || quantidade < 1) {
            throw new RuntimeException("Quantidade inválida");
        }
        return carrinhoService.atualizarQuantidade(usuarioId, produtoId, quantidade);
    }
}