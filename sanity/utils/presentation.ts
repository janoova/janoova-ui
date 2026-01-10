import { DocumentLocationResolver } from 'sanity/presentation'
import { map } from 'rxjs'

export const locations: DocumentLocationResolver = (params, context) => {
	if (['page', 'post'].includes(params.type)) {
		const doc$ = context.documentStore.listenQuery(
			`*[_id == $id][0]{title,slug}`,
			params,
			{ perspective: 'previewDrafts' },
		)

		return doc$.pipe(
			map((doc) => {
				if (!doc?.slug?.current) return null

				const directory = params.type === 'post' ? '/blog' : ''
				const slug = doc.slug.current
				const path = slug === 'index' ? '' : `/${slug}`

				return {
					locations: [
						{
							title: doc.title || 'Untitled',
							href: [directory, path].filter(Boolean).join(''),
						},
					],
				}
			}),
		)
	}

	return null
}