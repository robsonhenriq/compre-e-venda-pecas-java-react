package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.EcommerceApp;
import br.com.compreevendapecas.ecommerce.domain.Venda;
import br.com.compreevendapecas.ecommerce.repository.VendaRepository;
import br.com.compreevendapecas.ecommerce.service.VendaService;
import br.com.compreevendapecas.ecommerce.service.dto.VendaDTO;
import br.com.compreevendapecas.ecommerce.service.mapper.VendaMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static br.com.compreevendapecas.ecommerce.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link VendaResource} REST controller.
 */
@SpringBootTest(classes = EcommerceApp.class)
public class VendaResourceIT {

    private static final Instant DEFAULT_DATA_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_TOTAL_VENDA = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_VENDA = new BigDecimal(2);

    @Autowired
    private VendaRepository vendaRepository;

    @Mock
    private VendaRepository vendaRepositoryMock;

    @Autowired
    private VendaMapper vendaMapper;

    @Mock
    private VendaService vendaServiceMock;

    @Autowired
    private VendaService vendaService;

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

    private MockMvc restVendaMockMvc;

    private Venda venda;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VendaResource vendaResource = new VendaResource(vendaService);
        this.restVendaMockMvc = MockMvcBuilders.standaloneSetup(vendaResource)
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
    public static Venda createEntity(EntityManager em) {
        Venda venda = new Venda()
            .dataHora(DEFAULT_DATA_HORA)
            .totalVenda(DEFAULT_TOTAL_VENDA);
        return venda;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Venda createUpdatedEntity(EntityManager em) {
        Venda venda = new Venda()
            .dataHora(UPDATED_DATA_HORA)
            .totalVenda(UPDATED_TOTAL_VENDA);
        return venda;
    }

    @BeforeEach
    public void initTest() {
        venda = createEntity(em);
    }

    @Test
    @Transactional
    public void createVenda() throws Exception {
        int databaseSizeBeforeCreate = vendaRepository.findAll().size();

        // Create the Venda
        VendaDTO vendaDTO = vendaMapper.toDto(venda);
        restVendaMockMvc.perform(post("/api/vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendaDTO)))
            .andExpect(status().isCreated());

        // Validate the Venda in the database
        List<Venda> vendaList = vendaRepository.findAll();
        assertThat(vendaList).hasSize(databaseSizeBeforeCreate + 1);
        Venda testVenda = vendaList.get(vendaList.size() - 1);
        assertThat(testVenda.getDataHora()).isEqualTo(DEFAULT_DATA_HORA);
        assertThat(testVenda.getTotalVenda()).isEqualTo(DEFAULT_TOTAL_VENDA);
    }

    @Test
    @Transactional
    public void createVendaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vendaRepository.findAll().size();

        // Create the Venda with an existing ID
        venda.setId(1L);
        VendaDTO vendaDTO = vendaMapper.toDto(venda);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVendaMockMvc.perform(post("/api/vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Venda in the database
        List<Venda> vendaList = vendaRepository.findAll();
        assertThat(vendaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVendas() throws Exception {
        // Initialize the database
        vendaRepository.saveAndFlush(venda);

        // Get all the vendaList
        restVendaMockMvc.perform(get("/api/vendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(venda.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataHora").value(hasItem(DEFAULT_DATA_HORA.toString())))
            .andExpect(jsonPath("$.[*].totalVenda").value(hasItem(DEFAULT_TOTAL_VENDA.intValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllVendasWithEagerRelationshipsIsEnabled() throws Exception {
        VendaResource vendaResource = new VendaResource(vendaServiceMock);
        when(vendaServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restVendaMockMvc = MockMvcBuilders.standaloneSetup(vendaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restVendaMockMvc.perform(get("/api/vendas?eagerload=true"))
        .andExpect(status().isOk());

        verify(vendaServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllVendasWithEagerRelationshipsIsNotEnabled() throws Exception {
        VendaResource vendaResource = new VendaResource(vendaServiceMock);
            when(vendaServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restVendaMockMvc = MockMvcBuilders.standaloneSetup(vendaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restVendaMockMvc.perform(get("/api/vendas?eagerload=true"))
        .andExpect(status().isOk());

            verify(vendaServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getVenda() throws Exception {
        // Initialize the database
        vendaRepository.saveAndFlush(venda);

        // Get the venda
        restVendaMockMvc.perform(get("/api/vendas/{id}", venda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(venda.getId().intValue()))
            .andExpect(jsonPath("$.dataHora").value(DEFAULT_DATA_HORA.toString()))
            .andExpect(jsonPath("$.totalVenda").value(DEFAULT_TOTAL_VENDA.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingVenda() throws Exception {
        // Get the venda
        restVendaMockMvc.perform(get("/api/vendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVenda() throws Exception {
        // Initialize the database
        vendaRepository.saveAndFlush(venda);

        int databaseSizeBeforeUpdate = vendaRepository.findAll().size();

        // Update the venda
        Venda updatedVenda = vendaRepository.findById(venda.getId()).get();
        // Disconnect from session so that the updates on updatedVenda are not directly saved in db
        em.detach(updatedVenda);
        updatedVenda
            .dataHora(UPDATED_DATA_HORA)
            .totalVenda(UPDATED_TOTAL_VENDA);
        VendaDTO vendaDTO = vendaMapper.toDto(updatedVenda);

        restVendaMockMvc.perform(put("/api/vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendaDTO)))
            .andExpect(status().isOk());

        // Validate the Venda in the database
        List<Venda> vendaList = vendaRepository.findAll();
        assertThat(vendaList).hasSize(databaseSizeBeforeUpdate);
        Venda testVenda = vendaList.get(vendaList.size() - 1);
        assertThat(testVenda.getDataHora()).isEqualTo(UPDATED_DATA_HORA);
        assertThat(testVenda.getTotalVenda()).isEqualTo(UPDATED_TOTAL_VENDA);
    }

    @Test
    @Transactional
    public void updateNonExistingVenda() throws Exception {
        int databaseSizeBeforeUpdate = vendaRepository.findAll().size();

        // Create the Venda
        VendaDTO vendaDTO = vendaMapper.toDto(venda);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVendaMockMvc.perform(put("/api/vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Venda in the database
        List<Venda> vendaList = vendaRepository.findAll();
        assertThat(vendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVenda() throws Exception {
        // Initialize the database
        vendaRepository.saveAndFlush(venda);

        int databaseSizeBeforeDelete = vendaRepository.findAll().size();

        // Delete the venda
        restVendaMockMvc.perform(delete("/api/vendas/{id}", venda.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Venda> vendaList = vendaRepository.findAll();
        assertThat(vendaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Venda.class);
        Venda venda1 = new Venda();
        venda1.setId(1L);
        Venda venda2 = new Venda();
        venda2.setId(venda1.getId());
        assertThat(venda1).isEqualTo(venda2);
        venda2.setId(2L);
        assertThat(venda1).isNotEqualTo(venda2);
        venda1.setId(null);
        assertThat(venda1).isNotEqualTo(venda2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VendaDTO.class);
        VendaDTO vendaDTO1 = new VendaDTO();
        vendaDTO1.setId(1L);
        VendaDTO vendaDTO2 = new VendaDTO();
        assertThat(vendaDTO1).isNotEqualTo(vendaDTO2);
        vendaDTO2.setId(vendaDTO1.getId());
        assertThat(vendaDTO1).isEqualTo(vendaDTO2);
        vendaDTO2.setId(2L);
        assertThat(vendaDTO1).isNotEqualTo(vendaDTO2);
        vendaDTO1.setId(null);
        assertThat(vendaDTO1).isNotEqualTo(vendaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(vendaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(vendaMapper.fromId(null)).isNull();
    }
}
