import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { AccountCircle, Favorite } from '@material-ui/icons'
import './Post.css'

const Post = ({ post }) => {
    return(
        <Grid item xs={12} className="grid post" >
            <Paper className="paper">
                <div className="user">
                    <AccountCircle />
                    <Typography className="username" variant="subtitle2"> {post.userName} </Typography>
                </div>
                <img className="image" src={`data:image/jpeg;base64,${post.imgEncoded}`} alt="post" />
                <section className="body" >  
                    <div className="like">
                        <Typography className="people" variant="body2"> liked by {post.likes.length} people </Typography>
                        <Favorite />
                    </div>
                    <div className="comments">
                            
                    </div>
                </section>
                <hr/>
            </Paper>
        </Grid>
    );
};

export default Post;