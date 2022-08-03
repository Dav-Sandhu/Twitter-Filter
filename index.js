import http from 'http'
import twit from 'twit'
import path from 'path'
import {JSDOM} from 'jsdom'
import {fileURLToPath} from 'url'
import {readFileSync} from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*
creates two jsdom objects, the 'doc' for where the main HTML code goes and the 'element' for where 
the HTML code for the tweets goes.
*/
const doc = new JSDOM(readFileSync(path.join(__dirname, "index.html"), "utf8")).window.document
const element = new JSDOM(readFileSync(path.join(__dirname, "tweet.html"), "utf8")).window.document

//create a file called 'users.json' and add two arrays for normal users and special users
const users = JSON.parse(readFileSync(path.join(__dirname, "users.json"), "utf8"))

//create a file called 'credentials.json' and add all of your corresponding credentials
const cred = JSON.parse(readFileSync(path.join(__dirname, "credentials.json"), "utf8"))

const T = new twit({
	consumer_key:         cred.consumer_key,
	consumer_secret:      cred.consumer_secret,
	access_token:         cred.access_token,
	access_token_secret:  cred.access_token_secret
})

//outputs the tweets to the element object
const display_tweets = (tweets) => {
	element.getElementById("profile_picture").src = tweets.user.profile_image_url.toString()
	element.getElementById("username").innerHTML = tweets.user.name.toString()
	element.getElementById("content").innerHTML = tweets.text.toString()
	if (tweets.entities['media'] !== undefined){
		let image_tag = ""
		tweets.extended_entities.media.map(p => {
			image_tag += "<img src='"
			image_tag += p.media_url_https.toString()
			image_tag += "' class='images' width=200 height=200 />&nbsp"
		})

		image_tag += "<br>"
		element.getElementById("img").innerHTML = image_tag
	}else{element.getElementById("img").innerHTML = ""}

	let date_posted = tweets.created_at.substring(0, tweets.created_at.indexOf('+'))
	element.getElementById("date_posted").innerHTML = date_posted
}

//utilizes the 'twit' library to obtain tweets and adds them to the root doc 
const get_tweets = (USER, SPECIAL) => {
	T.get('statuses/user_timeline', { 
		screen_name: USER, 
		count: 1, 
		include_rts: false,
		exclude_replies: SPECIAL,
		trim_user: false
	}, (err, data) => {
		if (err) {console.log(err)}
		else{
			data.forEach(display_tweets)
			doc.getElementById("root").innerHTML += element.documentElement.innerHTML
		}
	})
}

//excludes replies
const low_priority = (ACCOUNT) => {
	get_tweets(ACCOUNT, true)
}

//includes replies
const high_priority = (ACCOUNT) => {
	get_tweets(ACCOUNT, false)
}

//iterates through all of the users to obtain their tweets
users.normal.forEach(low_priority)
users.special.forEach(high_priority)

//runs a server where all of the obtained information is displayed
http.createServer((req, res) => {
	if (req.url === '/'){
		res.writeHead(200, {
			'Content-Type': 'text/html'
		})
		res.end(doc.documentElement.innerHTML)
	}else if (req.url === '/tweet_styles.css'){
		res.writeHead(200, {
			'Content-Type': 'text/css'
		})

		res.end(readFileSync(path.join(__dirname, "tweet_styles.css"), 'utf8'))
	}
}).listen(3000)
