package br.com.compreevendapecas.ecommerce.repository;

import br.com.compreevendapecas.ecommerce.domain.Avaliacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Avaliacao entity.
 */
@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    @Query(value = "select distinct avaliacao from Avaliacao avaliacao left join fetch avaliacao.listClientes",
        countQuery = "select count(distinct avaliacao) from Avaliacao avaliacao")
    Page<Avaliacao> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct avaliacao from Avaliacao avaliacao left join fetch avaliacao.listClientes")
    List<Avaliacao> findAllWithEagerRelationships();

    @Query("select avaliacao from Avaliacao avaliacao left join fetch avaliacao.listClientes where avaliacao.id =:id")
    Optional<Avaliacao> findOneWithEagerRelationships(@Param("id") Long id);

}
