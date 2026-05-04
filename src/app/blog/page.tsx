import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { Quicksand, Caveat } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className={`${quicksand.className} min-h-screen bg-gradient-to-br from-sky-200 via-sky-100 to-white selection:bg-sky-200 selection:text-sky-900`}>
      {/* Navbar Placeholder (Matches main page feel) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 md:px-12 bg-white/40 backdrop-blur-md border-b border-white/20">
        <Link href="/" className={`${caveat.className} text-3xl text-slate-800`}>
          Shadman.
        </Link>
        <div className="flex gap-8 text-sm font-semibold text-slate-600 uppercase tracking-widest">
          <Link href="/#projects" className="hover:text-sky-600 transition-colors">Projects</Link>
          <Link href="/blog" className="text-sky-600">Blog</Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className={`${caveat.className} text-6xl md:text-7xl text-slate-800 mb-4`}>
            Insights & Updates
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Deep dives into Flutter, AI-assisted development, and the journey of a CSE student.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="h-full bg-white/30 backdrop-blur-md border border-white/20 hover:bg-white/40 p-8 rounded-3xl transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-200/50 flex flex-col">
                <div className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-4">
                  {post.date}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-sky-700 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                  {post.description}
                </p>
                <div className="text-sky-600 font-bold flex items-center gap-2">
                  Read Article <span>→</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-white/20 backdrop-blur-sm rounded-3xl border border-white/10">
            <p className="text-slate-500 italic">No posts found. Start writing in content/blogs!</p>
          </div>
        )}
      </div>
    </main>
  );
}
