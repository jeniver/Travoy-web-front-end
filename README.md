# Travoy Web - Modern Travel & Tourism Application

A high-performance, modern web application built with React, TypeScript, and optimized for speed and user experience.

## 🚀 Features

- **React 18** with TypeScript for type safety
- **Redux Toolkit** for state management
- **React Query** for server state management and caching
- **Custom Hooks** for reusable logic
- **PWA Support** with service worker and offline capabilities
- **Performance Optimizations** including lazy loading and code splitting
- **CDN Integration** for external libraries
- **Modern Build Tools** with Vite for fast development
- **🌍 Multi-language Support** (English, Tamil, Sinhala)
- **🔐 Authentication System** (Login/Signup)
- **🌙 Theme Management** (Light/Dark/System)

## 🏗️ Project Structure

```
travoy-web/
├── public/                 # Static assets and PWA files
│   ├── sw.js             # Service worker
│   ├── manifest.json     # PWA manifest
│   └── icons/            # App icons
├── src/
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── AuthPage.tsx
│   │   ├── common/       # Common UI components
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── ThemeSwitcher.tsx
│   │   ├── OptimizedImage.tsx
│   │   └── LoadingSpinner.tsx
│   ├── hooks/            # Custom hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   ├── usePerformance.ts
│   │   └── useTheme.ts
│   ├── store/            # Redux store
│   │   ├── index.ts      # Store configuration
│   │   ├── slices/       # Redux slices
│   │   └── api/          # RTK Query APIs
│   ├── contexts/         # React contexts
│   │   └── AuthContext.tsx
│   ├── utils/            # Utility functions
│   │   └── performance.ts
│   ├── config/           # Configuration files
│   │   ├── cdn.ts        # CDN configuration
│   │   ├── i18n.ts       # Internationalization
│   │   └── environment.ts
│   ├── App.tsx           # Main app component
│   └── index.tsx         # Entry point
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## 🌍 Localization Features

### Supported Languages
- **English** (en) - Default language
- **Tamil** (ta) - தமிழ்
- **Sinhala** (si) - සිංහල

### Language Switching
- Automatic language detection from browser
- Persistent language selection in localStorage
- Real-time language switching without page reload
- Localized content for all UI elements

## 🔐 Authentication System

### Features
- **User Registration** with form validation
- **User Login** with secure authentication
- **Password Management** with show/hide functionality
- **Form Validation** using React Hook Form
- **Error Handling** with user-friendly messages
- **Persistent Sessions** using localStorage
- **Redux Integration** for state management

### Components
- `LoginForm` - User login interface
- `SignupForm` - User registration interface
- `AuthPage` - Main authentication page
- `AuthContext` - Authentication context provider

## 🌙 Theme Management

### Features
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy on the eyes
- **System Mode** - Automatically follows OS preference
- **Persistent Theme** - Remembers user preference
- **Smooth Transitions** - Elegant theme switching
- **CSS Variables** - Dynamic theme application

### Theme Switcher
- Dropdown menu with theme options
- Visual indicators for current theme
- Hover effects and smooth animations
- Responsive design for all screen sizes

## 🚀 Performance Optimizations

### 1. Code Splitting & Lazy Loading
- Components are lazy-loaded using React.lazy()
- Suspense boundaries for smooth loading experiences
- Automatic code splitting with Vite

### 2. Image Optimization
- Lazy loading with intersection observer
- Placeholder images while loading
- Optimized image formats

### 3. Caching Strategies
- Service worker with multiple caching strategies
- Redux store persistence
- React Query for API caching

### 4. Bundle Optimization
- Tree shaking and dead code elimination
- Manual chunk splitting for vendor libraries
- Gzip and Brotli compression

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd travoy-web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Analyze bundle
npm run analyze
```

## 📱 PWA Features

- **Offline Support**: Service worker caches essential resources
- **App-like Experience**: Installable on mobile devices
- **Background Sync**: Handles offline actions
- **Push Notifications**: Ready for future implementation

## 🔧 Custom Hooks

### useLocalStorage
Persist state in localStorage with type safety.

### useIntersectionObserver
Optimize component rendering with intersection observer.

### useDebounce
Debounce values for performance optimization.

### useMediaQuery
Responsive design with media queries.

### useTheme
Theme management with system preference detection.

### usePerformance
Performance monitoring and metrics collection.

## 🎨 State Management

### Redux Toolkit
- **UI Slice**: Theme, sidebar, notifications
- **Auth Slice**: User authentication state
- **API Slice**: Server state management with RTK Query

### React Query
- Automatic caching and background updates
- Optimistic updates
- Error handling and retry logic

### React Context
- **AuthContext**: Authentication state and methods
- **ThemeContext**: Theme management and preferences

## 🚀 CDN Integration

External libraries are loaded from CDN for better performance:
- Google Fonts
- Icon libraries (Lucide, Heroicons)
- Animation libraries (Framer Motion, Lottie)
- Utility libraries (Lodash, Day.js)

## 📊 Performance Monitoring

- Bundle analysis with vite-bundle-analyzer
- Performance metrics logging
- Service worker performance tracking
- Core Web Vitals monitoring

## 🔍 Development Tools

- **ESLint**: Code quality and consistency
- **TypeScript**: Type safety and better DX
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **React Hook Form**: Form handling and validation
- **React Hot Toast**: Toast notifications

## 📱 Browser Support

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Progressive enhancement for older browsers
- PWA support where available

## 🚀 Deployment

### Build Optimization
```bash
npm run build
```

The build process includes:
- Code splitting and tree shaking
- Asset optimization and compression
- Service worker generation
- PWA manifest generation

### Environment Variables
Create a `.env` file for environment-specific configuration:
```env
VITE_API_URL=https://api.travoy.com
VITE_GA_TRACKING_ID=your-ga-id
VITE_ENABLE_PWA=true
VITE_ENABLE_ANALYTICS=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

Built with ❤️ using modern web technologies for optimal performance and user experience.
