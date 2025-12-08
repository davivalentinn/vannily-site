package br.ifac.vannilyapi.service;

import br.ifac.vannilyapi.dto.FavoritoCreateDto;
import br.ifac.vannilyapi.dto.FavoritoGetDto;
import br.ifac.vannilyapi.model.Favorito;
import br.ifac.vannilyapi.model.Produto;
import br.ifac.vannilyapi.model.Usuario;
import br.ifac.vannilyapi.repository.FavoritoRepository;
import br.ifac.vannilyapi.repository.ProdutoRepository;
import br.ifac.vannilyapi.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritoService {

    private final FavoritoRepository favoritoRepository;
    private final ProdutoRepository produtoRepository;
    private final UsuarioRepository usuarioRepository;

    public FavoritoService(FavoritoRepository favoritoRepository,
                           ProdutoRepository produtoRepository,
                           UsuarioRepository usuarioRepository) {
        this.favoritoRepository = favoritoRepository;
        this.produtoRepository = produtoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public FavoritoGetDto adicionarFavorito(FavoritoCreateDto dto) {

        var usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        var produto = produtoRepository.findById(dto.produtoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // Evitar duplicados
        favoritoRepository.findByUsuarioIdAndProdutoId(dto.usuarioId(), dto.produtoId())
                .ifPresent(f -> { throw new RuntimeException("Produto já está nos favoritos"); });

        var favorito = new Favorito(usuario, produto);

        favoritoRepository.save(favorito);

        return new FavoritoGetDto(
                favorito.getId(),
                usuario.getId(),
                produto.getId(),
                produto.getNome(),
                produto.getImagem()
        );
    }

    public List<FavoritoGetDto> listarFavoritos(Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(f -> new FavoritoGetDto(
                        f.getId(),
                        f.getUsuario().getId(),
                        f.getProduto().getId(),
                        f.getProduto().getNome(),
                        f.getProduto().getImagem()
                )).toList();
    }

    public void removerFavorito(Long usuarioId, Long produtoId) {
        favoritoRepository.findByUsuarioIdAndProdutoId(usuarioId, produtoId)
                .orElseThrow(() -> new RuntimeException("Favorito não encontrado"));

        favoritoRepository.deleteByUsuarioIdAndProdutoId(usuarioId, produtoId);
    }
    public void limparFavoritos(Long usuarioId) {
    favoritoRepository.deleteAllByUsuarioId(usuarioId);
    }

}
