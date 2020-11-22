const sinon = require("sinon");
const assert = require("assert");
const Fibonacci = require("./fibonacci");

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // generators retornam iteratos, (.next)
    // existem 3 formas de ler os dados
    // 1 - usando as funções .next
    // 2 - for await
    // 3 - rest/spread
    for await (const i of fibonacci.execute(3)) {
    }
    assert.deepStrictEqual(spy.callCount, 4);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);
    /**
     * [0] input = 5, current = 0, next = 1
     * [1] input = 4, current = 1, next = 1
     * [2] input = 3, current = 1, next = 2
     * [3] input = 2, current = 2, next = 3
     * [4] input = 1, current = 3, next = 5
     * [5] input = 0 -> PARA
     */

    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    assert.deepStrictEqual(spy.callCount, 6);
    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expectedResult);
  }
})();
