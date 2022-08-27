import {useUser} from '../Context/TweetContext'
import Images from './Images'
import TweetProfile from './Profile'
import PropTypes from 'prop-types'

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
              <TweetProfile pic={t.profile_picture} username={t.username} />
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

Tweets.propTypes = {
  removeUser: PropTypes.func.isRequired
}

export default Tweets
