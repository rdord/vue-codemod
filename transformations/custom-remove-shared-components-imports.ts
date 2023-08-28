import wrap from '../src/wrapAstTransformation'
import type { ASTTransformation } from '../src/wrapAstTransformation'
// import { getVueOptions } from '../src/astUtils'
const fs = require('fs')
const path = require('path')

const filePath = path.join(process.cwd(), 'shims-components.d.ts')

function getComponents(filePath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(
      filePath,
      'utf8',
      (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
          reject('Error reading file: ' + err)
          return
        }

        const componentNames = extractComponentNames(data)
        resolve(componentNames)
      }
    )
  })
}

function extractComponentNames(fileContent: string): string[] {
  const regex = /(\w+): typeof import/g
  const matches = Array.from(fileContent.matchAll(regex))
  const components: string[] = []

  for (const match of matches) {
    components.push(match[1])
  }

  return components
}

export const transformAST: ASTTransformation = ({ j, root, filename }) => {
  getComponents(filePath)
    .then(componentNames => console.log(componentNames))
    .catch(err => console.error('Error:', err))

  // root
  //   .find(j.ImportDeclaration)
  //   .filter(path => {
  //     if (typeof path?.node?.source?.value === 'string') {
  //       return path.node.source.value.includes('/shared/components/')
  //     }
  //     return false
  //   })
  //   .remove()

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
