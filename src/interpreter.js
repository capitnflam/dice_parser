// @flow

import { Visitor } from './visitor'
import {
  ASTNode,
  ASTDice,
  ASTDiceMultiplier,
  ASTConstant,
  ASTBinaryOperation,
  ASTParen,
} from './ast'

function* multiplierGenerator(value: number) {
  let it = 0
  const step = () => (value > 0 ? 1 : -1)

  while (it !== value) {
    it += step()
    yield it
  }
}

export default class Interpreter implements Visitor {
  visitDice(x: ASTDice): any {
    const min = 1
    const max = Math.floor(x.value)

    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  visitDiceMultiplier(x: ASTDiceMultiplier): any {
    const mult = this.visit(x.value)
    let acc = 0

    // eslint-disable-next-line no-unused-vars
    for (const it of multiplierGenerator(mult)) {
      acc += this.visit(x.dice)
    }

    return acc
  }
  visitConstant(x: ASTConstant): any {
    return x.value
  }
  visitBinaryOperation(x: ASTBinaryOperation): any {
    const lhs = this.visit(x.left)

    switch (x.operator) {
      case '+': {
        const rhs = this.visit(x.right)
        return lhs + rhs
      }
      case '-': {
        const rhs = this.visit(x.right)
        return lhs - rhs
      }
      case '*': {
        let acc = 0

        // eslint-disable-next-line no-unused-vars
        for (const it of multiplierGenerator(lhs)) {
          acc += this.visit(x.right)
        }

        return Math.sign(lhs) * acc
      }
    }
  }
  visitParen(x: ASTParen): any {
    return this.visit(x.expression)
  }

  visit(x: ASTNode): any {
    if (x instanceof ASTDice) {
      return this.visitDice(x)
    } else if (x instanceof ASTDiceMultiplier) {
      return this.visitDiceMultiplier(x)
    } else if (x instanceof ASTConstant) {
      return this.visitConstant(x)
    } else if (x instanceof ASTBinaryOperation) {
      return this.visitBinaryOperation(x)
    } else if (x instanceof ASTParen) {
      return this.visitParen(x)
    }
  }
}
