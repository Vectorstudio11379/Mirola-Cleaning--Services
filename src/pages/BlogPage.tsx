import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  BookOpen, 
  Building2, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { ClientLogoTicker } from '../components/ClientLogoTicker';
import { CONTACT_INFO } from '../constants/contactInfo';
import type { AppRoute } from '../types/navigation';

interface BlogPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ 
  onNavigate, 
  onOpenConsultation 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'gym', label: 'Gyms & Athletics' },
    { id: 'daycare', label: 'Childcare & Daycares' },
    { id: 'office', label: 'Corporate Offices' },
    { id: 'floors', label: 'Floor Care & Strip/Wax' }
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.exampleFromField.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="subpage-wrapper blog-standalone-page">
      
      {/* 1. HERO SECTION (BLACK & RED) */}
      <section className="subpage-hero-dark">
        <div className="subpage-container">
          
          {/* Breadcrumb Navigation */}
          <nav className="subpage-breadcrumbs" aria-label="Breadcrumb">
            <button 
              type="button" 
              className="subpage-breadcrumb-btn" 
              onClick={() => onNavigate('/')}
            >
              Home
            </button>
            <ChevronRight size={14} className="subpage-breadcrumb-sep" />
            <span className="subpage-breadcrumb-current">Blog & Field Insights</span>
          </nav>

          <div className="subpage-hero-split-grid">
            
            {/* Left Column: Headlines & Actions */}
            <div className="subpage-hero-content">
              <div className="subpage-badge">
                <span className="subpage-pulse-dot" />
                <span>MIROLA CLEANING INSIGHTS & CASE STUDIES</span>
              </div>

              <h1 className="subpage-hero-title">
                Field-Tested Cleaning Strategies & Commercial Insights
              </h1>

              <p className="subpage-hero-desc">
                Real problems, real clients, and real cleaning solutions. Explore how Mirola Cleaning Services tackles stubborn facility odors, stops classroom viral cycles, eliminates corporate cross-contamination, and restores worn commercial floors nationwide.
              </p>

              <div className="subpage-hero-actions">
                <button 
                  type="button" 
                  className="subpage-primary-btn"
                  onClick={() => onNavigate(`/blog/${BLOG_POSTS[0].slug}` as AppRoute)}
                >
                  <BookOpen size={16} />
                  <span>Read Latest Field Study</span>
                </button>

                <button 
                  type="button" 
                  className="subpage-secondary-btn"
                  onClick={onOpenConsultation}
                >
                  <span>Book Free Facility Walkthrough</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Column: Featured Article Capsule */}
            <div className="subpage-hero-visual">
              <div 
                className="blog-hero-featured-card"
                onClick={() => onNavigate(`/blog/${BLOG_POSTS[0].slug}` as AppRoute)}
                style={{ cursor: 'pointer' }}
              >
                <div className="hero-featured-badge">FEATURED CASE STUDY</div>
                <img 
                  src={BLOG_POSTS[0].image} 
                  alt={BLOG_POSTS[0].title}
                  className="hero-featured-img" 
                />
                <div className="hero-featured-overlay">
                  <span className="featured-card-tag">{BLOG_POSTS[0].tag}</span>
                  <h3 className="featured-card-title">{BLOG_POSTS[0].title}</h3>
                  <div className="featured-card-facility">
                    <Building2 size={14} color="#f87171" />
                    <span>Real Client: {BLOG_POSTS[0].exampleFromField.facility}</span>
                  </div>
                  <div className="featured-card-read-row">
                    <span>Read Full Case Study Page &rarr;</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. CLIENT LOGO PROOF TICKER */}
      <ClientLogoTicker 
        badgeText="COMMERCIAL CLIENTS & AUDITED PROPERTIES"
        subtitle="Trusted by Leading Facilities Nationwide"
        description="The real field examples in our articles represent active projects across national gym franchises, early education academies, and class-A commercial towers."
      />

      {/* 3. MAIN BLOG LISTING & FILTER SECTION */}
      <section className="blog-listing-section">
        <div className="subpage-container">
          
          {/* Controls Bar: Category Pills + Search */}
          <div className="blog-controls-bar">
            
            <div className="blog-category-pills">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`blog-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="blog-search-box">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search articles by topic, keyword, or client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
            </div>

          </div>

          {/* Articles Count */}
          <div className="blog-results-meta">
            <span>Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} matching your criteria</span>
          </div>

          {/* Cards Grid */}
          <div className="blog-cards-grid">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="blog-card"
                onClick={() => onNavigate(`/blog/${post.slug}` as AppRoute)}
                style={{ cursor: 'pointer' }}
              >
                <div className="blog-img-box">
                  <img src={post.image} alt={post.title} className="blog-card-img" />
                  <span className="blog-tag-badge">{post.tag}</span>
                </div>

                <div className="blog-card-content">
                  <div className="blog-meta-row">
                    <div className="meta-item">
                      <Calendar size={13} />
                      <span>{post.date}</span>
                    </div>
                    <span className="meta-separator">•</span>
                    <div className="meta-item">
                      <Clock size={13} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>

                  {/* Real Field Client Badge */}
                  <div className="blog-card-client-badge">
                    <Building2 size={13} color="#c90000" />
                    <span>Real Client: {post.exampleFromField.facility.split('(')[0]}</span>
                  </div>

                  <button 
                    type="button" 
                    className="blog-read-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/blog/${post.slug}` as AppRoute);
                    }}
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="blog-no-results">
              <Sparkles size={36} color="#94a3b8" />
              <h3>No Articles Found</h3>
              <p>Try clearing your search query or choosing another category filter.</p>
              <button 
                type="button" 
                className="blog-filter-pill active"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Publishing Frequency & Editorial Standards Note */}
          <div className="blog-publishing-standards-box">
            <div className="standards-icon-col">
              <ShieldCheck size={28} color="#c90000" />
            </div>
            <div className="standards-text-col">
              <h4>Mirola Commercial Cleaning Editorial Standard</h4>
              <p>
                Every article is written directly by our commercial operations leadership and certified facility directors. Each post adheres strictly to our 7-part template, featuring real client data, verified dwell times, and practical advice you can implement in your facility today.
              </p>
              <div className="standards-bullets">
                <span className="bullet-chip"><CheckCircle2 size={14} color="#16a34a" /> 100% Real Client Case Studies</span>
                <span className="bullet-chip"><CheckCircle2 size={14} color="#16a34a" /> CDC & OSHA Compliant Protocols</span>
                <span className="bullet-chip"><CheckCircle2 size={14} color="#16a34a" /> Zero Jargon or Technical Fluff</span>
              </div>
            </div>
          </div>

          {/* Bottom Callout Banner */}
          <div className="blog-bottom-walkthrough-cta">
            <div className="cta-left">
              <h3>Need These Cleaning Standards in Your Facility?</h3>
              <p>
                Schedule an on-site walkthrough with our operations team. We evaluate your high-touch points, floor condition, and sanitation gaps with zero obligation.
              </p>
            </div>
            <div className="cta-right">
              <a href={`tel:${CONTACT_INFO.phoneTel}`} className="cta-phone-link">
                <Phone size={16} />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
              <button 
                type="button" 
                className="cta-audit-btn"
                onClick={onOpenConsultation}
              >
                <span>Book Free Facility Walkthrough</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

