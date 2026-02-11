public interface MerchantRepository extends Repository<Object, Long> {
    
    @Query(
        // ruleid: java-pattern-146-sql-injection-spring-data-jpa
        value = "update merchant set mer_alias = :alias, mer_modified_at = now() where uuid" + Uuid,
        nativeQuery = true
    )

    @Query(
        // ruleid: java-pattern-146-sql-injection-spring-data-jpa
        value = "select * from merchant where id = " + Integer.parseInt(id),
        nativeQuery = true
    )
    Merchant find(String id);



}
