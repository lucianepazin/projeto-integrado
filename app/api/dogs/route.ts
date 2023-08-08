import response from "mocks/response.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const { id } = request.params;
  // const book = await prisma.book.findUnique({
  //   where: {
  //     id: Number(id),
  //   },
  // });
  return NextResponse.json(response);
}
