const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    company: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["Applied", "Interview", "Rejected", "Selected"],
        default: "Applied"
    },

    jobLocation: {
        type: String,
        trim: true,
        default: ""
    },

    jobType: {
        type: String,
        enum: ["Internship", "Full-time", "Part-time", "Contract", ""],
        default: ""
    },

    salary: {
        type: String,
        trim: true,
        default: ""
    },

    jobLink: {
        type: String,
        trim: true,
        default: ""
    },

    notes: {
        type: String,
        trim: true,
        default: ""
    },

    followUpDate: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Application", applicationSchema);