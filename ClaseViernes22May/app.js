import {addText , getContent} from "./fileService.js";

async function main(){
    await addText("Ernesto");
    const fileContent = await getContent();
    console.log(fileContent);
}

main();