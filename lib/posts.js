import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {

    const filenames = fs.readdirSync(postsDirectory);
    const allPostsData = filenames.map((filename) => {
        const id = filename.replace(/\.md$/, '');
        
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');
        
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data
        }
    });

    return allPostsData.sort(({date: a}, {date: b}) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getAllPostsId() {
    const filenames = fs.readdirSync(postsDirectory);

    return filenames.map(filename => {
        return {
            params: {
                id: filename.replace(/\.md$/, '')
            }
        }
    });
}

export async function getPostData(id) {
    const fullpath = path.join(postsDirectory, `${id}.md`);
    const filecontent = fs.readFileSync(fullpath, 'utf-8');

    const matterResult = matter(filecontent);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}