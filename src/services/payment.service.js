const { connect, disconnect } = require("../../db/client");
const PaymentModel = require("../models/payments.model");

const { fetchDataPOST, getReferenceForPay } = require("../../lib/helpers");
const { getRaceService, updateRaceService } = require("./race.service");
const { getOneRider } = require("./rider.service");
const HttpError = require("../exceptions/HttpError");

const COP_TO_CENT = 100;

const paymentService = async (id) => {
  try {
    await connect();
    const paymentValidate = await getPayment(id);

    if (paymentValidate) {
      throw new HttpError("Payment already done", 409);
    }

    const { amount, id_rider, payment_type } = await getRaceService(id);
    const { email_rider } = await getOneRider(id_rider);

    const resultPay = await handlePayment(amount, email_rider);

    if (resultPay.status !== "ERROR") {
      await savePayment({
        id_rider: id_rider,
        id_race: id,
        payment_type: payment_type,
        status: resultPay.data.status,
        reference: resultPay.data.reference,
        amount: resultPay.data.amount_in_cents,
      });

      await updateRaceService(
        id,
        {
          status: "finish",
        },
        "pending-payment"
      );

      return {
        reference: resultPay.data.reference,
        amount,
        payment_type,
      };
    }

    throw new Error("Error in payment process");
  } catch (error) {
    throw new HttpError(`Error in payment: ${error.message}`, error.statusCode);
  } finally {
    await disconnect();
  }
};

const handlePayment = async (amount, rider_email) => {
  try {
    const url = `${process.env.URL_API}/transactions`;

    const reference = getReferenceForPay();

    const payload = {
      amount_in_cents: Number(amount) * COP_TO_CENT,
      currency: "COP",
      customer_email: rider_email,
      payment_method: {
        installments: 1,
      },
      reference: reference,
      payment_source_id: process.env.PAYMENT_SOURCE_ID,
    };
    const response = await fetchDataPOST(url, payload);
    return await response.json();
  } catch (error) {
    throw new HttpError(`Payment ${error.message}`, 400);
  }
};

const savePayment = async (payload) => {
  try {
    await connect();
    const paymentModel = new PaymentModel(payload);
    await paymentModel.save();
  } catch (error) {
    throw new HttpError(`Error save Payment ${error.message}`, 400);
  } finally {
    await disconnect();
  }
};

const getPayment = async (id) => {
  try {
    const payment = await PaymentModel.findOne({ id_race: id });
    return payment !== null;
  } catch (error) {
    throw new HttpError(`Error in payment validate ${error.message}`, 404);
  }
};

module.exports = { paymentService };
