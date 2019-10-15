package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.service.VendedorService;
import br.com.compreevendapecas.ecommerce.web.rest.errors.BadRequestAlertException;
import br.com.compreevendapecas.ecommerce.service.dto.VendedorDTO;

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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.compreevendapecas.ecommerce.domain.Vendedor}.
 */
@RestController
@RequestMapping("/api")
public class VendedorResource {

    private final Logger log = LoggerFactory.getLogger(VendedorResource.class);

    private static final String ENTITY_NAME = "vendedor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VendedorService vendedorService;

    public VendedorResource(VendedorService vendedorService) {
        this.vendedorService = vendedorService;
    }

    /**
     * {@code POST  /vendedors} : Create a new vendedor.
     *
     * @param vendedorDTO the vendedorDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vendedorDTO, or with status {@code 400 (Bad Request)} if the vendedor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vendedors")
    public ResponseEntity<VendedorDTO> createVendedor(@Valid @RequestBody VendedorDTO vendedorDTO) throws URISyntaxException {
        log.debug("REST request to save Vendedor : {}", vendedorDTO);
        if (vendedorDTO.getId() != null) {
            throw new BadRequestAlertException("A new vendedor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VendedorDTO result = vendedorService.save(vendedorDTO);
        return ResponseEntity.created(new URI("/api/vendedors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vendedors} : Updates an existing vendedor.
     *
     * @param vendedorDTO the vendedorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vendedorDTO,
     * or with status {@code 400 (Bad Request)} if the vendedorDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vendedorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vendedors")
    public ResponseEntity<VendedorDTO> updateVendedor(@Valid @RequestBody VendedorDTO vendedorDTO) throws URISyntaxException {
        log.debug("REST request to update Vendedor : {}", vendedorDTO);
        if (vendedorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VendedorDTO result = vendedorService.save(vendedorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vendedorDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vendedors} : get all the vendedors.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vendedors in body.
     */
    @GetMapping("/vendedors")
    public ResponseEntity<List<VendedorDTO>> getAllVendedors(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Vendedors");
        Page<VendedorDTO> page;
        if (eagerload) {
            page = vendedorService.findAllWithEagerRelationships(pageable);
        } else {
            page = vendedorService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /vendedors/:id} : get the "id" vendedor.
     *
     * @param id the id of the vendedorDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vendedorDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vendedors/{id}")
    public ResponseEntity<VendedorDTO> getVendedor(@PathVariable Long id) {
        log.debug("REST request to get Vendedor : {}", id);
        Optional<VendedorDTO> vendedorDTO = vendedorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(vendedorDTO);
    }

    /**
     * {@code DELETE  /vendedors/:id} : delete the "id" vendedor.
     *
     * @param id the id of the vendedorDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vendedors/{id}")
    public ResponseEntity<Void> deleteVendedor(@PathVariable Long id) {
        log.debug("REST request to delete Vendedor : {}", id);
        vendedorService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
