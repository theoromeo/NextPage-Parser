import Informational from "../util/Informational";
import { DOMParser} from 'xmldom-qsa'

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
        let elements = node.querySelectorAll(`[${Informational.p}]`)

        if(elements.length == 0)
        return false

        return elements
    },

    filter:function(queryResult)
    {
        let result = " "
        if(queryResult instanceof Array)
        {
            for (let index = 0; index < queryResult.length; index++) 
            {
                const element = queryResult[index];
                result += element.textContent +"<br>"
            }
        }

        else 
        result = queryResult.textContent + "<br>" 

        result = result.slice(0,result.length-4).slice(0,this.limit)
        
        return result
    }
}

export default ArticleView