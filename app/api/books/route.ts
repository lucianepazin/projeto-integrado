import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const { id } = request.params;
  // const book = await prisma.book.findUnique({
  //   where: {
  //     id: Number(id),
  //   },
  // });
  return NextResponse.json({
    title: "Lord of the Rings",
    imageUrl: "/book-cover.jpg",
    description:
      "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
  });
}
// export const handlers = [
//   rest.get("https://my.backend/book", (_req, res, ctx) => {
//     return res(
//       ctx.json<Book>(),
//     );
//   }),
//   rest.get("/reviews", (_req, res, ctx) => {
//     return res(
//       ctx.json<Review[]>([
//         {
//           id: "60333292-7ca1-4361-bf38-b6b43b90cb16",
//           author: "John Maverick",
//           text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The trilogy is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
//         },
//       ]),
//     );
//   }),
//   rest.get("/dogs", (_req, res, ctx) => {
//     return res(ctx.json(response));
//   }),
// ];
