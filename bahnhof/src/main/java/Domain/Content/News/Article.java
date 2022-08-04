package Domain.Content.News;

public class Article {
    /**
     *
     * ggf. sinnvolle Library finden
     * ggf. Ähnlich wie bei Artist machen & Map<ENUM, String> benutzen
     * Welche Pflichtfelder?
     * */

    private int id;
    private String author;
    private String headline;
    private String title;
    private String body;
    private String pageTitle;
    private String foddoURL;

    public Article(int id){
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }

    public String getFoddoURL() {
        return foddoURL;
    }

    public void setFoddoURL(String foddoURL) {
        this.foddoURL = foddoURL;
    }
}
