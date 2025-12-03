# 🌿 SeasoServe

**Nature guides, we serve.**

AI-powered food recommendations based on your environment, season, and health. Stay nourished, energized, and healthy—no matter the weather.

![SeasoServe Banner](https://img.shields.io/badge/Status-In%20Development-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Design System](#design-system)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

SeasoServe is a revolutionary food recommendation platform that adapts to your local climate, weather conditions, and personal health needs. Our AI-powered system ensures you're always eating what's best for your current environment.

### Why SeasoServe?

- 🌡️ **Climate-Aware**: Food suggestions based on real-time weather
- 🥗 **Personalized**: Tailored to your dietary preferences and health goals
- 🧠 **AI-Powered**: Smart recommendations backed by nutritional science
- 🌍 **Travel-Ready**: Get suggestions for any location worldwide
- 📊 **Analytics**: Track your nutrition and eating patterns

---

## ✨ Features

### Core Features

- **Climate-Based Suggestions**: Recommendations that adapt to hot, cold, rainy, windy, or humid weather
- **Personalized Meal Planning**: Weekly meal plans based on your preferences
- **AI Recipe Chatbot**: Ask for recipes, cooking tips, and nutritional advice
- **Travel Mode**: Get food suggestions for your destination before arrival
- **Climate Risk Alerts**: Proactive nutrition tips for weather changes
- **Seasonal & Local Produce**: Discover what's fresh in your area
- **Food Scanner**: Check if foods are right for your current climate
- **Nutrition Analytics**: Track eating patterns and nutritional intake

### User Experience

- 🎨 Clean, modern Shopify-inspired design
- 📱 Fully responsive across all devices
- ♿ Accessibility-compliant components
- ✨ Smooth scroll animations and transitions
- 🌓 Dark mode support (coming soon)

---

## 🛠️ Tech Stack

### Frontend

- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 5.4** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript linting

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SeasoServe.git
   cd SeasoServe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
SeasoServe/
├── public/
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── ClimateSelector.tsx
│   │   ├── CTASection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── Reveal.tsx       # Scroll animation wrapper
│   │   └── WhySection.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useInView.ts     # Intersection Observer hook
│   │   └── useIsMobile.ts
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── Index.tsx        # Landing page
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── index.css            # Global styles & design tokens
│   └── main.tsx
├── components.json          # Shadcn UI config
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── package.json
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration (Coming Soon)
VITE_API_URL=https://api.seasoserve.com
VITE_API_KEY=your_api_key_here

# Analytics (Optional)
VITE_GA_TRACKING_ID=your_ga_id
```

---

## 🎨 Design System

### Color Palette

```css
/* Light Mode */
--background: hsl(0 0% 100%)        /* Pure White */
--foreground: hsl(0 0% 9%)          /* Near Black */
--primary: hsl(0 0% 9%)             /* Black */
--secondary: hsl(210 100% 97%)      /* Light Blue */
--accent: hsl(210 100% 50%)         /* Blue */
--muted: hsl(210 40% 96%)           /* Light Gray-Blue */
```

### Typography

- **Font Family**: Plus Jakarta Sans
- **Headings**: 700-800 weight
- **Body**: 400-600 weight

### Spacing & Radius

- **Border Radius**: 0.5rem (8px)
- **Container Max Width**: 1280px
- **Section Padding**: 6rem (96px) vertical

### Animations

- **Fade Up**: 0.6s ease-out
- **Scale In**: 0.5s ease-out
- **Slide In**: 0.7s ease-out
- **Float**: 6s ease-in-out infinite

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new files
- Follow the existing component structure
- Write meaningful commit messages
- Add comments for complex logic
- Ensure accessibility compliance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Project Lead**: Your Name
- **Design**: Design Team
- **Development**: Dev Team

---

## 📞 Contact & Support

- **Website**: [seasoserve.com](https://seasoserve.com)
- **Email**: support@seasoserve.com
- **Twitter**: [@SeasoServe](https://twitter.com/seasoserve)
- **Discord**: [Join our community](https://discord.gg/seasoserve)

---

## 🗺️ Roadmap

### Phase 1 - MVP (Current)
- [x] Landing page design
- [x] Responsive layout
- [x] Scroll animations
- [ ] User authentication
- [ ] Basic food recommendations

### Phase 2 - Core Features
- [ ] AI-powered recommendations
- [ ] Weather API integration
- [ ] User profiles
- [ ] Meal planning
- [ ] Recipe database

### Phase 3 - Advanced Features
- [ ] Mobile apps (iOS & Android)
- [ ] Food scanner
- [ ] Nutrition tracking
- [ ] Social features
- [ ] Premium subscription

---

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility framework
- [Vite](https://vitejs.dev/) for the blazing-fast build tool

---

<div align="center">

**Made with 🌿 for healthier eating**

[⬆ Back to Top](#-seasoserve)

</div>
