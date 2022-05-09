import React from "react";
import { useState, useEffect } from "react";
import TweetBox from './TweetBox';
import Post from './Post';
import FlipMove from 'react-flip-move';
import axios from 'axios';
import { TwitterContractAddress } from '../config.js';
import {ethers} from 'ethers';
import Twitter from '../util/MediaContract.json';

import "../css/Feed.css"

const Feed =() => {
    const [posts, setPosts] = useState([]);

    const getUpdatedTweets = async ({allTweets, address}) => {
        let updatedTweets = [];

        for(let i = 0; i < allTweets.length; i++){
            if(allTweets[i].address.toLowerCase() === address.toLowerCase()){
                let tweet = {
                    'id' : allTweets[i].id,
                    'username' : allTweets[i].username,
                    'tweetText' : allTweets[i].tweetText,
                    'isDeleted' : allTweets[i].isDeleted,
                    'personal' : true,
                };
    
                updatedTweets.push(tweet);
            }else{
                let tweet = {
                    'id' : allTweets[i].id,
                    'username' : allTweets[i].username,
                    'tweetText' : allTweets[i].tweetText,
                    'isDeleted' : allTweets[i].isDeleted,
                    'personal' : false,
                };
    
                updatedTweets.push(tweet);
            }
        }

        return updatedTweets;

    }

    const getAllTweets = async () => {

        try{
            const {ethereum} = window

        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const MediaC = new ethers.Contract(
                TwitterContractAddress,
                Twitter.abi,
                signer
            )

            let allTweets = await MediaC.getAllTweets();
            setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
        }else{
            console.log("ethereum object doesnt exist");
        }
    }catch(e){
        console.log(e);
    }
}

    useEffect(() => {
        getAllTweets();
    }, [])

    const deleteTweet = key => async() => {
        try{
            const {ethereum} = window

        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const MediaC = new ethers.Contract(
                TwitterContractAddress,
                Twitter.abi,
                signer
            )

            let deleteTweetTx = await MediaC.deleteTweet(key, true);
            let allTweets = await MediaC.getAllTweets();
            setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
        }else{
            console.log("ethereum object doesnt exist");
        }
    }catch(e){
        console.log(e);
    }
    }
    return(
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>

            <TweetBox />

            <FlipMove>
                {
                    posts.map((post) => (
                        <Post 
                          key={post.id}
                          displayName={post.username}
                          text = {post.tweetText}
                          personal ={post.personal}
                          onClick={deleteTweet(post.id)}
                        />
                    ))
                }
            </FlipMove>

        </div>
    );
}

export default Feed;