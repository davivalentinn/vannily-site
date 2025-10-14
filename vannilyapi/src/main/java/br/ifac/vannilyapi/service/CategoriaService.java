package br.ifac.vannilyapi.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import br.ifac.vannilyapi.model.Categoria;
import br.ifac.vannilyapi.repository.CategoriaRepository;

@Service
public class CategoriaService implements ICrudService<Categoria> {

    private final CategoriaRepository repo;

    public CategoriaService(CategoriaRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Categoria> consultar(String termoBusca) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll();
        }

        termoBusca = StringUtils.trimAllWhitespace(termoBusca);
        return repo.buscarPorNome(termoBusca);
    }

    @Override
    public Categoria consultar(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Categoria salvar(Categoria categoria) {
        return repo.save(categoria);
    }

    @Override
    public void remover(Long id) {
        repo.deleteById(id);
    }
}
