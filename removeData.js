import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";


export default async function removeData(info) {
    dbFileCheck();

    try {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "recordID",
                message: "Enter record id",
            }
        ]);

        let remnantData = [];
        info.forEach((element) => {
            if (element.id !== answers.recordID) {
                remnantData.push(element);
            }
        });

        fs.writeFile("db.json", JSON.stringify(remnantData), function (err) {
            if (err) {
                console.log(err);
            }
            console.log("Deleted!");
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

queryDB(removeData);