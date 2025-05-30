# 🚀 Saran's Portfolio - Enhanced & Optimized

A modern, secure, and high-performance portfolio website built with Next.js 15, featuring comprehensive security measures, performance optimizations, and accessibility enhancements.

## ✨ Features

### 🔒 Security Enhancements
- **Content Security Policy (CSP)** with nonce-based script execution
- **Security Headers** (X-Frame-Options, X-Content-Type-Options, etc.)
- **Rate Limiting** middleware to prevent abuse
- **Input Sanitization** with DOMPurify
- **Form Validation** with comprehensive security checks
- **XSS Protection** and injection prevention
- **CORS Configuration** with allowed origins
- **Secure Contact Form** with honeypot and validation

### ⚡ Performance Optimizations
- **Service Worker** for offline support and caching
- **Lazy Loading** with Intersection Observer
- **Image Optimization** with WebP/AVIF support
- **Code Splitting** and dynamic imports
- **Bundle Analysis** and optimization
- **Performance Monitoring** with Web Vitals
- **Resource Preloading** and DNS prefetching
- **Compression** and minification

### 🎯 SEO & Accessibility
- **Structured Data** (JSON-LD) for better search visibility
- **Open Graph** and Twitter Card meta tags
- **Semantic HTML** with proper ARIA attributes
- **Sitemap** and robots.txt
- **Canonical URLs** and meta descriptions
- **Mobile-first** responsive design
- **Keyboard Navigation** support
- **Screen Reader** compatibility

### 📱 Progressive Web App (PWA)
- **Web App Manifest** for installability
- **Service Worker** for offline functionality
- **App Icons** for all platforms
- **Splash Screens** and theme colors
- **Background Sync** for form submissions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4
- **Security**: Custom middleware with CSP
- **Performance**: Vercel Analytics & Speed Insights
- **Validation**: DOMPurify & Validator.js
- **PWA**: Custom service worker
- **Build**: Custom optimization scripts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saran/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build:production
```

### Build Analysis
```bash
npm run build:analyze
```

### Security Check
```bash
npm run security-check
```

### Type Checking
```bash
npm run type-check
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Contact Form
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id

# Security
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Security Configuration
Security settings can be modified in `src/middleware.ts`:
- Rate limiting rules
- Allowed origins
- Security headers
- Content Security Policy

### Performance Configuration
Performance settings in `next.config.ts`:
- Image optimization
- Compression settings
- Bundle optimization
- Cache headers

## 📊 Performance Metrics

The build process generates a comprehensive performance report including:
- Bundle size analysis
- Asset optimization recommendations
- Core Web Vitals tracking
- Security header validation

## 🔒 Security Features

### Input Validation
- Email validation with RFC compliance
- Name validation with character restrictions
- Message length and content validation
- Honeypot fields for spam protection

### Rate Limiting
- 100 requests per 15-minute window
- IP-based tracking
- Automatic cleanup of expired entries
- Configurable limits per endpoint

### Content Security Policy
- Strict script execution policies
- Nonce-based inline scripts
- Restricted resource loading
- XSS prevention measures

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind configuration in `tailwind.config.js`
- Customize color schemes and animations

### Content
- Update personal information in `src/app/page.tsx`
- Modify project data and skills
- Add new sections or components

### Security
- Adjust rate limiting in `src/middleware.ts`
- Update CSP policies in `next.config.ts`
- Configure allowed origins and headers

## 📱 PWA Features

### Installation
Users can install the portfolio as a native app on:
- Desktop (Chrome, Edge, Safari)
- Mobile (iOS Safari, Android Chrome)
- Progressive enhancement for all browsers

### Offline Support
- Cached static assets
- Offline page with connection status
- Background sync for form submissions
- Service worker updates

## 🧪 Testing

### Manual Testing
```bash
# Build and test locally
npm run test:build

# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint:fix
```

### Security Testing
- CSP violation monitoring
- XSS attempt detection
- Rate limiting validation
- Input sanitization testing

## 📈 Monitoring

### Performance Monitoring
- Real User Monitoring (RUM) with Vercel
- Core Web Vitals tracking
- Bundle size monitoring
- Resource timing analysis

### Security Monitoring
- CSP violation reporting
- Rate limit breach detection
- Suspicious request logging
- Error boundary tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and analytics
- Tailwind CSS for the utility-first approach
- The open-source community for security best practices

## 📞 Contact

- **Email**: saransci2006@gmail.com
- **LinkedIn**: [Saran R](https://linkedin.com/in/saran-r-b2b1a5275/)
- **Portfolio**: [saran.dev](https://saran.dev)

---

**Built with ❤️ and ⚡ by Saran**
