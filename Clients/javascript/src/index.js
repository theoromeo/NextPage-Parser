import Definitions from "./util/Definitions.js"
import Informational from "./util/Informational.js"
import { DOMParser , XMLSerializer } from 'xmldom-qsa'
import ViewTypes from "./util/ViewTypes.js"
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

        if(node instanceof Number)
        return -3


        const viewInformation = this.getViewInformation(node)

        if(viewInformation instanceof Number)
        return -4

        

        
        


    }

    /**
     * @param {Node} node - Root node
     * @returns {(object|Number)}
     * - object {type,query}
     * - -1 No view defined on node
     * - -2 Type not valid
     */
    getViewInformation(node)
    {
        let viewProperty = node.getAttribute(Definitions.view)

        if(!viewProperty)
        return -1

        let type = this.getViewType(viewProperty)

        if(!type)
        return -2

        let query = this.getViewQuery(viewProperty,node)

        return {
            type:type,
            query: query
        }
    }


    /**
     * Returns the type of query to execute
     * 
     * @param {String} viewProperty - View property value
     * @param {Node} node - Node
     * @returns {(String)}
     * - String Query string
     * - 'tag' if node uses tags
     */
    getViewQuery(viewProperty,node)
    {   
        let query = ''

        // Custom query
        if(viewProperty.includes('>'))
            return viewProperty.replace('>',":")[1].trim()

        query = this.isViewQueryTagged(viewProperty.trim(),node)

        if(query)
            return "tag"

        // Get default query 
        return ViewTypes[viewProperty.trim()].default
        

    }

    /**
     * Returns true if node defines properties by tag
     * 
     * @param {String} type - View type
     * @param {Node} node - Node
     * 
     * @returns {Boolean}
     */
    isViewQueryTagged(type,node)
    {
        let result = ViewTypes[type].tagged(node)

        if(!result)
            return false

        return result
    }

    /**
     * @param {String} value - string to test
     * @returns {(String|Boolean)}
     * - string if valid type
     * - false if invalid
     */
    getViewType(value)
    {
        let type = value.trim()

        if(value.includes(">"))
            type = value.split('>')[0].trim()

        if(ViewTypes[type])
            return type.trim()

        return false
    }   



    /**
     * Convert HTML string to DOM object
     * 
     * @param {String} html - String of html
     * @returns {(Object|Number)}
     * - Document Object
     * - -1 if parsing error
     */
    toDOM(html)
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