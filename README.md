# Vue 3 + TypeScript + Vite + Tailwind CSS

A modern Vue 3 application with dark/light theme toggle functionality, built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- ⚡️ **Vite** - Lightning fast build tool
- 🖖 **Vue 3** - The progressive JavaScript framework
- 🔷 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌙 **Dark/Light Mode** - Toggle between themes with persistence
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **Modern UI** - Clean and accessible components

## 🛠️ Tech Stack

- **Frontend Framework:** Vue 3 with Composition API
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Theme Management:** CSS custom properties with localStorage persistence

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Build

To build the project for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🎯 Project Structure

```
src/
├── assets/          # Static assets and global styles
│   └── tailwind.css # Tailwind CSS with custom theme variables
├── components/      # Vue components
│   ├── HelloWorld.vue    # Main demo component
│   └── ThemeToggle.vue   # Dark/light theme toggle button
├── App.vue         # Root component
└── main.ts         # Application entry point
```

## 🌙 Theme Toggle

The application features a fully functional dark/light mode toggle that:
- Respects system preferences by default
- Persists user choice in localStorage
- Smoothly transitions between themes
- Uses CSS custom properties for consistent theming

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the MIT License.
