import Informational from "./Informational"

/**
 * Holds Operations for retrieving fallback values.
 * @constant
 */
const Fallback = 
{
    appendFallbacks: function (preResults, DOM)
    {
        const head = DOM.querySelector("head")
        if(!head)
        return -2

        let result = preResults

        if(!result.title)
        {
            result.title = this.getTitle(head)
        }

        if(!result.description)
        {
            result.description = this.getDescription(head)
        }

        if(!result.icon)
        {
            result.icon = this.getIcon(head)
        }

        if(!result.action)
        {
            result.action = this.getAction(head)
        }

        return result
    },

    getTitle:function(node) 
    {
        let result = false;

        let meta = node.querySelector(`meta[name="${Informational.title}"]`)

        if(!result && meta)
        {
            let attribute = meta.getAttribute('content')

            if(attribute && attribute.trim() != "")
            result = attribute
        }


        let tag = node.querySelector("title")

        if(!result && tag)
        {
            let content = tag.textContent

            if(content && content.trim() != "")
            result = content
        }


        let element = node.querySelector(`[${Informational.title}]`)

        if(!result && element)
        {
            let attribute = element.getAttribute(Informational.title)

            if(attribute && attribute.trim() != "" && attribute != Informational.title )
            result = attribute

            let content = element.textContent
            
            if(content && content.trim() != "")
            result = content
        }

        if(result)
        return result.slice(0,FallbackLimits.title)

        return false
    },

    getDescription:function(node) 
    {
        let result = false
        let meta = node.querySelector(`meta[name="${Informational.description}"]`)

        if(!result && meta)
        {
            let content = meta.getAttribute('content')
            
            if(content && content.trim() != "")
            result = content
        }


        if(result)
        return result.slice(0,FallbackLimits.description)

        return result
        
       
    },

    getIcon:function(node) 
    {
        let meta = node.querySelector(`meta[name="${Informational.icon}"]`)

        if(meta)
        {
            let content = meta.getAttribute("content")

            if(content && content.trim() != "")
            return content
        }

        let link = node.querySelector(`link[rel="icon"]`)

        if(link)
        {
            let href = link.getAttribute('href')

            if(href && href.trim() != "")
            return href
        }

        let element = node.querySelector(`[${Informational.icon}]`)

        if(element)
        {
            let value = element.getAttribute(Informational.icon)

            if(value && value.trim() != ""  && value != Informational.icon)
            return value
        }

        return false
    },

    getAction:function(node) 
    {
        let result = false
        let meta = node.querySelector(`meta[name="${Informational.action}"]`)

        if(meta)
        {
            let value = meta.getAttribute(Informational.action)

            if(value && value.trim() != "" && value != Informational.action)
            result = value
        }

        let element = node.querySelector(`link[${Informational.action}]`)

        if(element)
        {
            let attribute = element.attribute(Informational.action)

            if(attribute && attribute.trim() != "" && attribute != Informational.action)
            result = attribute

            let src = element.attribute("src")
            if(src && src.trim() != "" && src != Informational.action)
            result = src
        }

        if(result)
        {
            if(result.contains(":"))
            {
                let parts = result.contains(":")
                result.label = parts[0]
                result.url = parts[1]
            }

            else 
            {
                result.label = false
                result.url = result
            }
        }

        return result
    },

    getAll(node)
    {   
        return {
            icon:this.getIcon(node),
            title:this.getTitle(node),
            description:this.getDescription(node),
            action:this.getAction(node)}
    },

}

export const FallbackLimits = 
{
    title:80,
    description:200,
}

export default Fallback