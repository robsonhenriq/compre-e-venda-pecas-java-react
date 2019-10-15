package br.com.compreevendapecas.ecommerce.service;

import br.com.compreevendapecas.ecommerce.domain.ModoPagamento;
import br.com.compreevendapecas.ecommerce.repository.ModoPagamentoRepository;
import br.com.compreevendapecas.ecommerce.service.dto.ModoPagamentoDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.ModoPagamentoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ModoPagamento}.
 */
@Service
@Transactional
public class ModoPagamentoService {

    private final Logger log = LoggerFactory.getLogger(ModoPagamentoService.class);

    private final ModoPagamentoRepository modoPagamentoRepository;

    private final ModoPagamentoMapper modoPagamentoMapper;

    public ModoPagamentoService(ModoPagamentoRepository modoPagamentoRepository, ModoPagamentoMapper modoPagamentoMapper) {
        this.modoPagamentoRepository = modoPagamentoRepository;
        this.modoPagamentoMapper = modoPagamentoMapper;
    }

    /**
     * Save a modoPagamento.
     *
     * @param modoPagamentoDTO the entity to save.
     * @return the persisted entity.
     */
    public ModoPagamentoDTO save(ModoPagamentoDTO modoPagamentoDTO) {
        log.debug("Request to save ModoPagamento : {}", modoPagamentoDTO);
        ModoPagamento modoPagamento = modoPagamentoMapper.toEntity(modoPagamentoDTO);
        modoPagamento = modoPagamentoRepository.save(modoPagamento);
        return modoPagamentoMapper.toDto(modoPagamento);
    }

    /**
     * Get all the modoPagamentos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ModoPagamentoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ModoPagamentos");
        return modoPagamentoRepository.findAll(pageable)
            .map(modoPagamentoMapper::toDto);
    }


    /**
     * Get one modoPagamento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ModoPagamentoDTO> findOne(Long id) {
        log.debug("Request to get ModoPagamento : {}", id);
        return modoPagamentoRepository.findById(id)
            .map(modoPagamentoMapper::toDto);
    }

    /**
     * Delete the modoPagamento by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ModoPagamento : {}", id);
        modoPagamentoRepository.deleteById(id);
    }
}
