package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.service.AvaliacaoService;
import br.com.compreevendapecas.ecommerce.web.rest.errors.BadRequestAlertException;
import br.com.compreevendapecas.ecommerce.service.dto.AvaliacaoDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.compreevendapecas.ecommerce.domain.Avaliacao}.
 */
@RestController
@RequestMapping("/api")
public class AvaliacaoResource {

    private final Logger log = LoggerFactory.getLogger(AvaliacaoResource.class);

    private static final String ENTITY_NAME = "avaliacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AvaliacaoService avaliacaoService;

    public AvaliacaoResource(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    /**
     * {@code POST  /avaliacaos} : Create a new avaliacao.
     *
     * @param avaliacaoDTO the avaliacaoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new avaliacaoDTO, or with status {@code 400 (Bad Request)} if the avaliacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/avaliacaos")
    public ResponseEntity<AvaliacaoDTO> createAvaliacao(@RequestBody AvaliacaoDTO avaliacaoDTO) throws URISyntaxException {
        log.debug("REST request to save Avaliacao : {}", avaliacaoDTO);
        if (avaliacaoDTO.getId() != null) {
            throw new BadRequestAlertException("A new avaliacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AvaliacaoDTO result = avaliacaoService.save(avaliacaoDTO);
        return ResponseEntity.created(new URI("/api/avaliacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /avaliacaos} : Updates an existing avaliacao.
     *
     * @param avaliacaoDTO the avaliacaoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated avaliacaoDTO,
     * or with status {@code 400 (Bad Request)} if the avaliacaoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the avaliacaoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/avaliacaos")
    public ResponseEntity<AvaliacaoDTO> updateAvaliacao(@RequestBody AvaliacaoDTO avaliacaoDTO) throws URISyntaxException {
        log.debug("REST request to update Avaliacao : {}", avaliacaoDTO);
        if (avaliacaoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AvaliacaoDTO result = avaliacaoService.save(avaliacaoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, avaliacaoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /avaliacaos} : get all the avaliacaos.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of avaliacaos in body.
     */
    @GetMapping("/avaliacaos")
    public ResponseEntity<List<AvaliacaoDTO>> getAllAvaliacaos(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Avaliacaos");
        Page<AvaliacaoDTO> page;
        if (eagerload) {
            page = avaliacaoService.findAllWithEagerRelationships(pageable);
        } else {
            page = avaliacaoService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /avaliacaos/:id} : get the "id" avaliacao.
     *
     * @param id the id of the avaliacaoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the avaliacaoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/avaliacaos/{id}")
    public ResponseEntity<AvaliacaoDTO> getAvaliacao(@PathVariable Long id) {
        log.debug("REST request to get Avaliacao : {}", id);
        Optional<AvaliacaoDTO> avaliacaoDTO = avaliacaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(avaliacaoDTO);
    }

    /**
     * {@code DELETE  /avaliacaos/:id} : delete the "id" avaliacao.
     *
     * @param id the id of the avaliacaoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/avaliacaos/{id}")
    public ResponseEntity<Void> deleteAvaliacao(@PathVariable Long id) {
        log.debug("REST request to delete Avaliacao : {}", id);
        avaliacaoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
