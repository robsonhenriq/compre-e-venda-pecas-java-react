package br.com.compreevendapecas.ecommerce.repository;

import br.com.compreevendapecas.ecommerce.domain.Vendedor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Vendedor entity.
 */
@Repository
public interface VendedorRepository extends JpaRepository<Vendedor, Long> {

    @Query(value = "select distinct vendedor from Vendedor vendedor left join fetch vendedor.listProdutos",
        countQuery = "select count(distinct vendedor) from Vendedor vendedor")
    Page<Vendedor> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct vendedor from Vendedor vendedor left join fetch vendedor.listProdutos")
    List<Vendedor> findAllWithEagerRelationships();

    @Query("select vendedor from Vendedor vendedor left join fetch vendedor.listProdutos where vendedor.id =:id")
    Optional<Vendedor> findOneWithEagerRelationships(@Param("id") Long id);

}
