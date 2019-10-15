package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.CarrinhoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Carrinho} and its DTO {@link CarrinhoDTO}.
 */
@Mapper(componentModel = "spring", uses = {ItemMapper.class})
public interface CarrinhoMapper extends EntityMapper<CarrinhoDTO, Carrinho> {


    @Mapping(target = "removeListItens", ignore = true)

    default Carrinho fromId(Long id) {
        if (id == null) {
            return null;
        }
        Carrinho carrinho = new Carrinho();
        carrinho.setId(id);
        return carrinho;
    }
}
