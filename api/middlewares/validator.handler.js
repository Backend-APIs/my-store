/* property = from the request the property of body, params or query.
We apply a schema to x property.
Here we create a closure (A closure is the combination of a function bundled together (enclosed) with references to its surrounding state
(the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#lexical_scoping
*/
const boom = require('@hapi/boom')

function validatorHandler(schema, property) {
  // Were creating a middleware dynamically (this is the closure).
  return (req, res, next) => {
    // property = body, params, query
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validatorHandler
