package br.ifac.vannilyapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ifac.vannilyapi.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("""
        SELECT c FROM Categoria c
        WHERE (:nome IS NULL OR c.nome LIKE %:nome%)
    """)
    public List<Categoria> buscarPorNome(String nome);
}
