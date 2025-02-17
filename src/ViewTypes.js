const basic = 
{
    title: true,
    desc: true,
    action: false,
};

const ViewTypes = 
{
    basic,

    article: 
    {
        ...basic,
        article: true,
    },

    gallery: 
    {
        ...basic,
        img: true,
    },
};

export default ViewTypes;