package br.com.compreevendapecas.ecommerce.service;

import br.com.compreevendapecas.ecommerce.domain.Carrinho;
import br.com.compreevendapecas.ecommerce.repository.CarrinhoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Carrinho}.
 */
@Service
@Transactional
public class CarrinhoService {

    private final Logger log = LoggerFactory.getLogger(CarrinhoService.class);

    private final CarrinhoRepository carrinhoRepository;

    public CarrinhoService(CarrinhoRepository carrinhoRepository) {
        this.carrinhoRepository = carrinhoRepository;
    }

    /**
     * Save a carrinho.
     *
     * @param carrinho the entity to save.
     * @return the persisted entity.
     */
    public Carrinho save(Carrinho carrinho) {
        log.debug("Request to save Carrinho : {}", carrinho);
        return carrinhoRepository.save(carrinho);
    }

    /**
     * Get all the carrinhos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Carrinho> findAll(Pageable pageable) {
        log.debug("Request to get all Carrinhos");
        return carrinhoRepository.findAll(pageable);
    }

    /**
     * Get all the carrinhos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Carrinho> findAllWithEagerRelationships(Pageable pageable) {
        return carrinhoRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one carrinho by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Carrinho> findOne(Long id) {
        log.debug("Request to get Carrinho : {}", id);
        return carrinhoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the carrinho by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Carrinho : {}", id);
        carrinhoRepository.deleteById(id);
    }

    public void deleteItemFromCar(Long id, Long carrinhoId) {
        log.debug("Request to delete Carrinho : {} item {}", carrinhoId, id);
        carrinhoRepository.deleteItemByListItensIdAndId(id, carrinhoId);
    }
}
