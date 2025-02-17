class NPError extends Error
{
    constructor(code,message)
    {
        super(message);
        this.code = code;
    }
}

export default NPError