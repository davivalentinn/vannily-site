package br.ifac.vannilyapi;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface IPageController<T> {
    public ResponseEntity<Page<T>> consultar(String termoBusca, Pageable paginacao);
}

