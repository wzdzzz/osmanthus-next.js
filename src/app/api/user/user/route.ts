export const GET = (request: Request) => {
  const token = request.headers.get("Authorization")

  if (!token) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  return Response.json({
    name: "wzd",
    age: "18",
  })
}
