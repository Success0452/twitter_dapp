const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Media Contract", function() {
    let Twitter;
    let twitter;
    let owner;

    const NUM_TOTAL_NOT_MY_TWEET = 5;
    const NUM_TOTAL_MY_TWEET = 3;

    let totalTweet;
    let totalMyTweets;

    beforeEach(async function(){
        Twitter = await ethers.getContractFactory("MediaContract"); 
        [owner, addr1, addr2] = await ethers.getSigners();
        twitter = await Twitter.deploy();

        totalTweet = [];
        totalMyTweets = [];

        for(let i = 0; i < NUM_TOTAL_NOT_MY_TWEET; ++i){
            let tweet ={
                'tweetText' : 'Random text with id:' + i,
                'username' : addr1,
                'isDeleted' : false
            }

            await twitter.connect(addr1).addTweet(tweet.tweetText, tweet.isDeleted);
            totalTweet.push(tweet);
        }

        for(let i = 0; i < NUM_TOTAL_MY_TWEET; i++){
            let tweet ={
                'username' : owner,
                'tweetText' : 'Random text with id:' + (NUM_TOTAL_NOT_MY_TWEET+i),
                'isDeleted' : false
            }; 
            
            await twitter.addTweet(tweet.tweetText, tweet.isDeleted);
            totalTweet.push(tweet);
            totalMyTweets.push(tweet);
        }


    });

    describe("AddTweet", function(){
        it("it should emit AddTweet event", async function(){
            let tweet = {
                'tweetText' : 'New Tweet',
                'isDeleted' : false
            };

            await expect(await twitter.addTweet(tweet.tweetText, tweet.isDeleted)).to.emit(twitter, 'AddTweet').withArgs(owner.address, NUM_TOTAL_MY_TWEET+NUM_TOTAL_NOT_MY_TWEET);
        })
    });

    describe("Get All Tweet", function (){
        it("it should return the correct number of total vote", async function(){
           const tweetFromChain = await twitter.getAllTweet();
           expect(tweetFromChain.length).to.equal(NUM_TOTAL_MY_TWEET+NUM_TOTAL_NOT_MY_TWEET);
        });

        it("should return total number of my tweet", async function() {
            let tweetFromChain = await twitter.getMyTweets();
            expect(tweetFromChain.length).to.equal(NUM_TOTAL_MY_TWEET);
        })
    });

    describe("Delete Tweet", function (){
        it("should emit delete event", async function(){
            let TWEET_ID = 0;
            let TWEET_DELETED = true;

            expect(await twitter.connect(addr1).deleteTweet(TWEET_ID, TWEET_DELETED)).to
            .emit(twitter, "DeleteTweet").withArgs(TWEET_ID, TWEET_DELETED);
        })
    })
});
