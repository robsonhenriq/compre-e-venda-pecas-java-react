package br.com.compreevendapecas.ecommerce.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import br.com.compreevendapecas.ecommerce.domain.enumeration.Estado;

/**
 * A DTO for the {@link br.com.compreevendapecas.ecommerce.domain.Endereco} entity.
 */
public class EnderecoDTO implements Serializable {

    private Long id;

    @NotNull
    private String rua;

    private String bairro;

    private String complemento;

    private Integer numero;

    private String cidade;

    @NotNull
    private String cep;

    private Estado estado;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EnderecoDTO enderecoDTO = (EnderecoDTO) o;
        if (enderecoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enderecoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EnderecoDTO{" +
            "id=" + getId() +
            ", rua='" + getRua() + "'" +
            ", bairro='" + getBairro() + "'" +
            ", complemento='" + getComplemento() + "'" +
            ", numero=" + getNumero() +
            ", cidade='" + getCidade() + "'" +
            ", cep='" + getCep() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
