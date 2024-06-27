import { db } from "@/db"
import { postsTable } from "@/db/schema"
import { revalidatePath } from "next/cache"

export default async function Home() {
  const posts = await db.query.postsTable.findMany()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="flex flex-col gap-2"
        action={async () => {
          "use server"

          await db.insert(postsTable).values({
            title: "test",
            content: "world",
            userId: 1
          })

          revalidatePath("/")
        }}
      >
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" id="title" />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea name="content" id="content" />
        </div>

        <button className="bg-white text-black">Submit</button>
      </form>

      {posts.map((post, index) => (
        <div key={index} className="flex gap-2">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </main>
  )
}
