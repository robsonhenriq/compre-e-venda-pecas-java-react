package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.MarcaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Marca} and its DTO {@link MarcaDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MarcaMapper extends EntityMapper<MarcaDTO, Marca> {



    default Marca fromId(Long id) {
        if (id == null) {
            return null;
        }
        Marca marca = new Marca();
        marca.setId(id);
        return marca;
    }
}
