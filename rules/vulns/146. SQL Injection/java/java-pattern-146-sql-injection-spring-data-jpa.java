package com.example.demo.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface MerchantRepository extends Repository<Object, Long> {

    @Query(
        value = "update merchant set mer_alias = :alias, mer_modified_at = now() where uuid" + Uuid,
        nativeQuery = true
    )
    void updateAlias(@Param("alias") String alias, @Param("Uuid") String Uuid);


    /**
     * ❌ VULNERABLE: SQL Injection
     * Se concatena directamente el parámetro "uuid" en la query nativa.
     */
    @Modifying
    @Transactional
    @Query(
        value = "update merchant " +
                "set mer_alias = :alias, mer_modified_at = now() " +
                "where uuid = '" + "' + :uuid",
        nativeQuery = true
    )
    void updateAliasVulnerable(
        @Param("alias") String alias,
        @Param("uuid") String uuid
    );

    /**
     * ✅ SEGURO: Uso correcto de parámetros
     */
    @Modifying
    @Transactional
    @Query(
        value = """
            update merchant
            set mer_alias = :alias,
                mer_modified_at = now()
            where uuid = :uuid
        """,
        nativeQuery = true
    )
    void updateAliasSafe(
        @Param("alias") String alias,
        @Param("uuid") String uuid
    );

}
