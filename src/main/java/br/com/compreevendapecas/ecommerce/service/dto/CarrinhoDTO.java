package br.com.compreevendapecas.ecommerce.service.dto;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.compreevendapecas.ecommerce.domain.Carrinho} entity.
 */
public class CarrinhoDTO implements Serializable {

    private Long id;

    private BigDecimal totalCarrinho;


    private Set<ItemDTO> listItens = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotalCarrinho() {
        return totalCarrinho;
    }

    public void setTotalCarrinho(BigDecimal totalCarrinho) {
        this.totalCarrinho = totalCarrinho;
    }

    public Set<ItemDTO> getListItens() {
        return listItens;
    }

    public void setListItens(Set<ItemDTO> items) {
        this.listItens = items;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CarrinhoDTO carrinhoDTO = (CarrinhoDTO) o;
        if (carrinhoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carrinhoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarrinhoDTO{" +
            "id=" + getId() +
            ", totalCarrinho=" + getTotalCarrinho() +
            "}";
    }
}
