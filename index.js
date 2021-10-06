const express = require("express");
const app = express();
const PORT  = 3000;
const fs = require("fs");
const path = require("path");
const xml = require("xml2js");
const { Region } = require("./models/region.model");
const { Ville } = require("./models/ville.model");

app.get("/getData", (req,res)=>{
    fs.readFile(path.join(__dirname ,"./resources/regions.xml"), (err,buffer)=>{
        if(!err){
            let arrayRegions = [];
            xml.parseString(buffer,(err,result)=>{
                arrayRegions = result.complete.option;
                arrayRegions =  arrayRegions.map((el)=>{
                    return Region.fromJson(el);
                });
            });
            res.json(arrayRegions);
        }
    })
});
app.get("/getData/:ville", (req,res)=>{
    const { ville } = req.params;
    fs.readFile(path.join(__dirname ,"./resources/regions.xml"), (err,buffer)=>{
        if(!err){
            let arrayRegions = [];
            xml.parseString(buffer,(err,result)=>{
                arrayRegions = result.complete.option;
                arrayRegions =  arrayRegions.map((el)=>{
                    return Region.fromJson(el);
                });
            });

            const regionsExist = arrayRegions.find((el)=> { return el.id == ville });
            if(regionsExist){
                fs.readFile(path.join(__dirname ,`./resources/villes/${ville}.xml`), (err,buffer)=>{
                    if(!err){
                        let arrayVille = [];
                        xml.parseString(buffer,(err,result)=>{
                            arrayVille = result.complete.option;
                            arrayVille =  arrayVille.map((el)=>{
                                return Ville.fromJson(el);
                            });
                        });

                        regionsExist.villes = []
                        regionsExist.villes = arrayVille
                        // arrayVille.gouvernerat = regionsExist.gouvernerat;
                        res.json(regionsExist);
                    }
                })
            }
        }
    })
});


app.listen(PORT,"0.0.0.0", ()=>{
    console.log(`Upo running on port ${PORT}`);
});