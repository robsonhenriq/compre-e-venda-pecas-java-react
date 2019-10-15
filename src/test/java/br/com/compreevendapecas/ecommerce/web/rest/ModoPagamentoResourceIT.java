package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.EcommerceApp;
import br.com.compreevendapecas.ecommerce.domain.ModoPagamento;
import br.com.compreevendapecas.ecommerce.repository.ModoPagamentoRepository;
import br.com.compreevendapecas.ecommerce.service.ModoPagamentoService;
import br.com.compreevendapecas.ecommerce.service.dto.ModoPagamentoDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.ModoPagamentoMapper;
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
import java.util.List;

import static br.com.compreevendapecas.ecommerce.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.compreevendapecas.ecommerce.domain.enumeration.TipoPagamento;
/**
 * Integration tests for the {@Link ModoPagamentoResource} REST controller.
 */
@SpringBootTest(classes = EcommerceApp.class)
public class ModoPagamentoResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final TipoPagamento DEFAULT_TIPO_PAGAMENTO = TipoPagamento.A_VISTA;
    private static final TipoPagamento UPDATED_TIPO_PAGAMENTO = TipoPagamento.PARCELADO;

    @Autowired
    private ModoPagamentoRepository modoPagamentoRepository;

    @Autowired
    private ModoPagamentoMapper modoPagamentoMapper;

    @Autowired
    private ModoPagamentoService modoPagamentoService;

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

    private MockMvc restModoPagamentoMockMvc;

    private ModoPagamento modoPagamento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModoPagamentoResource modoPagamentoResource = new ModoPagamentoResource(modoPagamentoService);
        this.restModoPagamentoMockMvc = MockMvcBuilders.standaloneSetup(modoPagamentoResource)
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
    public static ModoPagamento createEntity(EntityManager em) {
        ModoPagamento modoPagamento = new ModoPagamento()
            .descricao(DEFAULT_DESCRICAO)
            .tipoPagamento(DEFAULT_TIPO_PAGAMENTO);
        return modoPagamento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ModoPagamento createUpdatedEntity(EntityManager em) {
        ModoPagamento modoPagamento = new ModoPagamento()
            .descricao(UPDATED_DESCRICAO)
            .tipoPagamento(UPDATED_TIPO_PAGAMENTO);
        return modoPagamento;
    }

    @BeforeEach
    public void initTest() {
        modoPagamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createModoPagamento() throws Exception {
        int databaseSizeBeforeCreate = modoPagamentoRepository.findAll().size();

        // Create the ModoPagamento
        ModoPagamentoDTO modoPagamentoDTO = modoPagamentoMapper.toDto(modoPagamento);
        restModoPagamentoMockMvc.perform(post("/api/modo-pagamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoPagamentoDTO)))
            .andExpect(status().isCreated());

        // Validate the ModoPagamento in the database
        List<ModoPagamento> modoPagamentoList = modoPagamentoRepository.findAll();
        assertThat(modoPagamentoList).hasSize(databaseSizeBeforeCreate + 1);
        ModoPagamento testModoPagamento = modoPagamentoList.get(modoPagamentoList.size() - 1);
        assertThat(testModoPagamento.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testModoPagamento.getTipoPagamento()).isEqualTo(DEFAULT_TIPO_PAGAMENTO);
    }

    @Test
    @Transactional
    public void createModoPagamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modoPagamentoRepository.findAll().size();

        // Create the ModoPagamento with an existing ID
        modoPagamento.setId(1L);
        ModoPagamentoDTO modoPagamentoDTO = modoPagamentoMapper.toDto(modoPagamento);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModoPagamentoMockMvc.perform(post("/api/modo-pagamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoPagamentoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ModoPagamento in the database
        List<ModoPagamento> modoPagamentoList = modoPagamentoRepository.findAll();
        assertThat(modoPagamentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = modoPagamentoRepository.findAll().size();
        // set the field null
        modoPagamento.setDescricao(null);

        // Create the ModoPagamento, which fails.
        ModoPagamentoDTO modoPagamentoDTO = modoPagamentoMapper.toDto(modoPagamento);

        restModoPagamentoMockMvc.perform(post("/api/modo-pagamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoPagamentoDTO)))
            .andExpect(status().isBadRequest());

        List<ModoPagamento> modoPagamentoList = modoPagamentoRepository.findAll();
        assertThat(modoPagamentoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllModoPagamentos() throws Exception {
        // Initialize the database
        modoPagamentoRepository.saveAndFlush(modoPagamento);

        // Get all the modoPagamentoList
        restModoPagamentoMockMvc.perform(get("/api/modo-pagamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modoPagamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].tipoPagamento").value(hasItem(DEFAULT_TIPO_PAGAMENTO.toString())));
    }
    
    @Test
    @Transactional
    public void getModoPagamento() throws Exception {
        // Initialize the database
        modoPagamentoRepository.saveAndFlush(modoPagamento);

        // Get the modoPagamento
        restModoPagamentoMockMvc.perform(get("/api/modo-pagamentos/{id}", modoPagamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modoPagamento.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.tipoPagamento").value(DEFAULT_TIPO_PAGAMENTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingModoPagamento() throws Exception {
        // Get the modoPagamento
        restModoPagamentoMockMvc.perform(get("/api/modo-pagamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModoPagamento() throws Exception {
        // Initialize the database
        modoPagamentoRepository.saveAndFlush(modoPagamento);

        int databaseSizeBeforeUpdate = modoPagamentoRepository.findAll().size();

        // Update the modoPagamento
        ModoPagamento updatedModoPagamento = modoPagamentoRepository.findById(modoPagamento.getId()).get();
        // Disconnect from session so that the updates on updatedModoPagamento are not directly saved in db
        em.detach(updatedModoPagamento);
        updatedModoPagamento
            .descricao(UPDATED_DESCRICAO)
            .tipoPagamento(UPDATED_TIPO_PAGAMENTO);
        ModoPagamentoDTO modoPagamentoDTO = modoPagamentoMapper.toDto(updatedModoPagamento);

        restModoPagamentoMockMvc.perform(put("/api/modo-pagamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoPagamentoDTO)))
            .andExpect(status().isOk());

        // Validate the ModoPagamento in the database
        List<ModoPagamento> modoPagamentoList = modoPagamentoRepository.findAll();
        assertThat(modoPagamentoList).hasSize(databaseSizeBeforeUpdate);
        ModoPagamento testModoPagamento = modoPagamentoList.get(modoPagamentoList.size() - 1);
        assertThat(testModoPagamento.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testModoPagamento.getTipoPagamento()).isEqualTo(UPDATED_TIPO_PAGAMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingModoPagamento() throws Exception {
        int databaseSizeBeforeUpdate = modoPagamentoRepository.findAll().size();

        // Create the ModoPagamento
        ModoPagamentoDTO modoPagamentoDTO = modoPagamentoMapper.toDto(modoPagamento);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModoPagamentoMockMvc.perform(put("/api/modo-pagamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoPagamentoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ModoPagamento in the database
        List<ModoPagamento> modoPagamentoList = modoPagamentoRepository.findAll();
        assertThat(modoPagamentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteModoPagamento() throws Exception {
        // Initialize the database
        modoPagamentoRepository.saveAndFlush(modoPagamento);

        int databaseSizeBeforeDelete = modoPagamentoRepository.findAll().size();

        // Delete the modoPagamento
        restModoPagamentoMockMvc.perform(delete("/api/modo-pagamentos/{id}", modoPagamento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ModoPagamento> modoPagamentoList = modoPagamentoRepository.findAll();
        assertThat(modoPagamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ModoPagamento.class);
        ModoPagamento modoPagamento1 = new ModoPagamento();
        modoPagamento1.setId(1L);
        ModoPagamento modoPagamento2 = new ModoPagamento();
        modoPagamento2.setId(modoPagamento1.getId());
        assertThat(modoPagamento1).isEqualTo(modoPagamento2);
        modoPagamento2.setId(2L);
        assertThat(modoPagamento1).isNotEqualTo(modoPagamento2);
        modoPagamento1.setId(null);
        assertThat(modoPagamento1).isNotEqualTo(modoPagamento2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ModoPagamentoDTO.class);
        ModoPagamentoDTO modoPagamentoDTO1 = new ModoPagamentoDTO();
        modoPagamentoDTO1.setId(1L);
        ModoPagamentoDTO modoPagamentoDTO2 = new ModoPagamentoDTO();
        assertThat(modoPagamentoDTO1).isNotEqualTo(modoPagamentoDTO2);
        modoPagamentoDTO2.setId(modoPagamentoDTO1.getId());
        assertThat(modoPagamentoDTO1).isEqualTo(modoPagamentoDTO2);
        modoPagamentoDTO2.setId(2L);
        assertThat(modoPagamentoDTO1).isNotEqualTo(modoPagamentoDTO2);
        modoPagamentoDTO1.setId(null);
        assertThat(modoPagamentoDTO1).isNotEqualTo(modoPagamentoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(modoPagamentoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(modoPagamentoMapper.fromId(null)).isNull();
    }
}
