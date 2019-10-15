package br.com.compreevendapecas.ecommerce.service;

import br.com.compreevendapecas.ecommerce.domain.Venda;
import br.com.compreevendapecas.ecommerce.repository.VendaRepository;
import br.com.compreevendapecas.ecommerce.service.dto.VendaDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.VendaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Venda}.
 */
@Service
@Transactional
public class VendaService {

    private final Logger log = LoggerFactory.getLogger(VendaService.class);

    private final VendaRepository vendaRepository;

    private final VendaMapper vendaMapper;

    public VendaService(VendaRepository vendaRepository, VendaMapper vendaMapper) {
        this.vendaRepository = vendaRepository;
        this.vendaMapper = vendaMapper;
    }

    /**
     * Save a venda.
     *
     * @param vendaDTO the entity to save.
     * @return the persisted entity.
     */
    public VendaDTO save(VendaDTO vendaDTO) {
        log.debug("Request to save Venda : {}", vendaDTO);
        Venda venda = vendaMapper.toEntity(vendaDTO);
        venda = vendaRepository.save(venda);
        return vendaMapper.toDto(venda);
    }

    /**
     * Get all the vendas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<VendaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Vendas");
        return vendaRepository.findAll(pageable)
            .map(vendaMapper::toDto);
    }

    /**
     * Get all the vendas with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<VendaDTO> findAllWithEagerRelationships(Pageable pageable) {
        return vendaRepository.findAllWithEagerRelationships(pageable).map(vendaMapper::toDto);
    }
    

    /**
     * Get one venda by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<VendaDTO> findOne(Long id) {
        log.debug("Request to get Venda : {}", id);
        return vendaRepository.findOneWithEagerRelationships(id)
            .map(vendaMapper::toDto);
    }

    /**
     * Delete the venda by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Venda : {}", id);
        vendaRepository.deleteById(id);
    }
}
