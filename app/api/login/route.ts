import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import * as z from "zod"
import { loginSchema } from "@/lib/validations/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // VALIDATION OF INPUTS
    const validated = loginSchema.safeParse(body)
    if (!validated.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: validated.error.flatten() },
        { status: 400 }
      )
    }
    
    const { email, password } = validated.data
    const token = "fake-jwt-token"

    /**
     * 🔥 Replace this with real DB check
     */
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Simulating DB check for:", { email, password })
    
    if (email !== "admin@example.com" || password !== "password123") {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }

    /**
     * 🔐 Set HTTP-only cookie
     */
    (await cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })

    return NextResponse.json({
      message: "Login successful",
    })

  } catch (error: {errors?: z.ZodIssue[]} | unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}