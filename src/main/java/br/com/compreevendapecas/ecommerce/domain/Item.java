package br.com.compreevendapecas.ecommerce.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A Item.
 */
@Entity
@Table(name = "item")
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "valor_total", precision = 21, scale = 2, nullable = false)
    private BigDecimal valorTotal;

    @NotNull
    @Column(name = "valor_item", precision = 21, scale = 2, nullable = false)
    private BigDecimal valorItem;

    @NotNull
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

    @ManyToOne
    @JsonIgnoreProperties("items")
    private Produto produto;

    @ManyToMany(mappedBy = "listItens")
    @JsonIgnore
    private Set<Carrinho> listCarrinhos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("items")
    private Venda venda;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public Item valorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
        return this;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public BigDecimal getValorItem() {
        return valorItem;
    }

    public Item valorItem(BigDecimal valorItem) {
        this.valorItem = valorItem;
        return this;
    }

    public void setValorItem(BigDecimal valorItem) {
        this.valorItem = valorItem;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public Item quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Produto getProduto() {
        return produto;
    }

    public Item produto(Produto produto) {
        this.produto = produto;
        return this;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Set<Carrinho> getListCarrinhos() {
        return listCarrinhos;
    }

    public Item listCarrinhos(Set<Carrinho> carrinhos) {
        this.listCarrinhos = carrinhos;
        return this;
    }

    public Item addListCarrinhos(Carrinho carrinho) {
        this.listCarrinhos.add(carrinho);
        carrinho.getListItens().add(this);
        return this;
    }

    public Item removeListCarrinhos(Carrinho carrinho) {
        this.listCarrinhos.remove(carrinho);
        carrinho.getListItens().remove(this);
        return this;
    }

    public void setListCarrinhos(Set<Carrinho> carrinhos) {
        this.listCarrinhos = carrinhos;
    }

    public Venda getVenda() {
        return venda;
    }

    public Item venda(Venda venda) {
        this.venda = venda;
        return this;
    }

    public void setVenda(Venda venda) {
        this.venda = venda;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Item)) {
            return false;
        }
        return id != null && id.equals(((Item) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Item{" +
            "id=" + getId() +
            ", valorTotal=" + getValorTotal() +
            ", valorItem=" + getValorItem() +
            ", quantidade=" + getQuantidade() +
            "}";
    }
}
