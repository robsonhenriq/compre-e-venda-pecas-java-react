package br.com.compreevendapecas.ecommerce.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, br.com.compreevendapecas.ecommerce.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, br.com.compreevendapecas.ecommerce.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.User.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Authority.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.User.class.getName() + ".authorities");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Avaliacao.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Avaliacao.class.getName() + ".listClientes");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Carrinho.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Carrinho.class.getName() + ".listItens");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Cliente.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Cliente.class.getName() + ".listVeiculos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Cliente.class.getName() + ".listEnderecos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Cliente.class.getName() + ".listAvaliacaos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Endereco.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Foto.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Item.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Marca.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.ModoPagamento.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Produto.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Produto.class.getName() + ".listImagens");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Produto.class.getName() + ".aplicacoes");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Produto.class.getName() + ".listAvaliacaos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Veiculo.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Venda.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Venda.class.getName() + ".listItens");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Venda.class.getName() + ".listVendedores");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Vendedor.class.getName());
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Vendedor.class.getName() + ".listProdutos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Avaliacao.class.getName() + ".listProdutos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Endereco.class.getName() + ".listEnderecos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Foto.class.getName() + ".listProdutos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Item.class.getName() + ".listCarrinhos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Produto.class.getName() + ".listFotos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Produto.class.getName() + ".listVendedores");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Veiculo.class.getName() + ".listClientes");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Veiculo.class.getName() + ".listProdutos");
            createCache(cm, br.com.compreevendapecas.ecommerce.domain.Vendedor.class.getName() + ".listVendas");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
