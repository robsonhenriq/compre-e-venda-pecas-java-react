package br.com.compreevendapecas.ecommerce.service;

import br.com.compreevendapecas.ecommerce.domain.Veiculo;
import br.com.compreevendapecas.ecommerce.repository.VeiculoRepository;
import br.com.compreevendapecas.ecommerce.service.dto.VeiculoDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.VeiculoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Veiculo}.
 */
@Service
@Transactional
public class VeiculoService {

    private final Logger log = LoggerFactory.getLogger(VeiculoService.class);

    private final VeiculoRepository veiculoRepository;

    private final VeiculoMapper veiculoMapper;

    public VeiculoService(VeiculoRepository veiculoRepository, VeiculoMapper veiculoMapper) {
        this.veiculoRepository = veiculoRepository;
        this.veiculoMapper = veiculoMapper;
    }

    /**
     * Save a veiculo.
     *
     * @param veiculoDTO the entity to save.
     * @return the persisted entity.
     */
    public VeiculoDTO save(VeiculoDTO veiculoDTO) {
        log.debug("Request to save Veiculo : {}", veiculoDTO);
        Veiculo veiculo = veiculoMapper.toEntity(veiculoDTO);
        veiculo = veiculoRepository.save(veiculo);
        return veiculoMapper.toDto(veiculo);
    }

    /**
     * Get all the veiculos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<VeiculoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Veiculos");
        return veiculoRepository.findAll(pageable)
            .map(veiculoMapper::toDto);
    }


    /**
     * Get one veiculo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<VeiculoDTO> findOne(Long id) {
        log.debug("Request to get Veiculo : {}", id);
        return veiculoRepository.findById(id)
            .map(veiculoMapper::toDto);
    }

    /**
     * Delete the veiculo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Veiculo : {}", id);
        veiculoRepository.deleteById(id);
    }
}
