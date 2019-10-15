package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.ClienteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cliente} and its DTO {@link ClienteDTO}.
 */
@Mapper(componentModel = "spring", uses = {CarrinhoMapper.class, UserMapper.class, VeiculoMapper.class, EnderecoMapper.class})
public interface ClienteMapper extends EntityMapper<ClienteDTO, Cliente> {

    @Mapping(source = "carrinho.id", target = "carrinhoId")
    @Mapping(source = "usuario.id", target = "usuarioId")
    ClienteDTO toDto(Cliente cliente);

    @Mapping(source = "carrinhoId", target = "carrinho")
    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(target = "removeListVeiculos", ignore = true)
    @Mapping(target = "removeListEndereco", ignore = true)
    @Mapping(target = "listAvaliacaos", ignore = true)
    @Mapping(target = "removeListAvaliacao", ignore = true)
    Cliente toEntity(ClienteDTO clienteDTO);

    default Cliente fromId(Long id) {
        if (id == null) {
            return null;
        }
        Cliente cliente = new Cliente();
        cliente.setId(id);
        return cliente;
    }
}
