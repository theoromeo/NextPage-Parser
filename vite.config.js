import { defineConfig } from 'vite'
import packageJson from './package.json';

export default defineConfig(
{

    build:
    {
        outDir:"./build",
        assetsDir:"",
        minify:"esbuild",
        lib:
        {
            entry: ['src/index.js'],
            formats:["es"],
            name:"NextPage",
            fileName:`NextPage.${new Date().toISOString().split('T')[0]}.min`
        },
    }
})