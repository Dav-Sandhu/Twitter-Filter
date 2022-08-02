import {writeFileSync, readFileSync} from 'fs'

const createFileSync = (TEXT) => {
	writeFileSync("file.html", TEXT, {flag: 'a'})
}

const clearFile = () => {
	writeFileSync("file.html", 
	"<meta charset='utf-8'>" + 
	"<head><link rel='stylesheet' href='/tweet_styles.css'></head>")
}

export {createFileSync, readFileSync, clearFile};