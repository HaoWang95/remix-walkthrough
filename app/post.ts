import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
    title: string;
}

function isValidPostAttributes(attributes: any): attributes is PostMarkdownAttributes{
    return attributes?.title;
}


const postsPath = path.join(__dirname, "..", "posts");

export const getPosts = async () => {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));
      const { attributes } = parseFrontMatter(file.toString());
      invariant(isValidPostAttributes(attributes));
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title,
      };
    })
  );
};


export const getPost = async (slug: string) => {
    const filePath = path.join(postsPath, slug + '.md');
    await fs.readFile(filePath, {encoding: 'utf-8'},).then(
        data => {
            const {attributes} = parseFrontMatter(data.toString());
            invariant(
                isValidPostAttributes(attributes),
                `Post ${filePath} is missing attributes`
            );
            return {
                slug: slug,
                title: attributes.title
            }
        }
    )
}