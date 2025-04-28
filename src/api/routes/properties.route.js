const express = require("express");
const {
  fetchPropertiesForSale,
  fetchPropertiesForLease,
  fetchSalePropertyByID,
  fetchLeasePropertyByID,
  fetchUpcomingOpenHomes,
  fetchSoldProperties,
  fetchUpcomingOpenHomesById,
  fetchAllPropertiesList,
} = require("../controllers/properties.controller");

const router = express.Router();

router.get("/sale", fetchPropertiesForSale);

router.get("/lease", fetchPropertiesForLease);

router.get("/sold", fetchSoldProperties);

router.get("/sale/:id", fetchSalePropertyByID);

router.get("/lease/:id", fetchLeasePropertyByID);

router.get("/upcomingOpenHomes", fetchUpcomingOpenHomes);

router.get("/upcomingOpenHomes/:id/:type/:lifeId", fetchUpcomingOpenHomesById);

router.get("/allProperties/list", fetchAllPropertiesList)

module.exports = router;
