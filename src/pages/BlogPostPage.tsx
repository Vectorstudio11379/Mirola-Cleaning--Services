import React, { useEffect } from 'react';
import { 
  Calendar, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Share2, 
  ShieldCheck,
  Check,
  Building2,
  AlertTriangle,
  Lightbulb,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Clock
} from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '../data/blogPosts';
import type { AppRoute } from '../types/navigation';

interface BlogPostPageProps {
  post: BlogPost;
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  onNavigate,
  onOpenConsultation
}) => {
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post.slug]);

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="subpage-wrapper blog-post-fullpage">
      
      {/* 1. HERO HEADER (FULL WIDTH DARK THEME) */}
      <section className="subpage-hero-dark blog-article-hero">
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
            <button 
              type="button" 
              className="subpage-breadcrumb-btn" 
              onClick={() => onNavigate('/blog')}
            >
              Blog
            </button>
            <ChevronRight size={14} className="subpage-breadcrumb-sep" />
            <span className="subpage-breadcrumb-current">{post.title}</span>
          </nav>

          {/* Hero Article Heading Area */}
          <div className="blog-fullpage-hero-header">
            
            <div className="blog-fullpage-meta-pills">
              <span className="blog-tag-pill-dark">{post.tag}</span>
              <span className="meta-sep-dark">•</span>
              <span className="meta-time-dark">
                <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
                {post.readTime}
              </span>
              <span className="meta-sep-dark">•</span>
              <span className="meta-time-dark">
                <Calendar size={13} style={{ display: 'inline', marginRight: 4 }} />
                {post.date}
              </span>
            </div>

            <div className="blog-template-step-badge">1. BLOG TITLE</div>

            <h1 className="blog-fullpage-title">
              {post.title}
            </h1>

            <p className="blog-fullpage-lead">
              {post.excerpt}
            </p>

            {/* Author Row & Share Action */}
            <div className="blog-fullpage-author-bar">
              <div className="author-bar-left">
                <div className="author-avatar-circle-lg">
                  <User size={20} />
                </div>
                <div className="author-details-lg">
                  <div className="author-name-lg">{post.author}</div>
                  <div className="author-role-lg">{post.authorRole}</div>
                </div>
              </div>

              <div className="author-bar-right">
                <button 
                  type="button" 
                  className="blog-fullpage-share-btn"
                  onClick={handleShare}
                  title="Share this article"
                >
                  <Share2 size={16} />
                  <span>Share Article</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. MAIN FULL-WIDTH ARTICLE CONTENT */}
      <article className="blog-fullpage-body-section">
        <div className="subpage-container blog-content-wrapper">
          
          {/* Featured Hero Photograph */}
          <div className="blog-article-featured-media">
            <img 
              src={post.image} 
              alt={post.title} 
              className="featured-media-img"
            />
            <div className="featured-media-caption">
              <span>Verified On-Site Facility Execution • Mirola Commercial Cleaning Specialists</span>
            </div>
          </div>

          {/* Key Executive Takeaways */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="blog-takeaways-card">
              <div className="takeaways-header">
                <ShieldCheck size={22} color="#c90000" />
                <h3>Key Facility Takeaways</h3>
              </div>
              <ul className="takeaways-list">
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="takeaways-item">
                    <span className="takeaway-check">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* THE 7-PART TEMPLATE SECTIONS */}
          <div className="blog-template-sections-flow">

            {/* Section 2: Introduction */}
            <section className="blog-fullpage-section">
              <div className="blog-section-step-label">2. INTRODUCTION</div>
              <h2 className="fullpage-section-heading">Overview & Problem Statement</h2>
              <p className="fullpage-p intro-p">
                {post.introduction}
              </p>
            </section>

            {/* Section 3: The Cleaning Challenge */}
            <section className="blog-fullpage-section">
              <div className="blog-section-step-label">3. THE CLEANING CHALLENGE</div>
              <h2 className="fullpage-section-heading">Why This Problem Occurs & Why It Matters</h2>
              <div className="challenge-content-box">
                <div className="challenge-icon-tag">
                  <AlertTriangle size={18} color="#c90000" />
                  <span>Commercial Hygiene Challenge</span>
                </div>
                <p className="section-paragraph">
                  {post.challenge}
                </p>
              </div>
            </section>

            {/* Section 4: Example from the Field */}
            <section className="blog-fullpage-section field-showcase-section">
              <div className="blog-section-step-label">4. EXAMPLE FROM THE FIELD</div>
              <h2 className="fullpage-section-heading">Real Cleaning Project & Field Case Study</h2>
              
              <div className="field-example-card fullpage-card">
                <div className="field-facility-header">
                  <Building2 size={22} color="#c90000" />
                  <div>
                    <span className="field-facility-label">Facility & Client:</span>
                    <strong className="field-facility-name">{post.exampleFromField.facility}</strong>
                  </div>
                </div>

                <div className="field-challenge-block">
                  <h4>Challenge: What Cleaning Problem Occurred?</h4>
                  <p>{post.exampleFromField.challenge}</p>
                </div>

                <div className="field-solution-block">
                  <h4>Solution: How Was It Addressed?</h4>
                  <ul className="field-solution-list">
                    {post.exampleFromField.solution.map((sol, sIdx) => (
                      <li key={sIdx}>
                        <CheckCircle2 size={16} color="#c90000" className="bullet-icon" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="field-results-block">
                  <h4>Results: What Improvements Were Achieved?</h4>
                  <ul className="field-results-list">
                    {post.exampleFromField.results.map((res, rIdx) => (
                      <li key={rIdx}>
                        <Check size={16} strokeWidth={2.5} color="#16a34a" className="bullet-icon" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {post.exampleFromField.image && (
                  <div className="field-example-media">
                    <img 
                      src={post.exampleFromField.image} 
                      alt={post.exampleFromField.facility} 
                      className="field-media-img" 
                    />
                    {post.exampleFromField.imageCaption && (
                      <div className="field-media-caption">
                        {post.exampleFromField.imageCaption}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Section 5: Professional Tips */}
            <section className="blog-fullpage-section">
              <div className="blog-section-step-label">5. PROFESSIONAL TIPS</div>
              <h2 className="fullpage-section-heading">Practical Cleaning Advice & Recommendations</h2>
              
              <div className="professional-tips-grid">
                {post.professionalTips.map((tip, tIdx) => (
                  <div key={tIdx} className="pro-tip-item fullpage-tip">
                    <div className="tip-badge">
                      <Lightbulb size={16} color="#c90000" />
                      <span>Professional Recommendation #{tIdx + 1}</span>
                    </div>
                    <p className="tip-text">{tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Conclusion */}
            <section className="blog-fullpage-section">
              <div className="blog-section-step-label">6. CONCLUSION</div>
              <h2 className="fullpage-section-heading">Key Takeaway</h2>
              <p className="fullpage-p conclusion-p">
                {post.conclusion}
              </p>
            </section>

            {/* Section 7: Call to Action */}
            <section className="blog-fullpage-section cta-section-wrapper">
              <div className="blog-section-step-label light">7. CALL TO ACTION</div>
              <div className="cta-box-inner fullpage-cta-box">
                <h3 className="cta-box-title">Partner with Mirola Cleaning Services</h3>
                <p className="cta-box-desc">
                  {post.callToAction.text}
                </p>

                <div className="cta-contact-details">
                  <a href={`tel:${post.callToAction.phone.replace(/[^0-9]/g, '')}`} className="cta-contact-chip">
                    <Phone size={15} />
                    <span>{post.callToAction.phone}</span>
                  </a>
                  <a href={`mailto:${post.callToAction.email}`} className="cta-contact-chip">
                    <Mail size={15} />
                    <span>{post.callToAction.email}</span>
                  </a>
                  <div className="cta-contact-chip static">
                    <MapPin size={15} />
                    <span>{post.callToAction.address}</span>
                  </div>
                </div>

                <div className="cta-action-btn-row">
                  <button 
                    type="button" 
                    className="cta-book-btn"
                    onClick={onOpenConsultation}
                  >
                    <span>Schedule Free On-Site Walkthrough & Quote</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </section>

          </div>

          {/* Navigation Controls: Back to Blog */}
          <div className="blog-back-nav-bar">
            <button 
              type="button" 
              className="blog-back-btn"
              onClick={() => onNavigate('/blog')}
            >
              <ArrowLeft size={16} />
              <span>Back to All Articles & Case Studies</span>
            </button>
          </div>

          {/* Related Articles Cards (Only rendered if multiple articles exist) */}
          {relatedPosts.length > 0 && (
            <div className="blog-fullpage-related-wrap">
              <h3 className="fullpage-related-title">Explore More Commercial Cleaning Case Studies</h3>
              <div className="blog-cards-grid">
                {relatedPosts.map((rPost) => (
                  <article 
                    key={rPost.id} 
                    className="blog-card"
                    onClick={() => onNavigate(`/blog/${rPost.slug}` as AppRoute)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="blog-img-box">
                      <img src={rPost.image} alt={rPost.title} className="blog-card-img" />
                      <span className="blog-tag-badge">{rPost.tag}</span>
                    </div>

                    <div className="blog-card-content">
                      <div className="blog-meta-row">
                        <div className="meta-item">
                          <Calendar size={13} />
                          <span>{rPost.date}</span>
                        </div>
                        <span className="meta-separator">•</span>
                        <div className="meta-item">
                          <Clock size={13} />
                          <span>{rPost.readTime}</span>
                        </div>
                      </div>

                      <h4 className="blog-card-title">{rPost.title}</h4>
                      <p className="blog-card-excerpt">{rPost.excerpt}</p>

                      <div className="blog-card-client-badge">
                        <Building2 size={13} color="#c90000" />
                        <span>Real Client: {rPost.exampleFromField.facility.split('(')[0]}</span>
                      </div>

                      <button 
                        type="button" 
                        className="blog-read-link"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>

    </div>
  );
};
