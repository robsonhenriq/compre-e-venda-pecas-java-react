package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.VendedorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Vendedor} and its DTO {@link VendedorDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, EnderecoMapper.class, ProdutoMapper.class})
public interface VendedorMapper extends EntityMapper<VendedorDTO, Vendedor> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "endereco.id", target = "enderecoId")
    VendedorDTO toDto(Vendedor vendedor);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "enderecoId", target = "endereco")
    @Mapping(target = "removeListProdutos", ignore = true)
    Vendedor toEntity(VendedorDTO vendedorDTO);

    default Vendedor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Vendedor vendedor = new Vendedor();
        vendedor.setId(id);
        return vendedor;
    }
}
