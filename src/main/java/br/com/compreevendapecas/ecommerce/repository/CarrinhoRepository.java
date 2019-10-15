package br.com.compreevendapecas.ecommerce.repository;

import br.com.compreevendapecas.ecommerce.domain.Carrinho;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Carrinho entity.
 */
@Repository
public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {

    @Query(value = "select distinct carrinho from Carrinho carrinho left join fetch carrinho.listItens",
        countQuery = "select count(distinct carrinho) from Carrinho carrinho")
    Page<Carrinho> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct carrinho from Carrinho carrinho left join fetch carrinho.listItens")
    List<Carrinho> findAllWithEagerRelationships();

    @Query("select carrinho from Carrinho carrinho left join fetch carrinho.listItens where carrinho.id =:id")
    Optional<Carrinho> findOneWithEagerRelationships(@Param("id") Long id);

}
