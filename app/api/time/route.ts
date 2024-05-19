import { NextRequest } from "next/server"; // Import NextRequest

type ResponseData = {
  message: string | number; // Adjust message type to allow numbers (timezoneOffset)
};

export async function GET(req: NextRequest) {
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset();
  
  return Response.json({ message: timezoneOffset });
}