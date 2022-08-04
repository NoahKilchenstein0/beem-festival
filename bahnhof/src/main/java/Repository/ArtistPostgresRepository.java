package Repository;

import Domain.ArtistRepository;
import Domain.Content.Artist.Artist;

import java.util.Optional;

public abstract class ArtistPostgresRepository implements ArtistRepository {
    /**
     * Datenbankanbindung hier einfügen
     * */

    @Override
    public <S extends Artist> S save(S entity) {
        return null;
    }

    @Override
    public Optional<Artist> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public Iterable<Artist> findAll() {
        return null;
    }
}
