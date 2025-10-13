package br.ifac.vannilyapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ifac.vannilyapi.model.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

    @Query("""
        SELECT e FROM Endereco e
        WHERE e.usuario.id = :usuarioId
    """)
    public List<Endereco> buscarPorUsuario(Long usuarioId);

    @Query("""
        SELECT e FROM Endereco e
        WHERE (:cidade IS NULL OR e.cidade LIKE %:cidade%)
           OR (:estado IS NULL OR e.estado LIKE %:estado%)
           OR (:pais IS NULL OR e.pais LIKE %:pais%)
    """)
    public List<Endereco> buscarPorCidadeEstadoOuPais(String cidade, String estado, String pais);
}
