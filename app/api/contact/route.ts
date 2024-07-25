import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  // 여기서 이메일 전송이나 데이터베이스 저장 등의 작업을 수행합니다.

  return NextResponse.json({ message: "Message received" }, { status: 200 });
}
