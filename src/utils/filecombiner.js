function pageContentCombinator(docs) {
    return docs.map(doc => doc.pageContent).join('\n\n');
}

export { pageContentCombinator };