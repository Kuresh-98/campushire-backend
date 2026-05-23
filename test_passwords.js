const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const passwordBases = [
  "CampusHire_encrypt",
  "CampusHire_decrypt",
  "CampusHire",
  "campushire",
  "kuresh",
  "Kuresh",
  "kureshgarbada",
  "kureshgarbada_db_user",
  "campushire_backend",
  "campushire-backend",
  "CampusHire_backend",
  "CampusHire-backend"
];

const suffixes = [
  "",
  "_encrypt",
  "_decrypt",
  "123",
  "_123",
  "@123",
  "!123",
  "#123",
  "98",
  "_98",
  "@98",
  "!98",
  "#98"
];

// Let's generate a list of passwords to try
const passwords = [];
for (const base of passwordBases) {
  for (const suffix of suffixes) {
    let p = base;
    if (suffix) {
      // If base already ends with some of these, avoid duplicates or keep them simple
      if (suffix.startsWith("_") && base.endsWith("_")) continue;
      p = base + suffix;
    }
    if (!passwords.includes(p)) {
      passwords.push(p);
    }
  }
}

// Add some exact ones
const exacts = [
  "CampusHire_encrypt",
  "CampusHire_decrypt",
  "CampusHire",
  "campushire",
  "CampusHire123",
  "CampusHire_123",
  "CampusHire@123",
  "CampusHire!123",
  "kureshgarbada",
  "kureshgarbada_db_user"
];
for (const e of exacts) {
  if (!passwords.includes(e)) passwords.push(e);
}

const username = "kureshgarbada_db_user";

async function test(password) {
  const encodedPass = encodeURIComponent(password);
  const uri = `mongodb+srv://${username}:${encodedPass}@campushire.j8o2de7.mongodb.net/?appName=campushire`;
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log(`SUCCESS with password: ${password}`);
    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.log(`FAILED with password "${password}": ${error.message}`);
    return false;
  }
}

async function run() {
  console.log(`Testing ${passwords.length} passwords...`);
  for (const pass of passwords) {
    const success = await test(pass);
    if (success) {
      console.log(`Found working password: ${pass}`);
      break;
    }
  }
}

run();
