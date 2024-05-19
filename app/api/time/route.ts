import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string
}

const date = new Date();
const timezoneOffset = date.getTimezoneOffset();
 
export function GET(
    req: NextApiRequest,
  ) {
    return Response.json({ message: timezoneOffset })
  }