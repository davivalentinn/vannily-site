package br.ifac.vannilyapi.model;

import java.io.Serializable;
import jakarta.persistence.*;

@Entity
public class ProdutoJogo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto produto;

    private String tema;
    private String genero;
    private Integer qtdPessoas;
    private String classificacaoIndicativa;
    private String duracao;
    private String tipoBaralho;
    private String tamanhoCartas;
    private String materialCartas;
    private String tipoJogo;
    private Integer numeroCartas;
    private Boolean ilustrado;
    private Integer qtdPecas;
    private String tamanhoTabuleiro;
    private String materialTabuleiro;
    private String tipoTabuleiro;
    private String complexidade;
    private Boolean possuiCartas;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public String getTema() {
        return tema;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public Integer getQtdPessoas() {
        return qtdPessoas;
    }

    public void setQtdPessoas(Integer qtdPessoas) {
        this.qtdPessoas = qtdPessoas;
    }

    public String getClassificacaoIndicativa() {
        return classificacaoIndicativa;
    }

    public void setClassificacaoIndicativa(String classificacaoIndicativa) {
        this.classificacaoIndicativa = classificacaoIndicativa;
    }

    public String getDuracao() {
        return duracao;
    }

    public void setDuracao(String duracao) {
        this.duracao = duracao;
    }

    public String getTipoBaralho() {
        return tipoBaralho;
    }

    public void setTipoBaralho(String tipoBaralho) {
        this.tipoBaralho = tipoBaralho;
    }

    public String getTamanhoCartas() {
        return tamanhoCartas;
    }

    public void setTamanhoCartas(String tamanhoCartas) {
        this.tamanhoCartas = tamanhoCartas;
    }

    public String getMaterialCartas() {
        return materialCartas;
    }

    public void setMaterialCartas(String materialCartas) {
        this.materialCartas = materialCartas;
    }

    public String getTipoJogo() {
        return tipoJogo;
    }

    public void setTipoJogo(String tipoJogo) {
        this.tipoJogo = tipoJogo;
    }

    public Integer getNumeroCartas() {
        return numeroCartas;
    }

    public void setNumeroCartas(Integer numeroCartas) {
        this.numeroCartas = numeroCartas;
    }

    public Boolean getIlustrado() {
        return ilustrado;
    }

    public void setIlustrado(Boolean ilustrado) {
        this.ilustrado = ilustrado;
    }

    public Integer getQtdPecas() {
        return qtdPecas;
    }

    public void setQtdPecas(Integer qtdPecas) {
        this.qtdPecas = qtdPecas;
    }

    public String getTamanhoTabuleiro() {
        return tamanhoTabuleiro;
    }

    public void setTamanhoTabuleiro(String tamanhoTabuleiro) {
        this.tamanhoTabuleiro = tamanhoTabuleiro;
    }

    public String getMaterialTabuleiro() {
        return materialTabuleiro;
    }

    public void setMaterialTabuleiro(String materialTabuleiro) {
        this.materialTabuleiro = materialTabuleiro;
    }

    public String getTipoTabuleiro() {
        return tipoTabuleiro;
    }

    public void setTipoTabuleiro(String tipoTabuleiro) {
        this.tipoTabuleiro = tipoTabuleiro;
    }

    public String getComplexidade() {
        return complexidade;
    }

    public void setComplexidade(String complexidade) {
        this.complexidade = complexidade;
    }

    public Boolean getPossuiCartas() {
        return possuiCartas;
    }

    public void setPossuiCartas(Boolean possuiCartas) {
        this.possuiCartas = possuiCartas;
    }
}
