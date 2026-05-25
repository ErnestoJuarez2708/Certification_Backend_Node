import {addText , getContent, getLines, updateLine, deleteLine} from "./fileService.js";
import http from "http";
import randomItem from "random-item";


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
    //Exercise 2
    if (req.method === 'GET' && urlParameters[1] === 'words' && urlParameters[2]) {
        const lineParam = urlParameters[2];
        const lineNumber = parseInt(lineParam);
        const content = await getContent();
        const lines = content.split('\n').filter(line => line.trim() !== '');

        if (isNaN(lineNumber) || lineNumber <= 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: "The 'line' parameter must be a positive integer greater than 0 and must be a number"
            }));
            return;
        }

        if (lineNumber > lines.length) {
            res.statusCode = 404;
            res.end(JSON.stringify({
                error: `Line ${lineNumber} does not exist. The file only has ${lines.length} lines.`
            }));
            return;
        }

        const requestedLine = lines[lineNumber - 1];

        res.statusCode = 200;
        res.end(JSON.stringify({
            line: lineNumber,
            content: requestedLine
        }));
        return;
    }
    //Exercise 4
    if (req.method === 'PATCH' && urlParameters[1] === 'words' && urlParameters[2]) {
        const lineParam = urlParameters[2];
        const lineNumber = parseInt(lineParam);
        const content = await getContent();
        const lines = content.split('\n').filter(line => line.trim() !== '');
        let body = '';
        for await (const chunk of req) {
            body += chunk;
        }

        const data = JSON.parse(body);
        const { word } = data;

        if (isNaN(lineNumber) || lineNumber <= 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: "The 'line' parameter must be a positive integer greater than 0 and must be a number"
            }));
            return;
        }

        if (lineNumber > lines.length) {
            res.statusCode = 404;
            res.end(JSON.stringify({
                error: `Line ${lineNumber} does not exist. The file only has ${lines.length} lines.`
            }));
            return;
        }

        await updateLine(lineNumber, word);

        res.statusCode = 200;
        res.end(JSON.stringify({
            message: `Line ${lineNumber} has been successfully updated`,
            newContent: word
        }));
        return;
    }
    //Exercise 1
    if (req.method === 'POST' && req.url === '/words') {
        let body = "";
        for await (const chunk of req) {
            body += chunk;
        }
        const data = JSON.parse(body);
        const { word } = data;
        await addText(word);
        res.statusCode = 201;
        res.end(JSON.stringify({
            message: "The word: " + word + " was succesfully procced"
        }));
        return;
    }
    //Exercise 3
    if (req.method === 'GET' && req.url === '/random-word') {
            const content = await getContent();
            const lines = content.split('\n').filter(line => line.trim() !== '');
            const randomWord = randomItem(lines);
            res.statusCode = 200;
            res.end(JSON.stringify({
                randomWord: randomWord
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
    //Exercise 5
    if (req.method === 'DELETE' && urlParameters[1] === 'words' && urlParameters[2]) {
        const lineParam = urlParameters[2];
        const lineNumber = parseInt(lineParam);

        if (isNaN(lineNumber) || lineNumber <= 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: "The 'line' parameter must be a positive integer greater than 0 and must be a number"
            }));
            return;
        }
        const content = await getContent();
        const lines = content.split('\n').filter(line => line.trim() !== '');

        if (lineNumber > lines.length) {
            res.statusCode = 404;
            res.end(JSON.stringify({
                error: `Line ${lineNumber} does not exist. The file only has ${lines.length} lines.`
            }));
            return;
        }
        await deleteLine(lineNumber);

        res.statusCode = 200;
        res.end(JSON.stringify({
            message: `Line ${lineNumber} has been successfully deleted`
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