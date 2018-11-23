const prompts = require('prompts')

const { parse } = require('./dist/dice_parser')
const { Formatter } = require('./dist/formatter')
const { Interpreter } = require('./dist/interpreter')
const { DotFormatter } = require('./dist/dotFormatter')

const loop = async () => {
  const formatter = new Formatter()
  const interpreter = new Interpreter()

  while (true) {
    const responses = await prompts([
      {
        type: 'text',
        name: 'expression',
        message: 'Dice expression:',
      },
      {
        type: prev => (prev ? 'confirm' : null),
        name: 'dot',
        message: 'dot output?',
        initial: true,
      },
    ])

    if (!responses.expression || responses.dot === undefined) {
      break
    }
    let ast = null
    try {
      ast = parse(responses.expression)
    } catch (e) {
      console.error(e.message)
      continue
    }
    console.log(`Expression: ${formatter.visit(ast)}`)
    console.log(`Result: ${interpreter.visit(ast)}`)
    if (responses.dot) {
      const dotFormatter = new DotFormatter()
      console.log(dotFormatter.generateDot(ast))
    }
  }
}

loop().catch(reason => console.error(`oops:`, reason))
