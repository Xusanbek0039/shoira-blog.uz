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
app.use(express.json()) // JSON body parser

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB ga muvaffaqiyatli ulandi"))
  .catch((err) => console.error("MongoDB ga ulanishda xatolik:", err));

// Auth middleware - foydalanuvchini token orqali tekshiradi
const auth = async (req, res, next) => {
  try {
    // Header dan tokenni olish
    const authHeader = req.header("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" })
    }
    const token = authHeader.replace("Bearer ", "")

    // Tokenni tekshirish
    const decoded = jwt.verify(token, JWT_SECRET)

    // Foydalanuvchini topish
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: "Foydalanuvchi topilmadi" })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: "Avtorizatsiya xatosi" })
  }
}

// ROUTES

// Ro'yxatdan o'tish (Register)
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Inputni tekshirish (basic)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Barcha maydonlar to‘ldirilishi kerak" })
    }

    // Email orqali foydalanuvchi borligini tekshirish
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "Foydalanuvchi allaqachon mavjud" })
    }

    // Parolni hash qilish
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Yangi foydalanuvchi yaratish
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })
    await user.save()

    // JWT token yaratish
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

// Kirish (Login)
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email va parol kerak" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Noto'g'ri email yoki parol" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Noto'g'ri email yoki parol" })
    }

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

// Profilni yangilash (protected)
app.put("/api/users/profile", auth, async (req, res) => {
  try {
    const { name, email } = req.body

    if (!name && !email) {
      return res.status(400).json({ message: "Hech qanday ma'lumot kiritilmadi" })
    }

    // Emailni boshqa foydalanuvchi ishlatayotganligini tekshirish
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: "Bu email allaqachon ishlatilmoqda" })
      }
    }

    // Foydalanuvchini yangilash
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

// Parolni o'zgartirish (protected)
app.put("/api/users/password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Ikkala parol ham kiritilishi kerak" })
    }

    const user = await User.findById(req.user._id)

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Joriy parol noto'g'ri" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    await user.save()

    res.json({ message: "Parol muvaffaqiyatli o'zgartirildi" })
  } catch (error) {
    console.error("Change password error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Barcha maqolalarni olish (public)
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 })
    res.json(articles)
  } catch (error) {
    console.error("Get articles error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Foydalanuvchining maqolalari (protected)
app.get("/api/articles/user", auth, async (req, res) => {
  try {
    const articles = await Article.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(articles)
  } catch (error) {
    console.error("Get user articles error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Bitta maqolani olish (public)
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

// Yangi maqola yaratish (protected)
app.post("/api/articles", auth, async (req, res) => {
  try {
    const { title, content, image } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: "Sarlavha va kontent majburiy" })
    }

    const newArticle = new Article({
      title,
      content,
      image: image || "",
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

// Maqolani yangilash (protected)
app.put("/api/articles/:id", auth, async (req, res) => {
  try {
    const { title, content, image } = req.body
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({ message: "Maqola topilmadi" })
    }

    // Maqola egasi ekanligini tekshirish
    if (article.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Ruxsat berilmagan" })
    }

    if (title) article.title = title
    if (content) article.content = content
    if (image !== undefined) article.image = image

    await article.save()
    res.json(article)
  } catch (error) {
    console.error("Update article error:", error)
    res.status(500).json({ message: "Server xatosi" })
  }
})

// Maqolani o'chirish (protected)
app.delete("/api/articles/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({ message: "Maqola topilmadi" })
    }

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

// Server sog‘ligi (health check)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server ishga tayyor" })
})

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`)
})
