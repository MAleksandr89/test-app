import React from 'react';
import { Link } from 'react-router-dom';
import classes from './mainPage.module.scss';

interface Post {
    id: number;
    title: string;
    body: string;
}

export const MainPage: React.FC = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [isFetching, setIsFetching] = React.useState<boolean>(true);
    const [totalCount, setTotalCount] = React.useState<number>(0);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`);
                const json = await response.json();
                setPosts([...posts, ...json]);
                setCurrentPage(prevPage => prevPage + 1);
                setTotalCount(json.length ? 10 : 0);
                setIsFetching(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (isFetching) {
            fetchData();
        }
    }, [isFetching]);

    const handleScroll = React.useCallback((event: any) => {
        const { scrollTop, scrollHeight } = (event.target as Document).documentElement;
        if (scrollHeight - (scrollTop + window.innerHeight) < 100 && currentPage <= 5) {
            setIsFetching(true);
        }
    }, [currentPage]);

    React.useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleAddPosts = () => {
        setIsFetching(true);
    };

    const visibleButton = totalCount > 0 && currentPage > 5;

    return (
        <div className={classes.content}>
            {posts.map((post: Post) => (
                <Link to={`/posts/${post.id}`} key={post.id}>
                    <div className={classes.post}>
                        <div className={classes['post-title']} key={post.title} onScroll={handleScroll}>
                            {post.id} - {post.title}
                        </div>
                        <div className={classes['post-body']}>{post.body}</div>
                    </div>
                </Link>
            ))}
            {visibleButton ? (
                <div className={classes['load-more']} onClick={handleAddPosts}>
                    Загрузить еще
                </div>
            ) : (
                <div className={classes['empty-posts']}>Посты закончились</div>
            )}
        </div>
    );
};
