package br.com.compreevendapecas.ecommerce.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.compreevendapecas.ecommerce.domain.Vendedor} entity.
 */
public class VendedorDTO implements Serializable {

    private Long id;

    @NotNull
    private Boolean ehEmpresa;

    private String razaoSocial;

    private String cnpj;

    private String cpf;

    private LocalDate dataCadastro;

    private LocalDate dataNascimento;

    private String descricao;


    private Long usuarioId;

    private Long enderecoId;

    private Set<ProdutoDTO> listProdutos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isEhEmpresa() {
        return ehEmpresa;
    }

    public void setEhEmpresa(Boolean ehEmpresa) {
        this.ehEmpresa = ehEmpresa;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long userId) {
        this.usuarioId = userId;
    }

    public Long getEnderecoId() {
        return enderecoId;
    }

    public void setEnderecoId(Long enderecoId) {
        this.enderecoId = enderecoId;
    }

    public Set<ProdutoDTO> getListProdutos() {
        return listProdutos;
    }

    public void setListProdutos(Set<ProdutoDTO> produtos) {
        this.listProdutos = produtos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VendedorDTO vendedorDTO = (VendedorDTO) o;
        if (vendedorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vendedorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VendedorDTO{" +
            "id=" + getId() +
            ", ehEmpresa='" + isEhEmpresa() + "'" +
            ", razaoSocial='" + getRazaoSocial() + "'" +
            ", cnpj='" + getCnpj() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", dataCadastro='" + getDataCadastro() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", usuario=" + getUsuarioId() +
            ", endereco=" + getEnderecoId() +
            "}";
    }
}
