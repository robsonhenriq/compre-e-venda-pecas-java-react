package br.com.compreevendapecas.ecommerce.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import br.com.compreevendapecas.ecommerce.domain.enumeration.TipoPagamento;

/**
 * A DTO for the {@link br.com.compreevendapecas.ecommerce.domain.ModoPagamento} entity.
 */
public class ModoPagamentoDTO implements Serializable {

    private Long id;

    @NotNull
    private String descricao;

    private TipoPagamento tipoPagamento;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public TipoPagamento getTipoPagamento() {
        return tipoPagamento;
    }

    public void setTipoPagamento(TipoPagamento tipoPagamento) {
        this.tipoPagamento = tipoPagamento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ModoPagamentoDTO modoPagamentoDTO = (ModoPagamentoDTO) o;
        if (modoPagamentoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), modoPagamentoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ModoPagamentoDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", tipoPagamento='" + getTipoPagamento() + "'" +
            "}";
    }
}
