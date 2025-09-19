import { PuppeteerCrawler } from "crawlee";

// Session ID based on current timestamp (used for log file names)
const sessionId = Date.now();

// Initialize PuppeteerCrawler instance
const crawler = new PuppeteerCrawler({
    // Main logic for each page the crawler visits
    async requestHandler({ page, request, enqueueLinks, log }) {
        // Wait for the main content container to be available
        await page.waitForSelector('body');

        //variables used later for the content extraction
        let content;
        let contentAsHTML;
        let clockTime = null;

        // Handle special logic for the /Rules page where a dynamic clock is present
        if (request.url.includes("/Rules")) {
            // Wait for the clock container to render
            await page.waitForSelector(".clock-container");

            // Get the initial clock time
            const initialTime = await page.$eval(".clock", el => el.textContent.trim());
            log.info(`Initial clock time on /Rules: ${initialTime}`);

            // Wait until the clock updates to a new value
            await page.waitForFunction(
                (prevTime) => {
                    const el = document.querySelector(".clock");
                    return el && el.textContent.trim() !== prevTime;
                },
                {},
                initialTime // Pass previous time as an argument
            );

            // Fetch the updated clock time
            clockTime = await page.$eval(".clock", el => el.textContent.trim());
            log.info(`Updated clock time on /Rules: ${clockTime}`);

            // Extract full text content from the body
            content = await page.evaluate(() => document.body.innerText);

            // Extract HTML content of the body
            contentAsHTML = await page.evaluate(() => document.body.innerHTML);

        } else {
            // For all other pages: grab body text and HTML content
            content = await page.evaluate(() => document.body.innerText);
            contentAsHTML = await page.evaluate(() => document.body.innerHTML);
        }

        // Send text content to the backend server
        try {
            const response = await fetch("http://localhost:8080/crawler-data", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: request.url, content, sessionId }),
            });

            if (!response.ok) {
                log.warning(`Failed to send data to the backend for ${request.url}.`);
            } else {
                log.info(`Successfully sent data to the backend for ${request.url}.`);
            }
        } catch (error) {
            log.error(`Error sending data to the backend: ${error}.`);
        }

        // Send HTML content to a separate backend endpoint
        try {
            const response_as_HTML = await fetch("http://localhost:8080/crawler-data-as-html", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: request.url, content: contentAsHTML, sessionId }),
            });

            if (!response_as_HTML.ok) {
                log.warning(`Failed to send data as HTML to the backend for ${request.url}.`);
            } else {
                log.info(`Successfully sent data as HTML to the backend for ${request.url}.`);
            }
        } catch (error) {
            log.error(`Error sending data as HTML to the backend: ${error}.`);
        }

        // Enqueue all links on the page for crawling
        await enqueueLinks({
            selector: 'a',      // Select all anchor tags
            strategy: 'all'     // Enqueue all links found
        });
    }
});

// Start the crawler on the initial page (usually your frontend running locally)
await crawler.run(['http://localhost:5173']);

// ===============================================
// Notes & Ideas:
// - Crawler extention to take screenshots
// - Saving screenshots, text, and HTML together gives you a full snapshot of a page
// ===============================================