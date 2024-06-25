export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Receives a string and normalizer it as a slug
   *
   * Example: "An exameple title" => "an-example-title"
   *
   * @param text
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
