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
  visit(x: ASTDice): any;
  visit(x: ASTDiceMultiplier): any;
  visit(x: ASTConstant): any;
  visit(x: ASTBinaryOperation): any;
  visit(x: ASTParen): any;

  visit(x: ASTNode): any;
}

export interface Visitable {
  accept(v: Visitor): any;
}
