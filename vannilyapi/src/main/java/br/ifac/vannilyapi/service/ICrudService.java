package br.ifac.vannilyapi.service;

import java.util.List;

public interface ICrudService<T> {

    public List<T> consultar(String termoBusca);
    public T consultar(Long id);
    public T salvar(T objeto);
    public void remover(Long id);
    
}

