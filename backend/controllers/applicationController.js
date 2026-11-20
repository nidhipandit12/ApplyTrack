const Application = require("../models/Application");

// Allowed fields
const allowedFields = [
    "company",
    "role",
    "date",
    "status",
    "jobLocation",
    "jobType",
    "salary",
    "jobLink",
    "notes",
    "followUpDate"
];

// Get all applications of logged-in user
const getApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create application
const createApplication = async (req, res) => {
    try {
        const applicationData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                applicationData[field] = req.body[field];
            }
        });

        applicationData.user = req.user._id;

        const application = await Application.create(applicationData);

        res.status(201).json(application);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update application
const updateApplication = async (req, res) => {
    try {
        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const application = await Application.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json(application);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete application
const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Application deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getApplications,
    createApplication,
    updateApplication,
    deleteApplication
};