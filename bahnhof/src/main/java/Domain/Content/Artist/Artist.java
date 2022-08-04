package Domain.Content.Artist;

import java.net.URL;
import java.util.Map;

public class Artist {
    /**
     *
     * Class to collect the whole amount of Information for Artists
     *
     * */

    private String name;
    // Java URL untersuchen; Imageeinbindung überprüfen
    // the media-map should be used to collect all information available
    // evtl. Strings auch in Map/Liste packen
    private Map<ArtistMedia, String> mediaURLs;
    private boolean solo = false;
    private String imageURL = "";
    private String description = "";
    private String genre = "";
    private String origin = ""; // locally

    // absolute minimum constructor (media can be empty)
    public Artist(String name, Map<ArtistMedia, String> mediaURLs){
        this.name = name;
        this.mediaURLs = mediaURLs;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isSolo() {
        return solo;
    }

    public void setSolo(boolean solo) {
        this.solo = solo;
    }

    public Map<ArtistMedia, String> getMediaURLs() {
        return mediaURLs;
    }

    public void setMediaURLs(Map<ArtistMedia, String> mediaURLs) {
        this.mediaURLs = mediaURLs;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }
}
