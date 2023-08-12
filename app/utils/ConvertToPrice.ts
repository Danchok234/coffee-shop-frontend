// new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(fullPrice)
export const ConvertToPrice = (price:number) => {
	return (
		new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(price)
	)
}