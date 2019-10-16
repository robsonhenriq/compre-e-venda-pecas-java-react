package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.AvaliacaoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Avaliacao} and its DTO {@link AvaliacaoDTO}.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class})
public interface AvaliacaoMapper extends EntityMapper<AvaliacaoDTO, Avaliacao> {


    @Mapping(target = "removeListClientes", ignore = true)
    @Mapping(target = "listProdutos", ignore = true)
    @Mapping(target = "removeListProdutos", ignore = true)
    Avaliacao toEntity(AvaliacaoDTO avaliacaoDTO);

    default Avaliacao fromId(Long id) {
        if (id == null) {
            return null;
        }
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setId(id);
        return avaliacao;
    }
}
