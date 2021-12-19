require("dotenv").config();

const port = process.env.PORTA;

authentication.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
