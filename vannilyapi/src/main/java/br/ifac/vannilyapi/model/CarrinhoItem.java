package br.ifac.vannilyapi.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
public class CarrinhoItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_carrinho", nullable = false)
    private Carrinho carrinho;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto produto;

    @Column(nullable = false)
    private Integer quantidade;

    public CarrinhoItem() {}

    public CarrinhoItem(Carrinho carrinho, Produto produto, Integer quantidade) {
        this.carrinho = carrinho;
        this.produto = produto;
        this.quantidade = quantidade;
    }

    public double getTotalItem() {
        double preco = produto.getPreco() != null ? produto.getPreco() : 0;
        double desconto = produto.getDesconto() != null ? produto.getDesconto() : 0;
        return (preco - desconto) * quantidade;
    }

    // GETTERS E SETTERS
    public Long getId() {
        return id;
    }
    public Carrinho getCarrinho() {
        return carrinho;
    }
    public Produto getProduto() {
        return produto;
    }
    public Integer getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
