package Controller.DTC;

import Domain.Content.Artist.ArtistMedia;

import java.util.Map;

public class ArtistDTO {


    /**  private String name;
         private boolean solo;
         private Map<ArtistMedia, String> mediaURLs;
         private String imageURL;
         private String description;
         private String genre;
         private String origin; // locally
     */

    private String name;
    private boolean solo;
    private String spotify;
    // evtl. keine Map verschicken - schauen was lückel davon hält
    private Map<ArtistMedia, String> mediaURLs;
    private String imageURL;
    private String description;
    private String genre;
    private String origin;

    public ArtistDTO(String name, boolean solo, String spotify, Map<ArtistMedia, String> mediaURLs, String imageURL, String description, String genre, String origin) {
        this.name = name;
        this.solo = solo;
        this.spotify = spotify;
        this.mediaURLs = mediaURLs;
        this.imageURL = imageURL;
        this.description = description;
        this.genre = genre;
        this.origin = origin;
    }
}
