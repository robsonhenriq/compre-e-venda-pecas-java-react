package br.com.compreevendapecas.ecommerce.service.mapper;

import br.com.compreevendapecas.ecommerce.domain.*;
import br.com.compreevendapecas.ecommerce.service.dto.VeiculoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Veiculo} and its DTO {@link VeiculoDTO}.
 */
@Mapper(componentModel = "spring", uses = {MarcaMapper.class})
public interface VeiculoMapper extends EntityMapper<VeiculoDTO, Veiculo> {

    @Mapping(source = "marca.id", target = "marcaId")
    VeiculoDTO toDto(Veiculo veiculo);

    @Mapping(source = "marcaId", target = "marca")
    Veiculo toEntity(VeiculoDTO veiculoDTO);

    default Veiculo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Veiculo veiculo = new Veiculo();
        veiculo.setId(id);
        return veiculo;
    }
}
