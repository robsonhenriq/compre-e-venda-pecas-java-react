package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.service.CarrinhoService;
import br.com.compreevendapecas.ecommerce.web.rest.errors.BadRequestAlertException;
import br.com.compreevendapecas.ecommerce.service.dto.CarrinhoDTO;

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
 * REST controller for managing {@link br.com.compreevendapecas.ecommerce.domain.Carrinho}.
 */
@RestController
@RequestMapping("/api")
public class CarrinhoResource {

    private final Logger log = LoggerFactory.getLogger(CarrinhoResource.class);

    private static final String ENTITY_NAME = "carrinho";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarrinhoService carrinhoService;

    public CarrinhoResource(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    /**
     * {@code POST  /carrinhos} : Create a new carrinho.
     *
     * @param carrinhoDTO the carrinhoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carrinhoDTO, or with status {@code 400 (Bad Request)} if the carrinho has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/carrinhos")
    public ResponseEntity<CarrinhoDTO> createCarrinho(@RequestBody CarrinhoDTO carrinhoDTO) throws URISyntaxException {
        log.debug("REST request to save Carrinho : {}", carrinhoDTO);
        if (carrinhoDTO.getId() != null) {
            throw new BadRequestAlertException("A new carrinho cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarrinhoDTO result = carrinhoService.save(carrinhoDTO);
        return ResponseEntity.created(new URI("/api/carrinhos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /carrinhos} : Updates an existing carrinho.
     *
     * @param carrinhoDTO the carrinhoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carrinhoDTO,
     * or with status {@code 400 (Bad Request)} if the carrinhoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carrinhoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/carrinhos")
    public ResponseEntity<CarrinhoDTO> updateCarrinho(@RequestBody CarrinhoDTO carrinhoDTO) throws URISyntaxException {
        log.debug("REST request to update Carrinho : {}", carrinhoDTO);
        if (carrinhoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CarrinhoDTO result = carrinhoService.save(carrinhoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carrinhoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /carrinhos} : get all the carrinhos.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carrinhos in body.
     */
    @GetMapping("/carrinhos")
    public ResponseEntity<List<CarrinhoDTO>> getAllCarrinhos(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Carrinhos");
        Page<CarrinhoDTO> page;
        if (eagerload) {
            page = carrinhoService.findAllWithEagerRelationships(pageable);
        } else {
            page = carrinhoService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /carrinhos/:id} : get the "id" carrinho.
     *
     * @param id the id of the carrinhoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carrinhoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/carrinhos/{id}")
    public ResponseEntity<CarrinhoDTO> getCarrinho(@PathVariable Long id) {
        log.debug("REST request to get Carrinho : {}", id);
        Optional<CarrinhoDTO> carrinhoDTO = carrinhoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(carrinhoDTO);
    }

    /**
     * {@code DELETE  /carrinhos/:id} : delete the "id" carrinho.
     *
     * @param id the id of the carrinhoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/carrinhos/{id}")
    public ResponseEntity<Void> deleteCarrinho(@PathVariable Long id) {
        log.debug("REST request to delete Carrinho : {}", id);
        carrinhoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
