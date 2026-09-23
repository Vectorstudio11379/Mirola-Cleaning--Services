import React, { useEffect } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  Share2, 
  ShieldCheck,
  Check
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
          
          {/* Article Header */}
          <header className="blog-article-header">
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
          <div className="blog-takeaways-card">
            <div className="takeaways-header">
              <ShieldCheck size={20} color="#c90000" />
              <h3>Executive Facility Takeaways</h3>
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

          {/* Full Article Content Sections */}
          <div className="blog-article-content-body">
            {post.sections.map((section, sIdx) => (
              <section key={sIdx} className="blog-content-section">
                <h2 className="section-heading">{section.heading}</h2>
                
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="section-paragraph">
                    {p}
                  </p>
                ))}

                {section.checklist && section.checklist.length > 0 && (
                  <div className="section-checklist-box">
                    <div className="checklist-box-title">
                      <CheckCircle2 size={16} color="#c90000" />
                      <span>Facility Implementation Protocol</span>
                    </div>
                    <ul className="checklist-box-items">
                      {section.checklist.map((cItem, cIdx) => (
                        <li key={cIdx}>
                          <Check size={13} strokeWidth={2.5} color="#c90000" />
                          <span>{cItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Author Bio Box */}
          <div className="blog-author-bio-card">
            <div className="bio-avatar">
              <ShieldCheck size={26} color="#c90000" />
            </div>
            <div className="bio-text">
              <h4>About Mirola Cleaning Services Operations</h4>
              <p>
                Mirola Cleaning Services delivers hospital-grade sanitization, high-gloss floor restoration, and turn-key commercial janitorial care nationwide. Our teams operate with 100% W-2 vetted personnel, EPA List N chemistries, and guaranteed 24-hour corrective SLAs.
              </p>
            </div>
          </div>

          {/* Bottom Consultation CTA Banner */}
          <div className="blog-article-cta-banner">
            <div className="cta-banner-text">
              <h3>Implement These Cleaning Protocols in Your Facility</h3>
              <p>
                Schedule an on-site facility walkthrough with our commercial operations director. Receive a customized scope of work and transparent fixed-rate proposal within 24 hours.
              </p>
            </div>
            <button 
              type="button" 
              className="blog-banner-cta-btn"
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
            >
              <span>Book Free Facility Walkthrough</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Related Articles Section */}
          <div className="blog-related-articles-section">
            <h3 className="related-title">More Commercial Cleaning Insights</h3>
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
                      <span>Read Article</span>
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
