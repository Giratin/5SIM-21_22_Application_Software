const express = require("express");
const server = express();
const PORT = process.env.PORT || "3000";
const axios = require("axios").default;
const xml = require("xml2js");
const { Region } = require("./models/region.model");
const { Ville } = require("./models/ville.model");

server.get("/getData", (req, res) => {

    console.log("IP", req.ip);
    console.log("url", req.url);
    console.log("originalUrl", req.originalUrl);

    const user_agent = req.headers["user-agent"];

    console.log("user_agent", user_agent)
    const isBot = /Googlebot|Bingbot|Slurp|AppleWebKt/.test(user_agent);
    console.log({ isBot })


    axios.get("http://www.tunisie-annonce.com/ajax/_region.asp?parent=TN")
        .then((body) => {
            let data = body.data;
            xml.parseString(data, (err, jsonData) => {
                array = jsonData.complete.option;
                array = array.map((el) => {
                    return Region.fromJson(el);
                })
                // res.json(array);

                let ariana = array[0];
                //http://www.tunisie-annonce.com/ajax/_ville.asp?parent=102
                axios.get(`http://www.tunisie-annonce.com/ajax/_ville.asp?parent=${ariana.id}`)
                    .then((villeDataXML) => {
                        const arianaData = villeDataXML.data;
                        xml.parseString(arianaData, (err, arianaJSONData) => {
                            let dataArray = arianaJSONData.complete.option;
                            dataArray = dataArray.map((el) => {
                                return Ville.fromJson(el);
                            });
                            array[0].cites = dataArray;
                            res.json(array)
                        })
                    })
            })

        })
        .catch((exception) => {
            console.log("exception", exception)
            res.json({ exception })
        })
})


server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Running On PORT ${PORT}`);
})