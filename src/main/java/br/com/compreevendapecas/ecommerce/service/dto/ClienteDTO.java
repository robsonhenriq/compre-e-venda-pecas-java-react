package br.com.compreevendapecas.ecommerce.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.compreevendapecas.ecommerce.domain.Cliente} entity.
 */
public class ClienteDTO implements Serializable {

    private Long id;

    @NotNull
    private String nome;

    private String cpf;

    private String rg;

    private LocalDate dataNascimento;

    private String telefone;

    private String celular;


    private Long carrinhoId;

    private Long usuarioId;

    private Set<VeiculoDTO> listVeiculos = new HashSet<>();

    private Set<EnderecoDTO> listEnderecos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public Long getCarrinhoId() {
        return carrinhoId;
    }

    public void setCarrinhoId(Long carrinhoId) {
        this.carrinhoId = carrinhoId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long userId) {
        this.usuarioId = userId;
    }

    public Set<VeiculoDTO> getListVeiculos() {
        return listVeiculos;
    }

    public void setListVeiculos(Set<VeiculoDTO> veiculos) {
        this.listVeiculos = veiculos;
    }

    public Set<EnderecoDTO> getListEnderecos() {
        return listEnderecos;
    }

    public void setListEnderecos(Set<EnderecoDTO> enderecos) {
        this.listEnderecos = enderecos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClienteDTO clienteDTO = (ClienteDTO) o;
        if (clienteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clienteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClienteDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", rg='" + getRg() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", celular='" + getCelular() + "'" +
            ", carrinho=" + getCarrinhoId() +
            ", usuario=" + getUsuarioId() +
            "}";
    }
}
