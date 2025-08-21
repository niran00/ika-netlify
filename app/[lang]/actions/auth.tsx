"use server"

import fs from "fs/promises"
import path from "path"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import crypto from "crypto"
import oracledb from "oracledb"


const USERS_FILE = path.join(process.cwd(), "app", "data", "users.json")
const REGISTRATIONS_FILE = path.join(process.cwd(), "app", "data", "registrations.json")

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "app", "data")
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read users from JSON file
async function readUsers() {
  await ensureDataDirectory()
  try {
    const data = await fs.readFile(USERS_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, return empty array
    return []
  }
}

// Write users to JSON file
async function writeUsers(users) {
  await ensureDataDirectory()
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
}

// Read registrations from JSON file
async function readRegistrations() {
  await ensureDataDirectory()
  try {
    const data = await fs.readFile(REGISTRATIONS_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Write registrations to JSON file
async function writeRegistrations(registrations) {
  await ensureDataDirectory()
  await fs.writeFile(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2))
}

export async function loginUser(prevState, formData) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const users = await readUsers()
    const user = users.find((u) => u.email === email)

    if (!user) {
      return { error: "Invalid email or password" }
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return { error: "Invalid email or password" }
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set(
      "user-session",
      JSON.stringify({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    )

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    return { success: true, message: "Login successful!", user: userWithoutPassword }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An error occurred during login" }
  }
}

export async function registerUser(prevState, formData) {
  const email = formData.get("email")
  const password = formData.get("password")
  const title = formData.get("title")
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const phone = formData.get("phone")
  const company = formData.get("company")
  const department = formData.get("department")
  const address1 = formData.get("address1")
  const address2 = formData.get("address2")
  const zipCode = formData.get("zipCode")
  const city = formData.get("city")
  const country = formData.get("country")
  const state = formData.get("state")
  const privacyConsent = formData.get("privacyConsent") === "on"
  const marketingConsent = formData.get("marketingConsent") === "on"

  // Validation
  if (!email || !password || !firstName || !lastName || !privacyConsent) {
    return { error: "Please fill in all required fields and accept the privacy policy" }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" }
  }

  try {
    const users = await readUsers()
    const registrations = await readRegistrations()

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return { error: "An account with this email already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password: hashedPassword,
      title,
      firstName,
      lastName,
      phone,
      company,
      department,
      address1,
      address2,
      zipCode,
      city,
      country,
      state,
      privacyConsent,
      marketingConsent,
      createdAt: new Date().toISOString(),
    }

    // Create registration record
    const newRegistration = {
      id: (registrations.length + 1).toString(),
      email,
      title,
      firstName,
      lastName,
      phone,
      company,
      department,
      address1,
      address2,
      zipCode,
      city,
      country,
      state,
      privacyConsent,
      marketingConsent,
      registeredAt: new Date().toISOString(),
    }

    // Save to files
    users.push(newUser)
    registrations.push(newRegistration)

    await writeUsers(users)
    await writeRegistrations(registrations)

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set(
      "user-session",
      JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    )

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser
    return { success: true, message: "Registration successful!", user: userWithoutPassword }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "An error occurred during registration" }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("user-session")
  redirect("/")
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("user-session")

    if (!sessionCookie) {
      return null
    }

    const session = JSON.parse(sessionCookie.value)
    const users = await readUsers()
    const user = users.find((u) => u.ID === session.ID)

    if (!user) {
      return null
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

export async function updateUserProfile(prevState, formData) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("user-session")

    if (!sessionCookie) {
      return { error: "Not authenticated" }
    }

    const session = JSON.parse(sessionCookie.value)
    const users = await readUsers()
    const userIndex = users.findIndex((u) => u.id === session.id)

    if (userIndex === -1) {
      return { error: "User not found" }
    }

    // Update user data
    const updatedUser = {
      ...users[userIndex],
      title: formData.get("title"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      department: formData.get("department"),
      address1: formData.get("address1"),
      address2: formData.get("address2"),
      zipCode: formData.get("zipCode"),
      city: formData.get("city"),
      country: formData.get("country"),
      state: formData.get("state"),
      marketingConsent: formData.get("marketingConsent") === "on",
      updatedAt: new Date().toISOString(),
    }

    users[userIndex] = updatedUser
    await writeUsers(users)

    return { success: true, message: "Profile updated successfully!" }
  } catch (error) {
    console.error("Update profile error:", error)
    return { error: "An error occurred while updating profile" }
  }
}


export async function loginUserDB(formData: FormData) {
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT_STRING,
    })

    const result = await connection.execute(
      `SELECT USER_ID, EMAIL, PASSWORD, FIRST_NAME, LAST_NAME 
       FROM IKA.USERS 
       WHERE EMAIL = :email`,
      [email],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    )

    await connection.close()

    if (!result.rows || result.rows.length === 0) {
      return { error: "Invalid email or password" }
    }

    const user = result.rows[0] as any

    // Compute MD5 hash of the input password
    const hashedInput = crypto.createHash("md5").update(password).digest("hex")

    if (user.PASSWORD !== hashedInput) {
      return { error: "Invalid email or password" }
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set(
      "user-session",
      JSON.stringify({
        id: user.ID,
        email: user.EMAIL,
        firstName: user.FIRST_NAME,
        lastName: user.LAST_NAME,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      }

      
    )

    return {
      success: true,
      message: "Login successful!",
      user: {
        id: user.ID,
        email: user.EMAIL,
        firstName: user.FIRST_NAME,
        lastName: user.LAST_NAME,
      },
    }
  } catch (err: any) {
    console.error("Oracle login error:", err)
    return { error: "An error occurred during login" }
  }
}
