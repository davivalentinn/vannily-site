package br.ifac.vannilyapi.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import br.ifac.vannilyapi.model.Produto;
import br.ifac.vannilyapi.repository.ProdutoRepository;

@Service
public class ProdutoService implements ICrudService<Produto>, IPageService<Produto> {

    private final ProdutoRepository repo;

    public ProdutoService(ProdutoRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Produto> consultar(String termoBusca) {
        // Retorna todos se o termo de busca estiver vazio
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll();
        }

        termoBusca = StringUtils.trimAllWhitespace(termoBusca);
        // Usa a consulta personalizada que busca por nome ou categoria
        return repo.buscar(termoBusca, Pageable.unpaged()).getContent();
    }

    @Override
    public Page<Produto> consultar(String termoBusca, Pageable paginacao) {
        termoBusca = (termoBusca == null || termoBusca.isBlank())
                ? null
                : StringUtils.trimAllWhitespace(termoBusca);

        return repo.buscar(termoBusca, paginacao);
    }

    @Override
    public Produto consultar(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Produto salvar(Produto produto) {
        return repo.save(produto);
    }

    @Override
    public void remover(Long id) {
        repo.deleteById(id);
    }

    // --- Métodos adicionais específicos de Produto ---

    public List<Produto> buscarPorCategoria(Long categoriaId) {
        return repo.buscarPorCategoria(categoriaId);
    }

    public List<Produto> buscarPromocoes() {
        return repo.buscarPromocoes();
    }

    public List<Produto> buscarPorTemaOuGenero(String tema, String genero) {
        if ((tema == null || tema.isBlank()) && (genero == null || genero.isBlank())) {
            return repo.findAll();
        }

        tema = (tema == null || tema.isBlank()) ? null : StringUtils.trimAllWhitespace(tema);
        genero = (genero == null || genero.isBlank()) ? null : StringUtils.trimAllWhitespace(genero);

        return repo.buscarPorTemaOuGenero(tema, genero);
    }
}
