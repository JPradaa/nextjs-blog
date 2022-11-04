import Layout from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date';

export default function Home( {allPosts} ) {

  return (
    <Layout home={true}>
      <section className={utilStyles.headingMd}>
        <p>[From new branch repository]</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>              
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>      
    </Layout>
  )
}

export async function getStaticProps() {

  const allPosts = getSortedPostsData();

  return {
    props:  { allPosts }
  }
}
