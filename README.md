# 📚 shoira-blog.uz

`shoira-blog.uz` — bu zamonaviy, xavfsiz va interaktiv blog platformasi bo‘lib, foydalanuvchilarga o‘z maqolalarini yozish, ularni tahrirlash va boshqalar bilan bo‘lishish imkonini beradi. Sayt to‘liq **mobilga mos**, **3 tilda** ishlaydi (O‘zbek, Rus, Ingliz), va foydalanuvchi qulayligi uchun **Dark / Light rejim** bilan jihozlangan.

![Loyiha rasmi](https://xusanbek0039.github.io/shoira-blog.uz/images/aboud-for-github.png)

## 🌐 Onlayn manzillar

- 🔗 Sayt: [https://shoira-blog.uz](https://shoira-blog.uz)
- 🔗 API: [https://shoira-blog-uz-api.vercel.app](https://shoira-blog-uz-api.vercel.app)

## 🚀 Asosiy imkoniyatlar

### 🔤 1. Ko‘p tilli qo‘llab-quvvatlash

`shoira-blog.uz` platformasi **3 ta til**da ishlaydi:

- 🇺🇿 O‘zbekcha
- 🇷🇺 Русский (Ruscha)
- 🇬🇧 English (Inglizcha)

Foydalanuvchi saytning istalgan joyida tilni almashtirishi mumkin, va sayt tarkibi avtomatik tarzda yangilanadi.

---

### 🌗 2. Dark / Light rejim

Sayt foydalanuvchining didiga qarab **qorong‘i (Dark)** yoki **yorug‘ (Light)** rejimga o‘tishi mumkin. Bu holat foydalanuvchi tanloviga qarab brauzerda saqlanadi.

---

### 📝 3. Maqolalar bilan ishlash

- Foydalanuvchilar **ro‘yxatdan o‘tib**, maqola yozishlari mumkin.
- Har bir maqola quyidagilarni o‘z ichiga oladi:
  - Sarlavha
  - Kontent
  - Tasvir (rasm)
  - Muallif va sana

🔒 Maqolalar **MongoDB** bazasida saqlanadi va REST API orqali ishlov beriladi:  
API manzili: [https://shoira-blog-uz-api.vercel.app](https://shoira-blog-uz-api.vercel.app)

---

### 👨‍🎓 4. Foydalanuvchi sahifalari

Ro‘yxatdan o‘tgan foydalanuvchilar quyidagi imkoniyatlarga ega:

- 🔐 Profilga kirish / sozlash
- 🧾 Shaxsiy maqolalarni ko‘rish va tahrirlash
- 🧑‍💻 **Portfolio qo‘shish** – foydalanuvchi o‘z shaxsiy loyihalarini kiritib, namoyish qilishi mumkin
- 📜 Sertifikatlar yoki yutuqlarni qo‘shish (kelajakda)

---

## 🧰 Texnologiyalar

- **Frontend**: TypeScript, React, Next.js
- **Stil**: Tailwind CSS + Framer Motion (animatsiyalar)
- **Ikonlar**: Lucide Icons
- **Tilni boshqarish**: `i18next`
- **Ma’lumotlar bazasi**: MongoDB
- **Autentifikatsiya**: Token (JWT) asosida

---

## 📂 Loyihaning struktura namunasi
# 📚 shoira-blog.uz

`shoira-blog.uz` is a modern, secure, and interactive blog platform that allows users to write, edit, and share their own articles. The site is fully **mobile responsive**, supports **3 languages** (Uzbek, Russian, English), and offers a **Dark / Light mode** for user convenience.

![Project preview](https://xusanbek0039.github.io/shoira-blog.uz/images/aboud-for-github.png)

## 🌐 Live Links

- 🔗 Website: [https://shoira-blog.uz](https://shoira-blog.uz)
- 🔗 API: [https://shoira-blog-uz-api.vercel.app](https://shoira-blog-uz-api.vercel.app)

## 🚀 Key Features

### 🔤 1. Multilingual Support

`shoira-blog.uz` supports **three languages**:

- 🇺🇿 Uzbek
- 🇷🇺 Russian
- 🇬🇧 English

Users can change the language from anywhere on the site, and content will update automatically based on their selection.

---

### 🌗 2. Dark / Light Mode

Users can switch between **dark** and **light** themes according to their preference. The selected theme is saved in the browser for future visits.

---

### 📝 3. Article Management

- Users can **register and log in** to write articles.
- Each article includes:
  - Title
  - Content
  - Image
  - Author and publish date

🔒 Articles are stored in a **MongoDB** database and managed via a RESTful API:  
API Endpoint: [https://shoira-blog-uz-api.vercel.app](https://shoira-blog-uz-api.vercel.app)

---

### 👨‍🎓 4. User Dashboard

Registered users have access to:

- 🔐 Profile management
- 🧾 Viewing and editing personal articles
- 🧑‍💻 **Portfolio section** – users can showcase their personal projects
- 📜 Adding certificates or achievements (planned for future versions)

---

## 🧰 Technologies Used

- **Frontend**: TypeScript, React, Next.js
- **Styling**: Tailwind CSS + Framer Motion (for animations)
- **Icons**: Lucide Icons
- **Internationalization**: `i18next`
- **Database**: MongoDB
- **Authentication**: JWT-based token system

---

## 📂 Project Structure Example

```bash
shoira-blog.uz/
├── pages/             # Pages (home, article, login, register)
├── components/        # UI components (Navbar, Footer, Modals)
├── public/            # Images and icons
├── styles/            # Tailwind configuration
├── locales/           # Translation files (uz.json, ru.json, en.json)
├── utils/             # Utility functions
└── services/          # API handling functions


















