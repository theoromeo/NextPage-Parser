import NextPage from "../src/index.js"

it("Init Test",async () => {

    let x = new NextPage();
    let r = await x.getWebpage("johnmayer.html","fender");


    expect(r).toEqual("Johnmayer HTML")

})