package br.ifac.vannilyapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ifac.vannilyapi.model.ProdutoJogo;

public interface ProdutoJogoRepository extends JpaRepository<ProdutoJogo, Long> {

    @Query("""
        SELECT pj FROM ProdutoJogo pj
        WHERE pj.produto.id = :produtoId
    """)
    public List<ProdutoJogo> buscarPorProduto(Long produtoId);

    @Query("""
        SELECT pj FROM ProdutoJogo pj
        WHERE (:tema IS NULL OR pj.tema LIKE %:tema%)
           OR (:genero IS NULL OR pj.genero LIKE %:genero%)
    """)
    public List<ProdutoJogo> buscarPorTemaOuGenero(String tema, String genero);
}
