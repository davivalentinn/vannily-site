package br.ifac.vannilyapi.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.ifac.vannilyapi.service.UsuarioService;;

@Service
public class PerfilUsuarioService implements UserDetailsService {

    private final UsuarioService usuarioService;

    public PerfilUsuarioService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    var usuario = usuarioService.buscarPorEmail(username);
    if (usuario == null) {
        throw new UsernameNotFoundException("Usuário não encontrado com email: " + username);
    }
    return new PerfilUsuario(usuario);
}

}