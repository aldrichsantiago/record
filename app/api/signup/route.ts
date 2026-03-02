import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db } from "@/db"
import { users } from "@/db/schema/users"
import { registerSchema } from "@/lib/validations/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    /**
     * 1️⃣ Validate Input
     */
    const validated = registerSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: validated.error.flatten(),
        },
        { status: 400 }
      )
    }

    let { name, email, password } = validated.data

    email = email.toLowerCase().trim()

    /**
     * 2️⃣ Check Existing User
     */
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      )
    }

    /**
     * 3️⃣ Hash Password
     */
    const hashedPassword = await bcrypt.hash(password, 12)

    /**
     * 4️⃣ Insert User
     */
    const [newUser] = await db
      .insert(users)
      .values({
        name: name,
        email: email,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
      })

    /**
     * 5️⃣ Generate JWT
     */
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    /**
     * 6️⃣ Set Secure Cookie
     */
    (await cookies()).set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    /**
     * 7️⃣ Return Safe Response
     */
    return NextResponse.json(
      {
        message: "Signup successful",
        user: newUser,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("REGISTER_ERROR:", error)

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}