package br.ifac.vannilyapi.service;

import br.ifac.vannilyapi.dto.*;
import br.ifac.vannilyapi.model.*;
import br.ifac.vannilyapi.repository.*;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
public class CarrinhoService {

    private final CarrinhoRepository carrinhoRepository;
    private final ProdutoRepository produtoRepository;
    private final UsuarioRepository usuarioRepository;

    public CarrinhoService(
            CarrinhoRepository carrinhoRepository,
            ProdutoRepository produtoRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.carrinhoRepository = carrinhoRepository;
        this.produtoRepository = produtoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public Carrinho getOuCriar(Long usuarioId) {
        return carrinhoRepository.findByUsuarioId(usuarioId)
                .orElseGet(() -> criarCarrinho(usuarioId));
    }

    @Transactional
    private Carrinho criarCarrinho(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Carrinho novo = new Carrinho();
        novo.setUsuario(usuario);
        return carrinhoRepository.save(novo);
    }

    @Transactional
    public CarrinhoResponseDto adicionarItem(Long usuarioId, AdicionarItemRequestDto dto) {
        Carrinho carrinho = getOuCriar(usuarioId);

        Produto produto = produtoRepository.findById(dto.produtoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        carrinho.adicionarItem(produto, dto.quantidade());
        carrinhoRepository.save(carrinho);

        return toDto(carrinho);
    }

    @Transactional
    public CarrinhoResponseDto removerItem(Long usuarioId, Long produtoId) {
        Carrinho carrinho = getOuCriar(usuarioId);

        carrinho.removerItem(produtoId);

        carrinhoRepository.save(carrinho);

        return toDto(carrinho);
    }

    @Transactional
    public CarrinhoResponseDto limparCarrinho(Long usuarioId) {
        Carrinho carrinho = getOuCriar(usuarioId);
        
        carrinho.getItens().clear();
        
        carrinhoRepository.save(carrinho);
        
        return toDto(carrinho);
    }

    @Transactional
    public CarrinhoResponseDto atualizarQuantidade(Long usuarioId, Long produtoId, int novaQuantidade) {
        if (novaQuantidade < 1) {
            throw new RuntimeException("Quantidade deve ser maior que zero");
        }

        Carrinho carrinho = getOuCriar(usuarioId);
        
        // Encontra o item no carrinho
        CarrinhoItem item = carrinho.getItens().stream()
                .filter(i -> i.getProduto().getId().equals(produtoId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item não encontrado no carrinho"));
        
        // Atualiza a quantidade
        item.setQuantidade(novaQuantidade);
        
        carrinhoRepository.save(carrinho);
        
        return toDto(carrinho);
    }

    @Transactional
    public CarrinhoResponseDto buscar(Long usuarioId) {
        Carrinho carrinho = getOuCriar(usuarioId);
        return toDto(carrinho);
    }

    private CarrinhoResponseDto toDto(Carrinho carrinho) {
        var itensDto = carrinho.getItens().stream().map(item ->
                new CarrinhoItemResponseDto(
                        item.getProduto().getId(),
                        item.getProduto().getNome(),
                        item.getProduto().getImagem(),
                        item.getProduto().getPreco(),
                        item.getProduto().getDesconto(),
                        item.getQuantidade(),
                        item.getTotalItem()
                )
        ).toList();

        double total = itensDto.stream()
                .mapToDouble(CarrinhoItemResponseDto::totalItem)
                .sum();

        return new CarrinhoResponseDto(
                carrinho.getId(),
                carrinho.getUsuario().getId(),
                itensDto,
                total
        );
    }
}