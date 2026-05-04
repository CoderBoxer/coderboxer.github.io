import { getAllPosts } from "@/lib/mdx";
import HomeClient from "./HomeClient";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 2);
  
  return <HomeClient latestPosts={latestPosts} />;
}
