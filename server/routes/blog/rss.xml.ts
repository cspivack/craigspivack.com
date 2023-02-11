import { serverQueryContent } from '#content/server'
import RSS from 'rss'
import { toHtml } from 'hast-util-to-html'

const site_url = 'https://www.craigspivack.com'

const updateRelativeUrls = (properties) => {
  const props = ['src', 'href']

  for (const key in properties) {
    const val = properties[key]
    if (props.includes(key) && val.startsWith('/')) {
      properties[key] = site_url + val
    }
  }

  return properties
}

const recursivelyPatchChildren = (node) => {
  if (node.tag === 'style') {
    return null
  } else if (node.type === 'text') {
    return node;
  } else if (node.tag === 'code' && node.props.language) {
    node.props.lang = node.props.language
    node.children = [
      {
        type: 'text',
        value: node.props.code
      }
    ]
    delete node.props.language
    delete node.props.code
  }

  node.tagName = node.tag
  node.properties = updateRelativeUrls(node.props)

  node.children = node.children.map(recursivelyPatchChildren)

  return node
}

export default defineEventHandler(async (event) => {

  const feed = new RSS({
    title: 'Craig Spivack',
    site_url,
    feed_url: `${site_url}/blog/rss.xml`,
    language: 'en'
  })

  const posts = await serverQueryContent(event)
                        .sort({ date: -1 })
                        .where({ _partial: false })
                        .find()

  for (const post of posts) {
    post.body.children = post.body.children.map(recursivelyPatchChildren).filter(node => node !== null);
    const content = toHtml(post.body)
    feed.item({
      title: post.title,
      url: site_url + post._path,
      date: post.date,
      description: post.excerpt,
      categories: post.category,
      custom_elements: [
        { 'content:encoded': content }
      ]
    })
  }

  const feedString = feed.xml({ indent: true })
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feedString)
})
