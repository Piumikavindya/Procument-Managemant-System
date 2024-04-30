const procProject = require('../Models/ProcProject');
const path = require("path");
const procRequest = require('../Models/procReqest');

// Generate Project ID
exports.generateProjectId = async (req, res) => {
    try {
        // Determine the latest project
        const latestProject = await procProject.findOne({}, {}, { sort: { projectId: -1 } });

        // Extract year from the current date
       
        // Generate a new project ID based on the latest project ID or start with 001 if no projects exist
        const newProjectId = latestProject
            ? getNextProjectId(latestProject.projectId)
            : `RUH/ENG/NCB/C/2024/001`;

        // Create a new instance of the model
        const newProjectInstance = new procProject({
            projectId: newProjectId,
            // Add other relevant fields here
        });

        // Save the instance to the database
        const savedProject = await newProjectInstance.save();

        // Respond with the generated ID and the saved document
        res.json({ projectId: savedProject.projectId, savedProject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the next project ID
function getNextProjectId(previousProjectId) {
    const parts = previousProjectId.split('/');
    const lastPart = parseInt(parts.pop().replace(/^0+/, ''), 10);
    const incrementedPart = (lastPart + 1).toString().padStart(3, '0');
    return [...parts, incrementedPart].join('/');
}

// Function to get the initials from a string
function getInitials(str) {
    return str.split(' ').map(part => part.charAt(0).toUpperCase()).join('');
}




async function fetchDataFromDatabase(requestIds) {
  try {
    // Fetch data from the database based on the provided request IDs
    const requestData = await procRequest.find({ requestId: { $in: requestIds } });

    return requestData;
  } catch (error) {
    // Handle any errors
    console.error('Error fetching data from database:', error);
    throw error;
  }


}exports.addRequestsData = async (req, res) => {
  try {
    const { projectId, requestIds } = req.body;

    // Fetch data related to the selected request IDs from the database
    const requestData = await fetchDataFromDatabase(requestIds);

    // Find the Procurement Project by projectId
    const project = await procProject.findOne({ projectId });

    // If project not found, handle error
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Add fetched data to the Procurement Project's procurementRequests field
    project.procurementRequests.push(...requestData);

    // Save the updated project to the database
    await project.save();

    res.status(200).json({ message: "Request data added successfully" });
  } catch (error) {
    console.error("Error adding request data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to create a new Procurement Project
exports.createProject = async (req, res) => {
  try {
    // const projectId = req.params.projectId;
    const { projectTitle, biddingType, closingDate, closingTime, appointTEC, appointBOCommite } = req.body;

    // Check if a project with the same project ID already exists
    const existingProject = await procProject.findOne({ projectId });

    if (existingProject) {
      // Update the existing project with the new data
      existingProject.projectTitle = projectTitle;
      existingProject.biddingType = biddingType;
      existingProject.closingDate = closingDate;
      existingProject.closingTime = closingTime;
      existingProject.appointTEC = appointTEC;
      existingProject.appointBOCommite = appointBOCommite;

      // Save the updated project to the database
      const updatedProject = await existingProject.save();

      // Send the updated project as a response
      res.status(200).json(updatedProject);
    } else {
      // Create a new project instance
      const newProject = new procProject({
        projectId, // Use the provided projectId
        projectTitle,
        biddingType,
        closingDate,
        closingTime,
        appointTEC,
        appointBOCommite,
      });

      // Save the new project to the database
      const createdProject = await newProject.save();

      // Send the created project as a response
      res.status(201).json(createdProject);
    }
  } catch (error) {
    console.error('Error creating project:', error);
    // Handle errors and send an appropriate response
    res.status(500).json({ error: 'Error creating project', message: error.message });
  }
};
