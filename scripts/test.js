import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')
const category = path.join(projectRoot, 'vanilla-js')
const items = fs.readdirSync(category, { withFileTypes: true })


console.log('__filename', __filename);
console.log('__dirname', __dirname);
console.log('projectRoot', projectRoot);
// console.log('category', category);
