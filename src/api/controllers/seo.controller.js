const { writeFileSync, existsSync, readFileSync } = require("fs")

const addSEODetails = async (req, res) => {
    try {
        const seoDetails = req.body
        writeFileSync("./src/helpers/seo-details.json", JSON.stringify(seoDetails))
        return res.status(200).json({
            data: seoDetails,
        });
    } catch (error) {
        return res.status(400).json({
            error,
        });
    }
}

const fetchSEODetails = async (req, res) => {
    try {
        const { pageName } = req.query
        if (existsSync("./src/helpers/seo-details.json")) {
            const allSEOData = await JSON.parse(readFileSync("./src/helpers/seo-details.json"))
            let finalResponse
            if (pageName && allSEOData[decodeURIComponent(pageName)]) {
                finalResponse = allSEOData[decodeURIComponent(pageName)]
                return res.status(200).json({
                    data: finalResponse
                })
            } else if (pageName && pageName === "All") {
                return res.status(200).json({
                    data: allSEOData
                })
            } else {
                return res.status(400).json({
                    message: "No data found for given page name."
                })
            }
        } else {
            return res.status(400).json({
                message: "No data found for SEO details."
            })
        }
    } catch (error) {
        console.log("fetchSEODetails error", error);
        return res.status(400).json({
            error,
        });
    }
}
module.exports = {
    addSEODetails,
    fetchSEODetails
}