package br.ifac.vannilyapi.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ifac.vannilyapi.model.Usuario;
import br.ifac.vannilyapi.repository.UsuarioRepository;

@Service
public class UsuarioService implements ICrudService<Usuario> {

    private final UsuarioRepository repo;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
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
    @Transactional
    public Usuario salvar(Usuario usuario) {
        if (usuario.getId() == null) {
            usuario.setDataCriacao(LocalDateTime.now());
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        } else {
            Usuario usuarioExistente = repo.findById(usuario.getId()).orElse(null);
            
            if (usuarioExistente != null) {
                if (!usuario.getSenha().equals(usuarioExistente.getSenha())) {
                    if (!isBCryptHash(usuario.getSenha())) {
                        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
                    }
                }
            }
        }
        
        return repo.save(usuario);
    }

    @Override
    @Transactional
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

    /**
     * Verifica se a string é um hash BCrypt válido
     */
    private boolean isBCryptHash(String password) {
        return password != null && 
               (password.startsWith("$2a$") || 
                password.startsWith("$2b$") || 
                password.startsWith("$2y$"));
    }
}