import Navbar from './Navbar'
import Tweets from './Tweets'
import User from './User'
import TweetProvider from '../Context/TweetContext'

const App = () => {

  const [user, setUser, makeRequest, removeUser] = User()

  return (
    <TweetProvider>
      <div className="title">Twitter Filter App</div>
      <Navbar user={user} setUser={setUser} makeRequest={makeRequest} />
      <Tweets removeUser={removeUser} />
    </TweetProvider>
  );
}

export default App
