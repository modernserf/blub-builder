module.exports = {
    type: "constructor",
    author: "modernserf",
    timestamp: 1477949572263,
    render: ({ type, data, modules }) => {
        switch (type) {
        case "html":
            return modules.get("text").render({
                type: "html",
                modules,
                data: {
                    title: `Profile of ${data.username}`,
                    text: `
                        <dl>
                            <dt>Display Name</dt>
                            <dd>${data.firstName}</dd>
                        </dl>
                    `
                },
            })
        default:
            return data.username
        }
    }
}
