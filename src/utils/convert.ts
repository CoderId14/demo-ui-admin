import { Book, BookDetails } from '@/types/book/book.type'

export function convertBookToBookDetails(book: Book): BookDetails {
  return {
    bookId: book.bookId,
    title: book.title,
    content: book.content,
    shortDescription: book.shortDescription,
    categories: book.categories || [], // provide default value for optional property
    tags: book.tags || [], // provide default value for optional property
    thumbnail: book.thumbnail,
    thumbnailUrl: book.thumbnailUrl,
    author: book.author,
    latestChapters: book.latestChapters || [], // provide default value for optional property
    viewCount: book.viewCount,
    likeCount: book.likeCount,
    averageRating: book.averageRating,
    premium: book.premium,
    novel: book.novel
  }
}

export function convertBooksToBookDetails(books: Book[]): BookDetails[] {
  return books.map((book) => convertBookToBookDetails(book))
}
