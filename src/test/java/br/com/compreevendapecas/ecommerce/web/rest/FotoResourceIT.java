package br.com.compreevendapecas.ecommerce.web.rest;

import br.com.compreevendapecas.ecommerce.EcommerceApp;
import br.com.compreevendapecas.ecommerce.domain.Foto;
import br.com.compreevendapecas.ecommerce.repository.FotoRepository;
import br.com.compreevendapecas.ecommerce.service.FotoService;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static br.com.compreevendapecas.ecommerce.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link FotoResource} REST controller.
 */
@SpringBootTest(classes = EcommerceApp.class)
public class FotoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGEM = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEM = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEM_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEM_CONTENT_TYPE = "image/png";

    @Autowired
    private FotoRepository fotoRepository;

    @Autowired
    private FotoService fotoService;

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

    private MockMvc restFotoMockMvc;

    private Foto foto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FotoResource fotoResource = new FotoResource(fotoService);
        this.restFotoMockMvc = MockMvcBuilders.standaloneSetup(fotoResource)
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
    public static Foto createEntity(EntityManager em) {
        Foto foto = new Foto()
            .nome(DEFAULT_NOME)
            .imagem(DEFAULT_IMAGEM)
            .imagemContentType(DEFAULT_IMAGEM_CONTENT_TYPE);
        return foto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Foto createUpdatedEntity(EntityManager em) {
        Foto foto = new Foto()
            .nome(UPDATED_NOME)
            .imagem(UPDATED_IMAGEM)
            .imagemContentType(UPDATED_IMAGEM_CONTENT_TYPE);
        return foto;
    }

    @BeforeEach
    public void initTest() {
        foto = createEntity(em);
    }

    @Test
    @Transactional
    public void createFoto() throws Exception {
        int databaseSizeBeforeCreate = fotoRepository.findAll().size();

        // Create the Foto
        restFotoMockMvc.perform(post("/api/fotos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foto)))
            .andExpect(status().isCreated());

        // Validate the Foto in the database
        List<Foto> fotoList = fotoRepository.findAll();
        assertThat(fotoList).hasSize(databaseSizeBeforeCreate + 1);
        Foto testFoto = fotoList.get(fotoList.size() - 1);
        assertThat(testFoto.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testFoto.getImagem()).isEqualTo(DEFAULT_IMAGEM);
        assertThat(testFoto.getImagemContentType()).isEqualTo(DEFAULT_IMAGEM_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createFotoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fotoRepository.findAll().size();

        // Create the Foto with an existing ID
        foto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFotoMockMvc.perform(post("/api/fotos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foto)))
            .andExpect(status().isBadRequest());

        // Validate the Foto in the database
        List<Foto> fotoList = fotoRepository.findAll();
        assertThat(fotoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFotos() throws Exception {
        // Initialize the database
        fotoRepository.saveAndFlush(foto);

        // Get all the fotoList
        restFotoMockMvc.perform(get("/api/fotos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(foto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].imagemContentType").value(hasItem(DEFAULT_IMAGEM_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagem").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEM))));
    }
    
    @Test
    @Transactional
    public void getFoto() throws Exception {
        // Initialize the database
        fotoRepository.saveAndFlush(foto);

        // Get the foto
        restFotoMockMvc.perform(get("/api/fotos/{id}", foto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(foto.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.imagemContentType").value(DEFAULT_IMAGEM_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagem").value(Base64Utils.encodeToString(DEFAULT_IMAGEM)));
    }

    @Test
    @Transactional
    public void getNonExistingFoto() throws Exception {
        // Get the foto
        restFotoMockMvc.perform(get("/api/fotos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFoto() throws Exception {
        // Initialize the database
        fotoService.save(foto);

        int databaseSizeBeforeUpdate = fotoRepository.findAll().size();

        // Update the foto
        Foto updatedFoto = fotoRepository.findById(foto.getId()).get();
        // Disconnect from session so that the updates on updatedFoto are not directly saved in db
        em.detach(updatedFoto);
        updatedFoto
            .nome(UPDATED_NOME)
            .imagem(UPDATED_IMAGEM)
            .imagemContentType(UPDATED_IMAGEM_CONTENT_TYPE);

        restFotoMockMvc.perform(put("/api/fotos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFoto)))
            .andExpect(status().isOk());

        // Validate the Foto in the database
        List<Foto> fotoList = fotoRepository.findAll();
        assertThat(fotoList).hasSize(databaseSizeBeforeUpdate);
        Foto testFoto = fotoList.get(fotoList.size() - 1);
        assertThat(testFoto.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testFoto.getImagem()).isEqualTo(UPDATED_IMAGEM);
        assertThat(testFoto.getImagemContentType()).isEqualTo(UPDATED_IMAGEM_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingFoto() throws Exception {
        int databaseSizeBeforeUpdate = fotoRepository.findAll().size();

        // Create the Foto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFotoMockMvc.perform(put("/api/fotos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(foto)))
            .andExpect(status().isBadRequest());

        // Validate the Foto in the database
        List<Foto> fotoList = fotoRepository.findAll();
        assertThat(fotoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFoto() throws Exception {
        // Initialize the database
        fotoService.save(foto);

        int databaseSizeBeforeDelete = fotoRepository.findAll().size();

        // Delete the foto
        restFotoMockMvc.perform(delete("/api/fotos/{id}", foto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Foto> fotoList = fotoRepository.findAll();
        assertThat(fotoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Foto.class);
        Foto foto1 = new Foto();
        foto1.setId(1L);
        Foto foto2 = new Foto();
        foto2.setId(foto1.getId());
        assertThat(foto1).isEqualTo(foto2);
        foto2.setId(2L);
        assertThat(foto1).isNotEqualTo(foto2);
        foto1.setId(null);
        assertThat(foto1).isNotEqualTo(foto2);
    }
}
