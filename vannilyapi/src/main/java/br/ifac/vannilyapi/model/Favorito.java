package br.ifac.vannilyapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "favoritos",
       uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id", "produto_id"}))
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    public Favorito() {}

    public Favorito(Usuario usuario, Produto produto) {
        this.usuario = usuario;
        this.produto = produto;
    }

    public Long getId() { return id; }

    public Usuario getUsuario() { return usuario; }

    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Produto getProduto() { return produto; }

    public void setProduto(Produto produto) { this.produto = produto; }
}
