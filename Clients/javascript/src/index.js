class NextPage
{
    /**
     * Gets Webpage for parsing.
     * 
     * @param {URL} url - URL of webpage to retrieve.
     * @returns {(String|Number)} 
     * - HTML if webpage retrieved successfully, 
     * - -1 if fetch error, 
     * - -2 if connection error.
     */
    async getWebpage(url , key)
    {
        let webpageResponse = null;

        try 
        {
            const request = await fetch(url)

            if(!request.ok)
            {
                return -2;
            }

            webpageResponse = await request.text()
        }
        catch(error)
        {

        }

    }
}