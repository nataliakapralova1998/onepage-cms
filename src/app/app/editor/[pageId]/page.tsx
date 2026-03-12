import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

export default async function EditorPage({ params }: { params: { pageId: string } }) {
  const supabase = await createSupabaseServer()
  const { data: userRes } = await supabase.auth.getUser()
  const user = userRes.user
  if (!user) redirect('/login')

  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('id', params.pageId)
    .eq('user_id', user.id)
    .single()

  if (!page) redirect('/app')

  async function save(formData: FormData) {
    'use server'
    const supabase =  await createSupabaseServer()
    const { data: userRes } = await supabase.auth.getUser()
    const user = userRes.user
    if (!user) redirect('/login')

    const title = String(formData.get('title') || '')
    const published = formData.get('published') === 'on'

    // For MVP we store a tiny hero block only
    const headline = String(formData.get('headline') || '')
    const subtext = String(formData.get('subtext') || '')

    await supabase
      .from('pages')
      .update({
        title,
        published,
        content: { blocks: [{ type: 'hero', headline, subtext, ctaText: 'Contact', ctaHref: '#contact' }] },
      })
      .eq('id', params.pageId)
      .eq('user_id', user.id)

    redirect(`/app/editor/${params.pageId}`)
  }

  const hero = page.content?.blocks?.[0] ?? {}

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Editor</h1>
          <p className="text-sm opacity-70">Public URL: /p/{page.slug}</p>
        </div>
        <a className="underline" href={`/p/${page.slug}`} target="_blank" rel="noreferrer">
          Preview
        </a>
      </div>

      <form action={save} className="space-y-4 max-w-xl">
        <label className="block space-y-1">
          <div className="text-sm font-medium">Title</div>
          <input name="title" defaultValue={page.title} className="border rounded px-3 py-2 w-full" />
        </label>

        <label className="inline-flex items-center gap-2">
          <input name="published" type="checkbox" defaultChecked={page.published} />
          <span className="text-sm">Published</span>
        </label>

        <div className="border rounded p-4 space-y-3">
          <div className="font-medium">Hero block</div>
          <label className="block space-y-1">
            <div className="text-sm">Headline</div>
            <input name="headline" defaultValue={hero.headline || ''} className="border rounded px-3 py-2 w-full" />
          </label>
          <label className="block space-y-1">
            <div className="text-sm">Subtext</div>
            <textarea name="subtext" defaultValue={hero.subtext || ''} className="border rounded px-3 py-2 w-full" />
          </label>
        </div>

        <button className="border rounded px-3 py-2">Save</button>
      </form>
    </div>
  )
}