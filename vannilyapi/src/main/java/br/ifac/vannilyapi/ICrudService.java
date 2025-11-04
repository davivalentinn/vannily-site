package br.ifac.vannilyapi;

import java.util.List;

public interface ICrudService<T> {
    List<T> consultar(String termoBusca);
    T consultar(Long id);
    T salvar(T objeto);
    void remover(Long id);
}
