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

    @Query("""
                SELECT p FROM Produto p
                WHERE (:tema IS NULL OR p.tema LIKE %:tema%)
                  AND (:genero IS NULL OR p.genero LIKE %:genero%)
            """)
    List<Produto> buscarPorTemaOuGenero(String tema, String genero);

    @Query("""
    SELECT p FROM Produto p
    LEFT JOIN FETCH p.categoria
    LEFT JOIN FETCH p.produtoRoupa
    LEFT JOIN FETCH p.produtoJogo
    WHERE p.id = :id
    """)
    Produto buscarCompleto(Long id);



}
