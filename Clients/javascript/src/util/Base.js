import Informationals from "./Informationals.js"
/**
 * Holds Operations for retrieving fallback values.
 * @constant
 */
const Base = 
{
    titleLimit: 80,
    descriptionLimit: 200,

    appendMissing: function (preResults, DOM)
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

        let meta = node.querySelector(`meta[name="${Informationals.title}"]`)

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


        let element = node.querySelector(`[${Informationals.title}]`)

        if(!result && element)
        {
            let attribute = element.getAttribute(Informationals.title)

            if(attribute && attribute.trim() != "" && attribute != Informationals.title )
            result = attribute

            let content = element.textContent
            
            if(content && content.trim() != "")
            result = content
        }

        if(result)
        return result.slice(0,this.titleLimit)

        return false
    },

    getDescription:function(node) 
    {
        let result = false
        let meta = node.querySelector(`meta[name="${Informationals.description}"]`)

        if(!result && meta)
        {
            let content = meta.getAttribute('content')
            
            if(content && content.trim() != "")
            result = content
        }

        let elements = node.querySelectorAll(`[${Informationals.description}]`)

        if(!result && elements)
        {
            let value = ''

            for (let index = 0; index < elements.length; index++) 
            {
             const element = elements[index];
             if(element.textContent.trim() != '')
             value += element.textContent +"<br>"  
            }

            if(value != '')
            result = value
        }


        if(result)
        return result.slice(0,this.descriptionLimit)

        return result
        
       
    },

    getIcon:function(node) 
    {
        let meta = node.querySelector(`meta[name="${Informationals.icon}"]`)

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

        let element = node.querySelector(`[${Informationals.icon}]`)

        if(element)
        {
            let value = element.getAttribute(Informationals.icon)

            if(value && value.trim() != ""  && value != Informationals.icon)
            return value
        }

        return false
    },

    getAction:function(node) 
    {
        let result = false
        let meta = node.querySelector(`meta[name="${Informationals.action}"]`)

        if(meta)
        {
            let value = meta.getAttribute("content")

            if(value && value.trim() != "" && value != Informationals.action)
            result = value
        }


        let element = node.querySelector(`link[${Informationals.action}]`)

        if(!result && element)
        {
            let attribute = element.getAttribute(Informationals.action)

            if(attribute && attribute.trim() != "" && attribute != Informationals.action)
            result = attribute


            if(!result)
            {
                
                let src = element.getAttribute("href")

                if(src && src.trim() != "")
                result = src

            }

        }

        if(result)
        {
            let value = []
            if(result.includes(">"))
            {
                let parts = result.split(">")
                value.label = parts[0].trim()
                value.url = parts[1].trim()

                return {...value}

            }

            value.label = false
            value.url = result
            return {...value}
            
        }

        return false
        
    },

    getAll(DOM)
    {   
        return this.appendMissing({},DOM)
    },

}

export default Base