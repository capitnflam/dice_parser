{
  const { ASTDice, ASTDiceMultiplier, ASTParen, ASTBinaryOperation, ASTConstant } = require('./ast')
}

start
  = Expression

DICE_SIDES
  = '4'
  / '6'
  / '8'
  / '10'
  / '12'
  / '20'
  / '100'

Dice
  = mult:Constant 'd' s:DICE_SIDES { return new ASTDiceMultiplier(mult, new ASTDice(parseInt(s, 10))) }

Constant
  = digits:([1-9][0-9]*) { return new ASTConstant(parseInt(digits.join(""), 10)) }

Expression
  = head:Term tail:(_ ('+' / '-') _ Term)* {
      return tail.reduce((result, element) => {
        return new ASTBinaryOperation(element[1], result, element[3])
      }, head);
    }

Term
  = head:Factor tail:(_ '*' _ Factor)* {
      return tail.reduce((result, element) => {
        return new ASTBinaryOperation(element[1], result, element[3])
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return new ASTParen(expr) }
  / Dice
  / Constant

_ "whitespace"
  = [ \t\n\r]*