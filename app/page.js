const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-qr`,
  {
    method: "POST"
  }
);
