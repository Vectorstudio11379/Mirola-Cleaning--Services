import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '../data/blogPosts';
import { BlogModal } from './BlogModal';

interface BlogSectionProps {
  onOpenConsultation: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenConsultation }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  return (
    <>
      <section className="blog-section" id="blog">
        <div className="blog-container">
          
          {/* Header */}
          <div className="blog-header-row scroll-reveal">
            <div className="blog-header-left">
              <div className="blog-pill-badge">
                <span className="blog-dot" />
                <span className="blog-badge-text">EXPERT INSIGHTS</span>
              </div>
              <h2 className="blog-headline">
                Cleaning Tips, Sanitation Standards & Industry Insights
              </h2>
            </div>

            <div className="blog-header-right">
              <button 
                type="button" 
                className="blog-view-all-btn"
                onClick={() => setSelectedArticle(BLOG_POSTS[0])}
              >
                <BookOpen size={16} />
                <span>Read Featured Article</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Blog Cards Grid */}
          <div className="blog-cards-grid scroll-reveal-stagger">
            {BLOG_POSTS.map((post) => (
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

                  <button 
                    type="button" 
                    className="blog-read-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(post);
                    }}
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

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
