package br.ifac.vannilyapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ifac.vannilyapi.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("""
        SELECT c FROM Categoria c
        WHERE (:nome IS NULL OR c.nome LIKE %:nome%)
    """)
    List<Categoria> buscarPorNome(String nome);

    // Novo método para paginação com filtro
    @Query("""
        SELECT c FROM Categoria c
        WHERE (:nome IS NULL OR c.nome LIKE %:nome%)
    """)
    Page<Categoria> buscarPorNome(String nome, Pageable pageable);
}
