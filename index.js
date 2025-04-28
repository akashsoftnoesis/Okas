"use strict";
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cron = require('node-cron');
const path = require('path');
const compression = require('compression')
const app = express();
const routes = require('./src/api/routes');
const { propertyAndAgentCronJob, openHomesCronJob } = require('./src/helpers/cronJobHelper');
const { getPropertyClass } = require('./src/helpers/agentsHelper');
require('./src/helpers/redisService')

//CORS Middleware
app.use(cors());

app.use(compression())
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

const cacheAllData = async () => {
    try {
        await propertyAndAgentCronJob()
        await openHomesCronJob()
        await getPropertyClass()
    } catch (error) {
        console.log("cacheAllData Error ====> ", error);
    }
}

//"Australia/Sydney"
cacheAllData()
cron.schedule('0 0 */12 * * *',async () => {
    await propertyAndAgentCronJob()
    await getPropertyClass()
}, {timezone: "Australia/Sydney"})

cron.schedule('0 0 */2 * * *',async () => {
    await openHomesCronJob()
}, {timezone: "Australia/Sydney"})

// cron.schedule('0 */19 * * * *',async () => {
//     const newDateObj = new Date()
//     console.log("new Date => ", newDateObj);
//     const AuDate = newDateObj.toLocaleString("en-US", {timeZone: "Australia/Sydney"});
//     console.log("Australlian Date ==> ", AuDate);

//     const IndianDate = newDateObj.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
//     console.log("Indian Date ==> ", IndianDate);

// }, {timezone: "Australia/Sydney"})

const imagesRoot = path.join(__dirname, '..', 'src/uploads');
app.use('/uploads', express.static(imagesRoot));
app.use('/uploads', express.static(process.cwd() + '/src/uploads'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/v1', routes)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`🚀server started on port ${port}`));
