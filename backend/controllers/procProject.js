const procProject = require('../Models/ProcProject');
const path = require("path");
const procRequest = require('../Models/procReqest');



exports.generateProjectId = async (req, res) => {
  try {
    // Determine the latest project
    const latestProject = await procProject.findOne({}, {}, { sort: { projectId: -1 } });

    // Generate a new project ID based on the latest project ID or start with 001 if no projects exist
    const newProjectId = latestProject
      ? getNextProjectId(latestProject.projectId)
      : 'RUH_ENG_NCB_C_2024_001';

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
  const lastPart = parseInt(parts.pop().split(/[^0-9]/).pop(), 10);
  const incrementedPart = (lastPart + 1).toString().padStart(3, '0');
  const yearPart = new Date().getFullYear();
  return `RUH_ENG_NCB_C_${yearPart}_${incrementedPart}`;
}



// Function to fetch data from the database based on request IDs
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
}

// Controller function to add request data to the Procurement Project
exports.addRequestsData = async (req, res) => {
  try {
    const { requestIds } = req.body;
    const { projectId } = req.params;

    // Fetch data related to the selected request IDs from the database
    const requestData = await fetchDataFromDatabase(requestIds);

    // Find the Procurement Project by projectId
    const project = await procProject.findOne({ projectId });

    // If project not found, handle error
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Push the fetched data into the procurementRequests field of the project
    project.procurementRequests.push(...requestData);

    // Save the updated project to the database
    await project.save();

    res.status(200).json({ message: "Request data added successfully" });
  } catch (error) {
    console.error("Error adding request data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.viewAddedRequests = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the Procurement Project by projectId
    const project = await procProject.findOne({ projectId }).select('procurementRequests');

    // If project not found, handle error
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    

    res.status(200).json(project.procurementRequests);
  } catch (error) {
    console.error("Error fetching added requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





// Controller function to create a new Procurement Project
exports.createProject = async (req, res) => {

  
    const projectId = req.params.projectId;
    const { projectTitle, biddingType, closingDate, closingTime, appointTEC, appointBOCommite } = req.body;

    try { 
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

exports.viewAllProjects = async (req, res) => {
  try {
    // Fetch all requests from the database
    const allProjects = await procProject.find();

    // Send the list of requests as a response
    res.json(allProjects);
  } catch (error) {
    console.error("Error fetching all projects:", error);
    // Handle errors and send an appropriate response
    res.status(500).json({ error: error.message });
  }
};



exports.viewProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the request by ID
    const project = await procReqest.findOne({ projectId });

    if (!project) {
      return res.status(404).json({ error: "project not found" });
    }

    // Send the request as a response
    res.json(project);
  } catch (error) {
    console.error("Error fetching request by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProject = async (req, res) => {
  let projectId = req.params.id;

  try {
    await procProject.findByIdAndDelete(projectId);
    res.status(200).send({ status: "Project is deleted" });
  } catch (err) {
    res.status(500).send({ status: "Error with delete request" });
  }
};