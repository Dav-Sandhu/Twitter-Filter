import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'

const TweetContext = React.createContext()

export const useTweet = () => {
  return useContext(TweetContext)
}

const TweetProvider = ({children}) => {
  const [tweets, setTweets] = useState()

  useEffect(() => {
    axios.get(`http://localhost:8000`).then(res => {
      setTweets(JSON.parse(JSON.stringify(res))['data']['tweets'])
    });
  }, [])

  return (
    <TweetContext.Provider value={tweets} >
      {children}
    </TweetContext.Provider>
  )

}

export default TweetProvider
