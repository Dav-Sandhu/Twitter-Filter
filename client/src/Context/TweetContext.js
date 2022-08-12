import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'

const TweetContext = React.createContext()
const UserContext = React.createContext()
const SetUserContext = React.createContext()

export const useTweet = () => {
  return useContext(TweetContext)
}

export const useUser = () => {
  return useContext(UserContext)
}

export const useSetUser = () => {
  return useContext(SetUserContext)
}

const TweetProvider = ({children}) => {
  const [tweets, setTweets] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    axios.get(`http://localhost:8000`).then(res => {
      const output = JSON.parse(JSON.stringify(res))['data']['tweets']

      setTweets(output)
      setUser(output)
    });
  }, [])

  return (
    <TweetContext.Provider value={tweets}>
      <UserContext.Provider value={user}>
        <SetUserContext.Provider value={setUser}>
          {children}
        </SetUserContext.Provider>
      </UserContext.Provider>
    </TweetContext.Provider>
  )

}

export default TweetProvider
