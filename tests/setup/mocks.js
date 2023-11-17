import {jest} from "@jest/globals"
import { isUtf8 } from "buffer";
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';

let __filename = fileURLToPath(import.meta.url)
let __dirname = path.dirname(__filename);

global.fetch = jest.fn((url) => 
{
    return new Promise((resolve,reject) => 
    {
        let response = {}
        let filePath = __dirname+"/webpages/"+url

        if(fs.existsSync(filePath))
        {
            response.ok = true
            response.text = () => 
            {
                return fs.readFileSync(filePath,{encoding:'utf8'})
            }
            resolve(response)
        }
        else 
        {
            response.ok = false;
            resolve(response)
        }


        
    })
})