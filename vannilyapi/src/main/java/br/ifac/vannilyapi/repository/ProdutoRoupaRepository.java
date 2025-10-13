package br.ifac.vannilyapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ifac.vannilyapi.model.ProdutoRoupa;

public interface ProdutoRoupaRepository extends JpaRepository<ProdutoRoupa, Long> {

    @Query("""
        SELECT pr FROM ProdutoRoupa pr
        WHERE pr.produto.id = :produtoId
    """)
    public List<ProdutoRoupa> buscarPorProduto(Long produtoId);

    @Query("""
        SELECT pr FROM ProdutoRoupa pr
        WHERE (:tamanho IS NULL OR pr.tamanho = :tamanho)
           OR (:cor IS NULL OR pr.cor LIKE %:cor%)
           OR (:modelo IS NULL OR pr.modelo LIKE %:modelo%)
    """)
    public List<ProdutoRoupa> buscarPorTamanhoCorOuModelo(String tamanho, String cor, String modelo);
}
