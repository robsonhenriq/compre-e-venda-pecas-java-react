package br.com.compreevendapecas.ecommerce.service;

import br.com.compreevendapecas.ecommerce.domain.Carrinho;
import br.com.compreevendapecas.ecommerce.repository.CarrinhoRepository;
import br.com.compreevendapecas.ecommerce.service.dto.CarrinhoDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.CarrinhoMapper;
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

    private final CarrinhoMapper carrinhoMapper;

    public CarrinhoService(CarrinhoRepository carrinhoRepository, CarrinhoMapper carrinhoMapper) {
        this.carrinhoRepository = carrinhoRepository;
        this.carrinhoMapper = carrinhoMapper;
    }

    /**
     * Save a carrinho.
     *
     * @param carrinhoDTO the entity to save.
     * @return the persisted entity.
     */
    public CarrinhoDTO save(CarrinhoDTO carrinhoDTO) {
        log.debug("Request to save Carrinho : {}", carrinhoDTO);
        Carrinho carrinho = carrinhoMapper.toEntity(carrinhoDTO);
        carrinho = carrinhoRepository.save(carrinho);
        return carrinhoMapper.toDto(carrinho);
    }

    /**
     * Get all the carrinhos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<CarrinhoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Carrinhos");
        return carrinhoRepository.findAll(pageable)
            .map(carrinhoMapper::toDto);
    }

    /**
     * Get all the carrinhos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<CarrinhoDTO> findAllWithEagerRelationships(Pageable pageable) {
        return carrinhoRepository.findAllWithEagerRelationships(pageable).map(carrinhoMapper::toDto);
    }
    

    /**
     * Get one carrinho by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CarrinhoDTO> findOne(Long id) {
        log.debug("Request to get Carrinho : {}", id);
        return carrinhoRepository.findOneWithEagerRelationships(id)
            .map(carrinhoMapper::toDto);
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
}
