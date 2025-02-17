import Limits from "./Limits"
import NPError from "./NPError"

const FieldTypes = 
{
    /**
     * returns field defined explicitly & implicitly.
     * @param {Element} nodeElement 
     * @param {string} field 
     * @returns {string|null}
     */
    asProperty: function (nodeElement, field)
    {
        let returnValue = null
        const element = nodeElement.querySelector(`[np-${field}]`)

        if(!element)
        return null

        // Get explicit value
        const explicitValue = element.getAttribute(`np-${field}`)

        if(explicitValue && explicitValue.trim() != "" )
        returnValue = explicitValue

        // Get implicit value
        if(!returnValue)
        returnValue = element.innerText

        if(!returnValue || returnValue.trim() == '' )
        return null

        return returnValue.trim()
    },

    /**
     * Returns field defined in fallback/ meta tag defined.
     * @param {Document} DOM 
     * @param {string} field 
     * @returns {string|null}
     */
    asFallback: function (DOM, field) 
    {
        const content = DOM.querySelector("head")?.querySelector(`meta[name='np:${field}']`)?.content

        if(!content || content.trim() == '')
        return null

        return content.trim()
    },

    /**
     * 
     * @param {Document} DOM 
     * @param {Element} nodeElement Element to query.
     * @param {number} queryMode "0": query property and fallback, "1": query only property, "2": query only fallback
     * @returns {string|NPError}
     */
    title: function(DOM, nodeElement ,queryMode = 0)
    {
        let value = null 

        if(queryMode != 2)
        {
            const propertyValue = this.asProperty(nodeElement , "title")

            if(propertyValue && propertyValue.trim() != '')
            value = propertyValue
        }

        if(queryMode != 1 && value == null)
        {
            const fallbackValue = this.asFallback(DOM,"title")

            if(fallbackValue && fallbackValue.trim() !== '')
            value = fallbackValue
        }

        if(!value)
        return new NPError(2.1, `"title" field not found with query mode <${queryMode}>`)

        return value.substring(0,Limits.title).trim()
    },

    /**
     * 
     * @param {Document} DOM 
     * @param {Element} nodeElement 
     * @param {number} queryMode "0": query property and fallback, "1": query only property, "2": query only fallback
     * @returns {string|NPError}
     */
    desc: function(DOM, nodeElement,queryMode = 0)
    {
        let value = null 

        if(queryMode != 2)
        {
            const propertyValue = this.asProperty(nodeElement, "desc")

            if(propertyValue && propertyValue.trim() != '')
            value = propertyValue
        }

        if(queryMode != 1 && value == null)
        {
            const fallbackValue = this.asFallback(DOM,"desc")

            if(fallbackValue && fallbackValue.trim() !== '')
            value = fallbackValue
        }

        if(!value)
        return new NPError(2.2, `"desc" field not found with query mode <${queryMode}>`)

        return value.substring(0,Limits.desc).trim()

    },

    /**
     * 
     * @param {Document} DOM 
     * @param {Element} nodeElement 
     * @param {number} queryMode "0": query property and fallback, "1": query only property, "2": query only fallback
     * @returns {string|null}
     */
    article: function(DOM, nodeElement,queryMode = 0)
    {
        let value = null 

        if(queryMode != 2)
        {
            const propertyValue = this.asProperty(nodeElement, "article")

            if(propertyValue && propertyValue.trim() != '')
            value = propertyValue
        }

        if(queryMode != 1 && value == null)
        {
            const fallbackValue = this.asFallback(DOM,"article")

            if(fallbackValue && fallbackValue.trim() !== '')
            value = fallbackValue
        }

        if(!value)
        return null

        return value.substring(0,Limits.article).trim()

    },


    /**
     * @param {Document} DOM 
     * @param {Element} node 
     * @param {Number} queryMode "0": query property and fallback, "1": query only property, "2": query only fallback
     * @returns {Array|null}
     */
    img: function (DOM,node, queryMode = 0)
    {
        let value = []

        if(queryMode != 2)
        {
            const imgs = node.querySelectorAll(`[np-img]`)

            if(imgs && imgs.length > 0 )
            value = this.parseImgs(imgs,Limits.img)
        }

        if(queryMode != 1 && value.length == 0)
        {
            const fallbackValue = this.asFallback(DOM,"img")

            if(!fallbackValue)
            return null 

            value = fallbackValue.split(",",Limits.img)
        }

        if(value.length == 0)
        return null 

        return value.slice(0,Limits.img)
    },

    parseImgs: function(imgs, limit)
    {
        let value = []
        imgs.forEach(img => 
        {
            if(value.length >= limit)
            return

            const explicitValue = img.getAttribute("np-img")

            if(explicitValue && explicitValue.trim() != "")
            {
                value.push(explicitValue)
                return
            }

            const implicitValue = img.src
            if(implicitValue && implicitValue.trim() != "")
            value.push(implicitValue)
        })

        return value
    },

    /**
     * @param {Document} DOM 
     * @param {Element} nodeElement 
     * @param {Number} queryMode 
     * @returns {Array|null}
     */
    action: function(DOM,nodeElement, queryMode = 0)
    {
        let value = null

        if(queryMode != 2)
        {
            const element = nodeElement.querySelector("[np-action]")

            if(element)
            {
                const explicitValue = element.getAttribute("np-action")

                if(explicitValue)
                value = explicitValue

                else
                {
                    const label = element.innerText
                    const url = element.href 

                    if(label && label.trim() != "" && url && url.trim() != "")
                    value = label+">"+url
                }
            }
        }

        if(queryMode != 1 && value == null)
        {
            const fallbackValue = this.asFallback(DOM,"action")

            if(fallbackValue)
            value = fallbackValue
        }

        if(!value)
        return null 

        if(!value.includes(">"))
        return null

        const split = value.split(">")
        if(split[0].trim() != "" && split[1].trim() != "")
        return [split[0].substring(0,Limits.action).trim(), split[1]]

        return null

        
    },

}

export default FieldTypes