export const GET = (request: Request) => {
  const token = request.headers.get("Authorization")?.split(" ")[1]
  console.log(typeof token, "xxx")
  if (!token || token === "undefined") {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  return Response.json([
    {
      name: "aaa",
      age: "18",
    },
    {
      name: "bbb",
      age: "20",
    },
  ])
}
