export const generateSlug = (title) => {
    return (
        title
        .toLowerCase()
        .replace(/\s+/g,"-") + "-" + 
        Math.random().toString(36).substring(2,7)
    )
}