package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.domain.Venda;
import br.com.compreevendapecas.ecommerce.service.VendaService;
import br.com.compreevendapecas.ecommerce.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link br.com.compreevendapecas.ecommerce.domain.Venda}.
 */
@RestController
@RequestMapping("/api")
public class VendaResource {

    private final Logger log = LoggerFactory.getLogger(VendaResource.class);

    private static final String ENTITY_NAME = "venda";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VendaService vendaService;

    public VendaResource(VendaService vendaService) {
        this.vendaService = vendaService;
    }

    /**
     * {@code POST  /vendas} : Create a new venda.
     *
     * @param venda the venda to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new venda, or with status {@code 400 (Bad Request)} if the venda has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vendas")
    public ResponseEntity<Venda> createVenda(@RequestBody Venda venda) throws URISyntaxException {
        log.debug("REST request to save Venda : {}", venda);
        if (venda.getId() != null) {
            throw new BadRequestAlertException("A new venda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Venda result = vendaService.save(venda);
        return ResponseEntity.created(new URI("/api/vendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vendas} : Updates an existing venda.
     *
     * @param venda the venda to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated venda,
     * or with status {@code 400 (Bad Request)} if the venda is not valid,
     * or with status {@code 500 (Internal Server Error)} if the venda couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vendas")
    public ResponseEntity<Venda> updateVenda(@RequestBody Venda venda) throws URISyntaxException {
        log.debug("REST request to update Venda : {}", venda);
        if (venda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Venda result = vendaService.save(venda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, venda.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vendas} : get all the vendas.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vendas in body.
     */
    @GetMapping("/vendas")
    public ResponseEntity<List<Venda>> getAllVendas(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Vendas");
        Page<Venda> page;
        if (eagerload) {
            page = vendaService.findAllWithEagerRelationships(pageable);
        } else {
            page = vendaService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /vendas/:id} : get the "id" venda.
     *
     * @param id the id of the venda to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the venda, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vendas/{id}")
    public ResponseEntity<Venda> getVenda(@PathVariable Long id) {
        log.debug("REST request to get Venda : {}", id);
        Optional<Venda> venda = vendaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(venda);
    }

    /**
     * {@code DELETE  /vendas/:id} : delete the "id" venda.
     *
     * @param id the id of the venda to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vendas/{id}")
    public ResponseEntity<Void> deleteVenda(@PathVariable Long id) {
        log.debug("REST request to delete Venda : {}", id);
        vendaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
