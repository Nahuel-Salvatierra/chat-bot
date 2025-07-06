import { messageService } from "@/services/api/message-service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await messageService.getMessages(token);
  return NextResponse.json(messages);
}
