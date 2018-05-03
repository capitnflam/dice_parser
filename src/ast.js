// @flow

import type { Visitable, Visitor } from './visitor'

export interface ASTNode extends Visitable {}

export class ASTDice implements ASTNode {
  value: number

  constructor(value: number) {
    this.value = value
  }

  accept(v: Visitor): any {
    return v.visit(this)
  }
}

export class ASTDiceMultiplier implements ASTNode {
  value: ASTConstant
  dice: ASTDice

  constructor(value: ASTConstant, dice: ASTDice) {
    this.value = value
    this.dice = dice
  }

  accept(v: Visitor): any {
    return v.visit(this)
  }
}

export class ASTConstant implements ASTNode {
  value: number

  constructor(value: number) {
    this.value = value
  }

  accept(v: Visitor): any {
    return v.visit(this)
  }
}

export type BinaryOperator = '+' | '-' | '*'

export class ASTBinaryOperation implements ASTNode {
  operator: BinaryOperator
  left: ASTNode
  right: ASTNode

  constructor(operator: BinaryOperator, left: ASTNode, right: ASTNode) {
    this.operator = operator
    this.left = left
    this.right = right
  }

  accept(v: Visitor): any {
    return v.visit(this)
  }
}

export class ASTParen implements ASTNode {
  expression: ASTNode

  constructor(expression: ASTNode) {
    this.expression = expression
  }

  accept(v: Visitor): any {
    return v.visit(this)
  }
}
