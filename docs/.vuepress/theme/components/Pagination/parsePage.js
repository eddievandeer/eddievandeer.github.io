function parsePage(pages, now) {
    const result = []
    pages.forEach(page => {
        if (page.path.split('/')[1] == now.split('/')[1]) {
            result.push(page)
        }
    });
    return result
}

export default parsePage