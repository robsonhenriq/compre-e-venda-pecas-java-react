package br.com.compreevendapecas.ecommerce.service;

import br.com.compreevendapecas.ecommerce.domain.Marca;
import br.com.compreevendapecas.ecommerce.repository.MarcaRepository;
import br.com.compreevendapecas.ecommerce.service.dto.MarcaDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.MarcaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Marca}.
 */
@Service
@Transactional
public class MarcaService {

    private final Logger log = LoggerFactory.getLogger(MarcaService.class);

    private final MarcaRepository marcaRepository;

    private final MarcaMapper marcaMapper;

    public MarcaService(MarcaRepository marcaRepository, MarcaMapper marcaMapper) {
        this.marcaRepository = marcaRepository;
        this.marcaMapper = marcaMapper;
    }

    /**
     * Save a marca.
     *
     * @param marcaDTO the entity to save.
     * @return the persisted entity.
     */
    public MarcaDTO save(MarcaDTO marcaDTO) {
        log.debug("Request to save Marca : {}", marcaDTO);
        Marca marca = marcaMapper.toEntity(marcaDTO);
        marca = marcaRepository.save(marca);
        return marcaMapper.toDto(marca);
    }

    /**
     * Get all the marcas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<MarcaDTO> findAll() {
        log.debug("Request to get all Marcas");
        return marcaRepository.findAll().stream()
            .map(marcaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one marca by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MarcaDTO> findOne(Long id) {
        log.debug("Request to get Marca : {}", id);
        return marcaRepository.findById(id)
            .map(marcaMapper::toDto);
    }

    /**
     * Delete the marca by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Marca : {}", id);
        marcaRepository.deleteById(id);
    }
}
