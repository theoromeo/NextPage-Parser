import NextPage from "../src/index.js"
import { DOMParser , XMLSerializer } from 'xmldom-qsa'

it("Fetch Page" , async () => 
{
    const NP = new NextPage()
    const page = await NP.getWebpage("fetch.html")
    expect(page).toEqual("true")

    const page2 = await NP.getWebpage("non_existent_page.html")
    expect(page2).toEqual(-2)
})

it("Dom Conversion" , async () => 
{
    let isNumber = true
    const NP = new NextPage()
    const page = await NP.getWebpage("johnmayer.html")
    const dom = await NP.toDOM(page)

    expect(dom.childNodes).toBeDefined()
})

it("Node retrieval" , async () => 
{
    let isNumber = true
    const NP = new NextPage()
    const page = await NP.getWebpage("johnmayer.html")
    const dom = await NP.toDOM(page)
    const node = NP.getNode(dom,"fender")

    expect(node.toString()).toContain("np-for")
})

it("Get View Information" , async () => 
{
    let isNumber = true
    const NP = new NextPage()
    const page = await NP.getWebpage("johnmayer.html")
    const dom = await NP.toDOM(page)
    const node = NP.getNode(dom,"PSG")

    const info = NP.getViewInformation(node)

    expect(info.query).toContain("img:nth-child(-n+6)")
    expect(info.type).toContain("image.grid")
})

it("Get View Query" , async () => 
{
    const NP = new NextPage()
    const page = await NP.getWebpage("johnmayer.html")
    const dom = await NP.toDOM(page)
    const node = NP.getNode(dom,"ibanez")

    const info = NP.getViewInformation(node)
    

    expect(info).toContain("img:nth-child(-n+6)")
})



