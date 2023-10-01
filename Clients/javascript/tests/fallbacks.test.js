import NextPage from "../src/index.js"


const NP = new NextPage()


describe("Fallback Limits" , () => 
{
    it("np-title Limit" , async () => 
    {
        const headers = await NP.get("longHeaders.html")

        expect(headers.title.length).toBeLessThan(81)

    })

    it("np-description Limit" , async () => 
    {
        const headers = await NP.get("longHeaders.html")

        expect(headers.description.length).toBeLessThan(201)

    })
    
})

describe("Fallback Icon Property" , () => 
{
    it("np-icon Meta Definition" , async () => 
    {
        const headers = await NP.get("longHeaders.html")

        expect(headers.icon).toEqual("./link/to/icon.png")

    })

    it("np-icon link Definition" , async () => 
    {
        const headers = await NP.get("titleUndefined.html")

        expect(headers.icon).toEqual("./link/to/icon.png")

    })
})


describe("Fallback Error Handeling", () => 
{
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


    it("Handel Undefined title tag" , async () => 
    {
        const headers = await NP.get("titleUndefined.html")
    
        expect(headers.title).toEqual(false)
    
    })
})




