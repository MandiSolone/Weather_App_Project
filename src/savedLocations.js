export class Location {
    constructor (id, city, temp, description){
        this.id = id; 
        this.city = city; 
        this.temp = temp; 
        this.description = description; 
    }
}

export class SavedCities {
    constructor() {
        this.list = []; 
        this.nextId = 0; 
    }

add(city, temp, description) {
    let newLocation = new Location (this.nextId++, city, temp, description);
    this.list.push(newLocation);
}

remove(locationId){
    this.list = this.list.filter(location => location.id !== locationId)
}
}
