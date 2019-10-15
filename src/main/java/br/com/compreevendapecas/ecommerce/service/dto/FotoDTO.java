package br.com.compreevendapecas.ecommerce.service.dto;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link br.com.compreevendapecas.ecommerce.domain.Foto} entity.
 */
public class FotoDTO implements Serializable {

    private Long id;

    private String nome;

    @Lob
    private byte[] imagem;

    private String imagemContentType;

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

    public byte[] getImagem() {
        return imagem;
    }

    public void setImagem(byte[] imagem) {
        this.imagem = imagem;
    }

    public String getImagemContentType() {
        return imagemContentType;
    }

    public void setImagemContentType(String imagemContentType) {
        this.imagemContentType = imagemContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FotoDTO fotoDTO = (FotoDTO) o;
        if (fotoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fotoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FotoDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", imagem='" + getImagem() + "'" +
            "}";
    }
}
