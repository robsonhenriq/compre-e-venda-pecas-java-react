package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.EcommerceApp;
import br.com.compreevendapecas.ecommerce.domain.Veiculo;
import br.com.compreevendapecas.ecommerce.repository.VeiculoRepository;
import br.com.compreevendapecas.ecommerce.service.VeiculoService;
import br.com.compreevendapecas.ecommerce.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
import java.util.List;

import static br.com.compreevendapecas.ecommerce.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link VeiculoResource} REST controller.
 */
@SpringBootTest(classes = EcommerceApp.class)
public class VeiculoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ANO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ANO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private VeiculoService veiculoService;

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

    private MockMvc restVeiculoMockMvc;

    private Veiculo veiculo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VeiculoResource veiculoResource = new VeiculoResource(veiculoService);
        this.restVeiculoMockMvc = MockMvcBuilders.standaloneSetup(veiculoResource)
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
    public static Veiculo createEntity(EntityManager em) {
        Veiculo veiculo = new Veiculo()
            .nome(DEFAULT_NOME)
            .ano(DEFAULT_ANO);
        return veiculo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Veiculo createUpdatedEntity(EntityManager em) {
        Veiculo veiculo = new Veiculo()
            .nome(UPDATED_NOME)
            .ano(UPDATED_ANO);
        return veiculo;
    }

    @BeforeEach
    public void initTest() {
        veiculo = createEntity(em);
    }

    @Test
    @Transactional
    public void createVeiculo() throws Exception {
        int databaseSizeBeforeCreate = veiculoRepository.findAll().size();

        // Create the Veiculo
        restVeiculoMockMvc.perform(post("/api/veiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veiculo)))
            .andExpect(status().isCreated());

        // Validate the Veiculo in the database
        List<Veiculo> veiculoList = veiculoRepository.findAll();
        assertThat(veiculoList).hasSize(databaseSizeBeforeCreate + 1);
        Veiculo testVeiculo = veiculoList.get(veiculoList.size() - 1);
        assertThat(testVeiculo.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testVeiculo.getAno()).isEqualTo(DEFAULT_ANO);
    }

    @Test
    @Transactional
    public void createVeiculoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = veiculoRepository.findAll().size();

        // Create the Veiculo with an existing ID
        veiculo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVeiculoMockMvc.perform(post("/api/veiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veiculo)))
            .andExpect(status().isBadRequest());

        // Validate the Veiculo in the database
        List<Veiculo> veiculoList = veiculoRepository.findAll();
        assertThat(veiculoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = veiculoRepository.findAll().size();
        // set the field null
        veiculo.setNome(null);

        // Create the Veiculo, which fails.

        restVeiculoMockMvc.perform(post("/api/veiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veiculo)))
            .andExpect(status().isBadRequest());

        List<Veiculo> veiculoList = veiculoRepository.findAll();
        assertThat(veiculoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAnoIsRequired() throws Exception {
        int databaseSizeBeforeTest = veiculoRepository.findAll().size();
        // set the field null
        veiculo.setAno(null);

        // Create the Veiculo, which fails.

        restVeiculoMockMvc.perform(post("/api/veiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veiculo)))
            .andExpect(status().isBadRequest());

        List<Veiculo> veiculoList = veiculoRepository.findAll();
        assertThat(veiculoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVeiculos() throws Exception {
        // Initialize the database
        veiculoRepository.saveAndFlush(veiculo);

        // Get all the veiculoList
        restVeiculoMockMvc.perform(get("/api/veiculos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(veiculo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].ano").value(hasItem(DEFAULT_ANO.toString())));
    }
    
    @Test
    @Transactional
    public void getVeiculo() throws Exception {
        // Initialize the database
        veiculoRepository.saveAndFlush(veiculo);

        // Get the veiculo
        restVeiculoMockMvc.perform(get("/api/veiculos/{id}", veiculo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(veiculo.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.ano").value(DEFAULT_ANO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVeiculo() throws Exception {
        // Get the veiculo
        restVeiculoMockMvc.perform(get("/api/veiculos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVeiculo() throws Exception {
        // Initialize the database
        veiculoService.save(veiculo);

        int databaseSizeBeforeUpdate = veiculoRepository.findAll().size();

        // Update the veiculo
        Veiculo updatedVeiculo = veiculoRepository.findById(veiculo.getId()).get();
        // Disconnect from session so that the updates on updatedVeiculo are not directly saved in db
        em.detach(updatedVeiculo);
        updatedVeiculo
            .nome(UPDATED_NOME)
            .ano(UPDATED_ANO);

        restVeiculoMockMvc.perform(put("/api/veiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVeiculo)))
            .andExpect(status().isOk());

        // Validate the Veiculo in the database
        List<Veiculo> veiculoList = veiculoRepository.findAll();
        assertThat(veiculoList).hasSize(databaseSizeBeforeUpdate);
        Veiculo testVeiculo = veiculoList.get(veiculoList.size() - 1);
        assertThat(testVeiculo.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testVeiculo.getAno()).isEqualTo(UPDATED_ANO);
    }

    @Test
    @Transactional
    public void updateNonExistingVeiculo() throws Exception {
        int databaseSizeBeforeUpdate = veiculoRepository.findAll().size();

        // Create the Veiculo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVeiculoMockMvc.perform(put("/api/veiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veiculo)))
            .andExpect(status().isBadRequest());

        // Validate the Veiculo in the database
        List<Veiculo> veiculoList = veiculoRepository.findAll();
        assertThat(veiculoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVeiculo() throws Exception {
        // Initialize the database
        veiculoService.save(veiculo);

        int databaseSizeBeforeDelete = veiculoRepository.findAll().size();

        // Delete the veiculo
        restVeiculoMockMvc.perform(delete("/api/veiculos/{id}", veiculo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Veiculo> veiculoList = veiculoRepository.findAll();
        assertThat(veiculoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Veiculo.class);
        Veiculo veiculo1 = new Veiculo();
        veiculo1.setId(1L);
        Veiculo veiculo2 = new Veiculo();
        veiculo2.setId(veiculo1.getId());
        assertThat(veiculo1).isEqualTo(veiculo2);
        veiculo2.setId(2L);
        assertThat(veiculo1).isNotEqualTo(veiculo2);
        veiculo1.setId(null);
        assertThat(veiculo1).isNotEqualTo(veiculo2);
    }
}
