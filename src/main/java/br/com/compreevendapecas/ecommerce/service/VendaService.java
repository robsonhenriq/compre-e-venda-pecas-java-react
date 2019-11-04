package br.com.compreevendapecas.ecommerce.service;

import br.com.compreevendapecas.ecommerce.domain.Venda;
import br.com.compreevendapecas.ecommerce.repository.VendaRepository;
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

    public VendaService(VendaRepository vendaRepository) {
        this.vendaRepository = vendaRepository;
    }

    /**
     * Save a venda.
     *
     * @param venda the entity to save.
     * @return the persisted entity.
     */
    public Venda save(Venda venda) {
        log.debug("Request to save Venda : {}", venda);
        return vendaRepository.save(venda);
    }

    /**
     * Get all the vendas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Venda> findAll(Pageable pageable) {
        log.debug("Request to get all Vendas");
        return vendaRepository.findAll(pageable);
    }

    /**
     * Get all the vendas with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Venda> findAllWithEagerRelationships(Pageable pageable) {
        return vendaRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one venda by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Venda> findOne(Long id) {
        log.debug("Request to get Venda : {}", id);
        return vendaRepository.findOneWithEagerRelationships(id);
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
