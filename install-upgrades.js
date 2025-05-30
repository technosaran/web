#!/usr/bin/env node

/**
 * Portfolio Upgrade Installation Script
 * This script helps install the new dependencies and set up the upgraded features
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Portfolio Upgrade Installation...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Function to run commands safely
function runCommand(command, description) {
  try {
    console.log(`📦 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed\n`);
  } catch (error) {
    console.error(`❌ Error during ${description}:`, error.message);
    return false;
  }
  return true;
}

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Main installation process
async function installUpgrades() {
  console.log('🔍 Checking project structure...');
  
  // Check for required files
  const requiredFiles = [
    'package.json',
    'next.config.ts',
    'tsconfig.json'
  ];
  
  for (const file of requiredFiles) {
    if (!fileExists(file)) {
      console.error(`❌ Required file ${file} not found`);
      process.exit(1);
    }
  }
  
  console.log('✅ Project structure looks good\n');
  
  // Install dependencies
  console.log('📦 Installing dependencies...');
  
  // Try npm install first
  if (!runCommand('npm install', 'Installing dependencies')) {
    console.log('⚠️  Standard install failed, trying with legacy peer deps...');
    if (!runCommand('npm install --legacy-peer-deps', 'Installing with legacy peer deps')) {
      console.error('❌ Failed to install dependencies. Please install manually.');
      process.exit(1);
    }
  }
  
  // Run type checking
  if (!runCommand('npm run type-check', 'Type checking')) {
    console.log('⚠️  Type checking failed, but continuing...');
  }
  
  // Run linting
  if (!runCommand('npm run lint', 'Linting code')) {
    console.log('⚠️  Linting failed, but continuing...');
  }
  
  // Format code if prettier is available
  try {
    if (fileExists('node_modules/.bin/prettier')) {
      runCommand('npm run format', 'Formatting code');
    }
  } catch (error) {
    console.log('⚠️  Code formatting skipped');
  }
  
  // Run tests if available
  try {
    if (fileExists('jest.config.js')) {
      runCommand('npm test -- --passWithNoTests', 'Running tests');
    }
  } catch (error) {
    console.log('⚠️  Tests skipped');
  }
  
  console.log('🎉 Installation completed successfully!\n');
  
  // Display next steps
  console.log('📋 Next Steps:');
  console.log('1. Review the UPGRADE_GUIDE.md for detailed changes');
  console.log('2. Run "npm run dev" to start development server');
  console.log('3. Run "npm test" to execute the test suite');
  console.log('4. Run "npm run format" to format your code');
  console.log('5. Run "npm run bundle-analyzer" to analyze bundle size');
  console.log('6. Check the enhanced performance monitoring in action\n');
  
  console.log('🚀 Your portfolio has been successfully upgraded to v2.0!');
  console.log('📖 Check README.md for the complete feature list');
}

// Run the installation
installUpgrades().catch(error => {
  console.error('❌ Installation failed:', error);
  process.exit(1);
});
