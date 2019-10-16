package br.com.compreevendapecas.ecommerce.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "rg")
    private String rg;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "celular")
    private String celular;

    @OneToOne
    @JoinColumn(unique = true)
    private Carrinho carrinho;

    @OneToOne
    @JoinColumn(unique = true)
    private User usuario;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "cliente_list_veiculos",
               joinColumns = @JoinColumn(name = "cliente_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "list_veiculos_id", referencedColumnName = "id"))
    private Set<Veiculo> listVeiculos = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "cliente_list_endereco",
               joinColumns = @JoinColumn(name = "cliente_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "list_endereco_id", referencedColumnName = "id"))
    private Set<Endereco> listEnderecos = new HashSet<>();

    @ManyToMany(mappedBy = "listClientes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Avaliacao> listAvaliacaos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Cliente nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public Cliente cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public Cliente rg(String rg) {
        this.rg = rg;
        return this;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public Cliente dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getTelefone() {
        return telefone;
    }

    public Cliente telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCelular() {
        return celular;
    }

    public Cliente celular(String celular) {
        this.celular = celular;
        return this;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public Carrinho getCarrinho() {
        return carrinho;
    }

    public Cliente carrinho(Carrinho carrinho) {
        this.carrinho = carrinho;
        return this;
    }

    public void setCarrinho(Carrinho carrinho) {
        this.carrinho = carrinho;
    }

    public User getUsuario() {
        return usuario;
    }

    public Cliente usuario(User user) {
        this.usuario = user;
        return this;
    }

    public void setUsuario(User user) {
        this.usuario = user;
    }

    public Set<Veiculo> getListVeiculos() {
        return listVeiculos;
    }

    public Cliente listVeiculos(Set<Veiculo> veiculos) {
        this.listVeiculos = veiculos;
        return this;
    }

    public Cliente addListVeiculos(Veiculo veiculo) {
        this.listVeiculos.add(veiculo);
        veiculo.getListClientes().add(this);
        return this;
    }

    public Cliente removeListVeiculos(Veiculo veiculo) {
        this.listVeiculos.remove(veiculo);
        veiculo.getListClientes().remove(this);
        return this;
    }

    public void setListVeiculos(Set<Veiculo> veiculos) {
        this.listVeiculos = veiculos;
    }

    public Set<Endereco> getListEnderecos() {
        return listEnderecos;
    }

    public Cliente listEnderecos(Set<Endereco> enderecos) {
        this.listEnderecos = enderecos;
        return this;
    }

    public Cliente addListEndereco(Endereco endereco) {
        this.listEnderecos.add(endereco);
        endereco.getListEnderecos().add(this);
        return this;
    }

    public Cliente removeListEndereco(Endereco endereco) {
        this.listEnderecos.remove(endereco);
        endereco.getListEnderecos().remove(this);
        return this;
    }

    public void setListEnderecos(Set<Endereco> enderecos) {
        this.listEnderecos = enderecos;
    }

    public Set<Avaliacao> getListAvaliacaos() {
        return listAvaliacaos;
    }

    public Cliente listAvaliacaos(Set<Avaliacao> avaliacaos) {
        this.listAvaliacaos = avaliacaos;
        return this;
    }

    public Cliente addListAvaliacao(Avaliacao avaliacao) {
        this.listAvaliacaos.add(avaliacao);
        avaliacao.getListClientes().add(this);
        return this;
    }

    public Cliente removeListAvaliacao(Avaliacao avaliacao) {
        this.listAvaliacaos.remove(avaliacao);
        avaliacao.getListClientes().remove(this);
        return this;
    }

    public void setListAvaliacaos(Set<Avaliacao> avaliacaos) {
        this.listAvaliacaos = avaliacaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", rg='" + getRg() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", celular='" + getCelular() + "'" +
            "}";
    }
}
