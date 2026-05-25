import fs from "fs/promises";

const FILE_PATH = "./content.txt";

export const addText = async (text) => {
    await fs.appendFile(FILE_PATH, text + '\n');
}

export async function getContent(){
    try {
        const content = await fs.readFile(FILE_PATH, "utf-8");
        return content;
    }catch(error){
        if(error.code === "ENOENT"){
            console.log("File in path ", FILE_PATH, " does not exist");
            return "";
        }
        throw error;
    }
}

export const getLines = async () => {
    const content = await getContent();
    return content.split('\n').filter(line => line.trim() !== '');
};

export const updateLine = async (lineNumber, newText) => {
    const content = await getContent();
    let lines = content.split('\n');

    if (lineNumber > 0 && lineNumber <= lines.length) {
        lines[lineNumber - 1] = newText;
    }

    const newContent = lines.join('\n');
    await fs.writeFile(FILE_PATH, newContent);
};

export const deleteLine = async (lineNumber) => {
    const lines = await getLines();
    if (lineNumber > 0 && lineNumber <= lines.length) {
        lines.splice(lineNumber - 1, 1);
    }
    await fs.writeFile(FILE_PATH, lines.join('\n') + '\n');
};