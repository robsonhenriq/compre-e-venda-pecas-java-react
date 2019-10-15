package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.ProdutoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Produto} and its DTO {@link ProdutoDTO}.
 */
@Mapper(componentModel = "spring", uses = {MarcaMapper.class, FotoMapper.class, VeiculoMapper.class, AvaliacaoMapper.class})
public interface ProdutoMapper extends EntityMapper<ProdutoDTO, Produto> {

    @Mapping(source = "marca.id", target = "marcaId")
    ProdutoDTO toDto(Produto produto);

    @Mapping(source = "marcaId", target = "marca")
    @Mapping(target = "removeListImagens", ignore = true)
    @Mapping(target = "removeAplicacoes", ignore = true)
    @Mapping(target = "removeListAvaliacao", ignore = true)
    Produto toEntity(ProdutoDTO produtoDTO);

    default Produto fromId(Long id) {
        if (id == null) {
            return null;
        }
        Produto produto = new Produto();
        produto.setId(id);
        return produto;
    }
}
