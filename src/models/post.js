export default class Post {
  constructor(node) {
    this.id = node.id;
    this.html = node.html;
    this.excerpt = node.excerpt;
    this.timeToRead = node.timeToRead;
    this.tableOfContents = node.tableOfContents;
    this.slug = node.fields.slug;
    this.emoji = node.frontmatter.emoji;
    this.categories = node.frontmatter.categories.split(' ');
    this.title = node.frontmatter.title;
    this.author = node.frontmatter.author;
    this.date = node.frontmatter.date;
    this.thumbnail = node.frontmatter.thumbnail; // This is the URL string
  }
}
