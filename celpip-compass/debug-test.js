const { SpacedRepetitionService } = require('./src/services/spaced-repetition-service.ts')

const service = new SpacedRepetitionService()

console.log('Service instance:', service)
console.log('calculateNextInterval method:', typeof service.calculateNextInterval)
console.log('Method result:', service.calculateNextInterval(4, 1, 0))
console.log('All methods:', Object.getOwnPropertyNames(service))
console.log('Service constructor:', service.constructor)
console.log('Prototype methods:', Object.getOwnPropertyNames(SpacedRepetitionService.prototype))