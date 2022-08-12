import {writeFileSync, readFileSync} from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const file = path.join(__dirname, "public/users.json")

const readJSON = () => {
	let data = JSON.parse(readFileSync(file, "utf8"))
	return data
}

const addUser = (USER) => {
	let data = readJSON()
	let index = data["users"].indexOf(USER)
	
	if (index === -1){
		data["users"].push(USER)
		writeFileSync(file, JSON.stringify(data))
	}
}

const removeUser = (USER) => {
	let data = readJSON()
	let index = data["users"].indexOf(USER.toLowerCase())

	if (index !== -1){
		data["users"].splice(index, 1)
		writeFileSync(file, JSON.stringify(data))
	}
}

export {addUser, removeUser}