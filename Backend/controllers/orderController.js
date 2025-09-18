import Order from "../models/order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import userModel from "../models/user.js";

//stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;
    if (!address || items.length === 0) {
      return res.json({ message: false, error: "Invalid data" });
    }

    let productData = {};

    let amount = 0;
    const product = await items.reduce(async (acceleratedValues, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      return (await acceleratedValues) + product.offerPrice * item.quantity;
    });

    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    //stripe payment

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    //line items for stripe
    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    const session  = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
        line_items,
        success_url: `${origin}/loader?next=my-orders`,
        cancel_url: `${origin}/cart`,
        metadata: { orderId: order._id.toString() },
        userId,
    });


    return res.json({ message: true, url:session.url });
  } catch (error) {
    return res.json({ message: false, error: error.message });
  }
};

//STRIPE WEBHHOK
export const stripeWebhook = async (req, res) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

        
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`);
        
    }

    //handle the event
    switch (event.type) {
        case 'checkout.session.succeeded':{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.orderId;

            //metadata
            const session = await stripeInstance.checkout.sessions.listLineItems({
                payment_intent: paymentIntentId,
            })

            const {orderId,userId} = session.data[0].metadata;
            await Order.findByIdAndUpdate(orderId,{isPaid:true});
            await userModel.findByIdAndUpdate(userId,{cartItems:{}});
            break;
        }


        default:
            console.log(`Unhandled event type ${event.type}`);
            break;

    }

    response.json({received:true});
}



//COD

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ message: false, error: "Invalid address or items" });
    }
    let amount = 0;
    const product = await items.reduce(async (acceleratedValues, item) => {
      const product = await Product.findById(item.product);
      return (await acceleratedValues) + product.offerPrice * item.quantity;
    });

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    return res.json({ message: true, message: "Order placed successfully" });
  } catch (error) {
    return res.json({ message: false, error: error.message });
  }
};

//getorderbyuserid

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const order = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ message: true, order });
  } catch (error) {
    res.json({ message: false, error: error.message });
  }
};

//getAllOrdersSellers

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ message: true, orders });
  } catch (error) {
    res.json({ message: false, error: error.message });
  }
};
