import matter from 'gray-matter';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';

import RehypeAutolinkHeadings from 'rehype-autolink-headings';
import RemarkCodeTitles from 'remark-code-titles';
import RemarkEmoji from 'remark-emoji';
import RemarkPrism from 'remark-prism';
import rehypeRaw from 'rehype-raw';
import RemarkGfm from 'remark-gfm';
import RehypeSlug from 'rehype-slug';

import type { FrontMatter, Post, RawFrontMatter } from '~/types';

const BLOG_POSTS_DIR = join(process.cwd(), 'src', 'data', 'blog');

/**
 * Get the slugs of all available blog posts
 */
export async function getAllPostSlugs(): Promise<Array<string>> {
	return readdirSync(BLOG_POSTS_DIR);
}

/**
 * Get the frontmatter metadata for all available blog posts
 */
export async function getAllPostsFrontMatter(): Promise<Array<FrontMatter>> {
	const files = readdirSync(BLOG_POSTS_DIR);

	return files
		.map((slug) => {
			const source = readFileSync(join(BLOG_POSTS_DIR, slug), 'utf8');
			const { data } = matter(source);

			const frontmatter = data as RawFrontMatter;
			const trimmedSlug = slug.replace('.md', '');

			return {
				...frontmatter,
				slug: trimmedSlug,
			} as FrontMatter;
		})
		.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
		.map((f) => ({
			...f,
			date: format(new Date(f.date), 'PPP', { locale: enUS }),
		}));
}

/**
 * Get the frontmatter metadata & post MDX contents from file
 */
export async function getPost(slug: string): Promise<Post> {
	const raw = readFileSync(join(BLOG_POSTS_DIR, `${slug}.md`)).toString();
	const { content, data } = matter(raw);
	
	const source = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [
				RehypeSlug, 
				[rehypeRaw, { passThrough: ['mdxJsxFlowElement'] }],
				[RehypeAutolinkHeadings, {}]
			],
			remarkPlugins: [
				RemarkGfm,
				RemarkCodeTitles, 
				RemarkEmoji, 
				[RemarkPrism, {
				    showSpotlight: true,
				    plugins: [
              'autolinker',
              'command-line',
              'data-uri-highlight',
              'diff-highlight',
              'inline-color',
              'keep-markup',
              'line-numbers',
              'treeview',
            ],
				  }
				]
			],
		},
		scope: data,
	});

	const frontmatter = data as RawFrontMatter;
	const trimmedSlug = slug.replace('.md', '');

	return {
		frontmatter: {
			...frontmatter,
			date: format(new Date(frontmatter.date), 'PPP', { locale: enUS }),
			slug: trimmedSlug,
		},
		source,
	};
}
