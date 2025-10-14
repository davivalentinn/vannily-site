package br.ifac.vannilyapi.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import br.ifac.vannilyapi.model.Endereco;
import br.ifac.vannilyapi.repository.EnderecoRepository;

@Service
public class EnderecoService implements ICrudService<Endereco> {

    private final EnderecoRepository repo;

    public EnderecoService(EnderecoRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Endereco> consultar(String termoBusca) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll();
        }

        final String termo = termoBusca.trim().toLowerCase();

        return repo.findAll().stream()
                .filter(e -> {
                    String cidade = e.getCidade() != null ? e.getCidade().toLowerCase() : "";
                    String estado = e.getEstado() != null ? e.getEstado().toLowerCase() : "";
                    String pais = e.getPais() != null ? e.getPais().toLowerCase() : "";
                    String bairro = e.getBairro() != null ? e.getBairro().toLowerCase() : "";
                    String rua = e.getRua() != null ? e.getRua().toLowerCase() : "";
                    return cidade.contains(termo) || estado.contains(termo)
                            || pais.contains(termo) || bairro.contains(termo)
                            || rua.contains(termo);
                })
                .collect(Collectors.toList());
    }

    @Override
    public Endereco consultar(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Endereco salvar(Endereco endereco) {
        return repo.save(endereco);
    }

    @Override
    public void remover(Long id) {
        repo.deleteById(id);
    }

    public List<Endereco> buscarPorUsuario(Long usuarioId) {
        return repo.buscarPorUsuario(usuarioId);
    }

    public List<Endereco> buscarPorCidadeEstadoOuPais(String cidade, String estado, String pais) {
        return repo.buscarPorCidadeEstadoOuPais(cidade, estado, pais);
    }
}
