//@ts-check

import FieldTypes from "./FieldTypes.js"
import ViewTypes from "./ViewTypes.js"
import NPError from "./NPError.js"

class NextPage
{


    /**
     * @param {string} html Webpage html string to query on 
     * @param {string} nodeName Node to query
     * @returns {JSON|NPError}
     */
    queryWithHtml(html,nodeName = "")
    {
        try
        {
            if(html && html.trim() == "" )
            throw new NPError(0.1, `Empty string passed to <html> parameter`)

            const DOM = this.toDom(html)

            if(nodeName == null || nodeName.trim() == '')
            return this.getDefaultNode(DOM)

            let rawNodeElement = this.getNodeElement(DOM,nodeName)

            if(!rawNodeElement)
            rawNodeElement = this.getFallbackNodeElement(DOM,nodeName)
            
            if(!rawNodeElement)
            return this.getDefaultNode(DOM)

            const preparedNodeElement = this.preparedNodeElement(rawNodeElement)
            let viewType = this.getViewType(preparedNodeElement)

            if(!viewType)
            viewType = "basic"

            const node = this.getProperties(DOM, preparedNodeElement, viewType)
            return node

        }
        catch(error)
        {
            return error
        }
    }

    /**
     * @param {string} url Webpage to query on
     * @param {string} nodeName Node to query
     * @returns {Promise<JSON | NPError>}
     */
    async queryWithUrl(url, nodeName = "")
    {
        if(!this.isValidURL(url))
        return new NPError(0.2, `URL parameter w/ value <${url}> not valid`)

        let html = await this.getPage(url)

        if(html instanceof NPError)
        return html

        return this.queryWithHtml(html,nodeName)
    }

    /**
     * Return webpage html
     * @param {string} url Webpage to query
     * @returns {Promise<string | NPError>}
     */
    async getPage(url)
    {
        try 
        {
            const response = await fetch(url);
            if (!response.ok) {
                throw new NPError(3.2, `Webpage could not be retrieved, status: ${response.status}`);
            }

            return await response.text();
        } 
        catch (error) 
        {
            return  new NPError(3.1,`Failed to fetch <${url}>`);
        }
    }

    /**
     * 
     * @param {string} url webpage url
     * @returns {boolean}
     */
    isValidURL(url) 
    {
        const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(:\d{1,5})?(\/[^\s]*)?$/i;
        return pattern.test(url);
    }
    /**
     * 
     * @param {Document} DOM 
     * @param {Element} nodeElement 
     * @param {string} view 
     * @returns {Object}
     */
    getProperties(DOM,nodeElement,view)
    {
        const fields = ViewTypes[view]
        let result={}

        for(const field in fields)
        {
            const value = FieldTypes[field](DOM,nodeElement,0)

            if(value instanceof NPError)
            throw value

            if(!value)
            continue

            result[field]=value
        }

        result.view = view
        return result
    }

    /**
     * Return view type defined in element.
     * @param {Element} nodeElement 
     * @returns {string|null}
     */
    getViewType(nodeElement)
    {
        const explicitType = nodeElement.querySelector("[np-type]")?.getAttribute("np-type")

        if(!explicitType || !this.isValidViewType(explicitType))
        return this.getImplicitViewType(nodeElement)

        return explicitType
    }

    /**
     * Returns true if view is defined in ViewTypes
     * @param {string} view 
     * @returns {boolean}
     */
    isValidViewType(view)
    {
        return (ViewTypes[view])? true : false;
    }
    /**
     * Return view type (implicitly) by checking node elements fields 
     * @param {Element} nodeElement 
     * @returns {string|null}
     */
    getImplicitViewType(nodeElement)
    {
        let returnView = null 

        for(let view in ViewTypes)
        {
            let accept = true;

            for(const field in ViewTypes[view])
            {
                if(ViewTypes[view][field] == false)
                continue


                const hasField = nodeElement.querySelectorAll(`[np-${field}]`)
                if(hasField.length == 0)
                {
                    accept = false
                    break
                }

            }

            if(accept)
            returnView = view
        }

        return returnView

    }

    /**
     * Return element without node defined children.
     * @param {Element} nodeElement 
     * @returns {Element}
     */
    preparedNodeElement(nodeElement)
    {
        nodeElement.querySelectorAll(`[np-node]`).forEach(child => 
        {
            child.remove()
        })

        let temp = document.createElement('div')
        temp.innerHTML = nodeElement.outerHTML
        return temp
    }
    /**
     * return next available node defined element.
     * @param {Document} DOM 
     * @param {string} nodeName 
     * @returns {Element|null}
     */
    getFallbackNodeElement(DOM,nodeName)
    {
        let node = null

        if(nodeName != null && nodeName.toLowerCase() != "primary")
        node = this.getNodeElement(DOM,"primary")

        if(node)
        return node

        return node
    }

    /**
     * Return node defined element.
     * @param {Document} DOM 
     * @param {string} nodeName 
     * @returns {Element|null}
     */
    getNodeElement(DOM, nodeName)
    {
        const node = DOM.querySelector(`[np-node="${nodeName}"]`)

        if(!node)
        return null

        return node
    }

    /**
     * Return node defined by fallback fields.
     * @param {Document} DOM 
     * @returns {JSON}
     * @throws {NPError}
     */
    getDefaultNode(DOM)
    {
        if(!DOM.querySelector("head"))
        throw new NPError(1.2,`Document does not contain a <head> tag`)

        let view = FieldTypes.asFallback(DOM,"view")
    
        if(!view || !ViewTypes[view])
        view = "basic"

        const node = this.getFallbackFields(DOM,view,2)

        if(node instanceof NPError)
        throw node 

        return node
    }

    /**
     * Return JSON w/ all valid fields
     * @param {Document} DOM 
     * @param {string} view 
     * @param {number} queryMode "0": query property and fallback, "1": query only property, "2": query only fallback
     * @returns {Object|NPError|null}
     */
    getFallbackFields(DOM,view , queryMode = 0)
    {
        let result = {}

        if(!ViewTypes[view])
        return null

        for(let field in ViewTypes[view])
        {
            let value = FieldTypes[field](DOM,null,queryMode)

            if(value instanceof NPError)
            return value

            if(value)
            result[field] = value
        }

        return result
    }

    /**
     * Convert html to document object.
     * @param {string} html 
     * @returns {Document}
     * @throws {NPError}
     */
    toDom(html)
    {
        const DOM = new DOMParser().parseFromString(html, "text/html");

        if(DOM.documentElement.nodeName === "parsererror") 
        throw new NPError(1.1, "HTML could not be parsed")

        return DOM
    }
}

export default NextPage