package br.com.compreevendapecas.ecommerce.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A Carrinho.
 */
@Entity
@Table(name = "carrinho")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Carrinho implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_carrinho", precision = 21, scale = 2)
    private BigDecimal totalCarrinho;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "carrinho_list_itens",
               joinColumns = @JoinColumn(name = "carrinho_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "list_itens_id", referencedColumnName = "id"))
    private Set<Item> listItens = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotalCarrinho() {
        return totalCarrinho;
    }

    public Carrinho totalCarrinho(BigDecimal totalCarrinho) {
        this.totalCarrinho = totalCarrinho;
        return this;
    }

    public void setTotalCarrinho(BigDecimal totalCarrinho) {
        this.totalCarrinho = totalCarrinho;
    }

    public Set<Item> getListItens() {
        return listItens;
    }

    public Carrinho listItens(Set<Item> items) {
        this.listItens = items;
        return this;
    }

    public Carrinho addListItens(Item item) {
        this.listItens.add(item);
        item.getCarrinhos().add(this);
        return this;
    }

    public Carrinho removeListItens(Item item) {
        this.listItens.remove(item);
        item.getCarrinhos().remove(this);
        return this;
    }

    public void setListItens(Set<Item> items) {
        this.listItens = items;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Carrinho)) {
            return false;
        }
        return id != null && id.equals(((Carrinho) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Carrinho{" +
            "id=" + getId() +
            ", totalCarrinho=" + getTotalCarrinho() +
            "}";
    }
}
