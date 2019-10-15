package br.com.compreevendapecas.ecommerce.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Veiculo.
 */
@Entity
@Table(name = "veiculo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Veiculo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "ano", nullable = false)
    private LocalDate ano;

    @ManyToOne
    @JsonIgnoreProperties("veiculos")
    private Marca marca;

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

    public Veiculo nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getAno() {
        return ano;
    }

    public Veiculo ano(LocalDate ano) {
        this.ano = ano;
        return this;
    }

    public void setAno(LocalDate ano) {
        this.ano = ano;
    }

    public Marca getMarca() {
        return marca;
    }

    public Veiculo marca(Marca marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Veiculo)) {
            return false;
        }
        return id != null && id.equals(((Veiculo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Veiculo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", ano='" + getAno() + "'" +
            "}";
    }
}
