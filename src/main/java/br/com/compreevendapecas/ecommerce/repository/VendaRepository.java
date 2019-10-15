package br.com.compreevendapecas.ecommerce.repository;

import br.com.compreevendapecas.ecommerce.domain.Venda;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Venda entity.
 */
@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

    @Query(value = "select distinct venda from Venda venda left join fetch venda.listVendedores",
        countQuery = "select count(distinct venda) from Venda venda")
    Page<Venda> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct venda from Venda venda left join fetch venda.listVendedores")
    List<Venda> findAllWithEagerRelationships();

    @Query("select venda from Venda venda left join fetch venda.listVendedores where venda.id =:id")
    Optional<Venda> findOneWithEagerRelationships(@Param("id") Long id);

}
