export class Location {
  constructor(id, city, temp, tempC, icon, description, date) {
    this.id = id;
    this.city = city;
    this.temp = temp;
    this.tempC = tempC;
    this.icon = icon;
    this.description = description;
    this.date = date; // Store the Unix timestamp directly here
  }
}

export class SavedCities {
  constructor() {
    this.list = [];
    this.nextId = 0;
  }

  add(city, temp, tempC, icon, description, date) {
    let newLocation = new Location(
      this.nextId++,
      city,
      temp,
      tempC,
      icon,
      description,
      date
    );
    this.list.push(newLocation);
  }

  remove(locationId) {
    this.list = this.list.filter((location) => location.id !== locationId);
  }
}
