// backend/models/Mentor.js
class Mentor {
    constructor(id, name, area_of_interest, available_time) {
        this.id = id;
        this.name = name;
        this.area_of_interest = area_of_interest;
        this.available_time = available_time;
    }
}

module.exports = Mentor;