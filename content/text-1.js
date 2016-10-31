const template = ({ title, description, body }) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>${title}</title>
${description ?
    `<meta name="description" content="${description}">` :
    ""}
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
${body}
</body>
</html>`

const renderers = {
    html: (data) => template({
        title: data.title,
        description: data.description,
        body: render({ type: "htmlFragment", data: data }),
    }),
    htmlFragment: (data) => {
        return `<article id="${data.id}">
            <h1>${data.title}</h1>
            ${data.text}
            <a rel="author" href="/content/${data.author}">@${data.author}</a>
        </article>`
    }
}

function render ({ type, data }) {
    return renderers[type] ? renderers[type](data) : data.text
}

module.exports = {
    type: "constructor",
    author: "modernserf",
    timestamp: 1477949572263,
    render
}
