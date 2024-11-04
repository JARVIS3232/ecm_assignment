export const POST = () => {
  try {
    const isSuccess = Math.random() > 0.5;
    return new Response(JSON.stringify({ success: isSuccess }), {
      headers: {
        status: 200,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
