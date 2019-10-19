package br.com.compreevendapecas.ecommerce.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Avaliacao.
 */
@Entity
@Table(name = "avaliacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Avaliacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_hora")
    private LocalDate dataHora;

    @Column(name = "descricao")
    private String descricao;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "avaliacao_list_clientes",
               joinColumns = @JoinColumn(name = "avaliacao_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "list_clientes_id", referencedColumnName = "usuario_id"))
    private Set<Cliente> listClientes = new HashSet<>();

    @ManyToMany(mappedBy = "listAvaliacaos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Produto> listProdutos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataHora() {
        return dataHora;
    }

    public Avaliacao dataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
    }

    public String getDescricao() {
        return descricao;
    }

    public Avaliacao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Cliente> getListClientes() {
        return listClientes;
    }

    public Avaliacao listClientes(Set<Cliente> clientes) {
        this.listClientes = clientes;
        return this;
    }

    public Avaliacao addListClientes(Cliente cliente) {
        this.listClientes.add(cliente);
        cliente.getListAvaliacaos().add(this);
        return this;
    }

    public Avaliacao removeListClientes(Cliente cliente) {
        this.listClientes.remove(cliente);
        cliente.getListAvaliacaos().remove(this);
        return this;
    }

    public void setListClientes(Set<Cliente> clientes) {
        this.listClientes = clientes;
    }

    public Set<Produto> getListProdutos() {
        return listProdutos;
    }

    public Avaliacao listProdutos(Set<Produto> produtos) {
        this.listProdutos = produtos;
        return this;
    }

    public Avaliacao addListProdutos(Produto produto) {
        this.listProdutos.add(produto);
        produto.getListAvaliacaos().add(this);
        return this;
    }

    public Avaliacao removeListProdutos(Produto produto) {
        this.listProdutos.remove(produto);
        produto.getListAvaliacaos().remove(this);
        return this;
    }

    public void setListProdutos(Set<Produto> produtos) {
        this.listProdutos = produtos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Avaliacao)) {
            return false;
        }
        return id != null && id.equals(((Avaliacao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Avaliacao{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
