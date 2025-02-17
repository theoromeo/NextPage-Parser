import NextPage from "../src/index.js";
import polyfills from "./polyfills.js";

beforeEach(() => 
{
    polyfills();
});

test("return fallback when undefined primary is queried " , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("fallback"), "primary")

    expect(node.title).toMatch(`fallback title`)
    expect(node.desc).toMatch(`fallback desc`)

    expect(node.action[0]).toContain(`fallback label`)
    expect(node.action[1]).toContain(`fallback url`)
})

test("return valid node and fallback action" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("fallback"), "secondary")

    expect(node.title).toMatch(`secondary title`)
    expect(node.desc).toMatch(`secondary desc`)

    expect(node.action[0]).toContain(`fallback label`)
    expect(node.action[1]).toContain(`fallback url`)
})



