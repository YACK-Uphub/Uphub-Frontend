export interface Payment {
	bin: string
	accountNumber: string
	amount: number
	description: string
	orderCode: number
	currency: string
	paymentLinkId: string
	status: string
	expiredAt: number
	checkoutUrl: string
	qrCode: string
}

export interface PaymentRequestBodyObject {
	userId: number
	planId: number
}
