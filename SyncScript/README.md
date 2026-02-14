# SyncScript - Collaborative Research Platform

A hand-drawn collaborative research platform for knowledge vaults with real-time sync capabilities.

## Features

- 🎨 Hand-drawn aesthetic design
- 🌓 Dark/Light theme toggle
- 📂 Knowledge Vaults management
- ⭐ Favorites system
- 👥 Real-time collaboration
- 🔐 Role-based access control
- 📱 Fully responsive design
- ⚙️ Functional settings with photo upload

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Query
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Supl3x/SyncScript.git

# Navigate to project directory
cd SyncScript

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## Project Structure

```
SyncScript/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── App.tsx         # Main app component
├── public/             # Static assets
└── dist/              # Build output (generated)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Features Overview

### Dark Theme
Toggle between light and dark modes using the button in the bottom-right corner of the dashboard.

### Favorites
Mark vaults as favorites using the three-dot menu on each vault card. Access all favorites from the sidebar.

### Settings
- Upload profile photo
- Update display name and title
- Configure preferences
- Save changes to localStorage

### Loading Screen
Animated loading screen with progress bar that shows percentage completion.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Project Link: [https://github.com/Supl3x/SyncScript](https://github.com/Supl3x/SyncScript)
