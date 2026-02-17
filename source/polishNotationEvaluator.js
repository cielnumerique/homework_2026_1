'use strict'; 
/**
 * Функция для вычисления выражений в польской нотации (префиксной нотации)
 * @param {string} expression - строка с выражением в польской нотации
 * @example
 * // returns 7
 * polishNotationEvaluator("+ 3 4");
 * 
 * @example
 * // returns 20
 * polishNotationEvaluator("* + 2 3 4");
 * 
 * @returns {number} результат вычисления выражения
 */
const polishNotationEvaluator = expression => {
    if (typeof expression !== 'string' && !(expression instanceof String)) {
        return NaN;
    }
    
    if (!expression.trim()) {
        return NaN;
    }

    const tokens = expression.split(/\s+/);
    const stack = [];
    /**
     * Обрабатывает токены справа налево, выполняя операции польской нотации
     * @param {any} _ - аккумулятор (не используется, но требуется для reduceRight)
     * @param {string} token - текущий токен (оператор или число)
     * @returns {any} переданный аккумулятор
     */
    const reducer = (_, token) => {
        if (['+', '-', '*', '/'].includes(token)) {
            const a = stack.pop();
            const b = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    if (b === 0) {
                        stack.push(Infinity * Math.sign(a));
                    } else {
                        stack.push(a / b);
                    }
                    break;
            }
        } else {
            stack.push(+token);
        }
        return _;
    };
    
    tokens.reduceRight(reducer, null);
    
    return stack.pop();
};
