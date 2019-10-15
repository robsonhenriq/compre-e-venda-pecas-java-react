package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.EcommerceApp;
import br.com.compreevendapecas.ecommerce.domain.Avaliacao;
import br.com.compreevendapecas.ecommerce.repository.AvaliacaoRepository;
import br.com.compreevendapecas.ecommerce.service.AvaliacaoService;
import br.com.compreevendapecas.ecommerce.service.dto.AvaliacaoDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.AvaliacaoMapper;
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
 * Integration tests for the {@Link AvaliacaoResource} REST controller.
 */
@SpringBootTest(classes = EcommerceApp.class)
public class AvaliacaoResourceIT {

    private static final LocalDate DEFAULT_DATA_HORA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_HORA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Mock
    private AvaliacaoRepository avaliacaoRepositoryMock;

    @Autowired
    private AvaliacaoMapper avaliacaoMapper;

    @Mock
    private AvaliacaoService avaliacaoServiceMock;

    @Autowired
    private AvaliacaoService avaliacaoService;

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

    private MockMvc restAvaliacaoMockMvc;

    private Avaliacao avaliacao;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AvaliacaoResource avaliacaoResource = new AvaliacaoResource(avaliacaoService);
        this.restAvaliacaoMockMvc = MockMvcBuilders.standaloneSetup(avaliacaoResource)
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
    public static Avaliacao createEntity(EntityManager em) {
        Avaliacao avaliacao = new Avaliacao()
            .dataHora(DEFAULT_DATA_HORA)
            .descricao(DEFAULT_DESCRICAO);
        return avaliacao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Avaliacao createUpdatedEntity(EntityManager em) {
        Avaliacao avaliacao = new Avaliacao()
            .dataHora(UPDATED_DATA_HORA)
            .descricao(UPDATED_DESCRICAO);
        return avaliacao;
    }

    @BeforeEach
    public void initTest() {
        avaliacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createAvaliacao() throws Exception {
        int databaseSizeBeforeCreate = avaliacaoRepository.findAll().size();

        // Create the Avaliacao
        AvaliacaoDTO avaliacaoDTO = avaliacaoMapper.toDto(avaliacao);
        restAvaliacaoMockMvc.perform(post("/api/avaliacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avaliacaoDTO)))
            .andExpect(status().isCreated());

        // Validate the Avaliacao in the database
        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Avaliacao testAvaliacao = avaliacaoList.get(avaliacaoList.size() - 1);
        assertThat(testAvaliacao.getDataHora()).isEqualTo(DEFAULT_DATA_HORA);
        assertThat(testAvaliacao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createAvaliacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = avaliacaoRepository.findAll().size();

        // Create the Avaliacao with an existing ID
        avaliacao.setId(1L);
        AvaliacaoDTO avaliacaoDTO = avaliacaoMapper.toDto(avaliacao);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvaliacaoMockMvc.perform(post("/api/avaliacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avaliacaoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Avaliacao in the database
        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAvaliacaos() throws Exception {
        // Initialize the database
        avaliacaoRepository.saveAndFlush(avaliacao);

        // Get all the avaliacaoList
        restAvaliacaoMockMvc.perform(get("/api/avaliacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(avaliacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataHora").value(hasItem(DEFAULT_DATA_HORA.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAvaliacaosWithEagerRelationshipsIsEnabled() throws Exception {
        AvaliacaoResource avaliacaoResource = new AvaliacaoResource(avaliacaoServiceMock);
        when(avaliacaoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAvaliacaoMockMvc = MockMvcBuilders.standaloneSetup(avaliacaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAvaliacaoMockMvc.perform(get("/api/avaliacaos?eagerload=true"))
        .andExpect(status().isOk());

        verify(avaliacaoServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAvaliacaosWithEagerRelationshipsIsNotEnabled() throws Exception {
        AvaliacaoResource avaliacaoResource = new AvaliacaoResource(avaliacaoServiceMock);
            when(avaliacaoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAvaliacaoMockMvc = MockMvcBuilders.standaloneSetup(avaliacaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAvaliacaoMockMvc.perform(get("/api/avaliacaos?eagerload=true"))
        .andExpect(status().isOk());

            verify(avaliacaoServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAvaliacao() throws Exception {
        // Initialize the database
        avaliacaoRepository.saveAndFlush(avaliacao);

        // Get the avaliacao
        restAvaliacaoMockMvc.perform(get("/api/avaliacaos/{id}", avaliacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(avaliacao.getId().intValue()))
            .andExpect(jsonPath("$.dataHora").value(DEFAULT_DATA_HORA.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAvaliacao() throws Exception {
        // Get the avaliacao
        restAvaliacaoMockMvc.perform(get("/api/avaliacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAvaliacao() throws Exception {
        // Initialize the database
        avaliacaoRepository.saveAndFlush(avaliacao);

        int databaseSizeBeforeUpdate = avaliacaoRepository.findAll().size();

        // Update the avaliacao
        Avaliacao updatedAvaliacao = avaliacaoRepository.findById(avaliacao.getId()).get();
        // Disconnect from session so that the updates on updatedAvaliacao are not directly saved in db
        em.detach(updatedAvaliacao);
        updatedAvaliacao
            .dataHora(UPDATED_DATA_HORA)
            .descricao(UPDATED_DESCRICAO);
        AvaliacaoDTO avaliacaoDTO = avaliacaoMapper.toDto(updatedAvaliacao);

        restAvaliacaoMockMvc.perform(put("/api/avaliacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avaliacaoDTO)))
            .andExpect(status().isOk());

        // Validate the Avaliacao in the database
        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeUpdate);
        Avaliacao testAvaliacao = avaliacaoList.get(avaliacaoList.size() - 1);
        assertThat(testAvaliacao.getDataHora()).isEqualTo(UPDATED_DATA_HORA);
        assertThat(testAvaliacao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingAvaliacao() throws Exception {
        int databaseSizeBeforeUpdate = avaliacaoRepository.findAll().size();

        // Create the Avaliacao
        AvaliacaoDTO avaliacaoDTO = avaliacaoMapper.toDto(avaliacao);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvaliacaoMockMvc.perform(put("/api/avaliacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avaliacaoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Avaliacao in the database
        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAvaliacao() throws Exception {
        // Initialize the database
        avaliacaoRepository.saveAndFlush(avaliacao);

        int databaseSizeBeforeDelete = avaliacaoRepository.findAll().size();

        // Delete the avaliacao
        restAvaliacaoMockMvc.perform(delete("/api/avaliacaos/{id}", avaliacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Avaliacao.class);
        Avaliacao avaliacao1 = new Avaliacao();
        avaliacao1.setId(1L);
        Avaliacao avaliacao2 = new Avaliacao();
        avaliacao2.setId(avaliacao1.getId());
        assertThat(avaliacao1).isEqualTo(avaliacao2);
        avaliacao2.setId(2L);
        assertThat(avaliacao1).isNotEqualTo(avaliacao2);
        avaliacao1.setId(null);
        assertThat(avaliacao1).isNotEqualTo(avaliacao2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AvaliacaoDTO.class);
        AvaliacaoDTO avaliacaoDTO1 = new AvaliacaoDTO();
        avaliacaoDTO1.setId(1L);
        AvaliacaoDTO avaliacaoDTO2 = new AvaliacaoDTO();
        assertThat(avaliacaoDTO1).isNotEqualTo(avaliacaoDTO2);
        avaliacaoDTO2.setId(avaliacaoDTO1.getId());
        assertThat(avaliacaoDTO1).isEqualTo(avaliacaoDTO2);
        avaliacaoDTO2.setId(2L);
        assertThat(avaliacaoDTO1).isNotEqualTo(avaliacaoDTO2);
        avaliacaoDTO1.setId(null);
        assertThat(avaliacaoDTO1).isNotEqualTo(avaliacaoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(avaliacaoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(avaliacaoMapper.fromId(null)).isNull();
    }
}
