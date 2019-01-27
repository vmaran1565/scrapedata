const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post("/checkAmount", (req, response) => {
    let property_url = req.body.property_url;
    fetch(property_url)
        .then(res => res.text())
        .then(body => {
            let regex = /\"unitApiUrl\"\:(.*)\"\,\s*\"averagePrice/;
            let unitVal = body.match(regex)[1];
            let start_date = req.body.check_in_date;
            let end_date = req.body.check_out_date;
            let total = req.body.no_of_guest;
            console.log(`{"query":"\\n    query priceDetails($createTravelerCheckoutRequest: CreateTravelerCheckoutRequest) {\\n        priceDetails(createTravelerCheckoutRequest: $createTravelerCheckoutRequest) {\\n            notes {\\n                description\\n            }\\n            totals {\\n                title\\n                amount\\n                tooltip\\n            }\\n            checkoutUrl\\n            instantBooking\\n            dueNow {\\n                title\\n                amount\\n                tooltips {\\n                    title\\n                    amount\\n                    tooltip\\n                }\\n            }\\n            payments {\\n                title\\n                amount\\n                paidText\\n                infoText\\n                status\\n                viewUrl\\n            }\\n            averageNightlies {\\n                perNightCost {\\n                    currency\\n                    amount\\n                    localized\\n                }\\n                type\\n            }\\n            edapEventJson\\n            edapQuoteSuccess\\n            lineItems {\\n                title\\n                amount\\n                type\\n                tooltip\\n                subItems {\\n                    title\\n                    amount\\n                    type\\n                    tooltip\\n                }\\n            }\\n        }\\n    }\\n","variables":{"createTravelerCheckoutRequest":{"unit":` + unitVal + `","arrivalDate":"` + start_date + `","departureDate":"` + end_date + `","children":0,"adults":"` + total + `","pets":false,"listingRef":"321.1031966.1579914","currency":"USD"}},"operation":"graphql_get_pricing_quote"}`);
            fetch("https://www.vrbo.com/pdp/graphql", {
                    headers: {
                        accept: "*/*",
                        //"accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/json",
                        "x-csrf-jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU5N2QyZGJmYjg2MmFlZjM2Y2IzMTMxMGNkZDZlMTlkZTE0MTYwOWViYTEzYWQ1MWYzMjU2NTU5MzVlYWE4ZjRjMTZhYmM2YjY1YmVlOWQ3NzM2MDE2Njg0YTc3OGE2OTg1Nzg4M2IzYWI0YTUzZmU0N2IyNWU1YjczN2E5MzRkZmRjMzVjY2EwNWIwZmRhZGI4YWJjOTYxOTNmNjI4NjU0MDc4MDY4M2YzNDA3YmY2Y2ZiNTVkMWYxNDM5YjJmYjQ0NmRkMzRmYWQ0NTBkYjE5MDM3MDdhMDk2MTMwNGFiZmRkYjBiYzVhNjJmM2I5ZTkxMDEyNDgzYzJlOWFlNjhjMDIzOTcyNTJhZmM3MWE5OWRjNzNiZDEzNWRlMzI2YiIsImlhdCI6MTU0ODU3MjM1MCwiZXhwIjoxNTQ5MTc3MTUwfQ.zWXPIHKSzddaeXphvSfoI9gvVDbuLylhzGBuKhd1vZ8",
                        "x-homeaway-displaylocale": "en_US",
                        cookie: 'x-ha-exp-region=us-east-1; ha-gx-prefs=en_US|USD; ha-device-id=66b0b28f-3f31-464f-aad2-dbd17f6cd9f3; hav=66b0b28f-3f31-464f-aad2-dbd17f6cd9f3; eu-site=0; visid_incap_1042281=qS8nnNpwQFauA2JXZhBoR1LQSVwAAAAAQUIPAAAAAADuUbs8nEj45p1fUWExE1Oh; ab=baf1f303; hp=3e8705a8-d1f2-416f-b473-759eaa9d132d; ha-cookie-settings=functional%3A1; _ga=GA1.2.213471788.1548341337; _gcl_au=1.1.2092034007.1548341340; cto_lwid=cf6c9902-9397-461c-9686-8eb3894e3cae; _cc=AZ%2FeDlOETPQBX9jKPGo609xq; IAID=22bad894-0e4a-4725-94c2-64ab931d47c6; hal=ga=1&ua=1&si=1&ui=1&vi=1&pr=0; 404d8bef-0f39-40cd-887e-3f5c589515baINL=1; 404d8bef-0f39-40cd-887e-3f5c589515baUAL=1; 404d8bef-0f39-40cd-887e-3f5c589515baSL=1; site=vrbo; b0a1a9ef-b237-4bd3-a468-ae4ffc53a226INL=1; b0a1a9ef-b237-4bd3-a468-ae4ffc53a226UAL=1; b0a1a9ef-b237-4bd3-a468-ae4ffc53a226SL=1; has=b0a1a9ef-b237-4bd3-a468-ae4ffc53a226; nlbi_1042281=Jau7XAlQpwoz/OS8v0PQ0AAAAABBNgnh2ris+XHNaNSYAGci; incap_ses_626_1042281=/snUDugacS3Gaqk3oQCwCNIiTVwAAAAARHbpuwUldVyaHm+j6GeH2A==; x-ha-exp-unified=__PROPERTY__:us-east-1; b0a1a9ef-b237-4bd3-a468-ae4ffc53a226--iak9sdAVL=1; prforceGroups="epHomepageE0"; crumb=I_kaUwD3g9dKlqbP04vZ9lQv-AX67Z4hKsQ6OfgZ5pU; _gid=GA1.2.63282613.1548559118; ensighten:source={"source":null,"medium":null,"lastAffiliate":null,"sessionid":"b0a1a9ef-b237-4bd3-a468-ae4ffc53a226"}; ha-state-prst=%7B%22lbsKeywords%22%3A%22Miramar%20Beach%20Villas%2C%20Destin%2C%20FL%2C%20USA%22%2C%22lastSearchUrl%22%3A%22%2Fresults%3FadultsCount%3D3%26petIncluded%3Dfalse%26q%3DMiramar%20Beach%20Villas%2C%20Destin%2C%20FL%2C%20USA%26from-date%3D2019-03-01%26to-date%3D2019-03-15%22%7D; incap_ses_1045_1042281=Wd+rL+6lTxvk/ba7LJqADuM0TVwAAAAAKH8seY8aBwKiL40Glyu4DA==; incap_ses_574_1042281=w56XEQfV02GdnyRP+kL3B2o9TVwAAAAAR7F8ctotFdpPV11WpgHtLw==; ha-trip-prst=%7B%22arrival%22%3A%222019-03-22%22%2C%22departure%22%3A%222019-03-29%22%2C%22numberOfAdults%22%3A4%2C%22numberOfChildren%22%3A0%2C%22petIncluded%22%3Afalse%7D; incap_ses_795_1042281=QGYvOrksXhWQiO9y6mgIC01OTVwAAAAA/sVT0nEbxi4AXzZNCaE/8A==; __utmuaepi=property_321.1031966.1579914:property; ta_timeout=1; _fbp=fb.1.1548571665409.160555445; _tq_id.TV-72725436-1.1968=d272f117d9f394df.1548341341.0.1548571665..'
                    },
                    body: `{"query":"\\n    query priceDetails($createTravelerCheckoutRequest: CreateTravelerCheckoutRequest) {\\n        priceDetails(createTravelerCheckoutRequest: $createTravelerCheckoutRequest) {\\n            notes {\\n                description\\n            }\\n            totals {\\n                title\\n                amount\\n                tooltip\\n            }\\n            checkoutUrl\\n            instantBooking\\n            dueNow {\\n                title\\n                amount\\n                tooltips {\\n                    title\\n                    amount\\n                    tooltip\\n                }\\n            }\\n            payments {\\n                title\\n                amount\\n                paidText\\n                infoText\\n                status\\n                viewUrl\\n            }\\n            averageNightlies {\\n                perNightCost {\\n                    currency\\n                    amount\\n                    localized\\n                }\\n                type\\n            }\\n            edapEventJson\\n            edapQuoteSuccess\\n            lineItems {\\n                title\\n                amount\\n                type\\n                tooltip\\n                subItems {\\n                    title\\n                    amount\\n                    type\\n                    tooltip\\n                }\\n            }\\n        }\\n    }\\n","variables":{"createTravelerCheckoutRequest":{"unit":` + unitVal + `","arrivalDate":"` + start_date + `","departureDate":"` + end_date + `","children":0,"adults":"` + total + `","pets":false,"listingRef":"321.1031966.1579914","currency":"USD"}},"operation":"graphql_get_pricing_quote"}`,
                    method: "POST"
                })
                .then(res => res.json())
                .then(json => {
                    let myData = json.data;
                    console.log(myData);
                    if (myData.priceDetails) {
                        let totalsAmount = (myData.priceDetails.totals) ? myData.priceDetails.totals : '';
                        let lineItems = (myData.priceDetails.lineItems) ? myData.priceDetails.lineItems : [];
                        let averageNightlies = (myData.priceDetails.averageNightlies) ? myData.priceDetails.averageNightlies : [];
                        sendJsonResult(response, {
                            "totalsAmount": totalsAmount,
                            "lineItems": lineItems,
                            "averageNightlies": averageNightlies
                        });
                    } else if (json.errors) {
                        let message = (json.errors[0].message) ? json.errors[0].message : "Invalid inputs";
                        sendJsonResult(response, {
                            "errors": message
                        });
                    }
                });
        }).catch((err) => {
            sendJsonResult(response, {
                "errors": "Invalid Request"
            });
        });
})

function sendJsonResult(res, obj) {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(obj));
}
app.use(express.static(__dirname + "/public"));
app.listen(process.env.PORT || 3000, function () {
    console.log("Listening!");
});