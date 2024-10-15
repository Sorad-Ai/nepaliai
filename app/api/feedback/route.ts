import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

// Define the path to the JSON file
const filePath = path.join(process.cwd(), 'app/data/feedback.json');

// Server-side logic to handle feedback submission
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { name, email, feedback } = await request.json();

    // Read and parse the existing feedback data
    let feedbackData = [];
    try {
      feedbackData = JSON.parse(readFileSync(filePath, 'utf8'));
    } catch (err) {  // Use a different name or log it
      console.error('Error reading feedback file:', err); // Log the error
      feedbackData = []; // Start with an empty array if the file doesn't exist
    }

    // Add the new feedback to the list
    const newFeedback = { name, email, feedback };
    feedbackData.push(newFeedback);

    // Write the updated feedback data back to the JSON file
    writeFileSync(filePath, JSON.stringify(feedbackData, null, 2));

    // Return a success response
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving feedback:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

