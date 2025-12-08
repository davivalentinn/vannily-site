package br.ifac.vannilyapi.repository;

import br.ifac.vannilyapi.model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {

    List<Favorito> findByUsuarioId(Long usuarioId);

    Optional<Favorito> findByUsuarioIdAndProdutoId(Long usuarioId, Long produtoId);

    void deleteByUsuarioIdAndProdutoId(Long usuarioId, Long produtoId);

    void deleteAllByUsuarioId(Long usuarioId);

}
