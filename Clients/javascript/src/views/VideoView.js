import Informational from "../util/Informational";

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
        let elements = node.querySelector(`[${Informational.video}]`)

        if(!elements)
        return false

        return elements
    },

    filter:function(queryResult)
    {
        let result = false

        if(queryResult instanceof Array)
        {
            for (let index = 0; index < queryResult.length; index++) 
            {
                const element = queryResult[index];
                
                let value = element.getAttribute(Informational.video)
                if(value != Informational.video && value.trim() != "")
                {
                    result = value
                    break
                }
            }
        }

        else 
        {
            let value = queryResult.getAttribute(Informational.video)
            if(value != Informational.video && value.trim() != "")
            {
                result = value
            }
        }

        if(result)
        return result

        let value = queryResult.getAttribute("src")
        if(value.trim() != "")
        return value

        return result

    }
}

export default VideoView