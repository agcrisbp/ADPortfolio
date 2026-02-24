import matter from 'gray-matter';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { join } from 'path';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { visit } from 'unist-util-visit';

import RehypeAutolinkHeadings from 'rehype-autolink-headings';
import RemarkCodeTitles from 'remark-code-titles';
import RemarkEmoji from 'remark-emoji';
import RemarkPrism from 'remark-prism';
import rehypeRaw from 'rehype-raw';
import RemarkGfm from 'remark-gfm';
import RehypeSlug from 'rehype-slug';

import type { FrontMatter, Post, RawFrontMatter } from '~/types';

type ContentType = 'blog';

const getDirectory = (type: ContentType) => join(process.cwd(), 'src', 'data', type);

/**
 * Converts JSX expression props
 * to JSON strings so they survive serialization boundary.
 */
function remarkMdxPropsToJson() {
	return (tree: any) => {
		visit(tree, (node: any) => {
			if (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement') return;
			if (!Array.isArray(node.attributes)) return;

			node.attributes = node.attributes.map((attr: any) => {
				if (attr.type !== 'mdxJsxAttribute' || attr.value?.type !== 'mdxJsxAttributeValueExpression') {
					return attr;
				}
				try {
					const evaluated = new Function(`return (${attr.value.value})`)();
					if (typeof evaluated !== 'function') {
						return {
							...attr,
							value: JSON.stringify(evaluated),
						};
					}
				} catch {
					// @ts-ignore
				}
				return attr;
			});
		});
	};
}

/**
 * Get the slugs of all available posts based on type
 */
export async function getAllPostSlugs(type: ContentType = 'blog'): Promise<Array<string>> {
	const dir = getDirectory(type);
	if (!existsSync(dir)) return [];
	return readdirSync(dir).filter((file) => file.endsWith('.mdx'));
}

/**
 * Get the frontmatter metadata for all available posts based on type
 */
export async function getAllPostsFrontMatter(type: ContentType = 'blog'): Promise<Array<FrontMatter>> {
	const dir = getDirectory(type);
	if (!existsSync(dir)) return [];

	const files = readdirSync(dir).filter((file) => file.endsWith('.mdx'));

	return files
		.map((slug) => {
			const source = readFileSync(join(dir, slug), 'utf8');
			const { data } = matter(source);

			const frontmatter = data as RawFrontMatter;
			const trimmedSlug = slug.replace(/\.mdx$/, '');

			return {
				...frontmatter,
				slug: trimmedSlug,
			} as FrontMatter;
		})
		.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
		.map((f) => ({
			...f,
			date: f.date ? format(new Date(f.date), 'PPP', { locale: enUS }) : '',
		}));
}

/**
 * Universal content loader for Blog and Projects
 */
export async function getPost(slug: string, type: ContentType = 'blog'): Promise<Post> {
	const dir = getDirectory(type);
	let raw: string;
	
	const fullPath = join(dir, `${slug}.mdx`);
	raw = readFileSync(fullPath).toString();

	const { content, data } = matter(raw);

	const source = await serialize(content, {
		mdxOptions: {
			format: 'mdx',
			rehypePlugins: [
				RehypeSlug,
				[rehypeRaw, { passThrough: ['mdxJsxFlowElement', 'mdxJsxTextElement'] }],
				[RehypeAutolinkHeadings, {}],
			],
			remarkPlugins: [
				RemarkGfm,
				RemarkCodeTitles,
				RemarkEmoji,
				remarkMdxPropsToJson,
				[
					RemarkPrism,
					{
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
					},
				],
			],
		},
		scope: data,
	});

	const frontmatter = data as RawFrontMatter;
	const trimmedSlug = slug.replace(/\.mdx$/, '');

	return {
		frontmatter: {
			...frontmatter,
			date: frontmatter.date ? format(new Date(frontmatter.date), 'PPP', { locale: enUS }) : '',
			slug: trimmedSlug,
		},
		source,
	};
}
