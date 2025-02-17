import NextPage from "../src/index.js";
import polyfills from "./polyfills.js";
import Limits from "../src/Limits.js";

beforeEach(() => 
{
    polyfills();
});

test("correct length an fallback title" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("limits-fallback"), "primary")
    expect(node.title.length).toEqual(Limits.title)
})

test("correct length an fallback desc" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("limits-fallback"), "primary")
    expect(node.desc.length).toEqual(Limits.desc)
})


test("correct length on all basic view fields" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("limits"), "primary")
    expect(node.title.length).toEqual(Limits.title)
    expect(node.desc.length).toEqual(Limits.desc)
    expect(node.action[0].length).toEqual(Limits.action)
})

test("correct length on article field" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("limits"), "secondary")
    expect(node.article.length).toEqual(Limits.article)
})

test("correct number of gallery view imgs" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("limits"), "side")
    expect(node.img.length).toEqual(Limits.img)
})

test("correct length on action label " , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("limits"), "secondary")
    expect(node.action[0].length).toEqual(Limits.action)
})