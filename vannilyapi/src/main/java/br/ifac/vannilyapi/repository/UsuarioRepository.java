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
    public Optional<Usuario> buscarPorUsuario(String usuario);

    @Query("""
        SELECT u FROM Usuario u
        WHERE u.email = :email
    """)
    public Optional<Usuario> buscarPorEmail(String email);
}
