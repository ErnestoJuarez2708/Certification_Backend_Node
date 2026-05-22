import {addText , getContent} from "./fileService.js";
import http from "http"

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let urlParameters = req.url.split("/");

    console.log(urlParameters);
    if(req.method == 'GET' && req.url == '/words'){
        const content = await getContent();
        res.statusCode = 200;
        res.end(JSON.stringify({
            content
        }));
        return;
    }
    if(req.method == 'POST' && urlParameters[1]=="addword" && urlParameters[2]){
        await addText(urlParameters[2]);
        res.statusCode = 200;
        let message = "The word " + urlParameters[2] + " was added to the file";
        res.end(JSON.stringify({
            message
        }));
        return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({
        "error" : "Not method to handle the url"
    }));
});

server.listen(PORT, () => {
    console.log("Servidor disponibel en http://localhost:" + PORT + "/");
});