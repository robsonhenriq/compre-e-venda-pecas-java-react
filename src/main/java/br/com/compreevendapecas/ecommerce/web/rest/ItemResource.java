package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.domain.Carrinho;
import br.com.compreevendapecas.ecommerce.domain.Cliente;
import br.com.compreevendapecas.ecommerce.domain.Item;
import br.com.compreevendapecas.ecommerce.domain.User;
import br.com.compreevendapecas.ecommerce.security.SecurityUtils;
import br.com.compreevendapecas.ecommerce.service.CarrinhoService;
import br.com.compreevendapecas.ecommerce.service.ClienteService;
import br.com.compreevendapecas.ecommerce.service.ItemService;
import br.com.compreevendapecas.ecommerce.service.UserService;
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
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing
 * {@link br.com.compreevendapecas.ecommerce.domain.Item}.
 */
@RestController
@RequestMapping("/api")
public class ItemResource {

    private final Logger log = LoggerFactory.getLogger(ItemResource.class);

    private static final String ENTITY_NAME = "item";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemService itemService;
    private final CarrinhoService carrinhoService;
    private final UserService userService;
    private final ClienteService clienteService;

    public ItemResource(ItemService itemService, CarrinhoService carrinhoService, UserService userService,
            ClienteService clienteService) {
        this.itemService = itemService;
        this.carrinhoService = carrinhoService;
        this.userService = userService;
        this.clienteService = clienteService;
    }

    /**
     * {@code POST  /items} : Create a new item.
     *
     * @param item the item to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new item, or with status {@code 400 (Bad Request)} if the
     *         item has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/items")
    public ResponseEntity<Item> createItem(@Valid @RequestBody Item item) throws URISyntaxException {
        log.debug("REST request to save Item : {}", item);
        Optional<String> opUserLogin = SecurityUtils.getCurrentUserLogin();
        User usuario = userService.getUserWithAuthoritiesByLogin(opUserLogin.get()).get();
        Cliente cliente = clienteService.findOneByUserId(usuario.getId()).get();

        log.debug("LOGIN USUARIO LOGADO : {} ", opUserLogin);

        Carrinho newCarrinho;
        // Se o cliente não tem nenhum carrinho, eu crio para ele
        if (cliente.getCarrinho() == null) {
            newCarrinho = carrinhoService.save(new Carrinho(BigDecimal.ZERO));
            item.setCarrinho(newCarrinho);
        } else {
            item.setCarrinho(cliente.getCarrinho());
        }

        if (item.getId() != null) {
            throw new BadRequestAlertException("A new item cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Item result = itemService.save(item);
        return ResponseEntity
                .created(new URI("/api/items/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /items} : Updates an existing item.
     *
     * @param item the item to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated item, or with status {@code 400 (Bad Request)} if the
     *         item is not valid, or with status {@code 500 (Internal Server Error)}
     *         if the item couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/items")
    public ResponseEntity<Item> updateItem(@Valid @RequestBody Item item) throws URISyntaxException {
        log.debug("REST request to update Item : {}", item);
        if (item.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Item result = itemService.save(item);
        return ResponseEntity.ok()
                .headers(
                        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, item.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /items} : get all the items.
     *
     * @param pageable    the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder  a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of items in body.
     */
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems(Pageable pageable,
            @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Items");
        Page<Item> page = itemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /items/:id} : get the "id" item.
     *
     * @param id the id of the item to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the item, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        log.debug("REST request to get Item : {}", id);
        Optional<Item> item = itemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(item);
    }

    /**
     * {@code GET  /items/carrinhoID/:id} : get the "id" item.
     *
     * @param id the id of the item to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the item, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/items/carrinhoId/{id}")
    public ResponseEntity<List<Item>> getItensByCarrinhoId(@PathVariable Long id) {
        log.debug("REST request to get Item By Carrinho Id : {}", id);
        List<Item> itens = itemService.findItensByCarrinhoId(id);
        return ResponseEntity.ok().body(itens);
    }

    /**
     * {@code DELETE  /items/:id} : delete the "id" item.
     *
     * @param id the id of the item to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        log.debug("REST request to delete Item : {}", id);
        itemService.delete(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

}
