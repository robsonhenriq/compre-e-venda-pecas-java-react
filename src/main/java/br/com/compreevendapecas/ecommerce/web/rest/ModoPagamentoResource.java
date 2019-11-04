package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.domain.ModoPagamento;
import br.com.compreevendapecas.ecommerce.service.ModoPagamentoService;
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
 * REST controller for managing {@link br.com.compreevendapecas.ecommerce.domain.ModoPagamento}.
 */
@RestController
@RequestMapping("/api")
public class ModoPagamentoResource {

    private final Logger log = LoggerFactory.getLogger(ModoPagamentoResource.class);

    private static final String ENTITY_NAME = "modoPagamento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ModoPagamentoService modoPagamentoService;

    public ModoPagamentoResource(ModoPagamentoService modoPagamentoService) {
        this.modoPagamentoService = modoPagamentoService;
    }

    /**
     * {@code POST  /modo-pagamentos} : Create a new modoPagamento.
     *
     * @param modoPagamento the modoPagamento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new modoPagamento, or with status {@code 400 (Bad Request)} if the modoPagamento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/modo-pagamentos")
    public ResponseEntity<ModoPagamento> createModoPagamento(@Valid @RequestBody ModoPagamento modoPagamento) throws URISyntaxException {
        log.debug("REST request to save ModoPagamento : {}", modoPagamento);
        if (modoPagamento.getId() != null) {
            throw new BadRequestAlertException("A new modoPagamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ModoPagamento result = modoPagamentoService.save(modoPagamento);
        return ResponseEntity.created(new URI("/api/modo-pagamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /modo-pagamentos} : Updates an existing modoPagamento.
     *
     * @param modoPagamento the modoPagamento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated modoPagamento,
     * or with status {@code 400 (Bad Request)} if the modoPagamento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the modoPagamento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/modo-pagamentos")
    public ResponseEntity<ModoPagamento> updateModoPagamento(@Valid @RequestBody ModoPagamento modoPagamento) throws URISyntaxException {
        log.debug("REST request to update ModoPagamento : {}", modoPagamento);
        if (modoPagamento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ModoPagamento result = modoPagamentoService.save(modoPagamento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, modoPagamento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /modo-pagamentos} : get all the modoPagamentos.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of modoPagamentos in body.
     */
    @GetMapping("/modo-pagamentos")
    public ResponseEntity<List<ModoPagamento>> getAllModoPagamentos(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of ModoPagamentos");
        Page<ModoPagamento> page = modoPagamentoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /modo-pagamentos/:id} : get the "id" modoPagamento.
     *
     * @param id the id of the modoPagamento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the modoPagamento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/modo-pagamentos/{id}")
    public ResponseEntity<ModoPagamento> getModoPagamento(@PathVariable Long id) {
        log.debug("REST request to get ModoPagamento : {}", id);
        Optional<ModoPagamento> modoPagamento = modoPagamentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(modoPagamento);
    }

    /**
     * {@code DELETE  /modo-pagamentos/:id} : delete the "id" modoPagamento.
     *
     * @param id the id of the modoPagamento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/modo-pagamentos/{id}")
    public ResponseEntity<Void> deleteModoPagamento(@PathVariable Long id) {
        log.debug("REST request to delete ModoPagamento : {}", id);
        modoPagamentoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
