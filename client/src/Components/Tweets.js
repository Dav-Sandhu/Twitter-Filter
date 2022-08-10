import {useTweet} from '../Context/TweetContext'

const Tweets = () => {
    const tweets = useTweet()

    if (tweets === undefined){
        return <></>
    }

    return(
        tweets.map(user => 
            user.map(t => 
                {return(
                    <div className="border">
                        <div className="tweet">
                            <h3 className="profile">
                                <img className="profile_picture" src={t.profile_picture} alt="" />&nbsp;
                                <div className="username">{t.username}</div>
                            </h3>
                            <div className="content">{t.text}</div><br />
                            {
                                t.img_flag === "true" ? t.images.map(i => {
                                    return <img className="images" src={i} alt=""/>
                                }) : <></>
                            }
                            <div className="date_posted">{t.date_posted}</div><br />
                        </div>
                    </div> 
                )}    
            )
        )
    )
}

export default Tweets
