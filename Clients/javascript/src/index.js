import Definitions from "./util/Definitions.js"
export default class NextPage
{

    /**
     * Get node from webpage.
     * 
     * @param {URL} url - URL of webpage to retrieve.
     * @param {String} key - Node to look for on webpage
     * @returns 
     */
    async get(url,key)
    {
        let webpageResponse = await this.getWebpage(url)

        if(webpageResponse instanceof Number)
        return -1

        const webpageDOM = this.toDOM(webpageResponse)

        if(webpageDOM instanceof Number)
        return -2

        const node = this.getNode(webpageDOM,key)


    }


    /**
     * Convert HTML string to DOM object
     * 
     * @param {String} HTML - String of html
     * @returns {(Object|Number)}
     * - Document Object
     * - -1 if parsing error
     */
    toDOM(HTML)
    {
        const page = new DOMParser().parseFromString(html,'text/xml')

        if(!page)
        return -1

        return page
    }


    /**
     * Gets defined node from DOM.
     * 
     * @param {Document} dom - Document of parsed webpage.
     * @param {String} key - Node lookup string for 'np-for' property.
     * @returns {(Node|Number)}
     * - Node if node found
     * - -1 if node not found
     */
    getNode(dom,key)
    {
        let node = dom.querySelectorAll(`[np-for="${key}"]`)

        if(node.length == 0)
        return -1

        if(node.length > 1)
        console.warn(`More then 1 node found with np-for="${key}" using first instance.`)

        return this.removeChildNodes(node[0])

    }

    /**
     * @param {Node} node 
     * @return {Node} - cleared root node
     */
    removeChildNodes(node)
    {
        let children = node.querySelectorAll(`[${Definitions.for}]`)

        children.forEach(subNode => {
            node.removeChild(subNode)
        });

        return node
    }
    
   /**
     * Gets Webpage for parsing.
     * 
     * @param {URL} url - URL of webpage to retrieve.
     * @returns {(String|Number)} 
     * - HTML if webpage retrieved successfully, 
     * - -1 if fetch error, 
     * - -2 if connection error.
     */
    async getWebpage(url)
    {
        let webpageResponse = null;
        
        try 
        {
            const request = await fetch(url)

            if(!request.ok)
            {
                return -2;
            }

            webpageResponse = await request.text()
        } 
        catch (error) 
        {
            return -1
        }

        return webpageResponse;
    }
}