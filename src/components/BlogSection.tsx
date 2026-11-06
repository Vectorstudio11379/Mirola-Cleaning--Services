import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, BookOpen, Building2 } from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '../data/blogPosts';
import { BlogModal } from './BlogModal';

interface BlogSectionProps {
  onOpenConsultation: () => void;
  onNavigate?: (path: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ 
  onOpenConsultation,
  onNavigate 
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const handleExploreAll = () => {
    if (onNavigate) {
      onNavigate('/blog');
    } else {
      setSelectedArticle(BLOG_POSTS[0]);
    }
  };

  return (
    <>
      <section className="blog-section" id="blog">
        <div className="blog-container">
          
          {/* Header */}
          <div className="blog-header-row scroll-reveal">
            <div className="blog-header-left">
              <div className="blog-pill-badge">
                <span className="blog-dot" />
                <span className="blog-badge-text">EXPERT FIELD INSIGHTS</span>
              </div>
              <h2 className="blog-headline">
                Cleaning Tips, Sanitation Standards & Industry Insights
              </h2>
            </div>

            <div className="blog-header-right">
              <button 
                type="button" 
                className="blog-view-all-btn"
                onClick={handleExploreAll}
                title="View all commercial cleaning articles on our blog"
              >
                <BookOpen size={16} />
                <span>Visit Blog & Case Studies</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Blog Cards Grid */}
          <div className="blog-cards-grid scroll-reveal-stagger">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article 
                key={post.id} 
                className="blog-card"
                onClick={() => setSelectedArticle(post)}
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

                  <div className="blog-card-client-badge">
                    <Building2 size={13} color="#c90000" />
                    <span>Real Client: {post.exampleFromField.facility.split('(')[0]}</span>
                  </div>

                  <button 
                    type="button" 
                    className="blog-read-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(post);
                    }}
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Link to Full Blog Page */}
          {onNavigate && (
            <div className="blog-footer-row scroll-reveal" style={{ textAlign: 'center', marginTop: '40px' }}>
              <button 
                type="button" 
                className="blog-explore-all-cta-btn"
                onClick={() => onNavigate('/blog')}
              >
                <span>Explore All Articles & Client Studies on the Blog</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Full Interactive Article Reader Modal */}
      <BlogModal 
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenConsultation={onOpenConsultation}
        onSelectPost={(post) => setSelectedArticle(post)}
        allPosts={BLOG_POSTS}
      />
    </>
  );
};
