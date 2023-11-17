import Informationals from "../util/Informationals.js";

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
        const element = node.querySelector(`[${Informationals.img}]`)

        if(!element)
        return false

        return element
    },

    filter:function(queryResult)
    {
        let result = false

        if(Array.isArray(queryResult))
        {
            queryResult.every(element => 
            {
                let image = this.filterOperation(element)
                if(image)
                {
                    result = image
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
        if(element.tagName != "img")
        return false

        if(element.getAttribute(Informationals.img))
        {

            let value = element.getAttribute(Informationals.img)
            if(value.trim() == "" || value == Informationals.img)
            return false

            return value
        }

        let value = element.getAttribute('src')

        if(value.trim() == "")
        return false

        return value

    }

}

export default ImageView