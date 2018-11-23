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
import { isConstructorDeclaration } from 'typescript'

export class DotFormatter implements Visitor {
  nodeIndex: number

  constructor() {
    this.nodeIndex = 0
  }

  visitDice(x: ASTDice): any {
    const currentIndex = this.nodeIndex
    this.nodeIndex += 1
    return {
      content: `node${currentIndex} [label="Dice: ${x.value}"];`,
      index: currentIndex,
    }
  }
  visitDiceMultiplier(x: ASTDiceMultiplier): any {
    const currentIndex = this.nodeIndex
    this.nodeIndex += 1
    const constant = this.visit(x.value)
    const dice = this.visit(x.dice)

    return {
      content: `node${currentIndex} [label="Multiplier"];${constant.content}${
        dice.content
      }node${currentIndex} -> node${
        constant.index
      };node${currentIndex} -> node${dice.index};`,
      index: currentIndex,
    }
  }
  visitConstant(x: ASTConstant): any {
    const currentIndex = this.nodeIndex
    this.nodeIndex += 1
    return {
      content: `node${currentIndex} [label="Constant: ${x.value}"];`,
      index: currentIndex,
    }
  }
  visitBinaryOperation(x: ASTBinaryOperation): any {
    const currentIndex = this.nodeIndex
    this.nodeIndex += 1
    const left = this.visit(x.left)
    const right = this.visit(x.right)
    return {
      content: `node${currentIndex} [label="BinaryOperation: ${x.operator}"];${
        left.content
      }${right.content}node${currentIndex} -> node${
        left.index
      };node${currentIndex} -> node${right.index};`,
      index: currentIndex,
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

  generateDot(x: ASTNode): string {
    const content = this.visit(x)
    return `digraph G {${content.content}}`
  }
}
