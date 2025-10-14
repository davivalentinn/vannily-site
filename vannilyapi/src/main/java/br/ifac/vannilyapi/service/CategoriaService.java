package br.ifac.vannilyapi.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    // 🔹 Consulta simples (sem paginação)
    @Override
    public List<Categoria> consultar(String termoBusca) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll();
        }

        termoBusca = StringUtils.trimAllWhitespace(termoBusca);
        return repo.buscarPorNome(termoBusca);
    }

    // 🔹 Consulta com paginação e filtro
    public Page<Categoria> consultar(String termoBusca, Pageable paginacao) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(paginacao);
        }

        termoBusca = StringUtils.trimAllWhitespace(termoBusca);
        return repo.buscarPorNome(termoBusca, paginacao);
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
