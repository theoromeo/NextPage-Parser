import Informationals from "../util/Informationals.js";

const VideoView = 
{
    name: "video", 

    default: function(node)
    {
        let result = false
        
        let children = node.childNodes

        for (let index = 0; index < children.length; index++) 
        {
            const element = children[index];
            if(element.tagName == "video")
            {
                result = element    
                break    
            }   
        }
        return result
    },

    tagged:function(node)
    {
        let elements = node.querySelector(`[${Informationals.video}]`)

        if(!elements)
        return false

        return elements
    },

    filter:function(queryResult)
    {
        let result = false

        if(Array.isArray(queryResult))
        {
            queryResult.every(element => 
            {
                let value = this.filterOperation(element)

                if(value)
                {
                    result = value
                    return false
                }
            })
        }
        else 
        {
            result = this.filterOperation(queryResult)
        }

        return result

    },

    filterOperation: function(element)
    {
        let property = element.getAttribute(Informationals.video)
        if(property != Informationals.video && property.trim() != "")
        {
            return property
        }

        let src = element.getAttribute("src")

        if(src.trim() != "")
        return src

        return false
    }
}

export default VideoView