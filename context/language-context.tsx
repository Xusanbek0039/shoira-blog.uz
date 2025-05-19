"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "uz" | "ru"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string>) => string
}

const translations = {
  en: {
    // Locale
    locale: "en-US",
    "auth.namePlaceholder":"Your full name!",
    "user.newPortfolio":"New portfolio upload",    
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.projects": "Projects",
    "nav.articles": "Articles",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "portfolio.noCategoryItems":"Portfolio is empty, no items found!",
    // User menu
    "user.profile": "Profile",
    "user.newArticle": "New Article",
    "user.logout": "Logout",
    "user.login": "Login",
    "user.register": "Register",
    "user.notifications": "Notifications",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",

    // Language
    "lang.en": "English",
    "lang.uz": "Uzbek",
    "lang.ru": "Russian",
    "lang.select": "Language",

    // Footer
    "footer.pages": "Pages",
    "footer.social": "Social Media",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved",

    // Common
    "common.loading": "Loading",
    "common.error": "Error occurred",
    "common.success": "Success",
    "common.save": "Save",
    "common.saving": "Saving...",
    "common.cancel": "Cancel",
    "common.delete": "Delete",

    // Articles
    "articles.description":
      "Collection of the latest and most interesting articles about web development, design, and technology.",
    "articles.noArticles": "No articles available at the moment.",
    "articles.myArticles": "My Articles",
    "articles.newArticle": "New Article",
    "articles.noArticlesYet": "You haven't posted any articles yet.",
    "articles.createArticle": "Create New Article",
    "articles.edit": "Edit",
    "articles.delete": "Delete",
    "articles.deleteArticle": "Delete Article",
    "articles.deleteConfirmation": "Are you sure you want to delete this article? This action cannot be undone.",
    "articles.deleteSuccess": "Article successfully deleted!",
    "articles.deleteError": "Error deleting article",
    "articles.loadError": "Error loading articles",
    "articles.updateError": "Error updating article",
    "articles.updateSuccess": "Article successfully updated! Redirecting...",
    "articles.notFound": "Article not found",
    "articles.editArticle": "Edit Article",
    "articles.editDescription": "Update article information by filling out the form",
    "articles.title": "Title",
    "articles.titlePlaceholder": "Article title",
    "articles.imageUrl": "Image URL",
    "articles.imagePlaceholder": "https://example.com/image.jpg",
    "articles.content": "Content",
    "articles.contentPlaceholder": "Article content...",

    // Search
    "search.placeholder": "Search articles...",
    "search.sortBy": "Sort by",
    "search.date": "Date",
    "search.title": "Title",
    "search.popularity": "Popularity",
    "search.filterByTags": "Filter by tags",
    "search.noResults": "No articles found matching your search.",

    // Home
    "home.welcome": "Welcome to Shoira's Blog",
    "home.description":
      "Here I share my thoughts, projects, and experiences. Follow the blog for new articles and interesting information.",
    "home.viewArticles": "View Articles",
    "home.aboutMe": "About Me",
    "home.latestArticles": "Latest Articles",
    "home.latestArticlesDescription": "Collection of the latest and most interesting articles",
    "home.viewAllArticles": "View All Articles",

    // Profile
    "profile.title": "Profile",
    "profile.description": "Manage your account and view your articles",
    "profile.infoTab": "Profile Information",
    "profile.passwordTab": "Change Password",
    "profile.postsTab": "My Articles",
    "profile.name": "Name",
    "profile.save": "Save",
    "profile.saving": "Saving...",
    "profile.updateSuccess": "Profile successfully updated!",
    "profile.updateError": "Error updating profile",
    "profile.backToProfile": "Back to Profile",

    // Password
    "password.current": "Current Password",
    "password.new": "New Password",
    "password.confirm": "Confirm New Password",
    "password.change": "Change Password",
    "password.changing": "Changing...",
    "password.changeSuccess": "Password successfully changed!",
    "password.changeError": "Error changing password",
    "password.strength": "Password security",
    "password.weak": "Weak",
    "password.medium": "Medium",
    "password.strong": "Strong",
    "password.mismatch": "Passwords do not match",
    "password.tooWeak": "Password is too weak. Choose a stronger password.",

    // Contact
    "contact.description": "Have questions? Contact me and I'll be happy to help.",
    "contact.contactInfo": "Contact Information",
    "contact.contactInfoDesc": "You can contact me using the following information",
    "contact.phone": "Phone",
    "contact.address": "Address",
    "contact.addressValue": "Tashkent, Uzbekistan",
    "contact.sendMessage": "Send Message",
    "contact.sendMessageDesc": "Fill out the form and I'll respond as soon as possible",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "your@email.com",
    "contact.subject": "Subject",
    "contact.subjectPlaceholder": "Message subject",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Write your message...",
    "contact.send": "Send",
    "contact.sending": "Sending...",
    "contact.successMessage": "Your message has been successfully sent! We'll contact you soon.",

    // Logout
    "logout.title": "Confirm Logout",
    "logout.description": "Are you sure you want to log out of your account?",
    "logout.confirm": "Yes, log out",

    // Auth
    "auth.password":"Password",
    "auth.loginSuccess": "Successfully logged in!",
    "auth.logoutSuccess": "Successfully logged out!",
    "auth.registerSuccess": "Successfully registered!",

    // Notifications
    "auth.registerDescription":"A registered account cannot be deleted, but some of its information can be edited. Therefore, please keep your information confidential!",
    "notification.title": "Notifications",
    "notification.description": "View your recent notifications and updates",
    "notification.empty": "No notifications",
    "notification.emptyDescription": "You don't have any notifications at the moment",
    "notification.markAllAsRead": "Mark all as read",
    "notification.articleEdited": "Article Updated",
    "notification.articleEditedMessage": "Your article '{articleTitle}' has been updated successfully",
    "notification.newArticle": "New Article Published",
    "notification.newArticleMessage": "Your article '{articleTitle}' has been published successfully",
    "notification.newLogin": "New Login Detected",
    "notification.newLoginMessage": "A new login was detected on your account",
    "notification.welcome": "Welcome to Shoira Blog",
    "notification.welcomeMessage": "Thank you for registering! Start exploring the blog and sharing your thoughts",
    "auth.loginError":"Login error",
    "auth.loggingIn":"Account is being verified",
    "auth.loginDescription":"Enter your details to verify your account",
    "auth.noAccount":"If you don't have an account, click this button",
    "auth.registering":"Registering...",
    "auth.haveAccount":"Do you have an account?",

    "portfolio.createNew": "Create New Portfolio Item",
    "portfolio.createDescription": "Add a new portfolio item by filling out the form below",
    "portfolio.title": "Title",
    "portfolio.titlePlaceholder": "Portfolio item title",
    "portfolio.category": "Category",
    "portfolio.selectCategory": "Select a category",
    "portfolio.categoryWeb": "Web Development",
    "portfolio.categoryMobile": "Mobile Development",
    "portfolio.categoryDesign": "Design",
    "portfolio.imageUrl": "Image URL",
    "portfolio.description": "Description",
    "portfolio.descriptionPlaceholder": "Describe your portfolio item...",
    "portfolio.save": "Save Portfolio Item",
    "portfolio.createSuccess": "Portfolio item successfully created! Redirecting...",
  },
  uz: {
    // Locale
    locale: "uz-UZ",
    "user.newPortfolio":"Portfolio yuklash",    
    // Portfolio
    "portfolio.createNew": "Yangi Portfolio Yaratish",
    "portfolio.createDescription": "Quyidagi formani to'ldirib yangi portfolio yarating",
    "portfolio.title": "Sarlavha",
    "portfolio.titlePlaceholder": "Portfolio sarlavhasi",
    "portfolio.category": "Kategoriya",
    "portfolio.selectCategory": "Kategoriyani tanlang",
    "portfolio.categoryWeb": "Web Dasturlash",
    "portfolio.categoryMobile": "Mobil Dasturlash",
    "portfolio.categoryDesign": "Dizayn",
    "portfolio.imageUrl": "Rasm URL",
    "portfolio.description": "Tavsif",
    "portfolio.descriptionPlaceholder": "Portfolio haqida ma'lumot...",
    "portfolio.save": "Portfolioni Saqlash",
    "portfolio.createSuccess": "Portfolio muvaffaqiyatli yaratildi! Yo'naltirilmoqda...",
    "auth.registering":"Ro'yxatdan o'tilmoqda...",
    "auth.loginDescription":"Hisobni tekshirish uchun malumotlarni kiriting",
    "auth.namePlaceholder":"To'lliq ism familiyangiz!",
    // Navigation
    "auth.registerDescription":"Ro'yxatdan o'tkazdirilgan hisob o'chirish imkonsiz ammo undagi ba'zi bir ma'lumotlarni taxrirlash mumkin. Shu sababli iltimos ma'lumotlaringiz sir saqlang!",
    "auth.password":"Parolingiz",
    "nav.home": "Bosh sahifa",
    "nav.about": "Men haqimda",
    "nav.projects": "Loyihalarim",
    "nav.articles": "Maqolalar",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Aloqa",

    // User menu
    "user.profile": "Shaxsiy kabinet",
    "user.newArticle": "Maqola joylash",
    "user.logout": "Chiqish",
    "user.login": "Kirish",
    "user.register": "Ro'yxatdan o'tish",
    "user.notifications": "Bildirishnomalar",

    // Theme
    "theme.light": "Yorug'",
    "theme.dark": "Tungi",
    "theme.system": "Tizim",

    // Language
    "lang.en": "Inglizcha",
    "lang.uz": "O'zbekcha",
    "lang.ru": "Ruscha",
    "lang.select": "Til",

    // Footer
    "footer.pages": "Sahifalar",
    "footer.social": "Ijtimoiy tarmoqlar",
    "footer.contact": "Aloqa",
    "footer.rights": "Barcha huquqlar himoyalangan",

    // Common
    "common.loading": "Yuklanmoqda",
    "common.error": "Xatolik yuz berdi",
    "common.success": "Muvaffaqiyatli",
    "common.save": "Saqlash",
    "common.saving": "Saqlanmoqda...",
    "common.cancel": "Bekor qilish",
    "common.delete": "O'chirish",

    // Articles
    "articles.description":
      "Eng so'nggi va qiziqarli maqolalar to'plami. Web dasturlash, dizayn va texnologiyalar haqida.",
    "articles.noArticles": "Hozircha maqolalar mavjud emas.",
    "articles.myArticles": "Mening maqolalarim",
    "articles.newArticle": "Yangi maqola",
    "articles.noArticlesYet": "Siz hali maqola joylamadingiz.",
    "articles.createArticle": "Yangi maqola yaratish",
    "articles.edit": "Tahrirlash",
    "articles.delete": "O'chirish",
    "articles.deleteArticle": "Maqolani o'chirish",
    "articles.deleteConfirmation": "Haqiqatan ham bu maqolani o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.",
    "articles.deleteSuccess": "Maqola muvaffaqiyatli o'chirildi!",
    "articles.deleteError": "Maqolani o'chirishda xatolik yuz berdi",
    "articles.loadError": "Maqolalarni yuklashda xatolik yuz berdi",
    "articles.updateError": "Maqolani yangilashda xatolik yuz berdi",
    "articles.updateSuccess": "Maqola muvaffaqiyatli yangilandi! Yo'naltirilmoqda...",
    "articles.notFound": "Maqola topilmadi",
    "articles.editArticle": "Maqolani tahrirlash",
    "articles.editDescription": "Maqola ma'lumotlarini yangilash uchun formani to'ldiring",
    "articles.title": "Sarlavha",
    "articles.titlePlaceholder": "Maqola sarlavhasi",
    "articles.imageUrl": "Rasm URL",
    "articles.imagePlaceholder": "https://example.com/image.jpg",
    "articles.content": "Matn",
    "articles.contentPlaceholder": "Maqola matni...",
    

    // Search
    "search.placeholder": "Maqolalarni qidirish...",
    "search.sortBy": "Saralash",
    "search.date": "Sana",
    "search.title": "Sarlavha",
    "search.popularity": "Mashhurlik",
    "search.filterByTags": "Teglar bo'yicha filtrlash",
    "search.noResults": "Qidiruv natijasida maqolalar topilmadi.",

    // Home
    "home.welcome": "Shoira blogiga xush kelibsiz",
    "home.description":
      "Bu yerda men o'z fiklarim, loyihalarim va tajribalarim bilan o'rtoqlashaman. Yangi maqolalar va qiziqarli ma'lumotlar uchun blogni kuzatib boring.",
    "home.viewArticles": "Maqolalarni ko'rish",
    "home.aboutMe": "Men haqimda",
    "home.latestArticles": "So'nggi maqolalar",
    "home.latestArticlesDescription": "Eng so'nggi va qiziqarli maqolalar to'plami",
    "home.viewAllArticles": "Barcha maqolalarni ko'rish",

    // Profile
    "profile.title": "Shaxsiy kabinet",
    "profile.description": "Hisobingizni boshqarish va maqolalaringizni ko'rish",
    "profile.infoTab": "Profil ma'lumotlari",
    "profile.passwordTab": "Parolni o'zgartirish",
    "profile.postsTab": "Mening maqolalarim",
    "profile.name": "Ism",
    "profile.save": "Saqlash",
    "profile.saving": "Saqlanmoqda...",
    "profile.updateSuccess": "Profil muvaffaqiyatli yangilandi!",
    "profile.updateError": "Profil yangilashda xatolik yuz berdi",
    "profile.backToProfile": "Profilga qaytish",

    // Password
    "password.current": "Joriy parol",
    "password.new": "Yangi parol",
    "password.confirm": "Yangi parolni tasdiqlang",
    "password.change": "Parolni o'zgartirish",
    "password.changing": "O'zgartirilmoqda...",
    "password.changeSuccess": "Parol muvaffaqiyatli o'zgartirildi!",
    "password.changeError": "Parolni o'zgartirishda xatolik yuz berdi",
    "password.strength": "Parol xavfsizligi",
    "password.weak": "Zaif",
    "password.medium": "O'rtacha",
    "password.strong": "Kuchli",
    "password.mismatch": "Yangi parollar mos kelmadi",
    "password.tooWeak": "Parol juda zaif. Kuchliroq parol tanlang.",

    // Contact
    "contact.description": "Savollaringiz bormi? Men bilan bog'laning va men sizga yordam berishdan xursand bo'laman.",
    "contact.contactInfo": "Bog'lanish ma'lumotlari",
    "contact.contactInfoDesc": "Quyidagi ma'lumotlar orqali men bilan bog'lanishingiz mumkin",
    "contact.phone": "Telefon",
    "contact.address": "Manzil",
    "contact.addressValue": "Toshkent, O'zbekiston",
    "contact.sendMessage": "Xabar yuborish",
    "contact.sendMessageDesc": "Formani to'ldiring va men sizga tez orada javob beraman",
    "contact.name": "Ism",
    "contact.namePlaceholder": "Ismingiz",
    "contact.emailPlaceholder": "sizning@email.uz",
    "contact.subject": "Mavzu",
    "contact.subjectPlaceholder": "Xabar mavzusi",
    "contact.message": "Xabar",
    "contact.messagePlaceholder": "Xabaringizni yozing...",
    "contact.send": "Yuborish",
    "contact.sending": "Yuborilmoqda...",
    "contact.successMessage": "Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.",
    "auth.loginError":"Kirishda xatolik",
    "auth.loggingIn":"Hisob tekshirilmoqda",
    // Logout
    "logout.title": "Chiqishni tasdiqlash",
    "logout.description": "Haqiqatan ham hisobingizdan chiqmoqchimisiz?",
    "logout.confirm": "Ha, chiqish",

    // Auth
    "auth.loginSuccess": "Muvaffaqiyatli kirildi!",
    "auth.logoutSuccess": "Muvaffaqiyatli chiqildi!",
    "auth.registerSuccess": "Muvaffaqiyatli ro'yxatdan o'tildi!",
    "portfolio.noCategoryItems":"Portfoli bo'sh xech qanday ma'lumot topilmadi!",
    // Notifications
    "notification.title": "Bildirishnomalar",
    "notification.description": "So'nggi bildirishnomalar va yangilanishlarni ko'rish",
    "notification.empty": "Bildirishnomalar yo'q",
    "notification.emptyDescription": "Hozircha sizda bildirishnomalar mavjud emas",
    "notification.markAllAsRead": "Barchasini o'qilgan deb belgilash",
    "notification.articleEdited": "Maqola yangilandi",
    "notification.articleEditedMessage": "Sizning '{articleTitle}' maqolangiz muvaffaqiyatli yangilandi",
    "notification.newArticle": "Yangi maqola joylandi",
    "notification.newArticleMessage": "Sizning '{articleTitle}' maqolangiz muvaffaqiyatli joylandi",
    "notification.newLogin": "Yangi kirish aniqlandi",
    "notification.newLoginMessage": "Hisobingizga yangi kirish aniqlandi",
    "notification.welcome": "Shoira Blogga xush kelibsiz",
    "auth.noAccount":"Hisobgiz mavjud emasmi unda ushbu tugmani bosing",
    "auth.haveAccount":"Hisobingiz mavjudmi?",
    "notification.welcomeMessage":
      "Ro'yxatdan o'tganingiz uchun rahmat! Blogni o'rganishni boshlang va fikrlaringizni ulashing",

  },
  ru: {
    // Locale
    locale: "ru-RU",
    "user.newPortfolio":"Новая загрузка портфолио",
    // Portfolio
    "portfolio.noCategoryItems":"Портфолио пусто, элементы не найдены!",
    "portfolio.createNew": "Создать Новое Портфолио",
    "portfolio.createDescription": "Добавьте новый элемент портфолио, заполнив форму ниже",
    "portfolio.title": "Заголовок",
    "portfolio.titlePlaceholder": "Заголовок портфолио",
    "portfolio.category": "Категория",
    "portfolio.selectCategory": "Выберите категорию",
    "portfolio.categoryWeb": "Веб-разработка",
    "portfolio.categoryMobile": "Мобильная разработка",
    "portfolio.categoryDesign": "Дизайн",
    "portfolio.imageUrl": "URL изображения",
    "portfolio.description": "Описание",
    "portfolio.descriptionPlaceholder": "Опишите ваше портфолио...",
    "portfolio.save": "Сохранить Портфолио",
    "portfolio.createSuccess": "Портфолио успешно создано! Перенаправление...",



    "auth.haveAccount":"У вас есть аккаунт?",
    "auth.registering":"Регистрация...",
    "auth.noAccount":"Если у вас нет учетной записи, нажмите эту кнопку",
    "auth.loginDescription":"Введите свои данные для подтверждения вашей учетной записи",
    "auth.loggingIn":"Учетная запись проверяется",
    "auth.namePlaceholder":"Ваше полное имя!",
    "auth.registerDescription":"Зарегистрированную учетную запись нельзя удалить, но часть ее информации можно редактировать. Поэтому, пожалуйста, сохраняйте конфиденциальность своей информации!",
    // Navigation
    "auth.password": "Пароль",
    "nav.home": "Главная",
    "nav.about": "Обо мне",
    "nav.projects": "Проекты",
    "nav.articles": "Статьи",
    "nav.portfolio": "Портфолио",
    "nav.contact": "Контакты",

    // User menu
    "user.profile": "Профиль",
    "user.newArticle": "Новая статья",
    "user.logout": "Выйти",
    "user.login": "Войти",
    "user.register": "Регистрация",
    "user.notifications": "Уведомления",

    // Theme
    "theme.light": "Светлая",
    "theme.dark": "Темная",
    "theme.system": "Системная",

    // Language
    "lang.en": "Английский",
    "lang.uz": "Узбекский",
    "lang.ru": "Русский",
    "lang.select": "Язык",
    "auth.loginError":"Ошибка входа",
    // Footer
    "footer.pages": "Страницы",
    "footer.social": "Социальные сети",
    "footer.contact": "Контакты",
    "footer.rights": "Все права защищены",

    // Common
    "common.loading": "Загрузка",
    "common.error": "Произошла ошибка",
    "common.success": "Успешно",
    "common.save": "Сохранить",
    "common.saving": "Сохранение...",
    "common.cancel": "Отмена",
    "common.delete": "Удалить",

    // Articles
    "articles.description": "Коллекция последних и самых интересных статей о веб-разработке, дизайне и технологиях.",
    "articles.noArticles": "На данный момент статьи отсутствуют.",
    "articles.myArticles": "Мои статьи",
    "articles.newArticle": "Новая статья",
    "articles.noArticlesYet": "Вы еще не опубликовали ни одной статьи.",
    "articles.createArticle": "Создать новую статью",
    "articles.edit": "Редактировать",
    "articles.delete": "Удалить",
    "articles.deleteArticle": "Удалить статью",
    "articles.deleteConfirmation": "Вы уверены, что хотите удалить эту статью? Это действие нельзя отменить.",
    "articles.deleteSuccess": "Статья успешно удалена!",
    "articles.deleteError": "Ошибка при удалении статьи",
    "articles.loadError": "Ошибка при загрузке статей",
    "articles.updateError": "Ошибка при обновлении статьи",
    "articles.updateSuccess": "Статья успешно обновлена! Перенаправление...",
    "articles.notFound": "Статья не найдена",
    "articles.editArticle": "Редактировать статью",
    "articles.editDescription": "Обновите информацию о статье, заполнив форму",
    "articles.title": "Заголовок",
    "articles.titlePlaceholder": "Заголовок статьи",
    "articles.imageUrl": "URL изображения",
    "articles.imagePlaceholder": "https://example.com/image.jpg",
    "articles.content": "Содержание",
    "articles.contentPlaceholder": "Текст статьи...",

    // Search
    "search.placeholder": "Поиск статей...",
    "search.sortBy": "Сортировать по",
    "search.date": "Дате",
    "search.title": "Названию",
    "search.popularity": "Популярности",
    "search.filterByTags": "Фильтр по тегам",
    "search.noResults": "По вашему запросу статьи не найдены.",

    // Home
    "home.welcome": "Добро пожаловать в блог Шоиры",
    "home.description":
      "Здесь я делюсь своими мыслями, проектами и опытом. Следите за блогом, чтобы получать новые статьи и интересную информацию.",
    "home.viewArticles": "Просмотр статей",
    "home.aboutMe": "Обо мне",
    "home.latestArticles": "Последние статьи",
    "home.latestArticlesDescription": "Коллекция последних и самых интересных статей",
    "home.viewAllArticles": "Просмотреть все статьи",

    // Profile
    "profile.title": "Личный кабинет",
    "profile.description": "Управление аккаунтом и просмотр статей",
    "profile.infoTab": "Информация профиля",
    "profile.passwordTab": "Изменить пароль",
    "profile.postsTab": "Мои статьи",
    "profile.name": "Имя",
    "profile.save": "Сохранить",
    "profile.saving": "Сохранение...",
    "profile.updateSuccess": "Профиль успешно обновлен!",
    "profile.updateError": "Ошибка при обновлении профиля",
    "profile.backToProfile": "Вернуться в профиль",

    // Password
    "password.current": "Текущий пароль",
    "password.new": "Новый пароль",
    "password.confirm": "Подтвердите новый пароль",
    "password.change": "Изменить пароль",
    "password.changing": "Изменение...",
    "password.changeSuccess": "Пароль успешно изменен!",
    "password.changeError": "Ошибка при изменении пароля",
    "password.strength": "Надежность пароля",
    "password.weak": "Слабый",
    "password.medium": "Средний",
    "password.strong": "Сильный",
    "password.mismatch": "Пароли не совпадают",
    "password.tooWeak": "Пароль слишком слабый. Выберите более надежный пароль.",

    // Contact
    "contact.description": "Есть вопросы? Свяжитесь со мной, и я с радостью помогу.",
    "contact.contactInfo": "Контактная информация",
    "contact.contactInfoDesc": "Вы можете связаться со мной, используя следующую информацию",
    "contact.phone": "Телефон",
    "contact.address": "Адрес",
    "contact.addressValue": "Ташкент, Узбекистан",
    "contact.sendMessage": "Отправить сообщение",
    "contact.sendMessageDesc": "Заполните форму, и я отвечу вам в ближайшее время",
    "contact.name": "Имя",
    "contact.namePlaceholder": "Ваше имя",
    "contact.emailPlaceholder": "ваш@email.com",
    "contact.subject": "Тема",
    "contact.subjectPlaceholder": "Тема сообщения",
    "contact.message": "Сообщение",
    "contact.messagePlaceholder": "Напишите ваше сообщение...",
    "contact.send": "Отправить",
    "contact.sending": "Отправка...",
    "contact.successMessage": "Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",

    // Logout
    "logout.title": "Подтверждение выхода",
    "logout.description": "Вы действительно хотите выйти из своей учетной записи?",
    "logout.confirm": "Да, выйти",

    // Auth
    "auth.loginSuccess": "Вход выполнен успешно!",
    "auth.logoutSuccess": "Выход выполнен успешно!",
    "auth.registerSuccess": "Регистрация выполнена успешно!",

    // Notifications
    "notification.title": "Уведомления",
    "notification.description": "Просмотр последних уведомлений и обновлений",
    "notification.empty": "Нет уведомлений",
    "notification.emptyDescription": "У вас пока нет уведомлений",
    "notification.markAllAsRead": "Отметить все как прочитанные",
    "notification.articleEdited": "Статья обновлена",
    "notification.articleEditedMessage": "Ваша статья '{articleTitle}' была успешно обновлена",
    "notification.newArticle": "Новая статья опубликована",
    "notification.newArticleMessage": "Ваша статья '{articleTitle}' была успешно опубликована",
    "notification.newLogin": "Обнаружен новый вход",
    "notification.newLoginMessage": "Был обнаружен новый вход в вашу учетную запись",
    "notification.welcome": "Добро пожаловать в блог Шоиры",
    "notification.welcomeMessage": "Спасибо за регистрацию! Начните изучать блог и делиться своими мыслями",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Check if language preference is stored in localStorage
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "uz" || storedLanguage === "ru")) {
      setLanguageState(storedLanguage)
    } else {
      // Default to English for first-time visitors
      setLanguageState("en")
      localStorage.setItem("language", "en")
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string, params?: Record<string, string>): string => {
    let text = translations[language][key as keyof (typeof translations)[typeof language]] || key

    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, value)
      })
    }

    return text
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
