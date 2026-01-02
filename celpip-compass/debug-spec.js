const { SpacedRepetitionService } = require('./src/services/spaced-repetition-service.ts')

describe('Spaced Repetition Service Debug', () => {
  let service

  beforeEach(() => {
    service = new SpacedRepetitionService()
  })

  it('should calculate next interval', () => {
    console.log('Service:', service)
    console.log('Methods on service:', Object.getOwnPropertyNames(service))
    console.log('Methods on prototype:', Object.getOwnPropertyNames(Object.getPrototypeOf(service)))

    const interval = service.calculateNextInterval(4, 1, 0)
    expect(interval).toBe(1)
  })
})