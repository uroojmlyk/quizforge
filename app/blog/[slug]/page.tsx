
// app/blog/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/posts';
import { BlogTOC } from '@/components/BlogTOC';
import { ShareButtons } from '@/components/ShareButtons';
import ReadingProgress from '@/components/ReadingProgress';
import { AuthorBio } from '@/components/AuthorBio';
import { RelatedLinks } from '@/components/RelatedLinks';
import { MDXRemote } from 'next-mdx-remote/rsc';


// Generate static params

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata dynamically with OpenGraph + Canonical
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | QuizForge Blog`,
    description: post.description,
    // ✅ CANONICAL URL ADDED
    alternates: {
      canonical: `https://quizforge.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : [],
      url: `https://quizforge.com/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

// Breadcrumb Schema
const breadcrumbSchema = (title: string, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://quizforge.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://quizforge.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": title,
      "item": `https://quizforge.com/blog/${slug}`
    }
  ]
});

// MDX Components with proper heading IDs
const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl md:text-4xl font-bold text-white font-['DM_Serif_Display'] mt-8 mb-4" {...props} />,
  h2: (props: any) => {
    const text = props.children?.toString() || '';
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return <h2 id={id} className="text-2xl font-bold text-white font-['DM_Serif_Display'] mt-8 mb-3 scroll-mt-24" {...props} />;
  },
  h3: (props: any) => {
    const text = props.children?.toString() || '';
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return <h3 id={id} className="text-xl font-semibold text-white mt-6 mb-2 scroll-mt-24" {...props} />;
  },
  p: (props: any) => <p className="text-white/60 text-base leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="text-white/60 text-base leading-relaxed mb-4 list-disc pl-6 space-y-1" {...props} />,
  ol: (props: any) => <ol className="text-white/60 text-base leading-relaxed mb-4 list-decimal pl-6 space-y-1" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  strong: (props: any) => <strong className="text-white font-semibold" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-emerald-400 pl-4 my-4 text-white/70 italic" {...props} />,
  a: (props: any) => <a className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  hr: () => <hr className="my-8 border-white/10" />,
  code: (props: any) => <code className="bg-white/10 px-1.5 py-0.5 rounded text-emerald-400 text-sm" {...props} />,
  RelatedLinks: RelatedLinks,
};

// FAQ Schema for Featured Snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create an online quiz for students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sign up for QuizForge, click 'Create Quiz', add questions or use AI generation, set time limits, and share the link with students."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best free online quiz maker for teachers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "QuizForge offers a free plan with unlimited quizzes, AI question generation, real-time analytics, and easy sharing options."
      }
    }
  ]
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const allPosts = await getAllPosts();
  
  if (!post) {
    notFound();
  }

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "dateModified": post.updatedDate || post.date,
    "wordCount": post.wordCount,
    "author": { "@type": "Organization", "name": post.author },
    "publisher": { 
      "@type": "Organization", 
      "name": "QuizForge", 
      "logo": { "@type": "ImageObject", "url": "https://quizforge.com/logo.png" } 
    },
    "mainEntityOfPage": { 
      "@type": "WebPage", 
      "@id": `https://quizforge.com/blog/${slug}` 
    },
    ...(post.image && { "image": post.image }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(post.title, slug)) }} />
      
      <ReadingProgress />
      
      <div className="min-h-screen bg-[#080810] pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to all posts
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-w-0 max-w-4xl">
              {post.image && (
                <div className="relative mb-8 rounded-2xl overflow-hidden aspect-video bg-white/5">
                  <Image
                    src={post.image}
                    alt={`Visual guide: ${post.title.replace('How to ', '')}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  {post.updatedDate && (
                    <span className="flex items-center gap-1 text-white/30">
                      Updated: {new Date(post.updatedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-['DM_Serif_Display'] leading-tight mb-6">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="text-white/40 text-xs">
                    <span>{post.wordCount} words</span>
                  </div>
                  <ShareButtons 
                    title={post.title} 
                    url={`https://quizforge.com/blog/${slug}`} 
                  />
                </div>
              </div>

              <article className="prose prose-invert prose-emerald max-w-none">
                <MDXRemote source={post.content} components={mdxComponents} />
              </article>

              {/* CTA - Moved up for better conversion */}
              <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-white/10">
                <div className="text-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold text-xl mb-2">Ready to Create Your First Quiz?</h3>
                  <p className="text-white/50 text-sm mb-4">
                    Join thousands of teachers using QuizForge. Free plan available — no credit card required.
                  </p>
                  <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition">
                    Create Your Free Account <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <AuthorBio />

              {(prevPost || nextPost) && (
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-white font-semibold text-lg mb-4">Continue Reading</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {prevPost && (
                      <Link 
                        href={`/blog/${prevPost.slug}`}
                        className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                      >
                        <span className="text-white/40 text-xs">← Previous</span>
                        <p className="text-white group-hover:text-emerald-400 transition mt-1 line-clamp-2">{prevPost.title}</p>
                      </Link>
                    )}
                    {nextPost && (
                      <Link 
                        href={`/blog/${nextPost.slug}`}
                        className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-right"
                      >
                        <span className="text-white/40 text-xs">Next →</span>
                        <p className="text-white group-hover:text-emerald-400 transition mt-1 line-clamp-2">{nextPost.title}</p>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            <BlogTOC content={post.content} />
          </div>
        </div>
      </div>
    </>
  );
}