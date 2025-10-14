package br.ifac.vannilyapi.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import br.ifac.vannilyapi.model.ProdutoJogo;
import br.ifac.vannilyapi.repository.ProdutoJogoRepository;

@Service
public class ProdutoJogoService implements ICrudService<ProdutoJogo> {

    private final ProdutoJogoRepository repo;

    public ProdutoJogoService(ProdutoJogoRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<ProdutoJogo> consultar(String termoBusca) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll();
        }

        termoBusca = StringUtils.trimAllWhitespace(termoBusca);
        return repo.buscarPorTemaOuGenero(termoBusca, termoBusca);
    }

    @Override
    public ProdutoJogo consultar(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public ProdutoJogo salvar(ProdutoJogo produtoJogo) {
        return repo.save(produtoJogo);
    }

    @Override
    public void remover(Long id) {
        repo.deleteById(id);
    }

    public List<ProdutoJogo> buscarPorProduto(Long produtoId) {
        return repo.buscarPorProduto(produtoId);
    }
    
    public List<ProdutoJogo> buscarPorTemaOuGenero(String tema, String genero) {
        if ((tema == null || tema.isBlank()) && (genero == null || genero.isBlank())) {
            return repo.findAll();
        }
        tema = (tema == null || tema.isBlank()) ? null : StringUtils.trimAllWhitespace(tema);
        genero = (genero == null || genero.isBlank()) ? null : StringUtils.trimAllWhitespace(genero);

        return repo.buscarPorTemaOuGenero(tema, genero);
    }
}
