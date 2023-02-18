import { serverQueryContent } from '#content/server'
import RSS from 'rss'
import { toHtml } from 'hast-util-to-html'
import { useDateFormat } from '~/composables/useDateFormat'

type BodyNode = {
  tag: string,
  tagName?: string,
  type: string,
  props?: BodyNodeProperties,
  properties?: BodyNodeProperties,
  children: (BodyNode | null)[],
  value?: string
}

type BodyNodeProperties = {
  src: string,
  href: string,
  lang?: string,
  language?: string,
  code?: string
}

const site_url = 'https://www.craigspivack.com'

const updateRelativeUrls = (properties: BodyNodeProperties) => {
  Object.entries(properties)
    .forEach(([key, value]) => {
      if (['src', 'href'].includes(key) && value.startsWith('/')) {
        properties[key as keyof BodyNodeProperties] = site_url + value
      }
    })

  return properties
}

const recursivelyPatchChildren = (node: BodyNode | null) => {
  if (node === null) {
    return node
  }

  if (node.tag === 'style') {
    return null
  } else if (node.type === 'text') {
    return node;
  } else if (node.tag === 'code' && node.props && node.props.language) {
    node.props.lang = node.props.language
    node.children = [
      {
        type: 'text',
        value: node.props.code,
        tag: '',
        children: []
      }
    ]
    delete node.props.language
    delete node.props.code
  }

  node.tagName = node.tag

  if (node.props) {
    node.properties = updateRelativeUrls(node.props)
  }

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
    post.body.children = post.body.children.map(recursivelyPatchChildren).filter((node: BodyNode | null) => node !== null);
    const content = toHtml(post.body)
    feed.item({
      title: post.title || 'Blog Post from ' + useDateFormat(post.date),
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
