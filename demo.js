const prompts = require('prompts')

const { parse } = require('./dist/dice_parser')
const { Formatter } = require('./dist/formatter')
const { Interpreter } = require('./dist/interpreter')
const { DotFormatter } = require('./dist/dotFormatter')
const { Desugar } = require('./dist/desugar')

const loop = async () => {
  const formatter = new Formatter()
  const interpreter = new Interpreter()
  const desugar = new Desugar()

  while (true) {
    const responses = await prompts([
      {
        type: 'text',
        name: 'expression',
        message: 'Dice expression:',
      },
      {
        type: (prev, values) => (values.expression ? 'confirm' : null),
        name: 'desugar',
        message: 'Desugar dice multiplier?',
        initial: false,
      },
      {
        type: (prev, values) =>
          values.expression && values.desugar != null ? 'confirm' : null,
        name: 'dot',
        message: 'dot output?',
        initial: true,
      },
    ])

    if (
      !responses.expression ||
      responses.dot == null ||
      responses.desugar == null
    ) {
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
    if (responses.desugar) {
      ast = desugar.visit(ast)
    }
    if (responses.dot) {
      const dotFormatter = new DotFormatter()
      console.log(dotFormatter.generateDot(ast))
    }
  }
}

loop().catch(reason => console.error(`oops:`, reason))
