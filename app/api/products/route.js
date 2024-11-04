import products from "../../../public/data/products.json";

export const GET = (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids");
    if (ids) {
      const idArray = ids.split(",").map(Number);
      const selectedProducts = products.products.filter((product) =>
        idArray.includes(product.id)
      );

      return new Response(JSON.stringify(selectedProducts), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
