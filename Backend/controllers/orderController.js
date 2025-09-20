import Order from "../models/order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import userModel from "../models/user.js";
import mongoose from "mongoose";

//stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;
    if (!address || items.length === 0) {
      return res.json({ success: false, error: "Invalid data" });
    }

    let productData = [];

    let amount = 0;
    amount = await items.reduce(async (acceleratedValues, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      return (await acceleratedValues) + product.offerPrice * item.quantity;
    }, 0);

    amount = amount + Math.floor(amount * 0.02);

    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(userId),
      items: items.map(item => ({
        product: new mongoose.Types.ObjectId(item.product),
        quantity: item.quantity
      })),
      amount,
      address: new mongoose.Types.ObjectId(address),
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
      metadata: { 
        orderId: order._id.toString(),
        userId: userId.toString()
      },
    });


    return res.json({ success: true, url:session.url });
  } catch (error) {
    console.log(error)
     res.json({ success: false, error: error.message });
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
        console.log('Webhook signature verification failed:', error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    //handle the event
    switch (event.type) {
        case 'checkout.session.succeeded':{
            const session = event.data.object;
            const { orderId, userId } = session.metadata;
            
            if (!orderId || !userId) {
                console.log('Missing orderId or userId in webhook metadata');
                break;
            }
            
            try {
                await Order.findByIdAndUpdate(orderId, { isPaid: true });
                await userModel.findByIdAndUpdate(userId, { cartItems: {} });
                console.log(`Order ${orderId} marked as paid successfully`);
            } catch (updateError) {
                console.log(`Error updating order ${orderId}:`, updateError.message);
            }
            break;
        }


        default:
            console.log(`Unhandled event type ${event.type}`);
            break;

    }

    res.json({received:true});
}



//COD

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ success: false, error: "Invalid address or items" });
    }
    let amount = 0;
    amount = await items.reduce(async (acceleratedValues, item) => {
      const product = await Product.findById(item.product);
      return (await acceleratedValues) + product.offerPrice * item.quantity;
    }, 0);

    amount = amount + Math.floor(amount * 0.02);

    await Order.create({
      userId: new mongoose.Types.ObjectId(userId),
      items: items.map(item => ({
        product: new mongoose.Types.ObjectId(item.product),
        quantity: item.quantity
      })),
      amount,
      address: new mongoose.Types.ObjectId(address),
      paymentType: "COD",
    });
    
    // Clear cart after successful order
    await userModel.findByIdAndUpdate(userId, { cartItems: {} });
    
    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    return res.json({ success: false, error: error.message });
    console.log(error.message)
  }
};

//getorderbyuserid

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("getUserOrders - userId:", userId); // Debug log
    
    if (!userId) {
      return res.json({ success: false, error: "User ID not found" });
    }
    
    const orders = await Order.find({
      userId: new mongoose.Types.ObjectId(userId),
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address userId")
      .sort({ createdAt: -1 });

    console.log("Found orders:", orders.length); // Debug log
    res.json({ success: true, order: orders });
  } catch (error) {
    console.log("getUserOrders error:", error.message); // Debug log
    res.json({ success: false, error: error.message });
  }
};

//getAllOrdersSellers

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address userId")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
