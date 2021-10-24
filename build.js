// eslint-disable-next-line @typescript-eslint/no-var-requires
const fse = require('fs-extra')

console.log('--- Copy');
[
  ['./src/express/public', './dist/express/public']
].forEach(([from, to]) => {
  console.log(`Copy from : "${from}" to "${to}"`)
  fse.copySync(from, to)
})
