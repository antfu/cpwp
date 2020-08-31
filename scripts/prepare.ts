import { execSync } from 'child_process'
import fs from 'fs-extra'

function phonetic_cleanup(ph = '') {
  return ph.split(',')[0].split(';')[0]
}

async function prepare() {
  if (!fs.existsSync('source'))
    execSync('git clone https://github.com/shimohq/chinese-programmer-wrong-pronunciation source', { stdio: 'inherit' })

  const md = await fs.readFile('source/README.md', 'utf-8')

  const REGEX = /\((.*?)\)\s*\[(.*?)\]/
  const REGEX_WRONG = /\[(.*?)\]/

  const records = md.split('\n')
    .filter(i => i.startsWith('|'))
    .map((i) => {
      const [, word, uk, us, wrong] = i.split('|')

      const [, voice_uk, phonetic_uk] = uk.match(REGEX) || []
      const [, voice_us, phonetic_us] = us.match(REGEX) || []
      const [, phonetic_wrong] = wrong.match(REGEX_WRONG) || []

      return {
        word: word.trim(),
        voice_uk,
        phonetic_uk: phonetic_cleanup(phonetic_uk),
        voice_us,
        phonetic_us: phonetic_cleanup(phonetic_us),
        phonetic_wrong: phonetic_cleanup(phonetic_wrong),
      }
    })
    .filter(i => i.voice_uk && i.voice_us)

  await fs.writeJSON('./src/data.json', records)
}

prepare()
