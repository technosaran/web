#!/usr/bin/env node

/**
 * Build optimization script for the portfolio
 * This script runs after the build to optimize the output
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BUILD_DIR = path.join(process.cwd(), 'out');
const STATIC_DIR = path.join(BUILD_DIR, '_next', 'static');

console.log('🚀 Starting build optimization...');

// Utility functions
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch (error) {
    return 0;
  }
}

function walkDirectory(dir, callback) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDirectory(filePath, callback);
    } else {
      callback(filePath, stat);
    }
  });
}

// 1. Analyze bundle sizes
function analyzeBundleSizes() {
  console.log('\n📊 Analyzing bundle sizes...');
  
  const bundleStats = {
    js: { count: 0, totalSize: 0, files: [] },
    css: { count: 0, totalSize: 0, files: [] },
    images: { count: 0, totalSize: 0, files: [] },
    other: { count: 0, totalSize: 0, files: [] }
  };

  walkDirectory(BUILD_DIR, (filePath, stat) => {
    const ext = path.extname(filePath).toLowerCase();
    const relativePath = path.relative(BUILD_DIR, filePath);
    const size = stat.size;

    if (ext === '.js') {
      bundleStats.js.count++;
      bundleStats.js.totalSize += size;
      bundleStats.js.files.push({ path: relativePath, size });
    } else if (ext === '.css') {
      bundleStats.css.count++;
      bundleStats.css.totalSize += size;
      bundleStats.css.files.push({ path: relativePath, size });
    } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) {
      bundleStats.images.count++;
      bundleStats.images.totalSize += size;
      bundleStats.images.files.push({ path: relativePath, size });
    } else {
      bundleStats.other.count++;
      bundleStats.other.totalSize += size;
      bundleStats.other.files.push({ path: relativePath, size });
    }
  });

  // Report bundle sizes
  console.log('\n📈 Bundle Size Report:');
  console.log(`JavaScript: ${bundleStats.js.count} files, ${formatBytes(bundleStats.js.totalSize)}`);
  console.log(`CSS: ${bundleStats.css.count} files, ${formatBytes(bundleStats.css.totalSize)}`);
  console.log(`Images: ${bundleStats.images.count} files, ${formatBytes(bundleStats.images.totalSize)}`);
  console.log(`Other: ${bundleStats.other.count} files, ${formatBytes(bundleStats.other.totalSize)}`);

  // Find largest files
  const allFiles = [
    ...bundleStats.js.files,
    ...bundleStats.css.files,
    ...bundleStats.images.files,
    ...bundleStats.other.files
  ].sort((a, b) => b.size - a.size);

  console.log('\n🔍 Largest files:');
  allFiles.slice(0, 10).forEach((file, index) => {
    console.log(`${index + 1}. ${file.path} (${formatBytes(file.size)})`);
  });

  return bundleStats;
}

// 2. Optimize HTML files
function optimizeHtmlFiles() {
  console.log('\n🔧 Optimizing HTML files...');
  
  let optimizedCount = 0;
  
  walkDirectory(BUILD_DIR, (filePath) => {
    if (path.extname(filePath) === '.html') {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalSize = content.length;
        
        // Remove unnecessary whitespace
        content = content
          .replace(/>\s+</g, '><')
          .replace(/\s+/g, ' ')
          .trim();
        
        // Remove comments (but keep conditional comments)
        content = content.replace(/<!--(?!\[if).*?-->/g, '');
        
        // Minify inline CSS
        content = content.replace(/<style[^>]*>(.*?)<\/style>/gi, (match, css) => {
          const minifiedCss = css
            .replace(/\/\*.*?\*\//g, '')
            .replace(/\s+/g, ' ')
            .replace(/;\s*}/g, '}')
            .replace(/{\s*/g, '{')
            .replace(/;\s*/g, ';')
            .trim();
          return match.replace(css, minifiedCss);
        });
        
        fs.writeFileSync(filePath, content);
        const newSize = content.length;
        const savings = originalSize - newSize;
        
        if (savings > 0) {
          optimizedCount++;
          console.log(`  ✓ ${path.relative(BUILD_DIR, filePath)} saved ${formatBytes(savings)}`);
        }
      } catch (error) {
        console.error(`  ✗ Failed to optimize ${filePath}:`, error.message);
      }
    }
  });
  
  console.log(`\n✅ Optimized ${optimizedCount} HTML files`);
}

// 3. Generate security headers file
function generateSecurityHeaders() {
  console.log('\n🔒 Generating security headers...');
  
  const headers = `
# Security Headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://formspree.io https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://formspree.io https://www.google-analytics.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://formspree.io; upgrade-insecure-requests

# Cache Control
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000

/*.css
  Cache-Control: public, max-age=31536000

/*.js
  Cache-Control: public, max-age=31536000

/*.woff2
  Cache-Control: public, max-age=31536000

# Prevent access to sensitive files
/.env*
  X-Robots-Tag: noindex
  
/package.json
  X-Robots-Tag: noindex
  
/tsconfig.json
  X-Robots-Tag: noindex
`.trim();

  fs.writeFileSync(path.join(BUILD_DIR, '_headers'), headers);
  console.log('✅ Security headers file generated');
}

// 4. Generate performance report
function generatePerformanceReport(bundleStats) {
  console.log('\n📋 Generating performance report...');
  
  const totalSize = Object.values(bundleStats).reduce((sum, stat) => sum + stat.totalSize, 0);
  const totalFiles = Object.values(bundleStats).reduce((sum, stat) => sum + stat.count, 0);
  
  const report = {
    timestamp: new Date().toISOString(),
    totalSize: formatBytes(totalSize),
    totalFiles,
    breakdown: {
      javascript: {
        files: bundleStats.js.count,
        size: formatBytes(bundleStats.js.totalSize),
        percentage: ((bundleStats.js.totalSize / totalSize) * 100).toFixed(1) + '%'
      },
      css: {
        files: bundleStats.css.count,
        size: formatBytes(bundleStats.css.totalSize),
        percentage: ((bundleStats.css.totalSize / totalSize) * 100).toFixed(1) + '%'
      },
      images: {
        files: bundleStats.images.count,
        size: formatBytes(bundleStats.images.totalSize),
        percentage: ((bundleStats.images.totalSize / totalSize) * 100).toFixed(1) + '%'
      },
      other: {
        files: bundleStats.other.count,
        size: formatBytes(bundleStats.other.totalSize),
        percentage: ((bundleStats.other.totalSize / totalSize) * 100).toFixed(1) + '%'
      }
    },
    recommendations: []
  };

  // Add recommendations based on analysis
  if (bundleStats.js.totalSize > 1024 * 1024) { // > 1MB
    report.recommendations.push('Consider code splitting to reduce JavaScript bundle size');
  }
  
  if (bundleStats.images.totalSize > 5 * 1024 * 1024) { // > 5MB
    report.recommendations.push('Consider optimizing images or using next-gen formats (WebP, AVIF)');
  }
  
  if (bundleStats.css.totalSize > 500 * 1024) { // > 500KB
    report.recommendations.push('Consider removing unused CSS or splitting stylesheets');
  }

  fs.writeFileSync(
    path.join(BUILD_DIR, 'performance-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('✅ Performance report generated');
  console.log('\n📊 Summary:');
  console.log(`Total build size: ${report.totalSize}`);
  console.log(`Total files: ${report.totalFiles}`);
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
  }
}

// Main execution
async function main() {
  try {
    if (!fs.existsSync(BUILD_DIR)) {
      console.error('❌ Build directory not found. Please run "npm run build" first.');
      process.exit(1);
    }

    const bundleStats = analyzeBundleSizes();
    optimizeHtmlFiles();
    generateSecurityHeaders();
    generatePerformanceReport(bundleStats);
    
    console.log('\n🎉 Build optimization completed successfully!');
    console.log('\n📁 Generated files:');
    console.log('  - _headers (security headers)');
    console.log('  - performance-report.json (performance analysis)');
    
  } catch (error) {
    console.error('❌ Build optimization failed:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  analyzeBundleSizes,
  optimizeHtmlFiles,
  generateSecurityHeaders,
  generatePerformanceReport
};
