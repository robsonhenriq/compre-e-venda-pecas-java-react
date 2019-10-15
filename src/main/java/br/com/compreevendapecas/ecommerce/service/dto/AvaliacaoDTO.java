package br.com.compreevendapecas.ecommerce.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.compreevendapecas.ecommerce.domain.Avaliacao} entity.
 */
public class AvaliacaoDTO implements Serializable {

    private Long id;

    private LocalDate dataHora;

    private String descricao;


    private Set<ClienteDTO> listClientes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<ClienteDTO> getListClientes() {
        return listClientes;
    }

    public void setListClientes(Set<ClienteDTO> clientes) {
        this.listClientes = clientes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AvaliacaoDTO avaliacaoDTO = (AvaliacaoDTO) o;
        if (avaliacaoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), avaliacaoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AvaliacaoDTO{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
