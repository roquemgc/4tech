import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Container } from '@material-ui/core'
import Header from '../../components/Header/Header'
import Upload from '../../components/Upload/Upload'
import Post from '../../components/Post/Post'
import './Timeline.css'
import { getPosts } from '../../services/post';

const Timeline = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = useCallback(async () => {
        const response = await getPosts();    
        setPosts(response.data);
    }, [])

    useEffect( () => {
        fetchPosts();
    }, [fetchPosts])

    return(
        <Fragment>
            <Header />]
            <Container className="timeline">
                <Upload />
                
                { 
                    posts.map(post =>{
                        return (<Post key={post._id} post={post} />);
                    }) 
                }
            </Container>
        </Fragment>
    );
}

export default Timeline;