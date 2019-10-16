package br.com.compreevendapecas.ecommerce.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Venda.
 */
@Entity
@Table(name = "venda")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Venda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_hora")
    private Instant dataHora;

    @Column(name = "total_venda", precision = 21, scale = 2)
    private BigDecimal totalVenda;

    @OneToMany(mappedBy = "venda")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Item> listItens = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("vendas")
    private Cliente comprador;

    @ManyToOne
    @JsonIgnoreProperties("vendas")
    private Endereco enderecoEntrega;

    @ManyToOne
    @JsonIgnoreProperties("vendas")
    private ModoPagamento modoPagamento;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "venda_list_vendedores",
               joinColumns = @JoinColumn(name = "venda_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "list_vendedores_id", referencedColumnName = "id"))
    private Set<Vendedor> listVendedores = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataHora() {
        return dataHora;
    }

    public Venda dataHora(Instant dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(Instant dataHora) {
        this.dataHora = dataHora;
    }

    public BigDecimal getTotalVenda() {
        return totalVenda;
    }

    public Venda totalVenda(BigDecimal totalVenda) {
        this.totalVenda = totalVenda;
        return this;
    }

    public void setTotalVenda(BigDecimal totalVenda) {
        this.totalVenda = totalVenda;
    }

    public Set<Item> getListItens() {
        return listItens;
    }

    public Venda listItens(Set<Item> items) {
        this.listItens = items;
        return this;
    }

    public Venda addListItens(Item item) {
        this.listItens.add(item);
        item.setVenda(this);
        return this;
    }

    public Venda removeListItens(Item item) {
        this.listItens.remove(item);
        item.setVenda(null);
        return this;
    }

    public void setListItens(Set<Item> items) {
        this.listItens = items;
    }

    public Cliente getComprador() {
        return comprador;
    }

    public Venda comprador(Cliente cliente) {
        this.comprador = cliente;
        return this;
    }

    public void setComprador(Cliente cliente) {
        this.comprador = cliente;
    }

    public Endereco getEnderecoEntrega() {
        return enderecoEntrega;
    }

    public Venda enderecoEntrega(Endereco endereco) {
        this.enderecoEntrega = endereco;
        return this;
    }

    public void setEnderecoEntrega(Endereco endereco) {
        this.enderecoEntrega = endereco;
    }

    public ModoPagamento getModoPagamento() {
        return modoPagamento;
    }

    public Venda modoPagamento(ModoPagamento modoPagamento) {
        this.modoPagamento = modoPagamento;
        return this;
    }

    public void setModoPagamento(ModoPagamento modoPagamento) {
        this.modoPagamento = modoPagamento;
    }

    public Set<Vendedor> getListVendedores() {
        return listVendedores;
    }

    public Venda listVendedores(Set<Vendedor> vendedors) {
        this.listVendedores = vendedors;
        return this;
    }

    public Venda addListVendedores(Vendedor vendedor) {
        this.listVendedores.add(vendedor);
        vendedor.getListVendas().add(this);
        return this;
    }

    public Venda removeListVendedores(Vendedor vendedor) {
        this.listVendedores.remove(vendedor);
        vendedor.getListVendas().remove(this);
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
        if (!(o instanceof Venda)) {
            return false;
        }
        return id != null && id.equals(((Venda) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Venda{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            ", totalVenda=" + getTotalVenda() +
            "}";
    }
}
