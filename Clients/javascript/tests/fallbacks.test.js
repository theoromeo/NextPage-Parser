import NextPage from "../src/index.js"


const NP = new NextPage()


describe("Limits" , () => 
{
    it("np-title " , async () => 
    {
        const headers = await NP.get("longHeaders.html")

        expect(headers.title.length).toBeLessThan(81)

    })

    it("np-description " , async () => 
    {
        const headers = await NP.get("longHeaders.html")

        expect(headers.description.length).toBeLessThan(201)

    })

    it("Handel Undefined np-title" , async () => 
    {
        const headers = await NP.get("missingHeaders.html")

        expect(headers.title).toEqual("Document Title")

    })

    it("Handel Undefined np-description" , async () => 
    {
        const headers = await NP.get("missingHeaders.html")

        expect(headers.description).toEqual(false)

    })
})