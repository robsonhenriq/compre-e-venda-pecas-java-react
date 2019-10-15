package br.com.compreevendapecas.ecommerce.service;

import br.com.compreevendapecas.ecommerce.domain.Foto;
import br.com.compreevendapecas.ecommerce.repository.FotoRepository;
import br.com.compreevendapecas.ecommerce.service.dto.FotoDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.FotoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Foto}.
 */
@Service
@Transactional
public class FotoService {

    private final Logger log = LoggerFactory.getLogger(FotoService.class);

    private final FotoRepository fotoRepository;

    private final FotoMapper fotoMapper;

    public FotoService(FotoRepository fotoRepository, FotoMapper fotoMapper) {
        this.fotoRepository = fotoRepository;
        this.fotoMapper = fotoMapper;
    }

    /**
     * Save a foto.
     *
     * @param fotoDTO the entity to save.
     * @return the persisted entity.
     */
    public FotoDTO save(FotoDTO fotoDTO) {
        log.debug("Request to save Foto : {}", fotoDTO);
        Foto foto = fotoMapper.toEntity(fotoDTO);
        foto = fotoRepository.save(foto);
        return fotoMapper.toDto(foto);
    }

    /**
     * Get all the fotos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<FotoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Fotos");
        return fotoRepository.findAll(pageable)
            .map(fotoMapper::toDto);
    }


    /**
     * Get one foto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<FotoDTO> findOne(Long id) {
        log.debug("Request to get Foto : {}", id);
        return fotoRepository.findById(id)
            .map(fotoMapper::toDto);
    }

    /**
     * Delete the foto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Foto : {}", id);
        fotoRepository.deleteById(id);
    }
}
