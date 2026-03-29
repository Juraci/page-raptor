interface ElementCollection {
  get(): string[];
}

export default class Wrapper {
  private metacollection: ElementCollection[];

  constructor(metacollection: ElementCollection[]) {
    this.metacollection = metacollection;
  }

  scan(): string[] {
    const snippets: string[] = [];
    this.metacollection.forEach((elementCollection) => {
      snippets.push(...elementCollection.get());
    });
    return snippets;
  }
}
