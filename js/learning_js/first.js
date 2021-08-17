const person = {
    name: "Faheem",
    country: "India",
    getDetails: function(){
        return `${this.name} belongs to ${this.country}`;
    }
  }
  
  console.log(person.name); // "Faheem"
  console.log(person.getDetails()); //"Faheem belongs to India"