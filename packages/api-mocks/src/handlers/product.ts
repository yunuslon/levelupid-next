import { http, HttpResponse } from 'msw'
import { mockProducts } from '../data/fixtures'

export const productHandlers = [
  http.get('/api/products', () => {
    return HttpResponse.json({
      data: mockProducts,
      meta: { total: mockProducts.length },
    })
  }),

  http.get('/api/products/:id', ({ params }) => {
    const product = mockProducts.find((p) => p.id === params.id)
    if (!product) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json({ data: product })
  }),
]
