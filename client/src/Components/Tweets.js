import {useUser} from '../Context/TweetContext'
import Images from './Images'

const Tweets = ({removeUser}) => {
  const tweets = useUser()

  if (tweets === undefined){
    return <></>
  }

  return(
    tweets.map(user => 
      user.map(t => 
        {return(
          <div className="tweet" key={t.tweet_id}>
              <h3 className="profile">
                <img className="profile_picture" src={t.profile_picture} alt="" />&nbsp;
                <div className="username">{t.username}</div>
              </h3>
              <div className="content">{t.text}</div><br />
              <Images flag={t.img_flag} images={t.images} />
              <div className="date_posted">{t.date_posted}</div>
              <button className="remove_button" onClick={() => {removeUser(t.screen_name)}}>Remove User</button><br />
          </div> 
        )}    
      )
    )
  )
}

export default Tweets
