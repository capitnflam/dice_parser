const prompts = require('prompts')

const { parse } = require('./dist/dice_parser')
const { Formatter } = require('./dist/formatter')
const { Interpreter } = require('./dist/interpreter')

const loop = async () => {
  const formatter = new Formatter()
  const interpreter = new Interpreter()

  while (true) {
    const response = await prompts({
      type: 'text',
      name: 'expression',
      message: 'Dice expression:',
    })

    if (!response.expression) {
      break
    }
    let ast = null
    try {
      ast = parse(response.expression)
    } catch (e) {
      console.error(e.message)
      continue
    }
    console.log(`Expression: ${formatter.visit(ast)}`)
    console.log(`Result: ${interpreter.visit(ast)}`)
  }
}

loop().catch(reason => console.error(`oops:`, reason))
