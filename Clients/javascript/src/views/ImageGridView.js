import Informationals from "../util/Informationals.js";

const ImageGridView = 
{
    name: "image.grid",  
    limit: 6,

    default:function(node)
    {
        let result = []
        const elements = node.childNodes

        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];

            if(element.tagName == "img")
            result.push(element)
        
            if(result.length >5)
            break
        }

        if(result.length == 0)
        return false

        return result
    },
    
    tagged:function(node)
    {
        const elements = node.querySelectorAll(`[${Informationals.img}]`).slice(0,this.limit)

        if(elements.length <1)
        return false

        return elements
    },

    filter:function(queryResult)
    {

        let result = []

        if(Array.isArray(queryResult))
        {
            queryResult.forEach(element => 
            {
                this.filterOperation(result, element)
            })
        }
        else
        {
            this.filterOperation(result)
        }


        if(result.length <1)
        return false

        return result.slice(0,this.limit)
    },

    filterOperation:function(result, element) 
    {
        if(element.tagName != "img")
        return

        if(element.getAttribute(Informationals.img))
        {
            let value = element.getAttribute(Informationals.img)

            if(value.trim() == "" || value == Informationals.img)
            return

            result.push(value)
            return
        }

        else 
        {
            let value = element.getAttribute('src')

            if(value.trim() == "")
            return

            result.push( value)
            return   
        }
    }

}

export default ImageGridView