package br.ifac.vannilyapi;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface ICrudController<T> {

    public ResponseEntity<List<T>> consultar(String termoBusca);
    public ResponseEntity<T> consultar(Long id);
    public ResponseEntity<Long> inserir(T objeto);
    public ResponseEntity<Void> atualizar(T objeto);
    public ResponseEntity<Void> remover(Long id);

}
