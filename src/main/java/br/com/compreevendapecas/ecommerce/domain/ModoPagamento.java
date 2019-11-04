package br.com.compreevendapecas.ecommerce.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import br.com.compreevendapecas.ecommerce.domain.enumeration.TipoPagamento;

/**
 * A ModoPagamento.
 */
@Entity
@Table(name = "modo_pagamento")
public class ModoPagamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pagamento")
    private TipoPagamento tipoPagamento;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public ModoPagamento descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public TipoPagamento getTipoPagamento() {
        return tipoPagamento;
    }

    public ModoPagamento tipoPagamento(TipoPagamento tipoPagamento) {
        this.tipoPagamento = tipoPagamento;
        return this;
    }

    public void setTipoPagamento(TipoPagamento tipoPagamento) {
        this.tipoPagamento = tipoPagamento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ModoPagamento)) {
            return false;
        }
        return id != null && id.equals(((ModoPagamento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ModoPagamento{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", tipoPagamento='" + getTipoPagamento() + "'" +
            "}";
    }
}
