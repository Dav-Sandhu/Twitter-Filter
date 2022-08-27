import {useUser} from '../Context/TweetContext'
import {useId} from 'react'

const Tweets = ({removeUser}) => {
  const tweets = useUser()
  let unique_key = useId()

  if (tweets === undefined){
    return <></>
  }

  return(
    tweets.map(user => 
      user.map(t => 
        {return(
          <div className="border" key={t.tweet_id}>
              <h3 className="profile">
                <img className="profile_picture" src={t.profile_picture} alt="" />&nbsp;
                <div className="username">{t.username}</div>
              </h3>
              <div className="content">{t.text}</div><br />
              {
                t.img_flag === "true" ? t.images.map(i => {
                  return <img className="images" src={i} key={unique_key += t.tweet_id} alt=""/>
                }) : <></>
                  
              }
              <div className="date_posted">{t.date_posted}</div>
              <button className="remove_button" onClick={() => {removeUser(t.screen_name)}}>Remove User</button><br />
          </div> 
        )}    
      )
    )
  )
}

export default Tweets
