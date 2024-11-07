import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ params, request, site }) => {
  const blogPosts = await getCollection("blog");
  return rss({
    // stylesheet: "/styles/rss.xsl",
    // `<title>` field in output xml
    title: "Peter Blog",
    // `<description>` field in output xml
    description: "un blog de ejemplo",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: site ?? "",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPosts.map(({ data, slug }) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/.posts/[slug].html` routes
      // NOTE: Glob imports always return `start` as a pathname, like `file.pathname`.
      //       You can set `baseURL` option in rss options to change this behavior
      //       and remove first `/` in the `link` array below
      link: `/blog/${slug}/`,

    })),
    // (optional) inject custom xml
    customData: `<language>es-es</language>`,
  });
};