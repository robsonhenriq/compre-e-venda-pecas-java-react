package br.com.compreevendapecas.ecommerce.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.compreevendapecas.ecommerce.domain.Venda} entity.
 */
public class VendaDTO implements Serializable {

    private Long id;

    private Instant dataHora;

    private BigDecimal totalVenda;


    private Long compradorId;

    private Long enderecoEntregaId;

    private Long modoPagamentoId;

    private Set<VendedorDTO> listVendedores = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataHora() {
        return dataHora;
    }

    public void setDataHora(Instant dataHora) {
        this.dataHora = dataHora;
    }

    public BigDecimal getTotalVenda() {
        return totalVenda;
    }

    public void setTotalVenda(BigDecimal totalVenda) {
        this.totalVenda = totalVenda;
    }

    public Long getCompradorId() {
        return compradorId;
    }

    public void setCompradorId(Long clienteId) {
        this.compradorId = clienteId;
    }

    public Long getEnderecoEntregaId() {
        return enderecoEntregaId;
    }

    public void setEnderecoEntregaId(Long enderecoId) {
        this.enderecoEntregaId = enderecoId;
    }

    public Long getModoPagamentoId() {
        return modoPagamentoId;
    }

    public void setModoPagamentoId(Long modoPagamentoId) {
        this.modoPagamentoId = modoPagamentoId;
    }

    public Set<VendedorDTO> getListVendedores() {
        return listVendedores;
    }

    public void setListVendedores(Set<VendedorDTO> vendedors) {
        this.listVendedores = vendedors;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VendaDTO vendaDTO = (VendaDTO) o;
        if (vendaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vendaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VendaDTO{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            ", totalVenda=" + getTotalVenda() +
            ", comprador=" + getCompradorId() +
            ", enderecoEntrega=" + getEnderecoEntregaId() +
            ", modoPagamento=" + getModoPagamentoId() +
            "}";
    }
}
