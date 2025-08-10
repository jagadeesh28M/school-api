const express = require("express");
const { PrismaClient } = require("@prisma/client");
const {
  addSchoolSchema,
  listSchoolsQuerySchema,
} = require("./validators/school");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/addSchool", async (req, res) => {
  try {
    const validated = addSchoolSchema.parse(req.body);

    const school = await prisma.school.create({
      data: validated,
    });

    res.status(201).json(school);
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Failed to add school" });
  }
});

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

app.get("/listSchools", async (req, res) => {
  try {
    const { latitude, longitude } = listSchoolsQuerySchema.parse(req.query);

    const schools = await prisma.school.findMany();

    const sorted = schools
      .map((school) => ({
        ...school,
        distance: getDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Failed to list schools" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
