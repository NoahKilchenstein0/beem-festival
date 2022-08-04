package Domain;

import Domain.Content.Artist.Artist;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Repository muss instantiert werden
@Repository
public interface ArtistRepository extends CrudRepository<Artist, Long> {

    /**
     *
     * todo: Recherche Repository Annotationen und ggf. dieses Mal JPA nutzen?
     *
     *
     * */

    @Override
    <S extends Artist> S save(S entity);

    @Override
    Optional<Artist> findById(Long aLong);

    @Override
    Iterable<Artist> findAll();
}
