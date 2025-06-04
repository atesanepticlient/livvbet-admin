// let count = 0;
// const names = ["Rayhan", "Epti", "Ashik"];

// names.forEach(()=> count = 8);

// console.log({count}

import { db } from "./src/lib/db.js";
import bcrypt from "bcryptjs";
const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);
  await db.admin.create({
    data: {
      email: "epti060@gmail.com",
      fullName: "San Bin Hoque",
      twoFAEmail: "epti060@gmail.com",
      password: hashedPassword,
    },
  });
  console.log("Created");
};
seedAdmin();
const seedSite = async () => {
  await db.site.create({
    data: {},
  });
  console.log("Created");
};

seedSite();
