import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { Blog, Pill } from '~/components';
import { getPost, getAllPostSlugs, getAllPostsFrontMatter } from '~/lib/post';
import { Layout } from '~/layouts';

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { Post, FrontMatter } from '~/types';

interface PathProps extends ParsedUrlQuery {
	slug: string;
}

interface BlogPostProps {
	post: Post;
	otherPosts: FrontMatter[];
}

export const getStaticPaths: GetStaticPaths<PathProps> = async () => {
	const posts = await getAllPostSlugs();

	return {
		paths: posts.map((post) => ({
			params: {
				slug: post.replace(/\.mdx/, ''),
			},
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<BlogPostProps, PathProps> = async ({ params }) => {
	const slug = params?.slug as string;
	const { frontmatter, source } = await getPost(slug);
	
	const allPosts = await getAllPostsFrontMatter();
	
	const otherPosts = allPosts
		.filter((p) => p.slug !== slug)
		.slice(0, 4); 

	return {
		props: {
			post: {
				frontmatter,
				source,
			},
			otherPosts,
		},
	};
};

const CustomLink = (props: any) => {
	const href = props.href;
	const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

	if (isInternalLink) {
		return (
			<Link href={href} {...props}>
				{props.children}
			</Link>
		);
	}

	return (
		<a target="_blank" rel="noopener noreferrer" {...props}>
			{props.children}
		</a>
	);
};

export const mdxComponents = {
	...Blog.X,
	a: CustomLink,
	blockquote: (props: any) => <Blog.X.XQuote {...props} />,
	img: (props: any) => <Blog.X.XFigure {...props} />,
	pre: (props: any) => <Blog.X.XCode {...props} />,
	Accordion: Blog.X.XAccordion,
	AccordionGroup: Blog.X.XAccordionGroup,
};

export default function BlogPost({ post, otherPosts }: BlogPostProps): React.JSX.Element {
	const banner = post.frontmatter.banner || `/api/og?title=${encodeURIComponent(post.frontmatter.title)}&description=${encodeURIComponent(post.frontmatter.description)}`;

	return (
		<>
			<Layout.Blog
				seo={{
					title: post.frontmatter.title,
					description: post.frontmatter.description ?? undefined,
					openGraph: {
						title: post.frontmatter.title,
						images: [
							{
								url: banner,
								alt: post.frontmatter.description,
							},
						],
					},
				}}>
				<div className="relative px-4 py-16 overflow-hidden">
					<div className="relative px-4 sm:px-6 lg:px-8">
						{banner && (
							<div className="relative w-full my-2 sm:my-4">
								<div 
									className="relative w-full overflow-hidden rounded-3xl shadow-xl mb-8 bg-gray-200 dark:bg-gray-600"
									style={{ paddingBottom: '56.25%' }}
								>
									<div className="absolute inset-0 w-full h-full motion-safe:animate-pulse" />
									<Image
										alt={post.frontmatter.banner_alt ?? post.frontmatter.title}
										className="absolute top-0 left-0 w-full h-full object-cover select-none default-transition"
										draggable={false}
										width={1920}
										height={1080}
										src={banner}
										priority
									/>
								</div>
							</div>
						)}

						<div className="flex flex-col space-y-4 max-w-prose mx-auto my-4 text-lg text-center">
							<div>
								{post.frontmatter.title_prefix && (
									<span className="block text-primary-600 font-semibold tracking-wide uppercase text-base text-center">
										{post.frontmatter.title_prefix}
									</span>
								)}
								<span className="text-gray-900 dark:text-white sm:text-4xl text-3xl text-center leading-8 font-extrabold tracking-tight">
									{post.frontmatter.title}
								</span>
							</div>

							<span className="flex justify-center items-center">
								<Pill.Date>{post.frontmatter.date}</Pill.Date>
							</span>

							{post.frontmatter.description && post.frontmatter.description_show && (
								<p className="mt-8 text-xl text-gray-400 leading-8">
									{post.frontmatter.description}
								</p>
							)}
						</div>

						<article className="max-w-prose prose prose-primary prose-lg text-gray-500 mx-auto">
							<MDXRemote {...post.source} components={mdxComponents} />
							
							<Blog.X.XShare
								title={post.frontmatter.title}
								description={post.frontmatter.description}
							/>
						</article>

						{/* Section Other Blogs */}
            {otherPosts.length > 0 && (
                <div className="max-w-prose lg:max-w-6xl mx-auto mt-8">
                    <hr className="border-gray-200 dark:border-gray-800 mb-12" />
                    
                    <div className="flex flex-col items-center text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                            Other Blogs
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">
                            Check out my other latest articles
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {otherPosts.map((frontmatter, idx) => (
                            <Blog.Post 
                                key={frontmatter.slug} 
                                index={idx} 
                                frontmatter={frontmatter} 
                            />
                        ))}
                    </div>
                </div>
            )}
					</div>
				</div>
			</Layout.Blog>
			<Blog.Styles.Code />
			<Blog.Styles.Elements />
		</>
	);
}
