package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.ItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Item} and its DTO {@link ItemDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProdutoMapper.class, VendaMapper.class})
public interface ItemMapper extends EntityMapper<ItemDTO, Item> {

    @Mapping(source = "produto.id", target = "produtoId")
    @Mapping(source = "venda.id", target = "vendaId")
    ItemDTO toDto(Item item);

    @Mapping(source = "produtoId", target = "produto")
    @Mapping(target = "listCarrinhos", ignore = true)
    @Mapping(target = "removeListCarrinhos", ignore = true)
    @Mapping(source = "vendaId", target = "venda")
    Item toEntity(ItemDTO itemDTO);

    default Item fromId(Long id) {
        if (id == null) {
            return null;
        }
        Item item = new Item();
        item.setId(id);
        return item;
    }
}
