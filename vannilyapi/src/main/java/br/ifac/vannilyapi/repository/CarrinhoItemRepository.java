package br.ifac.vannilyapi.repository;

import br.ifac.vannilyapi.model.CarrinhoItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarrinhoItemRepository extends JpaRepository<CarrinhoItem, Long> {
}
