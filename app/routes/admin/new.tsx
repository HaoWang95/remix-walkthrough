import { Form, redirect, useActionData, useTransition } from "remix";
import type { ActionFunction } from "remix";
import { createPost,  } from "~/post";
import type {NewPost} from "~/post";

type PostError = {
    title?:boolean;
    slug?:boolean;
    markdown?:boolean;
}

export const action: ActionFunction =async ({request}) => {
    await new Promise(res => setTimeout(res, 2000));
    const formData = await request.formData();
    const title = formData.get('title');
    const slug = formData.get('slug')
    const markdown = formData.get('markdown');

    const errors: PostError = {};

    if(!title) errors.title = true;
    if(!slug) errors.slug = true;
    if(!markdown) errors.markdown = true;

    if(Object.keys(errors).length){
        return errors;
    }

    await createPost({title, slug, markdown});

    return redirect('/admin');
}

export default function NewPost() {
    const errors = useActionData();
    const transition = useTransition();
  return (
    <>
      <h2>Create a new post</h2>
      <Form method="post">
        <p>
          <label>
            Post title: {" "}
            {errors?.title ? (<em>Title is required</em>) : null}
            <input type="text" name="title" />
          </label>
        </p>
        <p>
          <label>
            Post slug: {" "}
            {errors?.slug ? (<em>Slug is required</em>): null}
            <input type="text" name="slug" />
          </label>
        </p>
        <p>
          <label htmlFor="markdown">Markdown: {"  "}
            {errors?.markdown ? (<em>Markdown is required</em>) : null}
          </label>
          <br />
          <textarea id="markdown" rows={20} name="markdown" />
        </p>
        <p>
          <button type="submit">
              {transition.submission ? "Creating..." : "Create Post"}
          </button>
        </p>
      </Form>
    </>
  );
}
