let cart = [];

export const GET = () => {
  try {
    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req) => {
  try {
    const { productId, quantity } = await req.json();
    const quantityInt = parseInt(quantity, 10);
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantityInt;
    } else {
      cart.push({ productId, quantity: quantityInt });
    }
    return new Response(JSON.stringify(cart), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = () => {
  try {
    cart = [];
    return new Response(
      JSON.stringify({ message: "Cart cleared", success: true }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
