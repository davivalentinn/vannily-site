package br.ifac.vannilyapi.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.ifac.vannilyapi.model.Usuario;
import br.ifac.vannilyapi.repository.UsuarioRepository;

@Service
public class UsuarioService implements ICrudService<Usuario> {

    private final UsuarioRepository repo;

    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Usuario> consultar(String termoBusca) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll();
        }

        final String termo = termoBusca.trim().toLowerCase(); 
        return repo.findAll().stream()
                .filter(u -> {
                    String nome = u.getNome() != null ? u.getNome().toLowerCase() : "";
                    String email = u.getEmail() != null ? u.getEmail().toLowerCase() : "";
                    String usuario = u.getUsuario() != null ? u.getUsuario().toLowerCase() : "";
                    return nome.contains(termo) || email.contains(termo) || usuario.contains(termo);
                })
                .collect(Collectors.toList());
    }

    @Override
    public Usuario consultar(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Usuario salvar(Usuario usuario) {
        if (usuario.getId() == null) {
            usuario.setDataCriacao(LocalDateTime.now());
        }
        return repo.save(usuario);
    }

    @Override
    public void remover(Long id) {
        repo.deleteById(id);
    }

    public Usuario buscarPorUsuario(String usuario) {
        return repo.buscarPorUsuario(usuario).orElse(null);
    }

    public Usuario buscarPorEmail(String email) {
        return repo.buscarPorEmail(email).orElse(null);
    }

    public boolean existeEmail(String email) {
        return repo.buscarPorEmail(email).isPresent();
    }

    public boolean existeUsuario(String usuario) {
        return repo.buscarPorUsuario(usuario).isPresent();
    }
}
