import {useTweet, useSetUser} from '../Context/TweetContext'

const Items = () => {
  
  const tweets = useTweet()
  const setUser = useSetUser() 

  if (tweets === undefined){
    return <></>
  }

  return(
    <div className="item-list">
      <button className="item" onClick={() => setUser(tweets)}>View All Users</button>
      {tweets.map(i => {
        return(
          <button className="item" onClick={() => setUser([i])} key={i[0].tweet_id}>
            {i[0].username}
          </button>
        )
      })}
    </div>
  )
}

export default Items
