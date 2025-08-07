import { NextRequest } from "next/server";

export function POST(request: NextRequest) {
  const body = request.body;
  console.log(body);
}
