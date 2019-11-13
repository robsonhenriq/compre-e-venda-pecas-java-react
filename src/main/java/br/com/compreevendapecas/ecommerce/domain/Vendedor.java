package br.com.compreevendapecas.ecommerce.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Vendedor.
 */
@Entity
@Table(name = "vendedor")
public class Vendedor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "eh_empresa", nullable = false)
    private Boolean ehEmpresa;

    @Column(name = "razao_social")
    private String razaoSocial;

    @Column(name = "cnpj")
    private String cnpj;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "descricao")
    private String descricao;

    @OneToOne
    @JoinColumn(unique = true)
    @MapsId
    private User usuario;

    @ManyToOne
    @JsonIgnoreProperties("vendedors")
    private Endereco endereco;

    @ManyToMany
    @JoinTable(name = "vendedor_list_produtos",
               joinColumns = @JoinColumn(name = "vendedor_id", referencedColumnName = "usuario_id"),
               inverseJoinColumns = @JoinColumn(name = "list_produtos_id", referencedColumnName = "id"))
    private Set<Produto> listProdutos = new HashSet<>();

    @ManyToMany(mappedBy = "listVendedores")
    @JsonIgnore
    private Set<Venda> listVendas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isEhEmpresa() {
        return ehEmpresa;
    }

    public Vendedor ehEmpresa(Boolean ehEmpresa) {
        this.ehEmpresa = ehEmpresa;
        return this;
    }

    public void setEhEmpresa(Boolean ehEmpresa) {
        this.ehEmpresa = ehEmpresa;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public Vendedor razaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
        return this;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getCnpj() {
        return cnpj;
    }

    public Vendedor cnpj(String cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCpf() {
        return cpf;
    }

    public Vendedor cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public Vendedor dataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
        return this;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public Vendedor dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getDescricao() {
        return descricao;
    }

    public Vendedor descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public User getUsuario() {
        return usuario;
    }

    public Vendedor usuario(User user) {
        this.usuario = user;
        return this;
    }

    public void setUsuario(User user) {
        this.usuario = user;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public Vendedor endereco(Endereco endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Set<Produto> getListProdutos() {
        return listProdutos;
    }

    public Vendedor listProdutos(Set<Produto> produtos) {
        this.listProdutos = produtos;
        return this;
    }

    public Vendedor addListProdutos(Produto produto) {
        this.listProdutos.add(produto);
        produto.getListVendedores().add(this);
        return this;
    }

    public Vendedor removeListProdutos(Produto produto) {
        this.listProdutos.remove(produto);
        produto.getListVendedores().remove(this);
        return this;
    }

    public void setListProdutos(Set<Produto> produtos) {
        this.listProdutos = produtos;
    }

    public Set<Venda> getListVendas() {
        return listVendas;
    }

    public Vendedor listVendas(Set<Venda> vendas) {
        this.listVendas = vendas;
        return this;
    }

    public Vendedor addListVendas(Venda venda) {
        this.listVendas.add(venda);
        venda.getListVendedores().add(this);
        return this;
    }

    public Vendedor removeListVendas(Venda venda) {
        this.listVendas.remove(venda);
        venda.getListVendedores().remove(this);
        return this;
    }

    public void setListVendas(Set<Venda> vendas) {
        this.listVendas = vendas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vendedor)) {
            return false;
        }
        return id != null && id.equals(((Vendedor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Vendedor{" +
            "id=" + getId() +
            ", ehEmpresa='" + isEhEmpresa() + "'" +
            ", razaoSocial='" + getRazaoSocial() + "'" +
            ", cnpj='" + getCnpj() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", dataCadastro='" + getDataCadastro() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
