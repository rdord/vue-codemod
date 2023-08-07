import { defineInlineTest } from 'jscodeshift/src/testUtils'
const transform = require('../custom-remove-shared-components-imports.spec')

defineInlineTest(
  transform,
  {},
  `import SiLoadingSpinner from '@/shared/components/SiLoadingSpinner/SiLoadingSpinner.vue';`,
  ``,
  'correctly transform remove import from shared component'
)
