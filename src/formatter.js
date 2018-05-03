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

export class Formatter implements Visitor {
  visit(x: ASTDice): any {
    return `d${x.value}`
  }
  visit(x: ASTDiceMultiplier): any {
    return `${this.visit(x.value)}${this.visit(x.dice)}`
  }
  visit(x: ASTConstant): any {
    return `${x.value}`
  }
  visit(x: ASTBinaryOperation): any {
    return `${this.visit(x.left)} ${x.operator} ${this.visit(x.right)}`
  }
  visit(x: ASTParen): any {
    return `(${this.visit(x.expression)})`
  }

  visit(x: ASTNode): any {
    if (x instanceof ASTDice) {
      return this.visit((x: ASTDice))
    } else if (x instanceof ASTDiceMultiplier) {
      return this.visit((x: ASTDiceMultiplier))
    } else if (x instanceof ASTConstant) {
      return this.visit((x: ASTConstant))
    } else if (x instanceof ASTBinaryOperation) {
      return this.visit((x: ASTBinaryOperation))
    } else if (x instanceof ASTParen) {
      return this.visit((x: ASTParen))
    }
  }
}
