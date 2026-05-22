import {addText , getContent} from "./fileService.js";
import http from "http"

const PORT = 3000;

const server = http.createServer((req, res) => {
    let url = req.url;
    let method = req.method;
    let urlParameters = url.split("/");
    console.log(urlParameters);

    if(method == 'GET' && url == '/words'){
        let content;
        getContent().then(response => content = response);
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.parse({
            "content" : content
        }))
    }
    res.statusCode = 404;
    res.end(JSON.parse({
        message: "No handler for this route"
    }))
});

server.listen(PORT, () => {
    console.log("Servidor disponibel en http://localhost:" + PORT + "/");
});