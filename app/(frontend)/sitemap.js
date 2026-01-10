import { fetchSanity, groq } from "@/sanity/utils/fetch";
import { QUERY_omitDrafts } from "@/sanity/utils/constants";

// Cache for 1 hour but still generate dynamically
export const revalidate = 3600; // 1 hour in seconds
export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "https://example.com";

  const allPages = await fetchSanity(
    groq`{
        'pages': *[
            _type == 'page' &&
            seo_no_index != true && ${QUERY_omitDrafts} 
        ]|order(slug.current){
            'slug': slug.current,
            'lastModified': _updatedAt,
        },
        'posts': *[_type == 'post' && seo_no_index != true && ${QUERY_omitDrafts}]|order(_updatedAt desc){
            'slug': slug.current,
            'lastModified': _updatedAt,
        },
        'post_categories': *[_type == 'post_category' && seo_no_index != true && ${QUERY_omitDrafts}]|order(_updatedAt desc){
            'slug': slug.current,
            'lastModified': _updatedAt,
            'postCount': count(*[_type == 'post' && references(^._id) && seo_no_index != true && ${QUERY_omitDrafts}])
        },
        'latest_post_date': *[_type == "post" && ${QUERY_omitDrafts} && seo_no_index != true] | order(_updatedAt desc)[0]._updatedAt
    }`,
    {},
    {
      // Override any caching for sitemap data
      revalidate: 0,
      tags: ["sitemap"],
    }
  );

  const sitemap = [];

  // Add pages
  if (allPages.pages) {
    allPages.pages.forEach((page) => {
      sitemap.push({
        url: `${baseUrl}${page.slug === "index" ? "" : `/${page.slug}`}`,
        lastModified: new Date(page.lastModified),
        changeFrequency: "weekly",
        priority: page.slug === "index" ? 1.0 : 0.8,
      });
    });
  }

  // Add blog posts
  if (allPages.posts) {
    allPages.posts.forEach((post) => {
      sitemap.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.lastModified),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  }

  // Add post categories (only if they have posts)
  if (allPages.post_categories) {
    allPages.post_categories.forEach((category) => {
      // Only add category to sitemap if it has posts
      if (category.postCount > 0) {
        sitemap.push({
          url: `${baseUrl}/blog/category/${category.slug}`,
          lastModified: new Date(category.lastModified),
          changeFrequency: "weekly",
          priority: 0.5,
        });
      }
    });
  }

  // Add blog index page (only if there are posts)
  if (allPages.posts && allPages.posts.length > 0) {
    sitemap.push({
      url: `${baseUrl}/blog`,
      lastModified: allPages.latest_post_date
        ? new Date(allPages.latest_post_date)
        : new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    });
  }

  return sitemap;
}
