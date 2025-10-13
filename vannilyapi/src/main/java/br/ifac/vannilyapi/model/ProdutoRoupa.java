package br.ifac.vannilyapi.model;

import java.io.Serializable;
import jakarta.persistence.*;

@Entity
public class ProdutoRoupa implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto produto;

    private String tamanho;
    private String cor;
    private String dimensoes;
    private String numeroModelo;
    private Boolean tipoCapuz;
    private String espessuraTecido;
    private String materialForro;
    private Boolean possuiZiper;
    private Boolean resistenteAgua;
    private String tipoGola;
    private String tipoManga;
    private String tecido;
    private Boolean possuiBolsos;
    private Boolean estampaPersonalizada;
    private String modelo;

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

    public String getTamanho() {
        return tamanho;
    }

    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public String getDimensoes() {
        return dimensoes;
    }

    public void setDimensoes(String dimensoes) {
        this.dimensoes = dimensoes;
    }

    public String getNumeroModelo() {
        return numeroModelo;
    }

    public void setNumeroModelo(String numeroModelo) {
        this.numeroModelo = numeroModelo;
    }

    public Boolean getTipoCapuz() {
        return tipoCapuz;
    }

    public void setTipoCapuz(Boolean tipoCapuz) {
        this.tipoCapuz = tipoCapuz;
    }

    public String getEspessuraTecido() {
        return espessuraTecido;
    }

    public void setEspessuraTecido(String espessuraTecido) {
        this.espessuraTecido = espessuraTecido;
    }

    public String getMaterialForro() {
        return materialForro;
    }

    public void setMaterialForro(String materialForro) {
        this.materialForro = materialForro;
    }

    public Boolean getPossuiZiper() {
        return possuiZiper;
    }

    public void setPossuiZiper(Boolean possuiZiper) {
        this.possuiZiper = possuiZiper;
    }

    public Boolean getResistenteAgua() {
        return resistenteAgua;
    }

    public void setResistenteAgua(Boolean resistenteAgua) {
        this.resistenteAgua = resistenteAgua;
    }

    public String getTipoGola() {
        return tipoGola;
    }

    public void setTipoGola(String tipoGola) {
        this.tipoGola = tipoGola;
    }

    public String getTipoManga() {
        return tipoManga;
    }

    public void setTipoManga(String tipoManga) {
        this.tipoManga = tipoManga;
    }

    public String getTecido() {
        return tecido;
    }

    public void setTecido(String tecido) {
        this.tecido = tecido;
    }

    public Boolean getPossuiBolsos() {
        return possuiBolsos;
    }

    public void setPossuiBolsos(Boolean possuiBolsos) {
        this.possuiBolsos = possuiBolsos;
    }

    public Boolean getEstampaPersonalizada() {
        return estampaPersonalizada;
    }

    public void setEstampaPersonalizada(Boolean estampaPersonalizada) {
        this.estampaPersonalizada = estampaPersonalizada;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }
}
