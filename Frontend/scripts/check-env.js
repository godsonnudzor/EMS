import fs from 'fs'
import path from 'path'

// Required environment variables for the frontend during development
const REQUIRED = ['VITE_API_URL']

function parseEnvFile(filepath) {
  try {
    const content = fs.readFileSync(filepath, { encoding: 'utf8' })
    const lines = content.split(/\r?\n/)
    const obj = {}
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.substring(0, eq).trim()
      const val = trimmed.substring(eq + 1).trim()
      obj[key] = val.replace(/^"|"$/g, '')
    }
    return obj
  } catch (e) {
    return {}
  }
}

function findEnvValue(key) {
  // 1) check process.env (CI or shell)
  if (process.env[key]) return process.env[key]

  // 2) check common env files in the project root
  const root = process.cwd()
  const candidates = ['.env', '.env.local']
  for (const name of candidates) {
    const p = path.join(root, name)
    if (fs.existsSync(p)) {
      const parsed = parseEnvFile(p)
      if (parsed[key]) return parsed[key]
    }
  }

  return undefined
}

function main() {
  const root = process.cwd()
  const envPath = path.join(root, '.env')
  const examplePath = path.join(root, '.env.example')

  // If .env is missing but .env.example exists, create .env automatically
  try {
    if (!fs.existsSync(envPath) && fs.existsSync(examplePath)) {
      fs.copyFileSync(examplePath, envPath)
      console.log('\nCreated `.env` from `.env.example`')
    }
  } catch (e) {
    // non-fatal, continue to validation which will report missing vars
    console.error('Could not create .env from .env.example:', e.message || e)
  }

  const missing = []
  for (const key of REQUIRED) {
    const val = findEnvValue(key)
    if (!val) missing.push(key)
  }

  if (missing.length > 0) {
    console.error('\nMissing required environment variables for frontend development:')
    for (const k of missing) console.error(`  - ${k}`)

    console.error('\nHow to fix:')
    console.error('  1) Create a `.env` file in the frontend project root with the variables below:')
    console.error('')
    for (const k of missing) console.error(`     ${k}=http://localhost:3000`)
    console.error('')
    console.error('  2) Or set the variables in your shell before running the dev server.')
    console.error('')
    console.error('Tip: copy `./.env.example` to `./.env` and edit it:')
    console.error('  - Unix: cp .env.example .env')
    console.error('  - Windows (PowerShell): Copy-Item .env.example .env')
    console.error('\nThen restart the dev server (npm run dev).')
    console.error('')
    process.exit(1)
  }

  // All required vars present
  process.exit(0)
}

main()
