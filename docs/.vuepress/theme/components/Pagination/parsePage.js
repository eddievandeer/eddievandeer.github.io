function parsePage(pages) {
    const result = []
    pages.forEach(page => {
        if (page.path.endsWith('html')) {
            result.push(page)
        }
    });
    return result
}

export default parsePage