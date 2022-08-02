import {writeFileSync, readFileSync} from 'fs'

const createFileSync = (TEXT) => {
	writeFileSync("file.html", TEXT, {flag: 'a'})
}

const clearFile = () => {
	writeFileSync("file.html","")
}

export {createFileSync, readFileSync, clearFile};
