package br.com.compreevendapecas.ecommerce.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import br.com.compreevendapecas.ecommerce.domain.enumeration.Categoria;

/**
 * A DTO for the {@link br.com.compreevendapecas.ecommerce.domain.Produto} entity.
 */
public class ProdutoDTO implements Serializable {

    private Long id;

    private String codigoOriginal;

    private String fabricante;

    @NotNull
    @Size(min = 5, max = 240)
    private String descricao;

    @NotNull
    private Boolean ehUsado;

    @NotNull
    private Integer quantidadeDisponivel;

    @NotNull
    private Double altura;

    @NotNull
    private Double largura;

    @NotNull
    private Double pesoBruto;

    @NotNull
    private BigDecimal precoAVista;

    @NotNull
    private BigDecimal precoAPrazo;

    private Categoria categoria;


    private Long marcaId;

    private Set<FotoDTO> listFotos = new HashSet<>();

    private Set<VeiculoDTO> aplicacoes = new HashSet<>();

    private Set<AvaliacaoDTO> listAvaliacaos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoOriginal() {
        return codigoOriginal;
    }

    public void setCodigoOriginal(String codigoOriginal) {
        this.codigoOriginal = codigoOriginal;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean isEhUsado() {
        return ehUsado;
    }

    public void setEhUsado(Boolean ehUsado) {
        this.ehUsado = ehUsado;
    }

    public Integer getQuantidadeDisponivel() {
        return quantidadeDisponivel;
    }

    public void setQuantidadeDisponivel(Integer quantidadeDisponivel) {
        this.quantidadeDisponivel = quantidadeDisponivel;
    }

    public Double getAltura() {
        return altura;
    }

    public void setAltura(Double altura) {
        this.altura = altura;
    }

    public Double getLargura() {
        return largura;
    }

    public void setLargura(Double largura) {
        this.largura = largura;
    }

    public Double getPesoBruto() {
        return pesoBruto;
    }

    public void setPesoBruto(Double pesoBruto) {
        this.pesoBruto = pesoBruto;
    }

    public BigDecimal getPrecoAVista() {
        return precoAVista;
    }

    public void setPrecoAVista(BigDecimal precoAVista) {
        this.precoAVista = precoAVista;
    }

    public BigDecimal getPrecoAPrazo() {
        return precoAPrazo;
    }

    public void setPrecoAPrazo(BigDecimal precoAPrazo) {
        this.precoAPrazo = precoAPrazo;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Long getMarcaId() {
        return marcaId;
    }

    public void setMarcaId(Long marcaId) {
        this.marcaId = marcaId;
    }

    public Set<FotoDTO> getListFotos() {
        return listFotos;
    }

    public void setListFotos(Set<FotoDTO> fotos) {
        this.listFotos = fotos;
    }

    public Set<VeiculoDTO> getAplicacoes() {
        return aplicacoes;
    }

    public void setAplicacoes(Set<VeiculoDTO> veiculos) {
        this.aplicacoes = veiculos;
    }

    public Set<AvaliacaoDTO> getListAvaliacaos() {
        return listAvaliacaos;
    }

    public void setListAvaliacaos(Set<AvaliacaoDTO> avaliacaos) {
        this.listAvaliacaos = avaliacaos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProdutoDTO produtoDTO = (ProdutoDTO) o;
        if (produtoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produtoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProdutoDTO{" +
            "id=" + getId() +
            ", codigoOriginal='" + getCodigoOriginal() + "'" +
            ", fabricante='" + getFabricante() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", ehUsado='" + isEhUsado() + "'" +
            ", quantidadeDisponivel=" + getQuantidadeDisponivel() +
            ", altura=" + getAltura() +
            ", largura=" + getLargura() +
            ", pesoBruto=" + getPesoBruto() +
            ", precoAVista=" + getPrecoAVista() +
            ", precoAPrazo=" + getPrecoAPrazo() +
            ", categoria='" + getCategoria() + "'" +
            ", marca=" + getMarcaId() +
            "}";
    }
}
