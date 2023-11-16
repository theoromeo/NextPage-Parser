import Informationals from "../util/Informationals.js";

const ArticleView = 
{
    name: "article",    
    limit:300,
    default: function(node)
    {
        let result = []
        
        let children = node.childNodes

        for (let index = 0; index < children.length; index++) 
        {
            const element = children[index];
            if(element.tagName == "p")
            {
                result.push(element)         
            }   
        }
        return result
    },

    tagged:function(node)
    {
        let elements = node.querySelectorAll(`[${Informationals.p}]`)

        if(elements.length == 0)
        return false

        return elements
    },

    filter:function(queryResult)
    {

        let result = " "


        if(Array.isArray(queryResult))
        {
            queryResult.forEach(element => {
                result += this.filterOperation(element)
            });
        }
        else 
        {
            result = this.filterOperation(queryResult)
        }

        if(result.trim() == '')
        return false

        result = result.slice(0,result.length-4).slice(0,this.limit)        
        return result
    },

    filterOperation:function(element)
    {
        if(element && element.textContent && element.textContent.trim() != "")
        return element.textContent+"<br>" 

        return ''
    }

}

export default ArticleView