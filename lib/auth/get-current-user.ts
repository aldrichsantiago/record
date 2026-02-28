import { cookies } from "next/headers"
import { jwtVerify } from "jose"

export async function getCurrentUser() {
  const token = (await cookies()).get("access_token")?.value
  if (!token) return null

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
  const { payload } = await jwtVerify(token, secret)

  return {
    id: payload.id as string,
    email: payload.email as string,
  }
}