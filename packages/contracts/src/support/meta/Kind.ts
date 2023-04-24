/**
 * The kind of element that is being decorated
 * 
 * @see https://github.com/tc39/proposal-decorators
 */
enum Kind {
    class = 1,
    method = 2,
    getter = 3,
    setter = 4,
    field = 5,
    accessor = 6,
}

export default Kind;