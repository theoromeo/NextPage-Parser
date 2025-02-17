import {jest} from '@jest/globals'
import {JSDOM} from "jsdom"
import fs from "node:fs"

const polyfills = () => 
{
    global.document = 
    {
        createElement: (html) => 
        {
            let window = new JSDOM(`<!DOCTYPE html><html><body></body></html>`).window
            let document = window.document

            Object.defineProperty(window.HTMLElement.prototype, 'innerText', {
              get() {
                return this.textContent;
              },
              set(value) {
                this.textContent = value;
              },
              enumerable: true,
            });

            return document.createElement(html)
        }
    },

    global.DOMParser = jest.fn().mockImplementation(() => 
    ({
        parseFromString: jest.fn((html) => 
        {
            return new JSDOM(html).window.document
        })
    }))

    global.doc = (name) => 
    {
      return fs.readFileSync(`./test-docs/${name}.html`,{encoding:"utf8", flag:"r"});
    }
}
export default polyfills;