import Informational from "./Informational"

/**
 * Holds Operations for retrieving fallback values
 * @constant
 */
const Fallback = 
{
    getFallbacks: function (preResults, DOM)
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

        return result
    },

    getTitle:function(node) 
    {
        let title = node.querySelector(`meta[name="${Informational.title}"]`)

        if(title)
        title = title.getAttribute('content')
        
        if(!title)
        {
            let titleElement = node.querySelector("title")
            let value = false

            if(titleElement)
            value = titleElement.textContent

            if(value && value.trim() != "")
            title = value
        }
        
        if(!title)
        return false

        return title.slice(0,FallbackLimits.title)
    },

    getDescription:function(node) 
    {
        let description = node.querySelector(`meta[name="${Informational.description}"]`)

        if(description)
        description = description.getAttribute('content')
        
        if(!description)
        return false

        return description.slice(0,FallbackLimits.description)
    },

    getIcon:function(node) 
    {
        let iconElement = node.querySelector(`meta[name="${Informational.icon}"]`)
        let value = ''

        if(iconElement)
        value = iconElement.getAttribute('content')

        if(value.trim() != "")
        return value


        iconElement = node.querySelector(`link[rel="icon"]`)
        
        if(iconElement)
        value = iconElement.getAttribute('href')
        
        if(value.trim() != "")
        return value

        return false
    },

    getAction:function(node) 
    {
        let action = node.querySelector(`meta[name="${Informational.action}"]`)

        if(action)
        action = action.getAttribute('content')
        
        if(!action)
        return false

        return action
    },

    getAll(node)
    {
        const head = node.querySelector("head")
        // if(!head)
        // return -1

        const icon = Fallback.getIcon(head)
        const title = Fallback.getTitle(head)
        const description = Fallback.getDescription(head)
        const action = Fallback.getAction(head)
        
        return {icon:icon,title:title,description:description,action:action}
    },

}

export const FallbackLimits = 
{
    title:80,
    description:200,
}

export default Fallback