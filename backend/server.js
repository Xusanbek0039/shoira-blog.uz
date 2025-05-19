import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Models
import User from "./models/User.js"
import Article from "./models/Article.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
const MONGODB_URI =
  "mongodb+srv://itpark0071:Hxqtth70FbKC33vg@cluster0.lbsq5kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB ga muvaffaqiyatli ulandi"))
  .catch((err) => console.error("MongoDB ga ulanishda xatolik:", err))

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

// Start server
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`)
})
