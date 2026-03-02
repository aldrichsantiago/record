import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"
import { loginSchema } from "@/lib/validations/auth"
import { users } from "@/db/schema/users"
import { db } from "@/db"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 1️⃣ Validate input
    const validated = loginSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: validated.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password } = validated.data

    // 2️⃣ Find user by email
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    const user = result[0]

    // 3️⃣ Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    // 4️⃣ Create JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

    const token = await new SignJWT({
      id: user.id,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret)

    // 5️⃣ Set HTTP-only cookie
    ;(await cookies()).set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })

    return NextResponse.json({
      message: "Login successful",
    })

  } catch (error: unknown) {
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