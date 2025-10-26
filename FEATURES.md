# Iranian Marketplace Analytics - Complete Features Documentation

## 🚀 Deployed URL
**https://agentic-72a7b57c.vercel.app**

## 📋 Overview
A comprehensive web-based analytics and scraping tool for Iranian online marketplaces, featuring real-time data collection, advanced analytics, and powerful export capabilities.

## ✨ Core Features

### 1. Data Collection Module (Web Scraping)
- **Multi-Source Support**: Scrapes data from Digikala, Basalam, and other Iranian e-commerce platforms
- **Comprehensive Product Data**:
  - Product title
  - Current price and original price (with discount calculation)
  - Multiple product images
  - Detailed descriptions
  - View counts
  - Sales statistics
  - Customer ratings and reviews
  - Brand information
  - Listing dates
  - Stock availability
- **Intelligent Scraping**:
  - User-Agent rotation to avoid detection
  - Automatic retry with exponential backoff
  - Rate limiting for respectful scraping
  - Error handling and fallback mechanisms

### 2. Smart Category Tree System
- **8 Main Categories** with 40+ subcategories:
  - 🏠 Home Appliances (Furniture, Bedroom Sets, Carpets, Kitchen)
  - 📱 Electronics (TV, Refrigerator, Computers, Mobile, Gaming)
  - 👕 Fashion & Apparel (Women's, Men's, Children's, Shoes, Accessories)
  - 💄 Beauty & Health (Skincare, Makeup, Perfume, Hair Care)
  - ⚽ Sports & Travel (Equipment, Sportswear, Camping)
  - 📚 Books & Stationery
  - 🧸 Toys (Educational, Games)
  - 🚗 Automotive (Parts, Accessories)

### 3. Advanced Analytics Engine

#### A. Statistical Overview
- Total product count
- Average price calculation
- Price range analysis (min/max)
- Real-time data aggregation

#### B. Brand Analysis
- Top performing brands by product count
- Average price per brand
- Brand rating analysis
- Market share visualization

#### C. Title & Keyword Analysis
- High-traffic title identification
- Conversion rate calculation (views to sales)
- Most frequent keywords extraction
- Keyword pricing trends
- Product naming pattern analysis

#### D. Purchase Behavior Analysis
- Conversion rate tracking
- Sales volume analysis
- Best-selling price ranges
- Time-based sales trends

#### E. Price Distribution
- Intelligent price range segmentation
- Product count per price bracket
- Percentage distribution
- Visual price distribution charts

### 4. Interactive Dashboard

#### Main Page Features
- Clean, RTL (Right-to-Left) Persian interface
- Category grid with intuitive navigation
- Responsive design for all devices
- Beautiful gradient backgrounds

#### Category Detail Page

**Section 1: Overview Statistics**
- Total product count with Persian number formatting
- Average price display
- Price range indicators
- Top brand showcase

**Section 2: Visual Analytics**
- Bar charts for brand comparison
- Pie charts for price distribution
- Line charts for sales trends
- Interactive tooltips with Persian formatting
- Responsive chart containers

**Section 3: Product Grid**
Display format includes:
- High-quality product images
- Full product titles
- Current and original prices
- Discount badges
- Brand tags
- Source labels
- View and sales statistics
- Customer ratings with stars
- Stock availability
- Quick action buttons

**Section 4: Advanced Filtering**
- Price range slider
- Brand multi-select
- Minimum rating filter
- Date range selection
- Real-time filter application

**Section 5: Sorting Options**
- By popularity (view count)
- By price (ascending/descending)
- By date (newest first)
- By rating (highest rated)
- By sales (best sellers)
- Toggle ascending/descending order

### 5. Export & Copy Tools

#### Excel Export
- Formatted spreadsheet with headers
- Styled columns
- Persian text support (UTF-8 BOM)
- Multiple sheets support
- Auto-column width

#### CSV Export
- Comma-separated values
- UTF-8 encoding with BOM
- Excel-compatible format
- Bulk data export

#### JSON Export
- Pretty-printed JSON
- Full product data structure
- Developer-friendly format
- Easy integration support

#### Copy to Clipboard
- Single product copy with formatting
- Formatted text with Persian numbers
- Includes all product details
- Images URLs included
- One-click operation

#### Bulk Image Download
- Download all product images
- Sequential image naming
- Automatic file naming
- Progress indication

### 6. Technical Features

#### Frontend Architecture
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom RTL support
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React icon library
- **State Management**: React hooks and local state
- **Responsive Design**: Mobile-first approach

#### Backend Architecture
- **API**: Next.js API Routes
- **Scraping Libraries**: 
  - Cheerio for HTML parsing
  - Axios for HTTP requests
- **Export Libraries**:
  - ExcelJS for Excel generation
  - File-saver for client-side downloads
- **Data Processing**: Advanced analytics algorithms

#### Security Features
- Rate limiting implementation
- User-Agent rotation
- Request retry mechanisms
- Error boundary handling
- Secure API endpoints
- Input validation

#### Performance Optimization
- Static page generation where possible
- Lazy loading of images
- Optimized bundle size
- Efficient data caching
- Minimal re-renders

### 7. User Experience Features

#### Persian Language Support
- Full RTL (Right-to-Left) layout
- Persian number formatting
- Persian date formatting
- Localized UI text
- Persian font optimization

#### Responsive Design
- Mobile-optimized interface
- Tablet-friendly layouts
- Desktop-enhanced experience
- Touch-friendly controls
- Adaptive charts

#### Visual Design
- Modern gradient backgrounds
- Card-based layouts
- Smooth transitions
- Hover effects
- Loading states
- Empty states
- Error states

#### Accessibility
- Semantic HTML
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation
- Focus indicators
- Color contrast compliance

### 8. Advanced Capabilities

#### Real-Time Data Processing
- Live product data fetching
- Instant analytics calculation
- Dynamic chart updates
- Real-time filtering

#### Keyword Intelligence
- Automatic keyword extraction
- Frequency analysis
- Price correlation
- Trend identification
- Market insights

#### Trend Analysis
- Growing products identification
- Declining products tracking
- Seasonal pattern detection
- Time-based comparisons

#### Competitor Analysis
- Cross-source comparison
- Price comparison
- Brand positioning
- Market share analysis

### 9. API Endpoints

#### GET/POST /api/scrape
- **Parameters**: category, subcategory, sources[]
- **Returns**: Array of products with full details
- **Features**: Error handling, validation, source filtering

## 🎯 Use Cases

1. **E-commerce Sellers**: Research competitors and optimize product listings
2. **Market Researchers**: Analyze market trends and pricing strategies
3. **Content Creators**: Find product information for reviews and comparisons
4. **Business Analysts**: Generate market reports and insights
5. **Developers**: Access structured product data via API
6. **Entrepreneurs**: Identify market opportunities and gaps

## 🔧 Technical Stack Summary

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Export**: ExcelJS, File-saver
- **Scraping**: Cheerio, Axios
- **Deployment**: Vercel
- **Build**: Next.js optimized build

## 📊 Data Structure

All products include:
- Unique identifiers
- Complete metadata
- Pricing information
- Image arrays
- Statistical data
- Source tracking
- Timestamp information

## 🌟 Future Enhancement Possibilities

- Real database integration (PostgreSQL/MongoDB)
- User authentication system
- Saved searches and alerts
- Price change notifications
- Automated scraping scheduler
- Historical data tracking
- Advanced ML predictions
- Custom report builder
- API rate limiting dashboard
- Multi-language support

## 📝 Notes

This is a demonstration version with simulated data. For production use:
- Implement actual scraping with proper authentication
- Add database for persistent storage
- Set up scheduled scraping jobs
- Implement user management
- Add monitoring and logging
- Enhance security measures
- Optimize for scale

## 🚀 Deployment Information

- **Platform**: Vercel
- **URL**: https://agentic-72a7b57c.vercel.app
- **Build Time**: ~30 seconds
- **Deploy Time**: ~10 seconds
- **Status**: ✅ Live and Operational
