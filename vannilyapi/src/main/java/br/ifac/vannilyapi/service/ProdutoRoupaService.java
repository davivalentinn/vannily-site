package br.ifac.vannilyapi.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import br.ifac.vannilyapi.model.ProdutoRoupa;
import br.ifac.vannilyapi.repository.ProdutoRoupaRepository;

@Service
public class ProdutoRoupaService implements ICrudService<ProdutoRoupa> {

    private final ProdutoRoupaRepository repo;

    public ProdutoRoupaService(ProdutoRoupaRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<ProdutoRoupa> consultar(String termoBusca) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll();
        }

        termoBusca = StringUtils.trimAllWhitespace(termoBusca);
        return repo.buscarPorTamanhoCorOuModelo(null, termoBusca, termoBusca);
    }

    @Override
    public ProdutoRoupa consultar(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public ProdutoRoupa salvar(ProdutoRoupa produtoRoupa) {
        return repo.save(produtoRoupa);
    }

    @Override
    public void remover(Long id) {
        repo.deleteById(id);
    }


    public List<ProdutoRoupa> buscarPorProduto(Long produtoId) {
        return repo.buscarPorProduto(produtoId);
    }

    public List<ProdutoRoupa> buscarPorTamanhoCorOuModelo(String tamanho, String cor, String modelo) {
        if ((tamanho == null || tamanho.isBlank()) &&
            (cor == null || cor.isBlank()) &&
            (modelo == null || modelo.isBlank())) {
            return repo.findAll();
        }

        tamanho = (tamanho == null || tamanho.isBlank()) ? null : StringUtils.trimAllWhitespace(tamanho);
        cor = (cor == null || cor.isBlank()) ? null : StringUtils.trimAllWhitespace(cor);
        modelo = (modelo == null || modelo.isBlank()) ? null : StringUtils.trimAllWhitespace(modelo);

        return repo.buscarPorTamanhoCorOuModelo(tamanho, cor, modelo);
    }
}
