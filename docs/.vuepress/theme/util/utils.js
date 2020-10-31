function parseTitle(navConfig) {
    let result = []
    for (let i = 0; i < navConfig.length; i++) {
        let item = navConfig[i]
        result.push({
            level: 2,
            url: item.link ? item.link : 'javascript:;',
            title: item.text
        })
        if (item.items) {
            for (let j = 0; j < item.items.length; j++) {
                result.push({
                    level: 3,
                    url: item.items[j].link ? item.items[j].link : 'javascript:;',
                    title: item.items[j].text
                })
            }
        }
    }
    return result
}

export {
    parseTitle
}