// backend/models/Session.js
class Session {
    constructor(id, student_id, mentor_id, duration, session_time) {
        this.id = id;
        this.student_id = student_id;
        this.mentor_id = mentor_id;
        this.duration = duration;
        this.session_time = session_time;
    }
}

module.exports = Session;