import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';
//import gql from 'graphql-tag'
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home(){

    const { user } = useContext(AuthContext)

    //const {loading, data} = useQuery(FETCH_POSTS_QUERY) <= Sanity Check
    // if (data){
    //     console.log(data)  <= Sanity Check
    // }

    const {loading, data} = useQuery(FETCH_POSTS_QUERY)
    //const {loading, data:{getPosts: posts}} = useQuery(FETCH_POSTS_QUERY)

    return(
    <Grid columns={3}>
        <Grid.Row className='page-title'>
            <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
            {user && (
                <Grid.Column>
                    <PostForm/>
                </Grid.Column>
            )}
            {loading ? (
                <h1>Loading Posts...</h1>
            ) : (
                // <Transition.Group> Fades the newest Posts in... 
                <Transition.Group>
                {
                    data.getPosts && data.getPosts.map(post => (
                        <Grid.Column key={post.id} style={{marginBottom: 20}}>
                            <PostCard post={post}/>
                        </Grid.Column>
                        ))
                }
               </Transition.Group>
            )}
        </Grid.Row>
    </Grid>
    );
}

//We took this Query to its own util file when we did the PostForm step, so we could re-use this code.
//Now everytime we gotta use the FETCH_POSTS_QUERY, it just uses the one we imported, cuz its the same thing.
// const FETCH_POSTS_QUERY = gql `
//     {
//         getPosts{
//             id
//             body
//             createdAt
//             username
//             likeCount
//             likes{
//                 username
//             }
//             commentCount
//             comments{
//                 id
//                 username
//                 createdAt
//                 body
//             }
//         }
//     }
// `

export default Home;


//

// I had a lot of trouble with the getPosts part of the Home.js component and I see that alot of others are struggling with this too for some reason. I did a quick fix by the following: 

// const { loading, data } = useQuery(FETCH_POSTS_QUERY);
// 	let posts = <h1>Loading..</h1>;
// 	if (!loading) {
// 		posts = data.getPosts.map((post) => (
// 			<Grid.Column key={post.id}>
// 				<PostCard post={post} />
// 			</Grid.Column>
// 		));
// 		console.log(posts);
// 	}
//         return (
// 		<Grid columns={3}>
// 			<Grid.Row>
// 				<h1>Recent Posts</h1>
// 			</Grid.Row>
// 			<Grid.Row>{posts}</Grid.Row>
// 		</Grid>
// 	);

// If you have another solution to fix the "getPosts undefined" thing, please let me know :).


//
