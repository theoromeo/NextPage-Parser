import NextPage from "../src/index.js"


const NP = new NextPage()
const PAGE = await NP.getWebpage("main.html")
const DOM = NP.toDOM(PAGE)



// Operations clients are must likely to use the most.
describe("Client Interfaces", () => 
{
    it("Get Node Result ", async ()=>
    {
        const data = await NP.get("main.html","for-basic")

        expect(data).toBeDefined();
    })
    it("Get Node Result ", async ()=>
    {
        const data = await NP.get("main.html","for-basic")

        expect(data).toBeDefined();
    })


    it("Get Header Properties ", async ()=>
    {
        const data = await NP.getHeadBaseProperties(DOM)

        expect(data.title).toBeDefined();
        expect(data.description).toBeDefined();
        expect(data.icon).toEqual(false);
    })

    it("Get Appended Header Properties", async ()=>
    {
        const data = await NP.get("main.html","for-article")
        
        expect(data.result).toBeDefined();
        expect(data.description).toBeDefined();
        expect(data.title).toBeDefined();

    })

    it("Get Node Defined Header Properties", async ()=>
    {
        const data = await NP.get("main.html","for-article-header")
        
        expect(data.title).toMatch(/^Header np-/);
        expect(data.description).toMatch(/^Header np-/);

    })


    it("Handel Missing Node", async ()=>
    {
        const data =await NP.get("main.html","for-non-exist")
        
        expect(data).toEqual(-3);
    })

})


