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

export default class Formatter implements Visitor {
  visitDice(x: ASTDice): any {
    return `d${x.value}`
  }
  visitDiceMultiplier(x: ASTDiceMultiplier): any {
    return `${this.visit(x.value)}${this.visit(x.dice)}`
  }
  visitConstant(x: ASTConstant): any {
    return `${x.value}`
  }
  visitBinaryOperation(x: ASTBinaryOperation): any {
    return `${this.visit(x.left)} ${x.operator} ${this.visit(x.right)}`
  }
  visitParen(x: ASTParen): any {
    return `(${this.visit(x.expression)})`
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
