package br.com.compreevendapecas.ecommerce.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.compreevendapecas.ecommerce.domain.Veiculo} entity.
 */
public class VeiculoDTO implements Serializable {

    private Long id;

    @NotNull
    private String nome;

    @NotNull
    private LocalDate ano;


    private Long marcaId;

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

    public LocalDate getAno() {
        return ano;
    }

    public void setAno(LocalDate ano) {
        this.ano = ano;
    }

    public Long getMarcaId() {
        return marcaId;
    }

    public void setMarcaId(Long marcaId) {
        this.marcaId = marcaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VeiculoDTO veiculoDTO = (VeiculoDTO) o;
        if (veiculoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), veiculoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VeiculoDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", ano='" + getAno() + "'" +
            ", marca=" + getMarcaId() +
            "}";
    }
}
