const mongoose = require("mongoose");
const dns = require("dns");

const uriSrv = "mongodb+srv://kureshgarbada_db_user:CampusHire_encrypt@campushire.j8o2de7.mongodb.net/?appName=campushire";
const uriDirectNoDb = "mongodb://kureshgarbada_db_user:CampusHire_encrypt@ac-ms8tuho-shard-00-00.j8o2de7.mongodb.net:27017,ac-ms8tuho-shard-00-01.j8o2de7.mongodb.net:27017,ac-ms8tuho-shard-00-02.j8o2de7.mongodb.net:27017/?ssl=true&replicaSet=atlas-c9bdl2-shard-0&authSource=admin";

async function test(uri, label) {
  console.log(`Testing connection using ${label}...`);
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`Successfully connected using ${label}!`);
    await mongoose.disconnect();
  } catch (error) {
    console.error(`Failed to connect using ${label}:`, error.message);
  }
}

async function run() {
  // Test 1: Standard SRV
  await test(uriSrv, "Standard SRV");
  console.log("-------------------");

  // Test 2: Standard SRV with Google DNS
  console.log("Setting DNS servers to Google DNS (8.8.8.8)...");
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    await test(uriSrv, "SRV with Google DNS");
  } catch (err) {
    console.error("Failed to set DNS servers:", err.message);
  }
  console.log("-------------------");

  // Test 3: Direct connection without db name
  await test(uriDirectNoDb, "Direct Connection (No DB Name)");
}

run();
