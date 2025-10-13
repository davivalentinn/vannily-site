package br.ifac.vannilyapi.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ifac.vannilyapi.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Query("""
        SELECT p FROM Produto p
        LEFT JOIN p.categoria c
        WHERE (:termoBusca IS NULL 
        OR p.nome LIKE %:termoBusca%
        OR c.nome LIKE %:termoBusca%)
    """)
    Page<Produto> buscar(String termoBusca, Pageable paginacao);

    @Query("""
        SELECT p FROM Produto p
        WHERE p.categoria.id = :categoriaId
    """)
    List<Produto> buscarPorCategoria(Long categoriaId);

    @Query("""
        SELECT p FROM Produto p
        WHERE p.desconto > 0
    """)
    List<Produto> buscarPromocoes();
}
