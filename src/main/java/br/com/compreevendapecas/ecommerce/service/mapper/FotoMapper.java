package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.FotoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Foto} and its DTO {@link FotoDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FotoMapper extends EntityMapper<FotoDTO, Foto> {


    @Mapping(target = "listProdutos", ignore = true)
    @Mapping(target = "removeListProdutos", ignore = true)
    Foto toEntity(FotoDTO fotoDTO);

    default Foto fromId(Long id) {
        if (id == null) {
            return null;
        }
        Foto foto = new Foto();
        foto.setId(id);
        return foto;
    }
}
