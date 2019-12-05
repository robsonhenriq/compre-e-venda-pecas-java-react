package br.com.compreevendapecas.ecommerce.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.compreevendapecas.ecommerce.domain.Carrinho;
import br.com.compreevendapecas.ecommerce.domain.Cliente;
import br.com.compreevendapecas.ecommerce.domain.Item;
import br.com.compreevendapecas.ecommerce.domain.User;
import br.com.compreevendapecas.ecommerce.repository.ItemRepository;
import br.com.compreevendapecas.ecommerce.security.SecurityUtils;

/**
 * Service Implementation for managing {@link Item}.
 */
@Service
@Transactional
public class ItemService {

    private final Logger log = LoggerFactory.getLogger(ItemService.class);

    private final ItemRepository itemRepository;

    private final CarrinhoService carrinhoService;
    private final UserService userService;
    private final ClienteService clienteService;

    public ItemService(ItemRepository itemRepository, CarrinhoService carrinhoService, UserService userService,
            ClienteService clienteService) {
        this.itemRepository = itemRepository;
        this.carrinhoService = carrinhoService;
        this.userService = userService;
        this.clienteService = clienteService;
    }

    /**
     * Save a item.
     *
     * @param item the entity to save.
     * @return the persisted entity.
     */
    public Item save(Item item) {
        log.debug("Request to save Item : {}", item);

        Optional<String> opUserLogin = SecurityUtils.getCurrentUserLogin();
        User usuario = userService.getUserWithAuthoritiesByLogin(opUserLogin.get()).get();
        Cliente cliente = clienteService.findOneByUserId(usuario.getId()).get();

        log.debug("LOGIN USUARIO LOGADO : {} ", opUserLogin);

        Carrinho newCarrinho;
        // Se o cliente não tem nenhum carrinho, eu crio para ele
        if (cliente.getCarrinho() == null) {
            newCarrinho = carrinhoService.save(new Carrinho(BigDecimal.ZERO));
            item.setCarrinho(newCarrinho);
            cliente.setCarrinho(newCarrinho);
            clienteService.save(cliente);
        } else {
            item.setCarrinho(cliente.getCarrinho());
        }

        return itemRepository.save(item);
    }

    /**
     * Get all the items.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Item> findAll(Pageable pageable) {
        log.debug("Request to get all Items");
        return itemRepository.findAll(pageable);
    }

    /**
     * Get one item by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Item> findOne(Long id) {
        log.debug("Request to get Item : {}", id);
        return itemRepository.findById(id);
    }

    /**
     * Get all itens from a carrinho.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public List<Item> findItensByCarrinhoId(Long id) {
        log.debug("Request to get Itens by Carrinho ID: {}", id);
        return itemRepository.findItemByCarrinhoId(id);
    }

    /**
     * Delete the item by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Item : {}", id);
        itemRepository.deleteById(id);
    }
}
