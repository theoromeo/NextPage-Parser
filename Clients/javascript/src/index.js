import Definitions from "./util/Definitions.js"
import Informational from "./util/Informational.js"
import { DOMParser , XMLSerializer } from 'xmldom-qsa'
import BasicView from "./views/BasicView.js"
import ArticleView from "./views/ArticleView.js"
import ImageView from "./views/ImageView.js"
import ImageGridView from "./views/ImageGridView.js"
export default class NextPage
{
    ViewTypes = {}

    constructor()
    {
        this.ViewTypes[BasicView.name] = BasicView
        this.ViewTypes[ArticleView.name] = ArticleView
        this.ViewTypes[ImageView.name] = ImageView
        this.ViewTypes[ImageGridView.name] = ImageGridView
    }

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

        const viewData = this.getQueryData(viewInformation,node,webpageDOM)

        
        


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
        const page = new DOMParser
        ({  locator: {},
            errorHandler: { warning: function (w) { }, 
            error: function (e) { }, 
            fatalError: function (e) { console.error(e) } }
        }).parseFromString(html,"text/xml");

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
     * Remove nested defined nodes
     * 
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
     * Retrieves the query string and view type defined by the node.
     * 
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
     * @param {String} definedValue - string from defined np-view property 
     * @returns {(String|Boolean)}
     * - string if valid view type
     * - false if invalid
     */
    getViewType(definedValue)
    {
        let type = definedValue.trim()


        if(definedValue.includes("<<"))
        type = definedValue.split('<<')[0].trim()

        else if(definedValue.includes(">"))
        type = definedValue.split('>')[0].trim()


        if(this.ViewTypes[type])
            return type.trim()

        return false
    } 


    /**
     * @param {String} definedValue - string from defined np-view property 
     * @param {Node} node - Root Node
     * @returns {(String)}
     * - String Query string
     * - 'tagged' if node uses tags
     */
    getViewQuery(definedValue,node)
    {   
        let query = ''

        // Custom global query 
        if(definedValue.includes('<<'))
        return "<< "+definedValue.replace('<<',"|").split("|")[1].trim()

        // Custom local query
        if(definedValue.includes('>'))
        return definedValue.replace('>',"|").split("|")[1].trim()

        // By tag
        query = this.isViewQueryTagged(definedValue.trim(),node)
        if(query)
        return "tagged"

        // Get default query 
        return this.ViewTypes[definedValue.trim()].default
    }

    /**
     * Returns true if node defines properties by tag
     * 
     * @param {String} type - View type
     * @param {Node} node - Node
     * @returns {Boolean}
     */
    isViewQueryTagged(type,node)
    {
        let result = this.ViewTypes[type].tagged(node)

        if(!result)
            return false

        return result
    }


    /**
     * @param {Object} info - object containing query and view type
     * @param {Node} node - root node 
     * @param {Node} webpageDOM - Whole webpage node for custom view queries
     * @returns {Object}
     */
    getQueryData(info,node,webpageDOM)
    {
        let element
        const query = info.query
        if(!query)
        element = this.getHeaderProperties(webpageDOM)

        if(element instanceof Number)
        return -1

        else if(query == "tagged")
        element = this.ViewTypes[info.type].tagged(node)

        else 
        element = this.executeQuery(info.type,query,node,webpageDOM)


        element = this.addFallbackProperties(element,webpageDOM)

        return element
    }

    /**
     * 
     * @param {Document} dom - webpage dom
     * @returns {(object|Number)} 
     * - Object containing the title, description and icon
     * - -1 if no head found in dom
     * - -2 if title or description was empty
     */
    getHeaderProperties(dom)
    {
        const head = this.toDOM(dom).querySelector("head")
        if(!head)
        return -1

        const icon = this.getFallbackIcon(head)
        const title = this.getFallbackTitle(head)
        const description = this.getFallbackDescription(head)
        return {icon:icon,title:title,description:description}
    }

    executeQuery(type,query,node,dom)
    {
        let targetNode = node;
        let activeQuery = query
        let filteredResults

        if(query.startsWith("<<"))
        {
            targetNode = this.toDOM(dom)
            activeQuery = query.slice(2)
        }
        
        const queryResult = targetNode.querySelectorAll(activeQuery)
        

        if(!queryResult)
        filteredResults = false

        else 
        filteredResults = this.ViewTypes[type].filter(queryResult)
    
        return {type:type,result:filteredResults}

    }

    /**
     * 
     * @param {object} element - View results
     * @param {string} dom - Webpage string
     * @returns {(Object|Number)}
     * - Properties with fallbacks
     * - -1 if dom passed did not contain head tag
     */
    addFallbackProperties(element, dom)
    {
        const head = this.toDOM(dom).querySelector("head")
        if(!head)
        return -2

        let result =element

        if(!result.title)
        {
            result.title = this.getFallbackTitle(head)
        }

        if(!result.description)
        {
            result.description = this.getFallbackDescription(head)
        }

        if(!result.icon)
        {
            result.icon = this.getFallbackIcon(head)
        }

        return result
    }
    /**
     * @param {Node} head 
     * @returns {String} Fallback value
     */
    getFallbackTitle(head)
    {
        let title = head.querySelector(`meta[name="${Informational.title}"]`).getAttribute('content')
        
        if(!title)
        title = head.getElementsByTagName("title").textContent
        
        if(!title)
        return false

        return title


    }

    /**
     * @param {Node} head 
     * @returns {String} Fallback value
     */
    getFallbackDescription(head)
    {
        let description = head.querySelector(`meta[name="${Informational.description}"]`).getAttribute('content')
        
        if(!description)
        return false

        return description
    }
    
    /**
     * @param {Node} head 
     * @returns {String} Fallback value
     */   
    getFallbackIcon(head)
    {        
        let icon = head.querySelector(`meta[name="${Informational.icon}"]`).getAttribute('content')
        
        if(!icon)
        icon = head.querySelector(`link[rel="icon"]`).getAttribute('href')
        
        if(!icon)
        return false

        return icon
    }
    
    
   
}