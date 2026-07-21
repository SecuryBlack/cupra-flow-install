/**
 * CupraFlow Install & Landing Page Worker
 * 
 * Serves the premium landing page to web browsers, and the raw install.ps1 script
 * to PowerShell clients or explicit path requests.
 */

// ─── INDEX.HTML SOURCE ───
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CupraFlow — High-Performance Network Management & Load Balancing Agent</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="CupraFlow is an ultralight, high-performance, open-source network management and load balancing agent written in Rust. Features L4/L7 proxying, VRRP high availability, and native Windows Service support.">
  <meta name="keywords" content="load balancer, rust, vrrp, high availability, windows service, proxy, l4, l7, network management">
  <meta name="author" content="SecuryBlack">
  
  <!-- Open Graph -->
  <meta property="og:title" content="CupraFlow — High-Performance Load Balancing Agent">
  <meta property="og:description" content="An ultralight, open-source load balancing agent written in Rust. VRRP high-availability, TCP/UDP/HTTP proxying, and Windows Service native integration.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://cupraflow.dev">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  
  <style>
    /* ─── DESIGN SYSTEM TOKENS (Bespoke Copper Theme) ─── */
    :root {
      /* Colors */
      --color-bg: #090807;
      --color-surface: #12100E;
      --color-surface-elevated: #1A1714;
      --color-border: #25201C;
      --color-border-hover: #40362F;
      
      --color-primary: #D27D2D; /* Rich metallic copper */
      --color-primary-hover: #E88C30; /* Lighter sand-copper */
      --color-primary-dim: #6E3B13; /* Deep dark bronze */
      --color-primary-glow: rgba(210, 125, 45, 0.12);
      --color-primary-glow-heavy: rgba(210, 125, 45, 0.25);
      
      --color-text: #F5F3F2;
      --color-muted: #9E938A;
      --color-muted-dark: #5C534D;
      
      --color-success: #1EA672;
      --color-success-glow: rgba(30, 166, 114, 0.15);
      
      /* Typography font families */
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --font-display: 'Outfit', var(--font-sans);
      --font-mono: 'Fira Code', 'Courier New', monospace;
      
      /* Radii */
      --radius-sm: 4px;
      --radius-md: 8px;
      --radius-lg: 14px;
      --radius-xl: 22px;
      --radius-full: 9999px;
      
      /* Transitions */
      --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
      --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
      --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ─── BASE RESET & SETUP ─── */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      overflow-x: hidden;
      background-color: var(--color-bg);
    }

    body {
      background-color: var(--color-bg);
      color: var(--color-text);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
      line-height: 1.5;
    }

    /* Selection styling */
    ::selection {
      background-color: var(--color-primary);
      color: var(--color-bg);
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--color-bg);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: var(--radius-full);
      border: 2px solid var(--color-bg);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--color-muted-dark);
    }

    /* ─── STRUCTURE & CONTAINERS ─── */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* ─── BACKGROUND FX ─── */
    .bg-grid {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background-image: 
        linear-gradient(var(--color-border) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
      background-size: 64px 64px;
      opacity: 0.25;
      mask-image: radial-gradient(ellipse 65% 55% at 50% 45%, black 40%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 65% 55% at 50% 45%, black 40%, transparent 100%);
    }

    .glow-blob {
      position: absolute;
      pointer-events: none;
      z-index: 1;
      border-radius: var(--radius-full);
      filter: blur(140px);
      mix-blend-mode: screen;
      opacity: 0.45;
      animation: slow-shimmer 8s infinite alternate ease-in-out;
    }

    .glow-blob-1 {
      top: 15%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50vw;
      max-width: 600px;
      height: 300px;
      background: radial-gradient(ellipse, var(--color-primary-dim) 0%, transparent 80%);
    }

    .glow-blob-2 {
      bottom: 20%;
      right: 5%;
      width: 350px;
      height: 350px;
      background: radial-gradient(circle, rgba(210, 125, 45, 0.08) 0%, transparent 70%);
      animation-delay: -3s;
    }

    /* Keyframes */
    @keyframes slow-shimmer {
      0% {
        opacity: 0.4;
        transform: translate(-50%, -50%) scale(0.95) rotate(0deg);
      }
      100% {
        opacity: 0.55;
        transform: translate(-50%, -48%) scale(1.05) rotate(5deg);
      }
    }

    /* ─── TYPOGRAPHY & UTILITIES ─── */
    h1, h2, h3, h4 {
      font-family: var(--font-display);
      color: var(--color-text);
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .text-gradient {
      background: linear-gradient(135deg, var(--color-text) 30%, var(--color-primary-hover) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .text-gradient-copper {
      background: linear-gradient(135deg, var(--color-primary) 0%, #F5B070 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ─── HEADER ─── */
    header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(9, 8, 7, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--color-border);
      transition: var(--transition-fast);
    }

    .header-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--color-text);
    }

    .logo-mark {
      position: relative;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-mark-svg {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: var(--color-primary);
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 6px rgba(210, 125, 45, 0.4));
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
    }

    .nav-links a {
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-muted);
      transition: var(--transition-fast);
    }

    .nav-links a:hover {
      color: var(--color-text);
    }

    .header-cta {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-family: var(--font-sans);
      font-weight: 500;
      font-size: 0.875rem;
      text-decoration: none;
      padding: 0.625rem 1.25rem;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: var(--transition-base);
      border: 1px solid transparent;
    }

    .btn-primary {
      background-color: var(--color-primary);
      color: var(--color-bg);
      border-color: var(--color-primary);
      font-weight: 600;
    }

    .btn-primary:hover {
      background-color: var(--color-primary-hover);
      border-color: var(--color-primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px var(--color-primary-glow-heavy);
    }

    .btn-outline {
      background-color: transparent;
      color: var(--color-text);
      border-color: var(--color-border);
    }

    .btn-outline:hover {
      border-color: var(--color-primary);
      background-color: rgba(210, 125, 45, 0.05);
      transform: translateY(-1px);
    }

    .btn-sm {
      padding: 0.45rem 1rem;
      font-size: 0.8rem;
    }

    .btn-lg {
      padding: 0.85rem 1.75rem;
      font-size: 0.95rem;
    }

    /* Mobile hamburger menu */
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 6px;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 101;
    }

    .hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background-color: var(--color-text);
      border-radius: 2px;
      transition: var(--transition-fast);
    }

    /* ─── HERO SECTION ─── */
    .hero {
      position: relative;
      padding: 6rem 0 4rem;
      text-align: center;
      z-index: 10;
    }

    .badge-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: rgba(210, 125, 45, 0.08);
      border: 1px solid rgba(210, 125, 45, 0.25);
      color: var(--color-primary-hover);
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      background-color: var(--color-primary);
      border-radius: var(--radius-full);
      box-shadow: 0 0 8px var(--color-primary);
      animation: pulse-dot 1.8s infinite;
    }

    @keyframes pulse-dot {
      0% { transform: scale(0.9); opacity: 0.6; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(0.9); opacity: 0.6; }
    }

    .badge-by-brand {
      font-size: 0.75rem;
      color: var(--color-muted);
      text-decoration: none;
      transition: var(--transition-fast);
    }

    .badge-by-brand span {
      color: var(--color-primary-hover);
      font-weight: 500;
    }

    .badge-by-brand:hover {
      color: var(--color-text);
    }

    .hero h1 {
      font-size: clamp(2.5rem, 5.5vw, 4.5rem);
      line-height: 1.08;
      max-width: 900px;
      margin: 0 auto 1.5rem;
      font-weight: 800;
    }

    .hero-subtitle {
      font-size: clamp(1.05rem, 2vw, 1.25rem);
      color: var(--color-muted);
      max-width: 680px;
      margin: 0 auto 2.5rem;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 3.5rem;
    }

    /* ─── INSTALL WIDGET ─── */
    .install-widget {
      width: 100%;
      max-width: 580px;
      margin: 0 auto 5rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.5),
        0 0 40px var(--color-primary-glow);
      text-align: left;
    }

    .widget-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1.25rem;
      background: rgba(18, 16, 14, 0.6);
      border-bottom: 1px solid var(--color-border);
    }

    .widget-tabs {
      display: flex;
      gap: 0.5rem;
    }

    .widget-tab {
      background: none;
      border: none;
      color: var(--color-muted);
      font-family: var(--font-sans);
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: var(--transition-fast);
    }

    .widget-tab.active {
      color: var(--color-text);
      background-color: var(--color-surface-elevated);
      border: 1px solid var(--color-border);
    }

    .widget-tab:hover:not(.active) {
      color: var(--color-text);
    }

    .widget-dot-indicator {
      display: flex;
      gap: 5px;
    }

    .widget-dot-indicator span {
      width: 8px;
      height: 8px;
      border-radius: var(--radius-full);
      background-color: var(--color-border-hover);
    }

    .widget-body {
      position: relative;
      padding: 1.25rem 1.5rem;
    }

    .widget-code-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .widget-code {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: #E8A15A; /* Rich copper-gold text */
      word-break: break-all;
      line-height: 1.6;
    }

    .widget-copy-btn {
      background: var(--color-surface-elevated);
      border: 1px solid var(--color-border);
      color: var(--color-muted);
      padding: 0.5rem;
      border-radius: var(--radius-md);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-fast);
      flex-shrink: 0;
    }

    .widget-copy-btn:hover {
      color: var(--color-text);
      border-color: var(--color-primary);
      background-color: rgba(210, 125, 45, 0.08);
    }

    .widget-copy-btn svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
    }

    .widget-caption {
      font-size: 0.75rem;
      color: var(--color-muted-dark);
      margin-top: 0.75rem;
    }

    /* ─── STATS STRIP ─── */
    .stats-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      padding: 2rem 0;
      gap: 2rem;
      background-color: rgba(18, 16, 14, 0.2);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .stat-val {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 3.5vw, 2.5rem);
      font-weight: 700;
      color: var(--color-primary-hover);
      line-height: 1;
    }

    .stat-lbl {
      font-size: 0.8rem;
      color: var(--color-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* ─── FEATURES GRID ─── */
    .features {
      padding: 7rem 0;
      position: relative;
      z-index: 10;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4.5rem;
    }

    .section-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-bottom: 0.75rem;
      display: block;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.75rem);
      font-weight: 800;
      max-width: 600px;
      margin: 0 auto 1.25rem;
      line-height: 1.15;
    }

    .section-desc {
      font-size: 1.05rem;
      color: var(--color-muted);
      max-width: 580px;
      margin: 0 auto;
    }

    .grid-features {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }

    .feature-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 2.25rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      transition: var(--transition-base);
      position: relative;
      overflow: hidden;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 0%, var(--color-primary-glow), transparent 60%);
      opacity: 0;
      transition: var(--transition-base);
      pointer-events: none;
    }

    .feature-card:hover {
      transform: translateY(-2px);
      border-color: var(--color-border-hover);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    }

    .feature-card:hover::before {
      opacity: 1;
    }

    .feature-icon-wrapper {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      background-color: var(--color-primary-glow);
      border: 1px solid rgba(210, 125, 45, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-primary);
      transition: var(--transition-base);
    }

    .feature-card:hover .feature-icon-wrapper {
      color: var(--color-text);
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      box-shadow: 0 0 15px var(--color-primary-glow-heavy);
    }

    .feature-icon-wrapper svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .feature-title {
      font-size: 1.15rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .feature-desc {
      font-size: 0.875rem;
      color: var(--color-muted);
      line-height: 1.6;
    }

    /* ─── HOW IT WORKS (ARCHITECTURE FLOW) ─── */
    .architecture {
      padding: 7rem 0;
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      background: rgba(18, 16, 14, 0.3);
      position: relative;
      z-index: 10;
    }

    .flow-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      max-width: 1000px;
      margin: 4rem auto 0;
    }

    .flow-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      position: relative;
    }

    .flow-node {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1.25rem 2rem;
      min-width: 180px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      z-index: 2;
      transition: var(--transition-base);
    }

    .flow-node-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-md);
      background-color: var(--color-surface-elevated);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-muted);
    }

    .flow-node-title {
      font-size: 0.9rem;
      font-weight: 600;
    }

    .flow-node-desc {
      font-size: 0.75rem;
      color: var(--color-muted);
    }

    /* Active Flow Node styling */
    .flow-node.active {
      border-color: var(--color-primary-dim);
      background-color: var(--color-primary-glow);
      box-shadow: 0 0 30px var(--color-primary-glow);
    }

    .flow-node.active .flow-node-icon {
      background-color: rgba(210, 125, 45, 0.2);
      color: var(--color-primary-hover);
    }

    .flow-node.standby {
      opacity: 0.65;
    }

    /* Flow connector lines */
    .flow-connector {
      flex: 1;
      height: 2px;
      background: var(--color-border);
      position: relative;
      margin: 0 1rem;
    }

    .flow-connector::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 6px solid var(--color-border);
    }

    .flow-connector.active-line {
      background: linear-gradient(90deg, var(--color-primary-dim), var(--color-primary));
      animation: pulse-line 2s infinite;
    }

    .flow-connector.active-line::after {
      border-left-color: var(--color-primary);
    }

    .flow-connector-label {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-muted);
      white-space: nowrap;
    }

    @keyframes pulse-line {
      0% { opacity: 0.5; }
      50% { opacity: 1; }
      100% { opacity: 0.5; }
    }

    .flow-split-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .flow-label-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.2rem 0.5rem;
      border-radius: var(--radius-sm);
      font-size: 0.65rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .badge-active {
      background-color: var(--color-success-glow);
      color: var(--color-success);
    }

    .badge-standby {
      background-color: rgba(255, 255, 255, 0.05);
      color: var(--color-muted);
    }

    /* Architectural callouts */
    .arch-callouts {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      width: 100%;
      margin-top: 4rem;
      text-align: center;
    }

    .arch-callout-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .arch-callout-lbl {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-primary-hover);
    }

    .arch-callout-desc {
      font-size: 0.8rem;
      color: var(--color-muted);
    }

    /* ─── LIVE CONFIG PREVIEW ─── */
    .config-preview {
      padding: 7rem 0;
      position: relative;
      z-index: 10;
    }

    .terminal-window {
      width: 100%;
      max-width: 800px;
      margin: 4rem auto 0;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    }

    .terminal-header {
      background: rgba(18, 16, 14, 0.6);
      border-bottom: 1px solid var(--color-border);
      padding: 0.75rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .terminal-dots {
      display: flex;
      gap: 6px;
    }

    .terminal-dot {
      width: 10px;
      height: 10px;
      border-radius: var(--radius-full);
    }
    .terminal-dot-red { background-color: #EF4444; }
    .terminal-dot-yellow { background-color: #F59E0B; }
    .terminal-dot-green { background-color: #10B981; }

    .terminal-title {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-muted);
    }

    .terminal-body {
      padding: 1.5rem 2rem;
      overflow-x: auto;
    }

    .terminal-code {
      font-family: var(--font-mono);
      font-size: 0.825rem;
      line-height: 1.6;
      color: var(--color-text);
      white-space: pre;
    }

    /* Syntax highlight colors */
    .toml-section { color: #F4A460; font-weight: 500; }
    .toml-key { color: var(--color-text); }
    .toml-val-str { color: #10B981; }
    .toml-val-num { color: var(--color-primary); }
    .toml-comment { color: var(--color-muted-dark); font-style: italic; }

    /* ─── FOOTER ─── */
    footer {
      border-top: 1px solid var(--color-border);
      padding: 4rem 0;
      background: rgba(9, 8, 7, 0.95);
      position: relative;
      z-index: 10;
    }

    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      text-align: center;
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .footer-links a {
      text-decoration: none;
      font-size: 0.85rem;
      color: var(--color-muted);
      transition: var(--transition-fast);
    }

    .footer-links a:hover {
      color: var(--color-text);
    }

    .footer-copyright {
      font-size: 0.75rem;
      color: var(--color-muted-dark);
    }

    /* ─── RESPONSIVE STYLES ─── */
    @media (max-width: 1024px) {
      .grid-features {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hamburger {
        display: flex;
      }

      .nav-links {
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--color-bg);
        flex-direction: column;
        justify-content: center;
        gap: 2.5rem;
        transform: translateY(-100%);
        opacity: 0;
        transition: var(--transition-base);
        z-index: 99;
      }

      .nav-links.active {
        transform: translateY(0);
        opacity: 1;
      }

      .header-cta {
        display: none;
      }

      .stats-strip {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .flow-row {
        flex-direction: column;
        gap: 2.5rem;
      }

      .flow-connector {
        width: 2px;
        height: 40px;
        margin: 0.5rem 0;
        flex: none;
      }

      .flow-connector::after {
        top: auto;
        bottom: 0;
        right: auto;
        left: 50%;
        transform: translateX(-50%);
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 6px solid var(--color-border);
      }

      .flow-connector.active-line {
        background: linear-gradient(180deg, var(--color-primary-dim), var(--color-primary));
      }

      .flow-connector.active-line::after {
        border-top-color: var(--color-primary);
        border-left-color: transparent;
      }

      .arch-callouts {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .grid-features {
        grid-template-columns: 1fr;
      }

      .stats-strip {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
  </style>
</head>
<body>

  <!-- BACKGROUND FX -->
  <div class="bg-grid"></div>
  <div class="glow-blob glow-blob-1"></div>
  <div class="glow-blob glow-blob-2"></div>

  <!-- NAVIGATION HEADER -->
  <header>
    <div class="container header-nav">
      <a href="#" class="logo">
        <div class="logo-mark">
          <svg class="logo-mark-svg" viewBox="0 0 24 24">
            <path d="M4 12v-3a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3M20 12v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3M12 5v14M8 12h8" />
          </svg>
        </div>
        CupraFlow
      </a>
      
      <ul class="nav-links" id="navLinks">
        <li><a href="#features" onclick="toggleMenu()">Features</a></li>
        <li><a href="#architecture" onclick="toggleMenu()">Architecture</a></li>
        <li><a href="#install" onclick="toggleMenu()">Installation</a></li>
        <li><a href="#config" onclick="toggleMenu()">Configuration</a></li>
      </ul>

      <div class="header-cta">
        <a href="https://github.com/sb-mcampoe/cupra-flow" target="_blank" class="btn btn-outline btn-sm">GitHub</a>
        <a href="#install" class="btn btn-primary btn-sm">Install Now</a>
      </div>

      <button class="hamburger" id="menuToggle" aria-label="Toggle menu" onclick="toggleMenu()">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="hero">
    <div class="container">
      
      <!-- Top Badge -->
      <div class="badge-container">
        <div class="badge">
          <span class="badge-dot"></span>
          Open Source · MIT License
        </div>
        <a href="https://securyblack.com" target="_blank" class="badge-by-brand">
          by <span>SecuryBlack</span>
        </a>
      </div>

      <!-- Main Headline -->
      <h1>
        High-performance <span class="text-gradient-copper">load balancing.</span><br>
        <span class="text-gradient">Zero overhead.</span>
      </h1>

      <!-- Subheadline -->
      <p class="hero-subtitle">
        CupraFlow is an ultralight, memory-safe network load balancer written in <span style="color: var(--color-text)">Rust</span>. Connect virtual IPs, secure routing, and implement Keepalived-style high availability natively across Windows and Linux.
      </p>

      <!-- CTA Buttons -->
      <div class="hero-actions">
        <a href="#install" class="btn btn-primary btn-lg">Get Started</a>
        <a href="https://github.com/sb-mcampoe/cupra-flow" target="_blank" class="btn btn-outline btn-lg">
          <!-- Github Icon -->
          <svg style="width: 18px; height: 18px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>

      <!-- Installation Command Snippet Widget -->
      <div class="install-widget" id="install">
        <div class="widget-header">
          <div class="widget-tabs">
            <button class="widget-tab active" onclick="switchTab('windows')">Windows (PowerShell)</button>
            <button class="widget-tab" onclick="switchTab('linux')">Linux (Bash)</button>
          </div>
          <div class="widget-dot-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="widget-body">
          <div class="widget-code-container">
            <div class="widget-code" id="installCmd">irm https://install.cupraflow.dev/windows | iex</div>
            <button class="widget-copy-btn" title="Copy code" onclick="copyInstallCmd()">
              <svg viewBox="0 0 24 24" id="copyIcon">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
          <div class="widget-caption" id="installCaption">Must be run as Administrator in Windows PowerShell.</div>
        </div>
      </div>

      <!-- Stats Strip -->
      <div class="stats-strip">
        <div class="stat-item">
          <span class="stat-val">~3.5 MB</span>
          <span class="stat-lbl">Binary Size</span>
        </div>
        <div class="stat-item">
          <span class="stat-val">&lt;5s</span>
          <span class="stat-lbl">Failover Latency</span>
        </div>
        <div class="stat-item">
          <span class="stat-val">Rust</span>
          <span class="stat-lbl">Memory Safe Core</span>
        </div>
        <div class="stat-item">
          <span class="stat-val">L4 / L7</span>
          <span class="stat-lbl">Full Proxy Engine</span>
        </div>
      </div>

    </div>
  </section>

  <!-- FEATURES SECTION -->
  <section class="features" id="features">
    <div class="container">
      
      <div class="section-header">
        <span class="section-label">Features</span>
        <h2 class="section-title">Built for resilience and extreme speed</h2>
        <p class="section-desc">Designed with high-availability systems in mind, CupraFlow combines networking capability with local agent performance.</p>
      </div>

      <div class="grid-features">
        
        <!-- Feature 1 -->
        <div class="feature-card">
          <div class="feature-icon-wrapper">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <h3 class="feature-title">L4 & L7 Proxy Engine</h3>
            <p class="feature-desc">High-performance TCP/UDP L4 proxy routing alongside Layer 7 HTTP/HTTPS reverse proxy capabilities, including SSL/TLS termination and path-based routing.</p>
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="feature-card">
          <div class="feature-icon-wrapper">
            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h3 class="feature-title">High Availability (VRRP)</h3>
            <p class="feature-desc">Active-standby cluster orchestration with a floating Virtual IP (VIP). Automatically detects master failures and achieves seamless failover in under 5 seconds.</p>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="feature-card">
          <div class="feature-icon-wrapper">
            <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <div>
            <h3 class="feature-title">Zero-Overhead Rust Core</h3>
            <p class="feature-desc">Single static binary under 3.5 MB. Uses near-zero CPU and RAM overhead in idle states. Built without heavy garbage-collected runtimes.</p>
          </div>
        </div>

        <!-- Feature 4 -->
        <div class="feature-card">
          <div class="feature-icon-wrapper">
            <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
          </div>
          <div>
            <h3 class="feature-title">Native Windows Service</h3>
            <p class="feature-desc">Integrates natively with Windows SCM (\`services.msc\`) out of the box, with crash-recovery policies and standard log aggregation in ProgramData.</p>
          </div>
        </div>

        <!-- Feature 5 -->
        <div class="feature-card">
          <div class="feature-icon-wrapper">
            <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <div>
            <h3 class="feature-title">Active Health Probing</h3>
            <p class="feature-desc">Continuous status verification of downstream servers using active TCP connections and HTTP response code checks. Automatically removes unhealthy nodes.</p>
          </div>
        </div>

        <!-- Feature 6 -->
        <div class="feature-card">
          <div class="feature-icon-wrapper">
            <svg viewBox="0 0 24 24"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          </div>
          <div>
            <h3 class="feature-title">Self-Updating Core</h3>
            <p class="feature-desc">Integrated updater that checks against GitHub Releases securely. Performs hot bin replacement and service restarts with zero human manual intervention.</p>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- ARCHITECTURE / DIAGRAM SECTION -->
  <section class="architecture" id="architecture">
    <div class="container">
      
      <div class="section-header">
        <span class="section-label">Architecture</span>
        <h2 class="section-title">Keepalived-style VIP Failover</h2>
        <p class="section-desc">CupraFlow nodes form an active-standby cluster behind a shared Virtual IP (VIP), routing queries to backend upstreams.</p>
      </div>

      <div class="flow-container">
        <div class="flow-row">
          
          <!-- Clients -->
          <div class="flow-node">
            <div class="flow-node-icon">
              <svg style="width:18px; height:18px; fill:none; stroke:currentColor; stroke-width:2;" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div class="flow-node-title">Client Requests</div>
              <div class="flow-node-desc">HTTPS / TCP Traffic</div>
            </div>
          </div>

          <!-- Connector Active -->
          <div class="flow-connector active-line">
            <div class="flow-connector-label">VIP: 192.168.1.100</div>
          </div>

          <!-- Active-Standby Nodes Split -->
          <div class="flow-split-wrapper">
            
            <!-- Master Node -->
            <div class="flow-node active">
              <span class="flow-label-badge badge-active">Master (Active)</span>
              <div class="flow-node-icon">
                <svg style="width:18px; height:18px; fill:none; stroke:currentColor; stroke-width:2;" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><path d="M6 12h12M12 6v12"/>
                </svg>
              </div>
              <div>
                <div class="flow-node-title">CupraFlow Node A</div>
                <div class="flow-node-desc">Proxying Traffic</div>
              </div>
            </div>

            <!-- Standby Node -->
            <div class="flow-node standby">
              <span class="flow-label-badge badge-standby">Backup (Standby)</span>
              <div class="flow-node-icon">
                <svg style="width:18px; height:18px; fill:none; stroke:currentColor; stroke-width:2;" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
                </svg>
              </div>
              <div>
                <div class="flow-node-title">CupraFlow Node B</div>
                <div class="flow-node-desc">VRRP Heartbeat Monitoring</div>
              </div>
            </div>

          </div>

          <!-- Connector Split -->
          <div class="flow-connector active-line">
            <div class="flow-connector-label">Upstream Proxying</div>
          </div>

          <!-- Backends -->
          <div class="flow-node">
            <div class="flow-node-icon">
              <svg style="width:18px; height:18px; fill:none; stroke:currentColor; stroke-width:2;" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
              </svg>
            </div>
            <div>
              <div class="flow-node-title">Backend Servers</div>
              <div class="flow-node-desc">App Servers / Docker Pools</div>
            </div>
          </div>

        </div>

        <!-- Callouts -->
        <div class="arch-callouts">
          <div class="arch-callout-item">
            <span class="arch-callout-lbl">Virtual IP (VIP) Binding</span>
            <span class="arch-callout-desc">The master node binds the VIP. If Node A crashes, Node B assumes the IP and continues proxying.</span>
          </div>
          <div class="arch-callout-item">
            <span class="arch-callout-lbl">Health Probing Keep-Alive</span>
            <span class="arch-callout-desc">Continuous VRRP heartbeats (L2/L3 multicast or unicast) are sent between nodes to track master node health.</span>
          </div>
          <div class="arch-callout-item">
            <span class="arch-callout-lbl">Backend Auto-Scaling</span>
            <span class="arch-callout-desc">CupraFlow routes to multiple backend servers, dynamically balancing using customizable L4/L7 policies.</span>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- LIVE CONFIG PREVIEW SECTION -->
  <section class="config-preview" id="config">
    <div class="container">
      
      <div class="section-header">
        <span class="section-label">Configuration</span>
        <h2 class="section-title">Readable. Modular. Declarative.</h2>
        <p class="section-desc">Configure upstreams, load balancer algorithms, virtual IPs, health checks, and service settings in simple, clean TOML.</p>
      </div>

      <div class="terminal-window">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="terminal-dot terminal-dot-red"></span>
            <span class="terminal-dot terminal-dot-yellow"></span>
            <span class="terminal-dot terminal-dot-green"></span>
          </div>
          <div class="terminal-title">config.toml</div>
          <div style="width: 42px;"></div>
        </div>
        <div class="terminal-body">
          <div class="terminal-code"><span class="toml-section">[server]</span>
<span class="toml-key">port</span> = <span class="toml-val-num">8080</span>
<span class="toml-key">bind_address</span> = <span class="toml-val-str">"0.0.0.0"</span>

<span class="toml-section">[loadbalancer]</span>
<span class="toml-key">enabled</span> = <span class="toml-val-num">true</span>
<span class="toml-key">algorithm</span> = <span class="toml-val-str">"round_robin"</span> <span class="toml-comment"># round_robin, least_connections, ip_hash</span>
<span class="toml-key">health_check_interval</span> = <span class="toml-val-num">10</span> <span class="toml-comment"># seconds</span>

<span class="toml-section">[[loadbalancer.backends]]</span>
<span class="toml-key">address</span> = <span class="toml-val-str">"192.168.1.50:8081"</span>
<span class="toml-key">weight</span> = <span class="toml-val-num">3</span>

<span class="toml-section">[[loadbalancer.backends]]</span>
<span class="toml-key">address</span> = <span class="toml-val-str">"192.168.1.51:8081"</span>
<span class="toml-key">weight</span> = <span class="toml-val-num">1</span>

<span class="toml-section">[vrrp]</span>
<span class="toml-key">enabled</span> = <span class="toml-val-num">true</span>
<span class="toml-key">virtual_ip</span> = <span class="toml-val-str">"192.168.1.100/24"</span>
<span class="toml-key">interface</span> = <span class="toml-val-str">"eth0"</span>
<span class="toml-key">priority</span> = <span class="toml-val-num">100</span> <span class="toml-comment"># node with highest priority becomes Master</span>
<span class="toml-key">advert_interval</span> = <span class="toml-val-num">1</span> <span class="toml-comment"># heartbeat interval in seconds</span></div>
        </div>
      </div>

    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="container footer-content">
      <div class="footer-brand">
        <a href="#" class="logo">
          <div class="logo-mark">
            <svg class="logo-mark-svg" viewBox="0 0 24 24">
              <path d="M4 12v-3a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3M20 12v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3M12 5v14M8 12h8" />
            </svg>
          </div>
          CupraFlow
        </a>
        <p style="font-size: 0.8rem; color: var(--color-muted); margin-top: 0.5rem;">Next-generation keepalived and proxy agent for Windows and Linux servers.</p>
      </div>

      <ul class="footer-links">
        <li><a href="https://github.com/sb-mcampoe/cupra-flow" target="_blank">GitHub</a></li>
        <li><a href="https://securyblack.com" target="_blank">SecuryBlack</a></li>
        <li><a href="https://oxipulse.dev" target="_blank">OxiPulse</a></li>
      </ul>

      <p class="footer-copyright">&copy; 2026 SecuryBlack. Distributed under MIT License. All rights reserved.</p>
    </div>
  </footer>

  <!-- INTERACTIVE LOGIC -->
  <script>
    // Toggle Mobile Navigation Menu
    function toggleMenu() {
      const navLinks = document.getElementById('navLinks');
      const menuToggle = document.getElementById('menuToggle');
      
      // Only trigger on mobile viewports
      if (window.innerWidth <= 768) {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
      }
    }

    // Switch Installation Tabs (Windows vs Linux)
    const cmds = {
      windows: {
        text: 'irm https://install.cupraflow.dev/windows | iex',
        caption: 'Must be run as Administrator in Windows PowerShell.'
      },
      linux: {
        text: 'curl -fsSL https://install.cupraflow.dev/linux | sudo bash',
        caption: 'Requires root / sudo privileges on Linux distributions (Ubuntu, Debian, CentOS, RHEL).'
      }
    };

    function switchTab(platform) {
      // Toggle active classes on buttons
      const tabs = document.querySelectorAll('.widget-tab');
      tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.innerText.toLowerCase().includes(platform)) {
          tab.classList.add('active');
        }
      });

      // Update text and captions
      document.getElementById('installCmd').innerText = cmds[platform].text;
      document.getElementById('installCaption').innerText = cmds[platform].caption;
    }

    // Copy Install Command to Clipboard with Visual Confirmation
    function copyInstallCmd() {
      const codeEl = document.getElementById('installCmd');
      const originalText = codeEl.innerText;
      
      navigator.clipboard.writeText(originalText).then(() => {
        codeEl.innerText = "Copied to clipboard!";
        codeEl.style.color = "var(--color-success)";
        
        setTimeout(() => {
          codeEl.innerText = originalText;
          codeEl.style.color = "#E8A15A";
        }, 1500);
      });
    }
  </script>

</body>
</html>`;

// ─── INSTALL.PS1 SOURCE ───
const INSTALL_PS1_CONTENT = `# CupraFlow - Windows Install Script
# Usage: irm https://install.cupraflow.dev/windows | iex
# Or local: .\\scripts\\install.ps1
[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Helpers
function Write-Info    { param($msg) Write-Host "[cupraflow] $msg" -ForegroundColor Cyan }
function Write-Success { param($msg) Write-Host "[cupraflow] $msg" -ForegroundColor Green }
function Write-Warn    { param($msg) Write-Host "[cupraflow] $msg" -ForegroundColor Yellow }
function Fail          { param($msg) Write-Host "[cupraflow] ERROR: $msg" -ForegroundColor Red; exit 1 }

# Constants
$GithubRepo  = "sb-mcampoe/cupra-flow"
$BinaryName  = "cupraflow.exe"
$InstallDir  = "$env:ProgramFiles\\CupraFlow"
$ConfigDir   = "$env:ProgramData\\CupraFlow"
$ConfigFile  = "$ConfigDir\\config.toml"
$ServiceName = "CupraFlow"

# Banner
Write-Host ""
Write-Host "  CupraFlow - Load Balancer Agent" -ForegroundColor Cyan -NoNewline
Write-Host " (Windows Installer)" -ForegroundColor Gray
Write-Host ""

# Admin check
$currentPrincipal = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Fail "This script must be run as Administrator. Right-click PowerShell and select 'Run as Administrator'."
}

# Architecture detection
$procArch = $env:PROCESSOR_ARCHITECTURE
$target = switch ($procArch) {
    "AMD64" { "x86_64-pc-windows-msvc" }
    "ARM64" { "aarch64-pc-windows-msvc" }
    default { Fail "Unsupported architecture: $procArch" }
}

Write-Info "Detected architecture: $procArch ($target)"

# Resolve latest release version
Write-Info "Fetching latest release from GitHub..."
$releaseApi  = "https://api.github.com/repos/$GithubRepo/releases/latest"
try {
    $releaseInfo = Invoke-RestMethod -Uri $releaseApi -Headers @{ "User-Agent" = "cupraflow-installer" }
    $version     = $releaseInfo.tag_name
} catch {
    Fail "Could not reach GitHub API. Check your internet connection."
}

if (-not $version) { Fail "Could not determine latest version." }

Write-Info "Latest version: $version"

# Download binary
$assetName   = "cupra-flow-$target.zip"
$downloadUrl = "https://github.com/$GithubRepo/releases/download/$version/$assetName"
$checksumUrl = "$downloadUrl.sha256"
$tmpDir      = [System.IO.Path]::GetTempPath() + [System.IO.Path]::GetRandomFileName()
New-Item -ItemType Directory -Path $tmpDir | Out-Null

try {
    Write-Info "Downloading $assetName..."
    $zipPath = "$tmpDir\\$assetName"
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath -UseBasicParsing

    # Verify checksum if available
    try {
        $checksumFile = "$tmpDir\\$assetName.sha256"
        Invoke-WebRequest -Uri $checksumUrl -OutFile $checksumFile -UseBasicParsing
        $expected = (Get-Content $checksumFile).Split(" ")[0].Trim().ToLower()
        $actual   = (Get-FileHash -Algorithm SHA256 $zipPath).Hash.ToLower()
        if ($expected -ne $actual) { Fail "Checksum mismatch. Download may be corrupted." }
        Write-Success "Checksum OK"
    } catch {
        Write-Warn "No checksum file found, skipping verification"
    }

    # Install binary
    Write-Info "Installing binary to $InstallDir..."
    Expand-Archive -Path $zipPath -DestinationPath $tmpDir -Force
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
    Copy-Item "$tmpDir\\$BinaryName" "$InstallDir\\$BinaryName" -Force

    # Install default config if not present
    New-Item -ItemType Directory -Path $ConfigDir -Force | Out-Null
    if (-not (Test-Path $ConfigFile)) {
        Write-Info "Writing default config to $ConfigFile..."
        @"
[server]
port = 8080
bind_address = "0.0.0.0"

[logging]
level = "info"
format = "pretty"

[service]
name = "CupraFlow"
description = "Agente de gestion de red y balanceo de carga"
startup = "auto"

[loadbalancer]
enabled = false
algorithm = "round_robin"
health_check_interval = 30
backends = []

[update]
channel = "stable"
check_on_startup = true
check_interval = 24
github_repo = "sb-mcampoe/cupra-flow"
"@ | Set-Content -Path $ConfigFile -Encoding UTF8
        Write-Success "Config written"
    } else {
        Write-Info "Config already exists, skipping"
    }

    # Windows Service
    Write-Info "Registering Windows Service '$ServiceName'..."

    # Remove existing service if present
    if (Get-Service -Name $ServiceName -ErrorAction SilentlyContinue) {
        Stop-Service -Name $ServiceName -Force -ErrorAction SilentlyContinue
        & sc.exe delete $ServiceName | Out-Null
        Start-Sleep -Seconds 1
    }

    # Use the binary's built-in install command
    & "$InstallDir\\$BinaryName" install
    if ($LASTEXITCODE -ne 0) { Fail "Service registration failed." }

    # Configure restart on failure
    & sc.exe failure $ServiceName reset= 86400 actions= restart/10000/restart/30000/restart/60000 | Out-Null
    & sc.exe failureflag $ServiceName 1 | Out-Null

    # Start service
    & "$InstallDir\\$BinaryName" start
    if ($LASTEXITCODE -ne 0) { Fail "Service start failed." }

    Write-Success "Service registered and started"

} finally {
    Remove-Item -Recurse -Force $tmpDir -ErrorAction SilentlyContinue
}

# Done
Write-Host ""
Write-Host "  CupraFlow $version installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "  Status:  " -NoNewline; Write-Host "Get-Service CupraFlow" -ForegroundColor White
Write-Host "  Logs:    " -NoNewline; Write-Host "$ConfigDir\\cupraflow.log.*" -ForegroundColor White
Write-Host "  Config:  " -NoNewline; Write-Host $ConfigFile -ForegroundColor White
Write-Host "  Binary:  " -NoNewline; Write-Host "$InstallDir\\$BinaryName" -ForegroundColor White
Write-Host ""
`;

// ─── WORKER FETCH HANDLER ───
export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const ua = req.headers.get("User-Agent") ?? "";
    
    // Check if the client is a PowerShell terminal or explicitly requesting the install script
    const isPowerShell = ua.includes("PowerShell") || ua.includes("WindowsPowerShell");
    const isInstallRoute = url.pathname === "/windows" || url.pathname === "/install.ps1" || url.pathname.endsWith("install.ps1");

    if (isPowerShell || isInstallRoute) {
      return new Response(INSTALL_PS1_CONTENT, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Otherwise, serve the gorgeous, custom Copper-theme landing page
    return new Response(HTML_CONTENT, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  },
};
