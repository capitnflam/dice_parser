import { parse } from '../src/dice_parser'
import { Formatter } from '../src/formatter'

describe('formatting', () => {
  const formatter = new Formatter()

  test('format constant', () => {
    expect(formatter.visit(parse('42'))).toEqual('42')
    expect(formatter.visit(parse('1'))).toEqual('1')
    expect(formatter.visit(parse('234'))).toEqual('234')
    expect(formatter.visit(parse('3456'))).toEqual('3456')
  })

  test('format dice', () => {
    expect(formatter.visit(parse('2d6'))).toEqual('2d6')
    expect(formatter.visit(parse('4234d100'))).toEqual('4234d100')
  })

  test('format arithmetic', () => {
    expect(formatter.visit(parse('1+2*3'))).toEqual('1 + 2 * 3')
    expect(formatter.visit(parse('  2*    (   2d6    +8  ) '))).toEqual(
      '2 * (2d6 + 8)',
    )
  })
})
