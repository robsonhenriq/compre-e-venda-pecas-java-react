package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.AvaliacaoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Avaliacao} and its DTO {@link AvaliacaoDTO}.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class})
public interface AvaliacaoMapper extends EntityMapper<AvaliacaoDTO, Avaliacao> {


    @Mapping(target = "removeListCliente", ignore = true)

    default Avaliacao fromId(Long id) {
        if (id == null) {
            return null;
        }
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setId(id);
        return avaliacao;
    }
}
