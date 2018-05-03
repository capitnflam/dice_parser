import { parse } from './dice_parser'
import { ASTConstant } from './ast'

test('parse constant', () => {
  expect(parse('42')).toEqual(new ASTConstant(42))
})
