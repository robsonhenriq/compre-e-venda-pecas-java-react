package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.EcommerceApp;
import br.com.compreevendapecas.ecommerce.domain.Vendedor;
import br.com.compreevendapecas.ecommerce.repository.VendedorRepository;
import br.com.compreevendapecas.ecommerce.service.VendedorService;
import br.com.compreevendapecas.ecommerce.service.dto.VendedorDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.VendedorMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static br.com.compreevendapecas.ecommerce.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link VendedorResource} REST controller.
 */
@SpringBootTest(classes = EcommerceApp.class)
public class VendedorResourceIT {

    private static final Boolean DEFAULT_EH_EMPRESA = false;
    private static final Boolean UPDATED_EH_EMPRESA = true;

    private static final String DEFAULT_RAZAO_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZAO_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_CNPJ = "BBBBBBBBBB";

    private static final String DEFAULT_CPF = "AAAAAAAAAA";
    private static final String UPDATED_CPF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_CADASTRO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_CADASTRO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_NASCIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_NASCIMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private VendedorRepository vendedorRepository;

    @Mock
    private VendedorRepository vendedorRepositoryMock;

    @Autowired
    private VendedorMapper vendedorMapper;

    @Mock
    private VendedorService vendedorServiceMock;

    @Autowired
    private VendedorService vendedorService;

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

    private MockMvc restVendedorMockMvc;

    private Vendedor vendedor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VendedorResource vendedorResource = new VendedorResource(vendedorService);
        this.restVendedorMockMvc = MockMvcBuilders.standaloneSetup(vendedorResource)
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
    public static Vendedor createEntity(EntityManager em) {
        Vendedor vendedor = new Vendedor()
            .ehEmpresa(DEFAULT_EH_EMPRESA)
            .razaoSocial(DEFAULT_RAZAO_SOCIAL)
            .cnpj(DEFAULT_CNPJ)
            .cpf(DEFAULT_CPF)
            .dataCadastro(DEFAULT_DATA_CADASTRO)
            .dataNascimento(DEFAULT_DATA_NASCIMENTO)
            .descricao(DEFAULT_DESCRICAO);
        return vendedor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vendedor createUpdatedEntity(EntityManager em) {
        Vendedor vendedor = new Vendedor()
            .ehEmpresa(UPDATED_EH_EMPRESA)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .cnpj(UPDATED_CNPJ)
            .cpf(UPDATED_CPF)
            .dataCadastro(UPDATED_DATA_CADASTRO)
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .descricao(UPDATED_DESCRICAO);
        return vendedor;
    }

    @BeforeEach
    public void initTest() {
        vendedor = createEntity(em);
    }

    @Test
    @Transactional
    public void createVendedor() throws Exception {
        int databaseSizeBeforeCreate = vendedorRepository.findAll().size();

        // Create the Vendedor
        VendedorDTO vendedorDTO = vendedorMapper.toDto(vendedor);
        restVendedorMockMvc.perform(post("/api/vendedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendedorDTO)))
            .andExpect(status().isCreated());

        // Validate the Vendedor in the database
        List<Vendedor> vendedorList = vendedorRepository.findAll();
        assertThat(vendedorList).hasSize(databaseSizeBeforeCreate + 1);
        Vendedor testVendedor = vendedorList.get(vendedorList.size() - 1);
        assertThat(testVendedor.isEhEmpresa()).isEqualTo(DEFAULT_EH_EMPRESA);
        assertThat(testVendedor.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
        assertThat(testVendedor.getCnpj()).isEqualTo(DEFAULT_CNPJ);
        assertThat(testVendedor.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testVendedor.getDataCadastro()).isEqualTo(DEFAULT_DATA_CADASTRO);
        assertThat(testVendedor.getDataNascimento()).isEqualTo(DEFAULT_DATA_NASCIMENTO);
        assertThat(testVendedor.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createVendedorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vendedorRepository.findAll().size();

        // Create the Vendedor with an existing ID
        vendedor.setId(1L);
        VendedorDTO vendedorDTO = vendedorMapper.toDto(vendedor);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVendedorMockMvc.perform(post("/api/vendedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendedorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Vendedor in the database
        List<Vendedor> vendedorList = vendedorRepository.findAll();
        assertThat(vendedorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEhEmpresaIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendedorRepository.findAll().size();
        // set the field null
        vendedor.setEhEmpresa(null);

        // Create the Vendedor, which fails.
        VendedorDTO vendedorDTO = vendedorMapper.toDto(vendedor);

        restVendedorMockMvc.perform(post("/api/vendedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendedorDTO)))
            .andExpect(status().isBadRequest());

        List<Vendedor> vendedorList = vendedorRepository.findAll();
        assertThat(vendedorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVendedors() throws Exception {
        // Initialize the database
        vendedorRepository.saveAndFlush(vendedor);

        // Get all the vendedorList
        restVendedorMockMvc.perform(get("/api/vendedors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vendedor.getId().intValue())))
            .andExpect(jsonPath("$.[*].ehEmpresa").value(hasItem(DEFAULT_EH_EMPRESA.booleanValue())))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL.toString())))
            .andExpect(jsonPath("$.[*].cnpj").value(hasItem(DEFAULT_CNPJ.toString())))
            .andExpect(jsonPath("$.[*].cpf").value(hasItem(DEFAULT_CPF.toString())))
            .andExpect(jsonPath("$.[*].dataCadastro").value(hasItem(DEFAULT_DATA_CADASTRO.toString())))
            .andExpect(jsonPath("$.[*].dataNascimento").value(hasItem(DEFAULT_DATA_NASCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllVendedorsWithEagerRelationshipsIsEnabled() throws Exception {
        VendedorResource vendedorResource = new VendedorResource(vendedorServiceMock);
        when(vendedorServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restVendedorMockMvc = MockMvcBuilders.standaloneSetup(vendedorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restVendedorMockMvc.perform(get("/api/vendedors?eagerload=true"))
        .andExpect(status().isOk());

        verify(vendedorServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllVendedorsWithEagerRelationshipsIsNotEnabled() throws Exception {
        VendedorResource vendedorResource = new VendedorResource(vendedorServiceMock);
            when(vendedorServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restVendedorMockMvc = MockMvcBuilders.standaloneSetup(vendedorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restVendedorMockMvc.perform(get("/api/vendedors?eagerload=true"))
        .andExpect(status().isOk());

            verify(vendedorServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getVendedor() throws Exception {
        // Initialize the database
        vendedorRepository.saveAndFlush(vendedor);

        // Get the vendedor
        restVendedorMockMvc.perform(get("/api/vendedors/{id}", vendedor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vendedor.getId().intValue()))
            .andExpect(jsonPath("$.ehEmpresa").value(DEFAULT_EH_EMPRESA.booleanValue()))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL.toString()))
            .andExpect(jsonPath("$.cnpj").value(DEFAULT_CNPJ.toString()))
            .andExpect(jsonPath("$.cpf").value(DEFAULT_CPF.toString()))
            .andExpect(jsonPath("$.dataCadastro").value(DEFAULT_DATA_CADASTRO.toString()))
            .andExpect(jsonPath("$.dataNascimento").value(DEFAULT_DATA_NASCIMENTO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVendedor() throws Exception {
        // Get the vendedor
        restVendedorMockMvc.perform(get("/api/vendedors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVendedor() throws Exception {
        // Initialize the database
        vendedorRepository.saveAndFlush(vendedor);

        int databaseSizeBeforeUpdate = vendedorRepository.findAll().size();

        // Update the vendedor
        Vendedor updatedVendedor = vendedorRepository.findById(vendedor.getId()).get();
        // Disconnect from session so that the updates on updatedVendedor are not directly saved in db
        em.detach(updatedVendedor);
        updatedVendedor
            .ehEmpresa(UPDATED_EH_EMPRESA)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .cnpj(UPDATED_CNPJ)
            .cpf(UPDATED_CPF)
            .dataCadastro(UPDATED_DATA_CADASTRO)
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .descricao(UPDATED_DESCRICAO);
        VendedorDTO vendedorDTO = vendedorMapper.toDto(updatedVendedor);

        restVendedorMockMvc.perform(put("/api/vendedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendedorDTO)))
            .andExpect(status().isOk());

        // Validate the Vendedor in the database
        List<Vendedor> vendedorList = vendedorRepository.findAll();
        assertThat(vendedorList).hasSize(databaseSizeBeforeUpdate);
        Vendedor testVendedor = vendedorList.get(vendedorList.size() - 1);
        assertThat(testVendedor.isEhEmpresa()).isEqualTo(UPDATED_EH_EMPRESA);
        assertThat(testVendedor.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testVendedor.getCnpj()).isEqualTo(UPDATED_CNPJ);
        assertThat(testVendedor.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testVendedor.getDataCadastro()).isEqualTo(UPDATED_DATA_CADASTRO);
        assertThat(testVendedor.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
        assertThat(testVendedor.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingVendedor() throws Exception {
        int databaseSizeBeforeUpdate = vendedorRepository.findAll().size();

        // Create the Vendedor
        VendedorDTO vendedorDTO = vendedorMapper.toDto(vendedor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVendedorMockMvc.perform(put("/api/vendedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendedorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Vendedor in the database
        List<Vendedor> vendedorList = vendedorRepository.findAll();
        assertThat(vendedorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVendedor() throws Exception {
        // Initialize the database
        vendedorRepository.saveAndFlush(vendedor);

        int databaseSizeBeforeDelete = vendedorRepository.findAll().size();

        // Delete the vendedor
        restVendedorMockMvc.perform(delete("/api/vendedors/{id}", vendedor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Vendedor> vendedorList = vendedorRepository.findAll();
        assertThat(vendedorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vendedor.class);
        Vendedor vendedor1 = new Vendedor();
        vendedor1.setId(1L);
        Vendedor vendedor2 = new Vendedor();
        vendedor2.setId(vendedor1.getId());
        assertThat(vendedor1).isEqualTo(vendedor2);
        vendedor2.setId(2L);
        assertThat(vendedor1).isNotEqualTo(vendedor2);
        vendedor1.setId(null);
        assertThat(vendedor1).isNotEqualTo(vendedor2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VendedorDTO.class);
        VendedorDTO vendedorDTO1 = new VendedorDTO();
        vendedorDTO1.setId(1L);
        VendedorDTO vendedorDTO2 = new VendedorDTO();
        assertThat(vendedorDTO1).isNotEqualTo(vendedorDTO2);
        vendedorDTO2.setId(vendedorDTO1.getId());
        assertThat(vendedorDTO1).isEqualTo(vendedorDTO2);
        vendedorDTO2.setId(2L);
        assertThat(vendedorDTO1).isNotEqualTo(vendedorDTO2);
        vendedorDTO1.setId(null);
        assertThat(vendedorDTO1).isNotEqualTo(vendedorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(vendedorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(vendedorMapper.fromId(null)).isNull();
    }
}
