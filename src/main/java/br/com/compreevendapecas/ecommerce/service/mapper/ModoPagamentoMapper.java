package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.ModoPagamentoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ModoPagamento} and its DTO {@link ModoPagamentoDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ModoPagamentoMapper extends EntityMapper<ModoPagamentoDTO, ModoPagamento> {



    default ModoPagamento fromId(Long id) {
        if (id == null) {
            return null;
        }
        ModoPagamento modoPagamento = new ModoPagamento();
        modoPagamento.setId(id);
        return modoPagamento;
    }
}
