package br.ifac.vannilyapi.repository;

import br.ifac.vannilyapi.model.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    Optional<Carrinho> findByUsuarioId(Long usuarioId);
}
