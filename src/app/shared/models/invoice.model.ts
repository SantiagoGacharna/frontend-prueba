export interface Invoice {
  id_invoice: number,
  client_id: number,
  invoice_price: number,
  invoice_date: Date,
  invoice_product: [
    {
      id_invoice_product: number,
      producto_id: number,
      invoice_id: number,
      amount: number
    }
  ]
}
