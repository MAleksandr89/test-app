import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../MainPage/MainPage';
import { PostPage } from '../PostPage/PostPage';
import classes from './app.module.scss';

export const App: React.FC = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/posts/:id" element={<PostPage />} />
                </Routes>
            </div>
        </div>
    );
};

