export interface Post {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "flutter-3-16-updates",
    title: "Flutter 3.16: What's New and Why it Matters",
    date: "May 04, 2026",
    tag: "Flutter",
    excerpt: "Exploring the latest performance improvements, the new Material 3 defaults, and Impeller updates in Flutter 3.16.",
    content: `
      Flutter 3.16 is here, and it brings a massive wave of updates for cross-platform developers. 
      The most significant change is the transition to Material 3 as the default design system. 
      
      ## Key Highlights:
      - **Impeller on Android:** The new rendering engine is now available for preview on Android, promising smoother animations.
      - **Material 3 by Default:** Your apps will now look more modern out of the box.
      - **DevTools Improvements:** New features for debugging and performance profiling.

      As someone who builds for iOS and Android daily, these changes make the development experience even faster and more reliable.
    `
  },
  {
    slug: "future-of-ai-coding",
    title: "The Future of AI-Assisted Coding",
    date: "April 28, 2026",
    tag: "AI",
    excerpt: "How tools like Cursor and Antigravity are changing the way students and professionals approach software engineering.",
    content: `
      AI is no longer just a gimmick; it's a co-pilot. In my journey as a CSE student, 
      integrating AI into my workflow has allowed me to focus on architecture and problem-solving 
      rather than boilerplate code.
      
      ## Why AI matters for students:
      1. **Faster Prototyping:** Build ideas in hours, not days.
      2. **Learning Tool:** AI can explain complex algorithms or legacy code.
      3. **Error Detection:** Catch bugs before they even hit the compiler.

      The goal isn't to let AI write the whole app, but to use it to become a more efficient engineer.
    `
  }
];
