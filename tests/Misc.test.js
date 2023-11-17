import NextPage from "../src/index.js"


const NP = new NextPage()

// Operations clients are must likely to use the most.
describe("Miscellanies", () => 
{
    it("View w/ Action " , async () => 
    {
        let result = await NP.get('Misc.html' , 'action1')

        expect(result.action.label).toEqual("Action1")
        expect(result.action.url).toEqual("https://linktoaction.com/form1")
    })

    it("View w/ Action Undefined " , async () => 
    {
        let result = await NP.get('Misc.html' , 'undefined')

        expect(result.action.label).toEqual(false)
        expect(result.action.url).toEqual("http://link-to-other")
    })
})

