package br.com.compreevendapecas.ecommerce.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import br.com.compreevendapecas.ecommerce.domain.enumeration.Categoria;

/**
 * A Produto.
 */
@Entity
@Table(name = "produto")
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_original")
    private String codigoOriginal;

    @Column(name = "fabricante")
    private String fabricante;

    @NotNull
    @Size(min = 5, max = 240)
    @Column(name = "descricao", length = 240, nullable = false)
    private String descricao;

    @NotNull
    @Column(name = "eh_usado", nullable = false)
    private Boolean ehUsado;

    @NotNull
    @Column(name = "quantidade_disponivel", nullable = false)
    private Integer quantidadeDisponivel;

    @NotNull
    @Column(name = "altura", nullable = false)
    private Double altura;

    @NotNull
    @Column(name = "largura", nullable = false)
    private Double largura;

    @NotNull
    @Column(name = "peso_bruto", nullable = false)
    private Double pesoBruto;

    @NotNull
    @Column(name = "preco_a_vista", precision = 21, scale = 2, nullable = false)
    private BigDecimal precoAVista;

    @NotNull
    @Column(name = "preco_a_prazo", precision = 21, scale = 2, nullable = false)
    private BigDecimal precoAPrazo;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria")
    private Categoria categoria;

    @ManyToOne
    @JsonIgnoreProperties("produtos")
    private Marca marca;

    @ManyToMany
    @JoinTable(name = "produto_list_fotos",
               joinColumns = @JoinColumn(name = "produto_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "list_fotos_id", referencedColumnName = "id"))
    private Set<Foto> listFotos = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "produto_aplicacoes",
               joinColumns = @JoinColumn(name = "produto_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "aplicacoes_id", referencedColumnName = "id"))
    private Set<Veiculo> aplicacoes = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "produto_list_avaliacao",
               joinColumns = @JoinColumn(name = "produto_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "list_avaliacao_id", referencedColumnName = "id"))
    private Set<Avaliacao> listAvaliacaos = new HashSet<>();

    @ManyToMany(mappedBy = "listProdutos")
    @JsonIgnore
    private Set<Vendedor> listVendedores = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoOriginal() {
        return codigoOriginal;
    }

    public Produto codigoOriginal(String codigoOriginal) {
        this.codigoOriginal = codigoOriginal;
        return this;
    }

    public void setCodigoOriginal(String codigoOriginal) {
        this.codigoOriginal = codigoOriginal;
    }

    public String getFabricante() {
        return fabricante;
    }

    public Produto fabricante(String fabricante) {
        this.fabricante = fabricante;
        return this;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getDescricao() {
        return descricao;
    }

    public Produto descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean isEhUsado() {
        return ehUsado;
    }

    public Produto ehUsado(Boolean ehUsado) {
        this.ehUsado = ehUsado;
        return this;
    }

    public void setEhUsado(Boolean ehUsado) {
        this.ehUsado = ehUsado;
    }

    public Integer getQuantidadeDisponivel() {
        return quantidadeDisponivel;
    }

    public Produto quantidadeDisponivel(Integer quantidadeDisponivel) {
        this.quantidadeDisponivel = quantidadeDisponivel;
        return this;
    }

    public void setQuantidadeDisponivel(Integer quantidadeDisponivel) {
        this.quantidadeDisponivel = quantidadeDisponivel;
    }

    public Double getAltura() {
        return altura;
    }

    public Produto altura(Double altura) {
        this.altura = altura;
        return this;
    }

    public void setAltura(Double altura) {
        this.altura = altura;
    }

    public Double getLargura() {
        return largura;
    }

    public Produto largura(Double largura) {
        this.largura = largura;
        return this;
    }

    public void setLargura(Double largura) {
        this.largura = largura;
    }

    public Double getPesoBruto() {
        return pesoBruto;
    }

    public Produto pesoBruto(Double pesoBruto) {
        this.pesoBruto = pesoBruto;
        return this;
    }

    public void setPesoBruto(Double pesoBruto) {
        this.pesoBruto = pesoBruto;
    }

    public BigDecimal getPrecoAVista() {
        return precoAVista;
    }

    public Produto precoAVista(BigDecimal precoAVista) {
        this.precoAVista = precoAVista;
        return this;
    }

    public void setPrecoAVista(BigDecimal precoAVista) {
        this.precoAVista = precoAVista;
    }

    public BigDecimal getPrecoAPrazo() {
        return precoAPrazo;
    }

    public Produto precoAPrazo(BigDecimal precoAPrazo) {
        this.precoAPrazo = precoAPrazo;
        return this;
    }

    public void setPrecoAPrazo(BigDecimal precoAPrazo) {
        this.precoAPrazo = precoAPrazo;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public Produto categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Marca getMarca() {
        return marca;
    }

    public Produto marca(Marca marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Set<Foto> getListFotos() {
        return listFotos;
    }

    public Produto listFotos(Set<Foto> fotos) {
        this.listFotos = fotos;
        return this;
    }

    public Produto addListFotos(Foto foto) {
        this.listFotos.add(foto);
        foto.getListProdutos().add(this);
        return this;
    }

    public Produto removeListFotos(Foto foto) {
        this.listFotos.remove(foto);
        foto.getListProdutos().remove(this);
        return this;
    }

    public void setListFotos(Set<Foto> fotos) {
        this.listFotos = fotos;
    }

    public Set<Veiculo> getAplicacoes() {
        return aplicacoes;
    }

    public Produto aplicacoes(Set<Veiculo> veiculos) {
        this.aplicacoes = veiculos;
        return this;
    }

    public Produto addAplicacoes(Veiculo veiculo) {
        this.aplicacoes.add(veiculo);
        veiculo.getListProdutos().add(this);
        return this;
    }

    public Produto removeAplicacoes(Veiculo veiculo) {
        this.aplicacoes.remove(veiculo);
        veiculo.getListProdutos().remove(this);
        return this;
    }

    public void setAplicacoes(Set<Veiculo> veiculos) {
        this.aplicacoes = veiculos;
    }

    public Set<Avaliacao> getListAvaliacaos() {
        return listAvaliacaos;
    }

    public Produto listAvaliacaos(Set<Avaliacao> avaliacaos) {
        this.listAvaliacaos = avaliacaos;
        return this;
    }

    public Produto addListAvaliacao(Avaliacao avaliacao) {
        this.listAvaliacaos.add(avaliacao);
        avaliacao.getListProdutos().add(this);
        return this;
    }

    public Produto removeListAvaliacao(Avaliacao avaliacao) {
        this.listAvaliacaos.remove(avaliacao);
        avaliacao.getListProdutos().remove(this);
        return this;
    }

    public void setListAvaliacaos(Set<Avaliacao> avaliacaos) {
        this.listAvaliacaos = avaliacaos;
    }

    public Set<Vendedor> getListVendedores() {
        return listVendedores;
    }

    public Produto listVendedores(Set<Vendedor> vendedors) {
        this.listVendedores = vendedors;
        return this;
    }

    public Produto addListVendedores(Vendedor vendedor) {
        this.listVendedores.add(vendedor);
        vendedor.getListProdutos().add(this);
        return this;
    }

    public Produto removeListVendedores(Vendedor vendedor) {
        this.listVendedores.remove(vendedor);
        vendedor.getListProdutos().remove(this);
        return this;
    }

    public void setListVendedores(Set<Vendedor> vendedors) {
        this.listVendedores = vendedors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produto)) {
            return false;
        }
        return id != null && id.equals(((Produto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Produto{" +
            "id=" + getId() +
            ", codigoOriginal='" + getCodigoOriginal() + "'" +
            ", fabricante='" + getFabricante() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", ehUsado='" + isEhUsado() + "'" +
            ", quantidadeDisponivel=" + getQuantidadeDisponivel() +
            ", altura=" + getAltura() +
            ", largura=" + getLargura() +
            ", pesoBruto=" + getPesoBruto() +
            ", precoAVista=" + getPrecoAVista() +
            ", precoAPrazo=" + getPrecoAPrazo() +
            ", categoria='" + getCategoria() + "'" +
            "}";
    }
}
