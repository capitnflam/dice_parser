import { parse } from '../src/dice_parser'
import { Interpreter } from '../src/interpreter'
import { mockRandom } from 'jest-mock-random'

describe('interpreting', () => {
  const interpreter = new Interpreter()

  test('interpret constant', () => {
    expect(interpreter.visit(parse('42'))).toEqual(42)
    expect(interpreter.visit(parse('234'))).toEqual(234)
    expect(interpreter.visit(parse('1'))).toEqual(1)
    expect(interpreter.visit(parse('3456'))).toEqual(3456)
  })

  test('simple arithmetic', () => {
    expect(interpreter.visit(parse('1 + 2'))).toEqual(3)
    expect(interpreter.visit(parse('1 + 2 * 3'))).toEqual(7)
    expect(interpreter.visit(parse('(1 + 2) * 3'))).toEqual(9)
    expect(interpreter.visit(parse('(1 - 2) * 3'))).toEqual(-3)
  })

  test('dice', () => {
    mockRandom([0.1, 0.2, 0.3, 0.6])
    expect(interpreter.visit(parse('1d4'))).toEqual(1)
    expect(interpreter.visit(parse('1d6'))).toEqual(2)
    expect(interpreter.visit(parse('1d20'))).toEqual(7)
    expect(interpreter.visit(parse('1d100'))).toEqual(61)
    expect(interpreter.visit(parse('2d6'))).toEqual(3)
  })

  test('complex', () => {
    mockRandom([0.123, 0.234, 0.345, 0.456, 0.567])
    expect(interpreter.visit(parse('2 * (2d6 + 8)'))).toEqual(25)
  })
})
