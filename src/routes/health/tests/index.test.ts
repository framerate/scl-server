test('/health should return a text string', async () => {
  const options = {
    method: 'GET',
    url: '/health',
  }
  const data = await globalThis.SERVER.inject(options)
  expect(data.statusCode).toBe(200)
  expect(data.result).toBe('Healthy!')
})

test('/healthJson should return a JSON object', async () => {
  const options = {
    method: 'GET',
    url: '/healthJson',
  }

  const data = await globalThis.SERVER.inject(options)
  expect(data.statusCode).toBe(200)
  expect(data.result).toHaveProperty('healthy', true)
  expect(data.result).toHaveProperty('userCount')
})
