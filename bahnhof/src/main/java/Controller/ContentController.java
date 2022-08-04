package Controller;

import Controller.DTC.ArtistDTO;
import Domain.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RestController
public class ContentController {

    private final ArtistRepository artistRepository;


    @Autowired
    ContentController(ArtistRepository artistRepository){
        this.artistRepository = artistRepository;
    }

    @GetMapping("/content/artist/list")
    public List<ArtistDTO> getAllArtists(){
        List<ArtistDTO> artistList = new LinkedList<>();
        /**
         * Return List<ArtistDTO
         * */
        return artistList;
    }



}
