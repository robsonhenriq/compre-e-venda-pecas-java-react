package br.com.compreevendapecas.ecommerce.repository;

import br.com.compreevendapecas.ecommerce.domain.ModoPagamento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ModoPagamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModoPagamentoRepository extends JpaRepository<ModoPagamento, Long> {

}
