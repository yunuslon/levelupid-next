import { http, HttpResponse } from 'msw'
import { mockCustomers } from '../data/fixtures'

export const customerHandlers = [
  http.get('/api/customers', () => {
    return HttpResponse.json({ data: mockCustomers, meta: { total: mockCustomers.length } })
  }),

  http.get('/api/customers/:id', ({ params }) => {
    const customer = mockCustomers.find((c) => c.id === params.id)
    if (!customer) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json({ data: customer })
  }),

  http.post('/api/customers', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ data: { id: '3', ...body } }, { status: 201 })
  }),
]
