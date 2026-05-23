require("dotenv").config();

// Force Node DNS to use a public DNS server to avoid local SRV resolution issues
const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});