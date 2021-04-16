import React, { ReactNode } from 'react';
import Head from 'next/head';
type Props = {
  children?: ReactNode;
};
import { useRouter } from 'next/router';
import { Posts } from '../constants';
import Layout from './Layout';

const getPost = (id: string) => {
  return Posts.find(post => post.id === id);
};
export const getStaticProps: any = async (context: any) => {
  // ...
  console.log('context', context);
  return context;
};
export const BlogPost = ({ children }: Props) => {
  const router = useRouter();
  const pid = router.pathname.replace('/posts/', '');
  const post = getPost(pid);
  if (post === undefined) {
    return <>'error no post for ' + {pid}</>;
  }
  const { title, date } = post;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='container'>
        <div className='row'>
          <div className='container'>
            <div className='post-preview'>
              <h2 className='post-title'>{title}</h2>
              <p className='post-meta'>Posted on {date}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 col-md-10 mx-auto'>
            <hr />
            <p className='post'>{children}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
