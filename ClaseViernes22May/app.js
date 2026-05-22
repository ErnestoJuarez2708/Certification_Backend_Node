import {addText , getContent} from "./fileService.js";
import http from "http"

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(req);
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    res.end(`
        <h1>Hola soy Ernesto desde el servidor</h1>
        <p> Este HTML fue enviado desde local con Node.js</p>
    `)
});

server.listen(PORT, () => {
    console.log("Servidor disponibel en http://localhost:" + PORT + "/");
});