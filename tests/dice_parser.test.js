import { parse, SyntaxError } from '../src/dice_parser'
import {
  ASTConstant,
  ASTDice,
  ASTDiceMultiplier,
  ASTBinaryOperation,
  ASTParen,
} from '../src/ast'

describe('parsing', () => {
  test('parse constant', () => {
    expect(parse('42')).toEqual(new ASTConstant(42))
  })

  test('parse errors', () => {
    const parse_tester = str => () => parse(str)
    expect(parse_tester('1d42')).toThrow(SyntaxError)
    expect(parse_tester('0d4')).toThrow(SyntaxError)
    expect(parse_tester('1a')).toThrow(SyntaxError)
  })

  test('parse 1 dice', () => {
    expect(parse('1d4')).toEqual(
      new ASTDiceMultiplier(new ASTConstant(1), new ASTDice(4)),
    )
    expect(parse('1d6')).toEqual(
      new ASTDiceMultiplier(new ASTConstant(1), new ASTDice(6)),
    )
    expect(parse('1d8')).toEqual(
      new ASTDiceMultiplier(new ASTConstant(1), new ASTDice(8)),
    )
    expect(parse('1d10')).toEqual(
      new ASTDiceMultiplier(new ASTConstant(1), new ASTDice(10)),
    )
    expect(parse('1d12')).toEqual(
      new ASTDiceMultiplier(new ASTConstant(1), new ASTDice(12)),
    )
    expect(parse('1d20')).toEqual(
      new ASTDiceMultiplier(new ASTConstant(1), new ASTDice(20)),
    )
    expect(parse('1d100')).toEqual(
      new ASTDiceMultiplier(new ASTConstant(1), new ASTDice(100)),
    )
  })

  test('parse multi dice', () => {
    const mults = [1, 2, 42, 123, 2000]
    const sides = [4, 6, 8, 10, 12, 20, 100]
    mults.forEach(m => {
      sides.forEach(s => {
        expect(parse(`${m}d${s}`)).toEqual(
          new ASTDiceMultiplier(new ASTConstant(m), new ASTDice(s)),
        )
      })
    })
  })

  test('parse arithmetic', () => {
    expect(parse('1 + 2 * 3')).toEqual(
      new ASTBinaryOperation(
        '+',
        new ASTConstant(1),
        new ASTBinaryOperation('*', new ASTConstant(2), new ASTConstant(3)),
      ),
    )
    expect(parse('(1 + 2) * 3')).toEqual(
      new ASTBinaryOperation(
        '*',
        new ASTParen(
          new ASTBinaryOperation('+', new ASTConstant(1), new ASTConstant(2)),
        ),
        new ASTConstant(3),
      ),
    )
    expect(parse('1 - 2 * 3')).toEqual(
      new ASTBinaryOperation(
        '-',
        new ASTConstant(1),
        new ASTBinaryOperation('*', new ASTConstant(2), new ASTConstant(3)),
      ),
    )
    expect(parse('2 * (2d6 + 8)')).toEqual(
      new ASTBinaryOperation(
        '*',
        new ASTConstant(2),
        new ASTParen(
          new ASTBinaryOperation(
            '+',
            new ASTDiceMultiplier(new ASTConstant(2), new ASTDice(6)),
            new ASTConstant(8),
          ),
        ),
      ),
    )
  })
})
