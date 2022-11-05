export class NavItem {
    constructor(name: string, description: string, route: string){
        this.name = name;
        this.description = description;
        this.route = route;
    }    
    name: string = "";
    description: string = "";
    route: string = "";
}
