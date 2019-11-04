package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.domain.Veiculo;
import br.com.compreevendapecas.ecommerce.service.VeiculoService;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.compreevendapecas.ecommerce.domain.Veiculo}.
 */
@RestController
@RequestMapping("/api")
public class VeiculoResource {

    private final Logger log = LoggerFactory.getLogger(VeiculoResource.class);

    private static final String ENTITY_NAME = "veiculo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VeiculoService veiculoService;

    public VeiculoResource(VeiculoService veiculoService) {
        this.veiculoService = veiculoService;
    }

    /**
     * {@code POST  /veiculos} : Create a new veiculo.
     *
     * @param veiculo the veiculo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new veiculo, or with status {@code 400 (Bad Request)} if the veiculo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/veiculos")
    public ResponseEntity<Veiculo> createVeiculo(@Valid @RequestBody Veiculo veiculo) throws URISyntaxException {
        log.debug("REST request to save Veiculo : {}", veiculo);
        if (veiculo.getId() != null) {
            throw new BadRequestAlertException("A new veiculo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Veiculo result = veiculoService.save(veiculo);
        return ResponseEntity.created(new URI("/api/veiculos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /veiculos} : Updates an existing veiculo.
     *
     * @param veiculo the veiculo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated veiculo,
     * or with status {@code 400 (Bad Request)} if the veiculo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the veiculo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/veiculos")
    public ResponseEntity<Veiculo> updateVeiculo(@Valid @RequestBody Veiculo veiculo) throws URISyntaxException {
        log.debug("REST request to update Veiculo : {}", veiculo);
        if (veiculo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Veiculo result = veiculoService.save(veiculo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, veiculo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /veiculos} : get all the veiculos.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of veiculos in body.
     */
    @GetMapping("/veiculos")
    public ResponseEntity<List<Veiculo>> getAllVeiculos(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Veiculos");
        Page<Veiculo> page = veiculoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /veiculos/:id} : get the "id" veiculo.
     *
     * @param id the id of the veiculo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the veiculo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/veiculos/{id}")
    public ResponseEntity<Veiculo> getVeiculo(@PathVariable Long id) {
        log.debug("REST request to get Veiculo : {}", id);
        Optional<Veiculo> veiculo = veiculoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(veiculo);
    }

    /**
     * {@code DELETE  /veiculos/:id} : delete the "id" veiculo.
     *
     * @param id the id of the veiculo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/veiculos/{id}")
    public ResponseEntity<Void> deleteVeiculo(@PathVariable Long id) {
        log.debug("REST request to delete Veiculo : {}", id);
        veiculoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
