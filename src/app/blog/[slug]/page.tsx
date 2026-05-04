import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import ReactMarkdown from "react-markdown";
import { Quicksand, Caveat } from "next/font/google";
import Link from "next/link";
import { Metadata } from "next";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.metadata.title} | Shadman Ahmmed`,
    description: post.metadata.description,
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { metadata, content } = getPostBySlug(slug);

  return (
    <main className={`${quicksand.className} min-h-screen bg-gradient-to-br from-sky-200 via-sky-100 to-white selection:bg-sky-200 selection:text-sky-900`}>
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 md:px-12 bg-white/40 backdrop-blur-md border-b border-white/20">
        <Link href="/" className={`${caveat.className} text-3xl text-slate-800`}>
          Shadman.
        </Link>
        <Link href="/blog" className="text-sky-600 font-bold hover:text-sky-700 transition-colors flex items-center gap-2">
          <span>←</span> All Posts
        </Link>
      </nav>

      <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="text-sm font-bold text-sky-600 uppercase tracking-[0.3em] mb-4">
            {metadata.date}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight tracking-tight">
            {metadata.title}
          </h1>
          <div className="h-1.5 w-20 bg-sky-300 rounded-full mx-auto" />
        </header>

        <div className="prose prose-slate prose-lg md:prose-xl max-w-none bg-white/40 backdrop-blur-md p-8 md:p-16 rounded-[2.5rem] border border-white/20 shadow-2xl shadow-sky-200/30">
          <ReactMarkdown
            components={{
              h2: ({ ...props }) => <h2 className="text-slate-800 font-bold mt-12 mb-6" {...props} />,
              p: ({ ...props }) => <p className="text-slate-700 leading-relaxed mb-6" {...props} />,
              li: ({ ...props }) => <li className="text-slate-700 mb-2" {...props} />,
              strong: ({ ...props }) => <strong className="text-slate-900 font-bold" {...props} />,
              code: ({ ...props }) => <code className="bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        <footer className="mt-16 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-sm border border-white/20 rounded-full text-slate-700 font-bold hover:bg-sky-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-sky-100"
          >
            <span>←</span> Back to insights
          </Link>
        </footer>
      </article>
    </main>
  );
}
