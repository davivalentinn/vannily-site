package br.ifac.vannilyapi.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Carrinho implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_usuario", nullable = false, unique = true)
    private Usuario usuario;

    @OneToMany(mappedBy = "carrinho", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CarrinhoItem> itens = new ArrayList<>();

    public void adicionarItem(Produto produto, int quantidade) {
        for (CarrinhoItem item : itens) {
            if (item.getProduto().getId().equals(produto.getId())) {
                item.setQuantidade(item.getQuantidade() + quantidade);
                return;
            }
        }
        itens.add(new CarrinhoItem(this, produto, quantidade));
    }

    public void removerItem(Long produtoId) {
        itens.removeIf(item -> item.getProduto().getId().equals(produtoId));
    }

    // ===== GETTERS E SETTERS =====

    public Long getId() {
        return id;
    }
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    public List<CarrinhoItem> getItens() {
        return itens;
    }
}
