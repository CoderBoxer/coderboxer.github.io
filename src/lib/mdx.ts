import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_PATH = path.join(process.cwd(), "content/blogs");

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(BLOGS_PATH)) {
    return [];
  }
  return fs.readdirSync(BLOGS_PATH).filter((file) => file.endsWith(".md"));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(BLOGS_PATH, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      ...data,
      slug: realSlug,
    } as PostMetadata,
    content,
  };
}

export function getAllPosts(): PostMetadata[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug).metadata)
    .sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1));
  return posts;
}
