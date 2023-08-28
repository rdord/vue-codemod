import wrap from '../src/wrapAstTransformation'
import type { ASTTransformation } from '../src/wrapAstTransformation'
// import { getVueOptions } from '../src/astUtils'

export const transformAST: ASTTransformation = ({ j, root, filename }) => {
  root
    .find(j.ImportDeclaration)
    .filter(path => {
      if (typeof path?.node?.source?.value === 'string') {
        return path.node.source.value.includes('/shared/components/')
      }
      return false
    })
    .remove()

  // const options = getVueOptions({ j, root, filename })
  // const result = options.toSource({ lineTerminator: '\n' })

  // if (Array.isArray(result)) {
  //   return result.map((source, index) => `${index}: ${source}`).join('\n\n')
  // }
  // console.log('result:', result)

  // TODO: use components shim as source.value
  // TODO: remove from components object
}

export default wrap(transformAST)
export const parser = 'babylon'
