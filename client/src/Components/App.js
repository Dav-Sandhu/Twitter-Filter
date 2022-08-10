import Navbar from './Navbar'
import Tweets from './Tweets'
import TweetProvider from '../Context/TweetContext'

const App = () => {
  return (
    <TweetProvider>
      <div id="title" className="title">Twitter Filter App</div>
      <Navbar />
      <Tweets/>
    </TweetProvider>
  );
}

export default App
