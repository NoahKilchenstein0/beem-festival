package Domain.Services;

import Domain.ArtistRepository;

public class ArtistListService {

    /**
     *
     * todo Service Annotationen(?)
     * DOM Objekte + Kommunikation mit Repository
     *
     *
     * */

    ArtistRepository artistRepository;


    public ArtistListService(ArtistRepository artistRepository){
        this.artistRepository = artistRepository;
    }



}
