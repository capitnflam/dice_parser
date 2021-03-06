{
  const { ASTDice, ASTDiceMultiplier, ASTParen, ASTBinaryOperation, ASTConstant } = require('./ast')
}

start
  = Expression

DICE_SIDES
  = '4'
  / '6'
  / '8'
  / '100'
  / '10'
  / '12'
  / '20'

Dice
  = mult:Constant 'd' s:DICE_SIDES { return new ASTDiceMultiplier(mult, new ASTDice(parseInt(s, 10))) }

Constant
  = [1-9][0-9]* { return new ASTConstant(parseInt(text(), 10)) }

Expression
  = _ head:Term tail:(_ ('+' / '-') _ Term)* _ {
      return tail.reduce((result, element) => {
        return new ASTBinaryOperation(element[1], result, element[3])
      }, head);
    }

Term
  = _ head:Factor tail:(_ '*' _ Factor)* _ {
      return tail.reduce((result, element) => {
        return new ASTBinaryOperation(element[1], result, element[3])
      }, head);
    }

Factor
  = "(" expr:Expression ")" { return new ASTParen(expr) }
  / Dice
  / Constant

_ "whitespace"
  = [ \t\n\r]*