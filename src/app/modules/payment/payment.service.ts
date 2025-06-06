/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { readFileSync } from "fs";
import { startSession } from "mongoose";
import path from "path";
import PostModel from "../post/post.model";
import { UserModel } from "../user/user.model";
import { PaymentModel } from "./payment.model";
import { paymentInitializer, verifyPayment } from "./payment.utils";

const makePremium = async (id: string) => {
  const session = await startSession();

  try {
    // Start transaction
    session.startTransaction();

    // Find the user
    const user = await UserModel.findById(id).session(session);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user has any posts with upvotes
    const userPosts = await PostModel.find({
      author: id,
      "votes.voteType": "upvote",
    }).session(session);

    if (!userPosts || userPosts.length === 0) {
      throw new Error("User does not have any upvoted posts");
    }

    // Generate a unique transaction ID
    const transactionId = `txn_${Math.floor(Math.random() * 10000000)}`;

    // Set up payment info (hardcoded for now, replace with actual data)
    const paymentInfo = {
      amount: 500,
      tran_id: transactionId,
      cus_name: user.name, // Assuming customer's name is the user's name
      cus_email: user.email, // Assuming customer's email is the user's email
      cus_phone: user.phone || "N/A", // Placeholder if phone is missing
      cus_add1: user.address || "N/A", // Placeholder if address is missing
    };

    // Initialize payment (this should ideally be a network request)
    const paymentRes = await paymentInitializer(paymentInfo);

    if (!paymentRes.result) {
      throw new Error("Payment failed");
    }

    // Insert payment record into the PaymentModel
    const payment = new PaymentModel({
      userId: user._id,
      amount: paymentInfo.amount,
      transactionId: paymentInfo.tran_id,
      cusName: paymentInfo.cus_name,
      cusEmail: paymentInfo.cus_email,
      cusPhone: paymentInfo.cus_phone,
      cusAddress: paymentInfo.cus_add1,
      paymentStatus: "pending", // Set the payment status as pending initially
    });

    await payment.save({ session });

    // Commit the transaction if everything is successful
    await session.commitTransaction();

    return paymentRes;
  } catch (error) {
    // Abort the transaction on error
    await session.abortTransaction();

    throw error;
  } finally {
    // End the session
    session.endSession();
  }
};

const confirmationService = async (transactionId: string, status: string) => {
  try {
    // Verifying the payment status using the transactionId
    const verifyPaymentRes = await verifyPayment(transactionId);

    let templatePath;

    if (verifyPaymentRes && verifyPaymentRes.pay_status === "Successful") {
      // Update the payment status to 'paid'
      const payment = await PaymentModel.findOneAndUpdate(
        { transactionId: transactionId }, // Make sure you're matching by string here
        { paymentStatus: "paid" },
        { new: true }
      );

      if (!payment) {
        throw new Error("Payment record not found.");
      }

      // Update the user's status to 'Premium'
      await UserModel.findByIdAndUpdate(payment.userId, { status: "Premium" });

      // Set the success template path
      templatePath = path.join(
        process.cwd(),
        "public/view/PaymentSuccess.html"
      );
    } else {
      // Set the failure template path
      templatePath = path.join(process.cwd(), "public/view/PaymentFailed.html");
    }

    const template = readFileSync(templatePath, "utf-8");

    // Replace placeholder with actual transaction ID
    return template.replace("{{tran_id}}", transactionId || "failed");
  } catch (error) {
    console.error("Error in confirmationService:", error);
    throw new Error("Confirmation service failed.");
  }
};

export const PaymentServices = {
  confirmationService,
  makePremium,
};
