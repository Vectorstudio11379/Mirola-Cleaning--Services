import React, { useEffect } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  Share2, 
  ShieldCheck,
  Check,
  Building2,
  AlertTriangle,
  Lightbulb,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import type { BlogPost } from '../data/blogPosts';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenConsultation: () => void;
  onSelectPost: (post: BlogPost) => void;
  allPosts: BlogPost[];
}

export const BlogModal: React.FC<BlogModalProps> = ({
  post,
  onClose,
  onOpenConsultation,
  onSelectPost,
  allPosts
}) => {
  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [post, onClose]);

  if (!post) return null;

  const relatedPosts = allPosts.filter(p => p.id !== post.id);

  return (
    <div 
      className="blog-modal-backdrop" 
      onClick={onClose}
      role="dialog" 
      aria-modal="true"
      aria-labelledby="blog-article-modal-title"
    >
      <div 
        className="blog-modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header Bar */}
        <div className="blog-modal-top-bar">
          <div className="blog-modal-top-meta">
            <span className="blog-modal-tag-pill">{post.tag}</span>
            <span className="top-sep">•</span>
            <span className="top-read-time">{post.readTime}</span>
          </div>

          <div className="blog-modal-actions">
            <button 
              type="button" 
              className="blog-modal-share-btn"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article link copied to clipboard!');
                }
              }}
              title="Share article"
              aria-label="Share article"
            >
              <Share2 size={16} />
            </button>
            <button 
              type="button" 
              className="blog-modal-close-btn"
              onClick={onClose}
              aria-label="Close article"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="blog-modal-scrollable-body">
          
          {/* Article Header (1. Blog Title) */}
          <header className="blog-article-header">
            <div className="blog-template-step-badge">1. BLOG TITLE</div>
            <h1 id="blog-article-modal-title" className="blog-article-title">
              {post.title}
            </h1>

            <p className="blog-article-excerpt-lead">
              {post.excerpt}
            </p>

            {/* Author & Date Row */}
            <div className="blog-article-author-row">
              <div className="author-avatar-circle">
                <User size={18} />
              </div>
              <div className="author-details">
                <div className="author-name">{post.author}</div>
                <div className="author-role-date">
                  <span>{post.authorRole}</span>
                  <span className="author-dot">•</span>
                  <span className="author-date">
                    <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
                    {post.date}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Featured Image */}
          <div className="blog-article-featured-media">
            <img 
              src={post.image} 
              alt={post.title} 
              className="featured-media-img"
            />
            <div className="featured-media-caption">
              <span>Verified Facility Execution • Mirola Commercial Cleaning Specialists</span>
            </div>
          </div>

          {/* Key Takeaways Callout Card */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="blog-takeaways-card">
              <div className="takeaways-header">
                <ShieldCheck size={20} color="#c90000" />
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

          {/* 7-PART TEMPLATE CONTENT BODY */}
          <div className="blog-article-content-body">
            
            {/* 2. Introduction */}
            <section className="blog-content-section template-section">
              <div className="blog-section-step-label">2. INTRODUCTION</div>
              <h2 className="section-heading">Overview & Commercial Impact</h2>
              <p className="section-paragraph highlight-intro">
                {post.introduction}
              </p>
            </section>

            {/* 3. The Cleaning Challenge */}
            <section className="blog-content-section template-section">
              <div className="blog-section-step-label">3. THE CLEANING CHALLENGE</div>
              <h2 className="section-heading">The Root Problem & Why It Matters</h2>
              <div className="challenge-content-box">
                <div className="challenge-icon-tag">
                  <AlertTriangle size={18} color="#c90000" />
                  <span>Commercial Hygiene Barrier</span>
                </div>
                <p className="section-paragraph">
                  {post.challenge}
                </p>
              </div>
            </section>

            {/* 4. Example from the Field */}
            <section className="blog-content-section template-section field-example-section">
              <div className="blog-section-step-label">4. EXAMPLE FROM THE FIELD</div>
              <h2 className="section-heading">Real Client Project & Case Study</h2>
              
              <div className="field-example-card">
                <div className="field-facility-header">
                  <Building2 size={20} color="#c90000" />
                  <div>
                    <span className="field-facility-label">Featured Facility:</span>
                    <strong className="field-facility-name">{post.exampleFromField.facility}</strong>
                  </div>
                </div>

                <div className="field-challenge-block">
                  <h4>The Cleaning Problem:</h4>
                  <p>{post.exampleFromField.challenge}</p>
                </div>

                <div className="field-solution-block">
                  <h4>How It Was Addressed:</h4>
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
                  <h4>Results Achieved:</h4>
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

            {/* 5. Professional Tips */}
            <section className="blog-content-section template-section">
              <div className="blog-section-step-label">5. PROFESSIONAL TIPS</div>
              <h2 className="section-heading">Actionable Advice for Facility Directors</h2>
              
              <div className="professional-tips-grid">
                {post.professionalTips.map((tip, tIdx) => (
                  <div key={tIdx} className="pro-tip-item">
                    <div className="tip-badge">
                      <Lightbulb size={16} color="#c90000" />
                      <span>Tip #{tIdx + 1}</span>
                    </div>
                    <p className="tip-text">{tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Conclusion */}
            <section className="blog-content-section template-section">
              <div className="blog-section-step-label">6. CONCLUSION</div>
              <h2 className="section-heading">The Bottom Line</h2>
              <p className="section-paragraph conclusion-p">
                {post.conclusion}
              </p>
            </section>

            {/* 7. Call to Action */}
            <section className="blog-content-section template-section cta-section-box">
              <div className="blog-section-step-label light">7. CALL TO ACTION</div>
              <div className="cta-box-inner">
                <h3 className="cta-box-title">Elevate Your Commercial Facility Standards</h3>
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
                    onClick={() => {
                      onClose();
                      onOpenConsultation();
                    }}
                  >
                    <span>Request Free Facility Walkthrough & Quote</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </section>

          </div>

          {/* Related Articles Section */}
          <div className="blog-related-articles-section">
            <h3 className="related-title">More Field Insights & Case Studies</h3>
            <div className="related-grid">
              {relatedPosts.map((rPost) => (
                <div 
                  key={rPost.id} 
                  className="related-post-card"
                  onClick={() => onSelectPost(rPost)}
                >
                  <img src={rPost.image} alt={rPost.title} className="related-post-thumb" />
                  <div className="related-post-info">
                    <span className="related-tag">{rPost.tag}</span>
                    <h4 className="related-post-heading">{rPost.title}</h4>
                    <div className="related-read-link">
                      <span>Read Case Study</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
