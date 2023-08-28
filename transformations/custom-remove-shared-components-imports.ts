import wrap from '../src/wrapAstTransformation'
import type { ASTTransformation } from '../src/wrapAstTransformation'
// import { getVueOptions } from '../src/astUtils'
// const fs = require('fs')
// const path = require('path')

// const filePath = path.join(process.cwd(), 'shims-components.d.ts')

// function getComponents(filePath: string): Promise<string[]> {
//   return new Promise((resolve, reject) => {
//     fs.readFile(
//       filePath,
//       'utf8',
//       (err: NodeJS.ErrnoException | null, data: string) => {
//         if (err) {
//           reject('Error reading file: ' + err)
//           return
//         }

//         const componentNames = extractComponentNames(data)
//         resolve(componentNames)
//       }
//     )
//   })
// }

// function extractComponentNames(fileContent: string): string[] {
//   const regex = /(\w+): typeof import/g
//   const matches = Array.from(fileContent.matchAll(regex))
//   const components: string[] = []

//   for (const match of matches) {
//     components.push(match[1])
//   }

//   return components
// }

export const transformAST: ASTTransformation = async ({
  j,
  root,
  filename
}) => {
  try {
    // const componentNames = await getComponents(filePath)
    // console.log('componentNames', componentNames)

    // root
    //   .find(j.ImportDeclaration)
    //   .filter(path => {
    //     if (typeof path?.node?.source?.value === 'string') {
    //       const importPath = path.node.source.value

    //       // Ignore import paths without .vue extension
    //       if (!importPath.endsWith('.vue')) {
    //         return false
    //       }

    //       const componentName = importPath.split('/').pop()?.split('.')[0] || ''
    //       console.log(componentName, componentNames.includes(componentName))
    //       return componentNames.includes(componentName)
    //     }
    //     return false
    //   })
    //   .remove()
    // console.log('root', root)

    root
      .find(j.ImportDeclaration)
      .filter(path => {
        if (typeof path?.node?.source?.value === 'string') {
          const aaa = path.node.source.value.includes('/shared/components/')
          console.log('remove', aaa)
          return path.node.source.value.includes('/shared/components/')
        }
        return false
      })
      .remove()
  } catch (err) {
    console.error('Error:', err)
  }

  // const options = getVueOptions({ j, root, filename })
  // const result = options.toSource({ lineTerminator: '\n' })

  // if (Array.isArray(result)) {
  //   return result.map((source, index) => `${index}: ${source}`).join('\n\n')
  // }
  // console.log('result:', result)

  // TODO: remove from components object
}

export default wrap(transformAST)
export const parser = 'babylon'
