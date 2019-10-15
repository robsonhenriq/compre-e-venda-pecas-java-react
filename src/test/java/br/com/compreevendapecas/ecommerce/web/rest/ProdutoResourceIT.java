package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.EcommerceApp;
import br.com.compreevendapecas.ecommerce.domain.Produto;
import br.com.compreevendapecas.ecommerce.repository.ProdutoRepository;
import br.com.compreevendapecas.ecommerce.service.ProdutoService;
import br.com.compreevendapecas.ecommerce.service.dto.ProdutoDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.ProdutoMapper;
import br.com.compreevendapecas.ecommerce.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static br.com.compreevendapecas.ecommerce.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.compreevendapecas.ecommerce.domain.enumeration.Categoria;
/**
 * Integration tests for the {@Link ProdutoResource} REST controller.
 */
@SpringBootTest(classes = EcommerceApp.class)
public class ProdutoResourceIT {

    private static final String DEFAULT_CODIGO_ORIGINAL = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_ORIGINAL = "BBBBBBBBBB";

    private static final String DEFAULT_FABRICANTE = "AAAAAAAAAA";
    private static final String UPDATED_FABRICANTE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_EH_USADO = false;
    private static final Boolean UPDATED_EH_USADO = true;

    private static final Integer DEFAULT_QUANTIDADE_DISPONIVEL = 1;
    private static final Integer UPDATED_QUANTIDADE_DISPONIVEL = 2;

    private static final Double DEFAULT_ALTURA = 1D;
    private static final Double UPDATED_ALTURA = 2D;

    private static final Double DEFAULT_LARGURA = 1D;
    private static final Double UPDATED_LARGURA = 2D;

    private static final Double DEFAULT_PESO_BRUTO = 1D;
    private static final Double UPDATED_PESO_BRUTO = 2D;

    private static final BigDecimal DEFAULT_PRECO_A_VISTA = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRECO_A_VISTA = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PRECO_A_PRAZO = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRECO_A_PRAZO = new BigDecimal(2);

    private static final Categoria DEFAULT_CATEGORIA = Categoria.CARROCERIA;
    private static final Categoria UPDATED_CATEGORIA = Categoria.ACESSORIOS;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Mock
    private ProdutoRepository produtoRepositoryMock;

    @Autowired
    private ProdutoMapper produtoMapper;

    @Mock
    private ProdutoService produtoServiceMock;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restProdutoMockMvc;

    private Produto produto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProdutoResource produtoResource = new ProdutoResource(produtoService);
        this.restProdutoMockMvc = MockMvcBuilders.standaloneSetup(produtoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Produto createEntity(EntityManager em) {
        Produto produto = new Produto()
            .codigoOriginal(DEFAULT_CODIGO_ORIGINAL)
            .fabricante(DEFAULT_FABRICANTE)
            .descricao(DEFAULT_DESCRICAO)
            .ehUsado(DEFAULT_EH_USADO)
            .quantidadeDisponivel(DEFAULT_QUANTIDADE_DISPONIVEL)
            .altura(DEFAULT_ALTURA)
            .largura(DEFAULT_LARGURA)
            .pesoBruto(DEFAULT_PESO_BRUTO)
            .precoAVista(DEFAULT_PRECO_A_VISTA)
            .precoAPrazo(DEFAULT_PRECO_A_PRAZO)
            .categoria(DEFAULT_CATEGORIA);
        return produto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Produto createUpdatedEntity(EntityManager em) {
        Produto produto = new Produto()
            .codigoOriginal(UPDATED_CODIGO_ORIGINAL)
            .fabricante(UPDATED_FABRICANTE)
            .descricao(UPDATED_DESCRICAO)
            .ehUsado(UPDATED_EH_USADO)
            .quantidadeDisponivel(UPDATED_QUANTIDADE_DISPONIVEL)
            .altura(UPDATED_ALTURA)
            .largura(UPDATED_LARGURA)
            .pesoBruto(UPDATED_PESO_BRUTO)
            .precoAVista(UPDATED_PRECO_A_VISTA)
            .precoAPrazo(UPDATED_PRECO_A_PRAZO)
            .categoria(UPDATED_CATEGORIA);
        return produto;
    }

    @BeforeEach
    public void initTest() {
        produto = createEntity(em);
    }

    @Test
    @Transactional
    public void createProduto() throws Exception {
        int databaseSizeBeforeCreate = produtoRepository.findAll().size();

        // Create the Produto
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);
        restProdutoMockMvc.perform(post("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isCreated());

        // Validate the Produto in the database
        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeCreate + 1);
        Produto testProduto = produtoList.get(produtoList.size() - 1);
        assertThat(testProduto.getCodigoOriginal()).isEqualTo(DEFAULT_CODIGO_ORIGINAL);
        assertThat(testProduto.getFabricante()).isEqualTo(DEFAULT_FABRICANTE);
        assertThat(testProduto.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testProduto.isEhUsado()).isEqualTo(DEFAULT_EH_USADO);
        assertThat(testProduto.getQuantidadeDisponivel()).isEqualTo(DEFAULT_QUANTIDADE_DISPONIVEL);
        assertThat(testProduto.getAltura()).isEqualTo(DEFAULT_ALTURA);
        assertThat(testProduto.getLargura()).isEqualTo(DEFAULT_LARGURA);
        assertThat(testProduto.getPesoBruto()).isEqualTo(DEFAULT_PESO_BRUTO);
        assertThat(testProduto.getPrecoAVista()).isEqualTo(DEFAULT_PRECO_A_VISTA);
        assertThat(testProduto.getPrecoAPrazo()).isEqualTo(DEFAULT_PRECO_A_PRAZO);
        assertThat(testProduto.getCategoria()).isEqualTo(DEFAULT_CATEGORIA);
    }

    @Test
    @Transactional
    public void createProdutoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produtoRepository.findAll().size();

        // Create the Produto with an existing ID
        produto.setId(1L);
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdutoMockMvc.perform(post("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Produto in the database
        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = produtoRepository.findAll().size();
        // set the field null
        produto.setDescricao(null);

        // Create the Produto, which fails.
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);

        restProdutoMockMvc.perform(post("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isBadRequest());

        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEhUsadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = produtoRepository.findAll().size();
        // set the field null
        produto.setEhUsado(null);

        // Create the Produto, which fails.
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);

        restProdutoMockMvc.perform(post("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isBadRequest());

        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantidadeDisponivelIsRequired() throws Exception {
        int databaseSizeBeforeTest = produtoRepository.findAll().size();
        // set the field null
        produto.setQuantidadeDisponivel(null);

        // Create the Produto, which fails.
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);

        restProdutoMockMvc.perform(post("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isBadRequest());

        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAlturaIsRequired() throws Exception {
        int databaseSizeBeforeTest = produtoRepository.findAll().size();
        // set the field null
        produto.setAltura(null);

        // Create the Produto, which fails.
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);

        restProdutoMockMvc.perform(post("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isBadRequest());

        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLarguraIsRequired() throws Exception {
        int databaseSizeBeforeTest = produtoRepository.findAll().size();
        // set the field null
        produto.setLargura(null);

        // Create the Produto, which fails.
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);

        restProdutoMockMvc.perform(post("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isBadRequest());

        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPesoBrutoIsRequired() throws Exception {
        int databaseSizeBeforeTest = produtoRepository.findAll().size();
        // set the field null
        produto.setPesoBruto(null);

        // Create the Produto, which fails.
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);

        restProdutoMockMvc.perform(post("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isBadRequest());

        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrecoAVistaIsRequired() throws Exception {
        int databaseSizeBeforeTest = produtoRepository.findAll().size();
        // set the field null
        produto.setPrecoAVista(null);

        // Create the Produto, which fails.
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);

        restProdutoMockMvc.perform(post("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isBadRequest());

        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrecoAPrazoIsRequired() throws Exception {
        int databaseSizeBeforeTest = produtoRepository.findAll().size();
        // set the field null
        produto.setPrecoAPrazo(null);

        // Create the Produto, which fails.
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);

        restProdutoMockMvc.perform(post("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isBadRequest());

        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProdutos() throws Exception {
        // Initialize the database
        produtoRepository.saveAndFlush(produto);

        // Get all the produtoList
        restProdutoMockMvc.perform(get("/api/produtos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produto.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoOriginal").value(hasItem(DEFAULT_CODIGO_ORIGINAL.toString())))
            .andExpect(jsonPath("$.[*].fabricante").value(hasItem(DEFAULT_FABRICANTE.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].ehUsado").value(hasItem(DEFAULT_EH_USADO.booleanValue())))
            .andExpect(jsonPath("$.[*].quantidadeDisponivel").value(hasItem(DEFAULT_QUANTIDADE_DISPONIVEL)))
            .andExpect(jsonPath("$.[*].altura").value(hasItem(DEFAULT_ALTURA.doubleValue())))
            .andExpect(jsonPath("$.[*].largura").value(hasItem(DEFAULT_LARGURA.doubleValue())))
            .andExpect(jsonPath("$.[*].pesoBruto").value(hasItem(DEFAULT_PESO_BRUTO.doubleValue())))
            .andExpect(jsonPath("$.[*].precoAVista").value(hasItem(DEFAULT_PRECO_A_VISTA.intValue())))
            .andExpect(jsonPath("$.[*].precoAPrazo").value(hasItem(DEFAULT_PRECO_A_PRAZO.intValue())))
            .andExpect(jsonPath("$.[*].categoria").value(hasItem(DEFAULT_CATEGORIA.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllProdutosWithEagerRelationshipsIsEnabled() throws Exception {
        ProdutoResource produtoResource = new ProdutoResource(produtoServiceMock);
        when(produtoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restProdutoMockMvc = MockMvcBuilders.standaloneSetup(produtoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProdutoMockMvc.perform(get("/api/produtos?eagerload=true"))
        .andExpect(status().isOk());

        verify(produtoServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllProdutosWithEagerRelationshipsIsNotEnabled() throws Exception {
        ProdutoResource produtoResource = new ProdutoResource(produtoServiceMock);
            when(produtoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restProdutoMockMvc = MockMvcBuilders.standaloneSetup(produtoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProdutoMockMvc.perform(get("/api/produtos?eagerload=true"))
        .andExpect(status().isOk());

            verify(produtoServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getProduto() throws Exception {
        // Initialize the database
        produtoRepository.saveAndFlush(produto);

        // Get the produto
        restProdutoMockMvc.perform(get("/api/produtos/{id}", produto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(produto.getId().intValue()))
            .andExpect(jsonPath("$.codigoOriginal").value(DEFAULT_CODIGO_ORIGINAL.toString()))
            .andExpect(jsonPath("$.fabricante").value(DEFAULT_FABRICANTE.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.ehUsado").value(DEFAULT_EH_USADO.booleanValue()))
            .andExpect(jsonPath("$.quantidadeDisponivel").value(DEFAULT_QUANTIDADE_DISPONIVEL))
            .andExpect(jsonPath("$.altura").value(DEFAULT_ALTURA.doubleValue()))
            .andExpect(jsonPath("$.largura").value(DEFAULT_LARGURA.doubleValue()))
            .andExpect(jsonPath("$.pesoBruto").value(DEFAULT_PESO_BRUTO.doubleValue()))
            .andExpect(jsonPath("$.precoAVista").value(DEFAULT_PRECO_A_VISTA.intValue()))
            .andExpect(jsonPath("$.precoAPrazo").value(DEFAULT_PRECO_A_PRAZO.intValue()))
            .andExpect(jsonPath("$.categoria").value(DEFAULT_CATEGORIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProduto() throws Exception {
        // Get the produto
        restProdutoMockMvc.perform(get("/api/produtos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProduto() throws Exception {
        // Initialize the database
        produtoRepository.saveAndFlush(produto);

        int databaseSizeBeforeUpdate = produtoRepository.findAll().size();

        // Update the produto
        Produto updatedProduto = produtoRepository.findById(produto.getId()).get();
        // Disconnect from session so that the updates on updatedProduto are not directly saved in db
        em.detach(updatedProduto);
        updatedProduto
            .codigoOriginal(UPDATED_CODIGO_ORIGINAL)
            .fabricante(UPDATED_FABRICANTE)
            .descricao(UPDATED_DESCRICAO)
            .ehUsado(UPDATED_EH_USADO)
            .quantidadeDisponivel(UPDATED_QUANTIDADE_DISPONIVEL)
            .altura(UPDATED_ALTURA)
            .largura(UPDATED_LARGURA)
            .pesoBruto(UPDATED_PESO_BRUTO)
            .precoAVista(UPDATED_PRECO_A_VISTA)
            .precoAPrazo(UPDATED_PRECO_A_PRAZO)
            .categoria(UPDATED_CATEGORIA);
        ProdutoDTO produtoDTO = produtoMapper.toDto(updatedProduto);

        restProdutoMockMvc.perform(put("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isOk());

        // Validate the Produto in the database
        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeUpdate);
        Produto testProduto = produtoList.get(produtoList.size() - 1);
        assertThat(testProduto.getCodigoOriginal()).isEqualTo(UPDATED_CODIGO_ORIGINAL);
        assertThat(testProduto.getFabricante()).isEqualTo(UPDATED_FABRICANTE);
        assertThat(testProduto.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testProduto.isEhUsado()).isEqualTo(UPDATED_EH_USADO);
        assertThat(testProduto.getQuantidadeDisponivel()).isEqualTo(UPDATED_QUANTIDADE_DISPONIVEL);
        assertThat(testProduto.getAltura()).isEqualTo(UPDATED_ALTURA);
        assertThat(testProduto.getLargura()).isEqualTo(UPDATED_LARGURA);
        assertThat(testProduto.getPesoBruto()).isEqualTo(UPDATED_PESO_BRUTO);
        assertThat(testProduto.getPrecoAVista()).isEqualTo(UPDATED_PRECO_A_VISTA);
        assertThat(testProduto.getPrecoAPrazo()).isEqualTo(UPDATED_PRECO_A_PRAZO);
        assertThat(testProduto.getCategoria()).isEqualTo(UPDATED_CATEGORIA);
    }

    @Test
    @Transactional
    public void updateNonExistingProduto() throws Exception {
        int databaseSizeBeforeUpdate = produtoRepository.findAll().size();

        // Create the Produto
        ProdutoDTO produtoDTO = produtoMapper.toDto(produto);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdutoMockMvc.perform(put("/api/produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(produtoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Produto in the database
        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProduto() throws Exception {
        // Initialize the database
        produtoRepository.saveAndFlush(produto);

        int databaseSizeBeforeDelete = produtoRepository.findAll().size();

        // Delete the produto
        restProdutoMockMvc.perform(delete("/api/produtos/{id}", produto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Produto> produtoList = produtoRepository.findAll();
        assertThat(produtoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Produto.class);
        Produto produto1 = new Produto();
        produto1.setId(1L);
        Produto produto2 = new Produto();
        produto2.setId(produto1.getId());
        assertThat(produto1).isEqualTo(produto2);
        produto2.setId(2L);
        assertThat(produto1).isNotEqualTo(produto2);
        produto1.setId(null);
        assertThat(produto1).isNotEqualTo(produto2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProdutoDTO.class);
        ProdutoDTO produtoDTO1 = new ProdutoDTO();
        produtoDTO1.setId(1L);
        ProdutoDTO produtoDTO2 = new ProdutoDTO();
        assertThat(produtoDTO1).isNotEqualTo(produtoDTO2);
        produtoDTO2.setId(produtoDTO1.getId());
        assertThat(produtoDTO1).isEqualTo(produtoDTO2);
        produtoDTO2.setId(2L);
        assertThat(produtoDTO1).isNotEqualTo(produtoDTO2);
        produtoDTO1.setId(null);
        assertThat(produtoDTO1).isNotEqualTo(produtoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(produtoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(produtoMapper.fromId(null)).isNull();
    }
}
