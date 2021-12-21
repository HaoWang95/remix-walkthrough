import { useLoaderData, Link } from 'remix';
import type {Post} from "../../post";
import { getPosts } from "../../post";

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  return (
    <div>
      <h1>Posts</h1>
      <ul>
          {posts.map(post => (
              <li>{post}</li>
          ))}
      </ul>
    </div>
  );
}
