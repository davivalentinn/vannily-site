package br.ifac.vannilyapi.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.ifac.vannilyapi.dto.ProdutoGetDto;
import br.ifac.vannilyapi.mapper.ProdutoMapper;
import br.ifac.vannilyapi.model.Produto;
import br.ifac.vannilyapi.repository.ProdutoRepository;

@Service
public class ProdutoService implements ICrudService<Produto>, IPageService<Produto> {

    private final ProdutoRepository repo;
    private final ProdutoMapper mapper;

    public ProdutoService(
            ProdutoRepository repo,
            ProdutoMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    private String normalizar(String valor) {
        return (valor == null || valor.isBlank()) ? null : valor.trim();
    }

    @Override
    public List<Produto> consultar(String termoBusca) {
        termoBusca = normalizar(termoBusca);

        if (termoBusca == null) {
            return repo.findAll();
        }

        return repo.buscar(termoBusca, Pageable.unpaged()).getContent();
    }

    @Override
    public Page<Produto> consultar(String termoBusca, Pageable paginacao) {
        termoBusca = normalizar(termoBusca);
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

    public List<Produto> buscarPorCategoria(Long categoriaId) {
        return repo.buscarPorCategoria(categoriaId);
    }

    public List<Produto> buscarPromocoes() {
        return repo.buscarPromocoes();
    }

    public List<Produto> buscarPorTemaOuGenero(String tema, String genero) {
        tema = normalizar(tema);
        genero = normalizar(genero);

        if (tema == null && genero == null) {
            return repo.findAll();
        }

        return repo.buscarPorTemaOuGenero(tema, genero);
    }

    public boolean existePorId(Long id) {
        return repo.existsById(id);
    }

    public ProdutoGetDto buscarCompleto(Long id) {
        Produto produto = repo.buscarCompleto(id);
        return produto == null ? null : mapper.toGetDto(produto);
    }

    /**
     * Busca produtos por nome da categoria
     */
    public List<Produto> buscarPorNomeCategoria(String nomeCategoria) {
        System.out.println("🔍 Buscando produtos por categoria: " + nomeCategoria);
        List<Produto> produtos = repo.findByCategoriaNomeIgnoreCase(nomeCategoria);
        System.out.println("✅ Encontrados: " + produtos.size() + " produtos");
        return produtos;
    }

    /**
     * Busca produtos recentes (últimos cadastrados)
     */
    public List<Produto> buscarRecentes(int limite) {
        System.out.println("🔍 Buscando " + limite + " produtos recentes");
        List<Produto> produtos = repo.findTopByOrderByIdDesc(
                PageRequest.of(0, limite)).getContent();
        System.out.println("✅ Encontrados: " + produtos.size() + " produtos");
        return produtos;
    }

    /**
     * Busca todos os produtos disponíveis
     */
    public List<Produto> buscarTodos() {
        System.out.println("🔍 Buscando todos os produtos");
        List<Produto> produtos = repo.findAll();
        System.out.println("✅ Encontrados: " + produtos.size() + " produtos");
        return produtos;
    }

}