import Head from "next/head";
import Layout from "../../components/layout";

const FirstPost = () => {
    return (
        <Layout home={false}>
            <Head>
                <title>My first post</title>
            </Head>
            <h1>First post</h1>
            <p>This is my first post</p>
        </Layout>

    )
}

export default FirstPost;