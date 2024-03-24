import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './postPage.module.scss';

interface Post {
    id: number;
    title: string;
    body: string;
}

export const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [currentPageData, setCurrentPageData] = React.useState<Post | null>(null);

    React.useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
            .then(response => response.json())
            .then((json: Post[]) => {
                setCurrentPageData(json[0] || null);
            });
    }, [id]);

    const title = currentPageData ? currentPageData.title : '';
    const body = currentPageData ? currentPageData.body : '';

    return (
        <div className={classes.content}>
            {currentPageData && (
                <div className={classes.post}>
                    <div className={classes['post-title']}>
                        {id} - {title}
                    </div>
                    <div className={classes['post-body']}>{body}</div>
                </div>
            )}
        </div>
    );
};
