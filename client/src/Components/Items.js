import {useTweet} from '../Context/TweetContext'

const Items = () => {
  const tweets = useTweet()

  if (tweets === undefined){
    return <></>
  }

  return(
    <div id="item-list" className="item-list">
      {tweets.map(i => {
        return(
          <div id="item" className="item">{i[0].username.toString()}</div>
        )
      })}
    </div>
  )
}

export default Items