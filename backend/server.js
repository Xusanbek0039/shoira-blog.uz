import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Models
import User from "./models/User.js"
import Article from "./models/Article.js"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const MONGODB_URI = process.env.MONGODB_URI
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*"

// Middleware
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
)
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB ga muvaffaqiyatli ulandi"))
  .catch((err) => console.error("MongoDB ga ulanishda xatolik:", err))

// Log environment variables (without sensitive data)
console.log("Server running with:")
console.log("PORT:", PORT)
console.log("CORS_ORIGIN:", CORS_ORIGIN)
console.log("MONGODB_URI:", MONGODB_URI ? "Connected" : "Not configured")
console.log("JWT_SECRET:", JWT_SECRET ? "Configured" : "Not configured")

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: "Foydalanuvchi topilmadi" })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Avtorizatsiya xatosi" })
  }
}

// Routes

// Register user
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "Foydalanuvchi allaqachon mavjud" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30d" })

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Register error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Login user
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Noto'g'ri email yoki parol" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Noto'g'ri email yoki parol" })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30d" })

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Update user profile
app.put("/api/users/profile", auth, async (req, res) => {
  try {
    const { name, email } = req.body

    // Check if email is already taken by another user
    if (email !== req.user.email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: "Bu email allaqachon ishlatilmoqda" })
      }
    }

    // Update user
    const user = await User.findById(req.user._id)
    if (name) user.name = name
    if (email) user.email = email

    await user.save()

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Change password
app.put("/api/users/password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Check current password
    const user = await User.findById(req.user._id)
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Joriy parol noto'g'ri" })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update password
    user.password = hashedPassword
    await user.save()

    res.json({ message: "Parol muvaffaqiyatli o'zgartirildi" })
  } catch (error) {
    console.error("Change password error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Get all articles
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 })
    res.json(articles)
  } catch (error) {
    console.error("Get articles error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Get user's articles
app.get("/api/articles/user", auth, async (req, res) => {
  try {
    const articles = await Article.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(articles)
  } catch (error) {
    console.error("Get user articles error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Get single article
app.get("/api/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({ message: "Maqola topilmadi" })
    }

    res.json(article)
  } catch (error) {
    console.error("Get article error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Create article (protected)
app.post("/api/articles", auth, async (req, res) => {
  try {
    const { title, content, image } = req.body

    const newArticle = new Article({
      title,
      content,
      image,
      author: req.user.name,
      user: req.user._id,
    })

    await newArticle.save()
    res.status(201).json(newArticle)
  } catch (error) {
    console.error("Create article error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Update article (protected)
app.put("/api/articles/:id", auth, async (req, res) => {
  try {
    const { title, content, image } = req.body
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({ message: "Maqola topilmadi" })
    }

    // Check if user owns the article
    if (article.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Ruxsat berilmagan" })
    }

    // Update article
    article.title = title
    article.content = content
    article.image = image

    await article.save()
    res.json(article)
  } catch (error) {
    console.error("Update article error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Delete article (protected)
app.delete("/api/articles/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({ message: "Maqola topilmadi" })
    }

    // Check if user owns the article
    if (article.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Ruxsat berilmagan" })
    }

    await article.deleteOne()
    res.json({ message: "Maqola o'chirildi" })
  } catch (error) {
    console.error("Delete article error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`)
})
