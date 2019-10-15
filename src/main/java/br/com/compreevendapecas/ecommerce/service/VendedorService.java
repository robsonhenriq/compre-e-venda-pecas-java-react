package br.com.compreevendapecas.ecommerce.service;

import br.com.compreevendapecas.ecommerce.domain.Vendedor;
import br.com.compreevendapecas.ecommerce.repository.VendedorRepository;
import br.com.compreevendapecas.ecommerce.service.dto.VendedorDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.VendedorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Vendedor}.
 */
@Service
@Transactional
public class VendedorService {

    private final Logger log = LoggerFactory.getLogger(VendedorService.class);

    private final VendedorRepository vendedorRepository;

    private final VendedorMapper vendedorMapper;

    public VendedorService(VendedorRepository vendedorRepository, VendedorMapper vendedorMapper) {
        this.vendedorRepository = vendedorRepository;
        this.vendedorMapper = vendedorMapper;
    }

    /**
     * Save a vendedor.
     *
     * @param vendedorDTO the entity to save.
     * @return the persisted entity.
     */
    public VendedorDTO save(VendedorDTO vendedorDTO) {
        log.debug("Request to save Vendedor : {}", vendedorDTO);
        Vendedor vendedor = vendedorMapper.toEntity(vendedorDTO);
        vendedor = vendedorRepository.save(vendedor);
        return vendedorMapper.toDto(vendedor);
    }

    /**
     * Get all the vendedors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<VendedorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Vendedors");
        return vendedorRepository.findAll(pageable)
            .map(vendedorMapper::toDto);
    }

    /**
     * Get all the vendedors with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<VendedorDTO> findAllWithEagerRelationships(Pageable pageable) {
        return vendedorRepository.findAllWithEagerRelationships(pageable).map(vendedorMapper::toDto);
    }
    

    /**
     * Get one vendedor by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<VendedorDTO> findOne(Long id) {
        log.debug("Request to get Vendedor : {}", id);
        return vendedorRepository.findOneWithEagerRelationships(id)
            .map(vendedorMapper::toDto);
    }

    /**
     * Delete the vendedor by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Vendedor : {}", id);
        vendedorRepository.deleteById(id);
    }
}
