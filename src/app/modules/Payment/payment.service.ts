import prisma from "../../../shared/prisma";
import { SSLServices } from "../SSL/ssl.service";
const initPayment = async (appointmentId: string) => {
    const paymentData = await prisma.payment.findFirstOrThrow({
        where: {
            appointmentId
        },
        include: {
            appointment: {
                include: {
                    patient: true
                }
            }
        }
    })
    const initPaymentData = {
        amount: paymentData.amount,
        transactionId: paymentData.transactionId,
        name: paymentData.appointment.patient.name,
        email: paymentData.appointment.patient.email,
        address: paymentData.appointment.patient.address,
        contactNumber: paymentData.appointment.patient.contactNumber,
    }

    const result = await SSLServices.initPayment(initPaymentData)
    return {
        paymentUrl: result.GatewayPageURL
    };
}

export const PaymentServices = {
    initPayment
}