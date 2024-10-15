import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

// Define the path to the JSON file
const filePath = path.join(process.cwd(), 'app/data/games.json');

// Handle POST requests
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { sn } = await request.json();

    // Read and parse the JSON file
    const gamesData = JSON.parse(readFileSync(filePath, 'utf8'));

    // Find the index of the card with the given 'sn'
    const cardIndex = gamesData.findIndex((game: { sn: number }) => game.sn === sn);

    // If the card is not found, return an error response
    if (cardIndex === -1) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    // Increment the view count for the found card
    gamesData[cardIndex].view += 1;

    // Write the updated data back to the file
    writeFileSync(filePath, JSON.stringify(gamesData, null, 2));

    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    // Handle any errors
    console.error('Error updating view count:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
