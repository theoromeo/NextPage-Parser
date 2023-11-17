import Definitions from "./util/Definitions.js"
import Informationals from "./util/Informationals.js"
import { DOMParser , XMLSerializer } from 'xmldom-qsa'
import BasicView from "./views/BasicView.js"
import ArticleView from "./views/ArticleView.js"
import ImageView from "./views/ImageView.js"
import ImageGridView from "./views/ImageGridView.js"
import QueryOperators from "./util/QueryOperators.js"
import BaseOperations from "./BaseOperations.js"
import VideoView from "./views/VideoView.js"
export default class NextPage
{
    ViewTypes = {}

    /**
     * Create a new instance of NextPage
     * 
     * @constructor
     */
    constructor()
    {
        this.ViewTypes[VideoView.name] = VideoView
        this.ViewTypes[BasicView.name] = BasicView
        this.ViewTypes[ArticleView.name] = ArticleView
        this.ViewTypes[ImageView.name] = ImageView
        this.ViewTypes[ImageGridView.name] = ImageGridView
    }

   /**
    * Retrieves a nodes information from a webpage or a webpages base properties if a node key is not defined
    * 
    * @param {URL} url - The URL of the webpage that should be parsed
    * @param {String} key - The name of the node that should be retrieved from the webpage
    * @returns {(JSON|Number)} - Returns an object containing the retrieved data of the node or a negative number if error
    * - -1 = Webpage not found
    * - -2 = Webpage DOM conversion error 
    * - -3 = Node not found
    * - -4 = Retrieving node info error
    * - -5 = Page does not contain any base properties
    * 
    * @async
    * @example
    * const NP = new NextPage()
    * cont response = await get("https://example.com" , "main") 
    * if(typeof response == "number")
    * {
    *   console.error(....)
    * }
    * else 
    * {
    *   console.log(response.title)
    * }
    */
    async get(url,key = null)
    {
        const webpageResponse = await this.getWebpage(url)

        if(typeof webpageResponse == "number")
        return -1

        const DOM = this.toDOM(webpageResponse)

        if(typeof DOM == "number")
        return -2

        if(key)
        {
            const node = this.getNode(DOM,key)

            if(typeof node == "number")
            return -3

            const viewInformation = this.getViewInformation(node)
            
            if(typeof viewInformation == "number")
            return -4

            const viewData = this.getQueryData(viewInformation,node,DOM)

            return viewData
        
        }

        const headers = BaseOperations.getAll(DOM)
        
        if(!headers)
        return -5

        return headers


    }

   /**
    * Retrieves the string representation of the URLs webpage
    * 
    * @param {URL} url - The url of the webpage to be retrieved
    * @returns {(String|Number)} - Returns the string of the retrieved webpage or negative number if error
    * - -1 = Fetch error
    * - -2 = Request error
    * 
    * @async
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
     * Converts a string HTML webpage or node into a Node
     * 
     * @param {String} html - HTML string  of the webpage/element to parse
     * @returns {(Node|Number)} - Return a Node of the parsed string or negative number if error
     * - -1 = Parsing error
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
     * Retrieves the node from the webpage.
     * 
     * @param {Node} DOM - DOM webpage to retrieve information from
     * @param {String} key - Name of Node to retrieve
     * @returns {(Node|Number)} - Returns the Node object or negative number if error
     * - -1 No node found
     */
    getNode(DOM,key)
    {
        let node = DOM.querySelectorAll(`[np-for="${key}"]`)
        if(node.length < 1 )
        return -1

        if(node.length > 1)
        console.warn(`More then 1 node found with np-for="${key}" using first instance.`)

        return this.removeChildNodes(node[0])

    }

    /**
     * Removes child nodes defined with the np-for attribute from the passed node.
     * 
     * @param {Node} node - Node to remove child nodes from
     * @returns {Node} - Returns a node with removed child nodes.
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
     * Retrieves the view type and view query defined by the node
     * 
     * @param {Node} node - Node to retrieves data from
     * @returns {(JSON|Number)} - Returns a JSON object or negitive number if error
     * - -1 = Passed argument not node type
     * - -2 = Node does not define a view
     * - -3 = Node defined an invalid view type or not defined
     */
    getViewInformation(node)
    {
        if(!node.nodeType)
        return -1

        let viewProperty = node.getAttribute(Definitions.view)

        if(!viewProperty)
        return -2

        let type = this.getViewType(viewProperty)

        if(!type)
        return -3

        let query = this.getViewQuery(viewProperty,node)

        return {
            type:type,
            query: query
        }
    }


    /**
     * Parses the value of the np-view property and retrieves the view type
     * 
     * @param {String} propertyValue - Value defined in the np-view property 
     * @returns {(String|Boolean)} - Returns only the view type defined or false if invalid view type
     */
    getViewType(propertyValue)
    {
        let type = propertyValue.trim()


        if(propertyValue.includes(QueryOperators.global))
        type = propertyValue.split(QueryOperators.global)[0].trim()

        else if(propertyValue.includes(QueryOperators.local))
        type = propertyValue.split(QueryOperators.local)[0].trim()


        if(this.ViewTypes[type])
            return type.trim()

        return false
    } 


    /**
     * Parses the value of the np-view property and retrieves the view query
     * 
     * @param {String} propertyValue - Value defined in the np-view property 
     * @param {Node} node - Node that defines the np-view property
     * @returns {String} - Returns a string indicating the type of query to execute
     * - "Tagged" - Informational properties defined in node
     * - "Default" - Use default query defined by its view
     * - Custom query string 
     */
    getViewQuery(propertyValue,node)
    {   
        let query = ''

        // Custom global query 
        if(propertyValue.includes(QueryOperators.global))
        return QueryOperators.global+propertyValue.replace(QueryOperators.global,"|").split("|")[1].trim()

        // Custom local query
        if(propertyValue.includes(QueryOperators.local))
        return propertyValue.replace(QueryOperators.local,"|").split("|")[1].trim()

        // By tag
        query = this.isViewQueryTagged(propertyValue.trim(),node)
        if(query)
        return "tagged"


        // Get default query 
        return "default"
    }

    /**
     * Returns true if the node passed defines informational properties
     * 
     * @param {String} type - Name of view type
     * @param {*} node - Node to validate against
     * @returns {Boolean}
     */
    isViewQueryTagged(type,node)
    {
        let result = this.ViewTypes[type].tagged(node)
        if(!result)
            return false

        return true
    }


    /**
     * Retrieves the final data and appends missing base properties
     *  
     * @param {JSON} info - JSON returned by getViewInformation()
     * @param {Node} node - Node to search against
     * @param {Node} DOM - DOM webpage to search against
     * @returns {(JSON|Number)} - Returns JSON object containing parsed query data or negative number if error
     * - -1 = DOM passed not valid
     * - -2 = Node passed not valid
     * - -3 = DOM passed does not declare any NP properties
     */
    getQueryData(info,node,DOM)
    {
        let result

        if(!DOM.nodeType)
        return -1

        if(!node.nodeType)
        return -2

        const query = info.query

        if(!query)
        result = BaseOperations.getAll(DOM)

        if(typeof result == "number")
        return -3
        
        if(query == "tagged")
        result = this.ViewTypes[info.type].tagged(node)

        else if(query == "default")
        result = this.ViewTypes[info.type].default(node)
        
        else 
        result = this.executeQuery(query,node,DOM)

        if(result)
        result = this.ViewTypes[info.type].filter(result)

        // Get Basic properties from result query
        const base = this.getNodeBaseProperties(node)

        result = {result,...base,view:info.type}


        result = BaseOperations.appendMissing(result,DOM)

        return result
    }


    /**
     * Runs the query string against the Node or DOM depending on query
     * 
     * @param {String} query - Query String, "Tagged" or "Default"
     * @param {Node} node - Node to query against
     * @param {DOM} DOM - DOM to query against if global query
     * @returns {(Array|Boolean)} - Returns a list of elements or false if error
     */
    executeQuery(query,node,DOM)
    {   
        let targetNode = node;
        let activeQuery = query

        if(!query)
        return false

        if(query.startsWith(QueryOperators.global))
        {
            targetNode = DOM
            activeQuery = query.slice(2)
        }
        
        let result


        if(activeQuery.trim() != "")
        result = targetNode.querySelectorAll(activeQuery)
        

        if(!result)
        return false

        return result

    }

    /**
     * Retrieves all the base properties defined in the head of the webpage
     * 
     * @param {Node} DOM - DOM webpage to retrieve from
     * @returns {(JSON|Number)} - Returns an object or negative number if error
     * - -1 = Head property not found
     */
    getHeadBaseProperties(DOM)
    {
        let head = DOM.querySelector('head')

        if(!head)
        return -1

        return {
            title:BaseOperations.getTitle(head),
            description:BaseOperations.getDescription(head),
            icon:BaseOperations.getIcon(head),
            action:BaseOperations.getAction(head),
        }

    }

    /**
     * Retrieves all the base properties defined in the node.
     * 
     * @param {Node} node - Node to retrieve values from
     * @returns {JSON} - Returns JSON result
     */
    getNodeBaseProperties(node)
    {
        return {
            title:BaseOperations.getTitle(node),
            description:BaseOperations.getDescription(node),
            icon:BaseOperations.getIcon(node),
            action:BaseOperations.getAction(node),
        }
    }

    

}