package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.VendaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Venda} and its DTO {@link VendaDTO}.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, EnderecoMapper.class, ModoPagamentoMapper.class, VendedorMapper.class})
public interface VendaMapper extends EntityMapper<VendaDTO, Venda> {

    @Mapping(source = "comprador.id", target = "compradorId")
    @Mapping(source = "enderecoEntrega.id", target = "enderecoEntregaId")
    @Mapping(source = "modoPagamento.id", target = "modoPagamentoId")
    VendaDTO toDto(Venda venda);

    @Mapping(target = "listItens", ignore = true)
    @Mapping(target = "removeListItens", ignore = true)
    @Mapping(source = "compradorId", target = "comprador")
    @Mapping(source = "enderecoEntregaId", target = "enderecoEntrega")
    @Mapping(source = "modoPagamentoId", target = "modoPagamento")
    @Mapping(target = "removeListVendedores", ignore = true)
    Venda toEntity(VendaDTO vendaDTO);

    default Venda fromId(Long id) {
        if (id == null) {
            return null;
        }
        Venda venda = new Venda();
        venda.setId(id);
        return venda;
    }
}
