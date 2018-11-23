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

const fillDiceArray = (n: number, diceValue: number): Array<ASTDice> => {
  const arr = Array.apply(null, Array(n))
  return arr.map(() => new ASTDice(diceValue))
}

export class Desugar implements Visitor {
  visitDice(x: ASTDice): any {
    return x
  }
  visitDiceMultiplier(x: ASTDiceMultiplier): any {
    const nb = x.value.value
    if (nb === 1) {
      return x.dice
    }
    const array = fillDiceArray(nb, x.dice.value)
    return array.reduce((acc, cur) => new ASTBinaryOperation('+', cur, acc))
  }
  visitConstant(x: ASTConstant): any {
    return x
  }
  visitBinaryOperation(x: ASTBinaryOperation): any {
    x.left = this.visit(x.left)
    x.right = this.visit(x.right)
    return x
  }
  visitParen(x: ASTParen): any {
    x.expression = this.visit(x.expression)
    return x
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
