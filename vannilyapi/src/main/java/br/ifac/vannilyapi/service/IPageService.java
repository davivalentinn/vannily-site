package br.ifac.vannilyapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPageService<T> {

    public Page<T> consultar(String termoBusca, Pageable paginacao);
    
}
