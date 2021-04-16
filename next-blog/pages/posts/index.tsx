import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Posts } from '../../constants';
import { NavBar } from '../../components/Nav';
import { Post } from '../..';
type Props = {
  children?: ReactNode;
  posts: Post[];
};
/**
 *
 * List all Blog posts
 */
const Blog = ({ children, posts }: Props) => {
  return (
    <>
      <Head>
        <title>Blog Posts</title>
      </Head>
      <NavBar />
      {posts.map(post => {
        return (
          <div className='container'>
            <div className='row'>
              <div className='container'>
                <div className='post-preview'>
                  <Link href={'/posts/' + post.id}>
                    <a>
                      <h2 className='post-title'>{post.title}</h2>
                      <p className='post-meta'>Posted on {post.date}</p>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 col-md-10 mx-auto'>
            <hr />
            <p className='post'>{children}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
export const getStaticProps: GetStaticProps = async context => {
  // ...
  console.log('context', context);
  return { props: { posts: Posts } };
};
