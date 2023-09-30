import Informational from "../util/Informational";

const ImageView = 
{
    name: "image",    

    default:function(node)
    {
        const element = node.querySelector(`img:first-of-type`)

        if(!element)
        return false

        return element
    },
    
    tagged:function(node)
    {
        const element = node.querySelector(`[${Informational.img}]`)

        if(!element)
        return false

        return element
    },

    filter:function(queryResult)
    {
        let result = false
        if(queryResult instanceof Array)
        {

        }   
        else 
        queryResult = [queryResult]     

        if(queryResult instanceof Array)
        {
            queryResult.every(element =>
            {
                if(element.tagName != "img")
                return true

                if(element.getAttribute(Informational.img))
                {

                    let value = element.getAttribute(Informational.img)
                    if(value.trim() == "" || value == Informational.img)
                    return true

                    result = value
                    return false
                }

                let value = element.getAttribute('src')

                if(value.trim() == "")
                return true

                result = value
                return false
                
            });
        }

        if(!result)
        return false

        return result
    }

}

export default ImageView