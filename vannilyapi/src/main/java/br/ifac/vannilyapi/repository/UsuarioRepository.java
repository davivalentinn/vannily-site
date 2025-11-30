package br.ifac.vannilyapi.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ifac.vannilyapi.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("""
        SELECT u FROM Usuario u
        WHERE u.usuario = :usuario
    """)
    Optional<Usuario> buscarPorUsuario(String usuario);

    @Query("""
        SELECT u FROM Usuario u
        WHERE u.email = :email
    """)
    Optional<Usuario> buscarPorEmail(String email);

    // ⭐ Adicionar estes métodos:
    boolean existsByEmail(String email);

    boolean existsByUsuario(String usuario);
}

