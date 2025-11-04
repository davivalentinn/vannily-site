package br.ifac.vannilyapi;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPageService<T> {
    Page<T> consultar(String termoBusca, Pageable paginacao);
}
