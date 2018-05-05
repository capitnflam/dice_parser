// @flow

import type {
  ASTNode,
  ASTDice,
  ASTDiceMultiplier,
  ASTConstant,
  ASTBinaryOperation,
  ASTParen,
} from './ast'

export interface Visitor {
  visitDice(x: ASTDice): any;
  visitDiceMultiplier(x: ASTDiceMultiplier): any;
  visitConstant(x: ASTConstant): any;
  visitBinaryOperation(x: ASTBinaryOperation): any;
  visitParen(x: ASTParen): any;

  visit(x: ASTNode): any;
}

export interface Visitable {
  accept(v: Visitor): any;
}
