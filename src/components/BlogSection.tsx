import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface BlogSectionProps {
  onOpenConsultation: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenConsultation }) => {
  const posts = [
    {
      id: 1,
      image: '/images/drive_folder_2/DSC00189.jpg',
      tag: 'FACILITY HYGIENE',
      date: 'Sept 10, 2026',
      readTime: '4 min read',
      title: '10 Expert-Approved Sanitization Protocols That Actually Keep Offices Healthy',
      excerpt: 'Learn how top USA enterprises mitigate airborne pathogens and seasonal absenteeism through zoned hygiene execution.'
    },
    {
      id: 2,
      image: '/images/drive_folder_2/DSC00168.jpg',
      tag: 'ECO CHEMISTRY',
      date: 'Aug 28, 2026',
      readTime: '5 min read',
      title: 'Why Hospital-Grade Green Cleaning Is the Smartest Corporate Investment',
      excerpt: 'Discover how non-toxic, biodegradable cleaning formulas enhance indoor air quality while meeting rigorous pathogen kill rates.'
    },
    {
      id: 3,
      image: '/images/drive_folder_2/DSC00443.jpg',
      tag: 'FACILITY CARE',
      date: 'Aug 15, 2026',
      readTime: '6 min read',
      title: 'Precision Commercial Sanitation: How Consistent Standards Protect Long-Term Assets',
      excerpt: 'Preserve high-traffic facilities and commercial equipment with multi-stage maintenance schedules that impress clients and occupants.'
    }
  ];

  return (
    <section className="blog-section" id="blog">
      <div className="blog-container">
        
        {/* Header */}
        <div className="blog-header-row">
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
              onClick={onOpenConsultation}
            >
              <span>Explore All Articles</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="blog-cards-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
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
                  onClick={onOpenConsultation}
                >
                  <span>Read Article</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
