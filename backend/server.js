import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { OpenAI } from "openai"; //Import the OpenAI API client

// Load environment variables from .env file
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, //Put the OpenAI key in the .env file
})

// Get the current file and directory path (ESM-style)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS options to allow requests only from the frontend (local dev)
const corsOptions = { origin: ["http://localhost:5173"] };

// Initialize Express app and set the port
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for CORS and JSON parsing
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

/* ------------------ Lost Person Reports ------------------ */

// In-memory array to store reports (this data resets on server restart)
let reports = [];

// POST route to submit a new missing person report
app.post("/submit-report", (req, res) => {
    const { name, lastSeen, description, contact } = req.body;

    // Validate that all fields are present
    if (!name || !lastSeen || !description || !contact) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Construct new report object with timestamp
    const newReport = { 
        id: reports.length + 1, 
        name, 
        lastSeen, 
        description, 
        contact, 
        date: new Date().toLocaleString() 
    };

    // Add to reports array
    reports.push(newReport);

    console.log("New report submitted:", newReport);
    return res.status(201).json({ message: "Report submitted successfully", report: newReport });
});

/* ------------------ Crawler Text Data Endpoint ------------------ */

//Function to get the similarity index from LLM 
const getSimilarity = async( content1, content2 ) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Hello, GPT-4. You are an AI that measures a content similarity between webpages."},
                { role: "user", content: `You are an AI that compares two webpages to decide if their main textual content is semantically the same or largely redundant.
                    Respond **only** with "Yes" (if content is essentially the same) or "No" (if content is meaningfully different).
                    Page 1: ${content1}
                    Page 2: ${content2}` },
            ],
        });

        // Parse the response and return the similarity score
        const similarity = response.choices[0].message.content;
        return similarity;
    }catch(error) {
        console.error(`Error while comparing the content: ${error}.`);
        return 0; // In case of error, assume no similarity
    }
};

// Store previously crawled contents in memory
let previouslyCrawledContent = [];
let lastSessionID = null;

// Receives crawler's plain text content for a page and saves it to a file
app.post("/crawler-data", async (req, res) => {
    const { url, content, sessionId } = req.body;

    // Validate required fields
    if (!url || !content) {
        return res.status(400).json({ message: "URL and content are required!" });
    }

    if(lastSessionID !== sessionId) {
        previouslyCrawledContent = [];
        lastSessionID = sessionId;
        console.log(`New HTML session detected: ${sessionId}. Resetting previouslyCrawledContentAsHTML.`);
    }

    try {
        // Check similarity against previously crawled contents
        for( const previous of previouslyCrawledContent) {
            // Calculate similarity score between the current content and the previous content
            let similarityScore = await getSimilarity(content, previous.content);
            console.log(`Similarity between ${url} and ${previous.url}: ${similarityScore}.`);

            // If similarity score is Yes, mark it as a duplicate
            if(similarityScore === "Yes") {
                console.log(`Duplicate detected for ${url}(similar to ${previous.url}).`);
                return res.status(200).json({ message: `Duplicate content detected! Similar to: ${previous.url}, ${similarityScore}.`});
            }
        }

        // If content is not similar to any previously crawled content, save it in memory
        previouslyCrawledContent.push({url, content});

        // Ensure the logs directory exists
        const logDir = path.join(__dirname, "logs");
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        // Create a file (one per session) and append content with timestamp
        const fileName = `crawler_${sessionId}.txt`;
        const filePath = path.join(logDir, fileName);

        const timestamp = new Date().toISOString();
        const logData = `\n\n1.Timestamp: ${timestamp}\n2.URL: ${url}\n3.Content:\n${content}\n\n`;

        fs.appendFileSync(filePath, logData);

        console.log(`Log entry created for URL: ${url}`);
        return res.status(201).json({ message: "Crawler data saved successfully!" });
    } catch (error) {
        console.error(`Error saving crawler data: ${error.message}`);
        return res.status(500).json({ message: "Internal server error!" });
    }
});

/* ------------------ Crawler HTML data Endpoint ------------------ */

let previouslyCrawledContentAsHTML = [];
let lastHTMLSessionID = null;

// Receives crawler's full HTML content + optional screenshot info
app.post("/crawler-data-as-html", async (req, res) => {
    const { url, content, sessionId } = req.body;

    // Validate required fields
    if (!url || !content) {
        return res.status(400).json({ message: "Url and content are required!" });
    }

    if(lastHTMLSessionID !== sessionId) {
        previouslyCrawledContentAsHTML = [];
        lastHTMLSessionID = sessionId;
        console.log(`New HTML session detected: ${sessionId}. Resetting previouslyCrawledContentAsHTML.`);
    }

    try {
        // Check similarity against previously crawled contents
        for( const previous of previouslyCrawledContentAsHTML) {
            // Calculate similarity score between the current content and the previous content
            let similarityScore = await getSimilarity(content, previous.content);
            console.log(`Similarity between ${url} and ${previous.url}: ${similarityScore}.`);

            // If similarity score is Yes, mark it as a duplicate
            if(similarityScore === "Yes") {
                console.log(`Duplicate detected for ${url}(similar to ${previous.url}).`);
                return res.status(200).json({ message: `Duplicate content detected! Similar to: ${previous.url}, ${similarityScore}.`});
            }
        }

        // If content is not similar to any previously crawled content, save it in memory
        previouslyCrawledContentAsHTML.push({url, content});

        // Ensure the logs_as_HTML directory exists
        const logDir = path.join(__dirname, "logs_as_HTML");
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        // Create a log file for HTML content
        const fileName = `crawler_As_HTML${sessionId}.txt`;
        const filePath = path.join(logDir, fileName);

        const timestamp = new Date().toISOString();
        const logData = `\n\n1.Timestamp: ${timestamp}\n2.URL: ${url}\n3.Content: ${content}\n`;

        fs.appendFileSync(filePath, logData);

        console.log(`Log entry created for URL: ${url}.(as HTML)`);
        return res.status(201).json({ message: "Crawler data saved successfully!" });
    } catch (error) {
        console.log(`Error saving crawler data: ${error.message}.`);
        return res.status(500).json({ message: "Internal server error!" });
    }
});

/* ------------------ Start the Server ------------------ */

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});