package br.com.compreevendapecas.ecommerce.service;

import br.com.compreevendapecas.ecommerce.domain.Avaliacao;
import br.com.compreevendapecas.ecommerce.repository.AvaliacaoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Avaliacao}.
 */
@Service
@Transactional
public class AvaliacaoService {

    private final Logger log = LoggerFactory.getLogger(AvaliacaoService.class);

    private final AvaliacaoRepository avaliacaoRepository;

    public AvaliacaoService(AvaliacaoRepository avaliacaoRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
    }

    /**
     * Save a avaliacao.
     *
     * @param avaliacao the entity to save.
     * @return the persisted entity.
     */
    public Avaliacao save(Avaliacao avaliacao) {
        log.debug("Request to save Avaliacao : {}", avaliacao);
        return avaliacaoRepository.save(avaliacao);
    }

    /**
     * Get all the avaliacaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Avaliacao> findAll(Pageable pageable) {
        log.debug("Request to get all Avaliacaos");
        return avaliacaoRepository.findAll(pageable);
    }

    /**
     * Get all the avaliacaos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Avaliacao> findAllWithEagerRelationships(Pageable pageable) {
        return avaliacaoRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one avaliacao by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Avaliacao> findOne(Long id) {
        log.debug("Request to get Avaliacao : {}", id);
        return avaliacaoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the avaliacao by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Avaliacao : {}", id);
        avaliacaoRepository.deleteById(id);
    }
}
