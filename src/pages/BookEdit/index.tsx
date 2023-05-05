import { useFetchBooks } from '@/services/bookService'
import { BookDetails } from '@/types/book/book.type'
import { convertBooksToBookDetails } from '@/utils/convert'
import { Alert, Skeleton } from 'antd'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BookInfoSection from './BookInfoSection'
import BookEditSection from './BookEditSection'

function BookEdit() {
  console.log('BookInfoSection rerendered')
  const { id } = useParams()
  const { data, error, isFetching } = useFetchBooks({
    detail: true,
    id: Number(id)
  })

  const [book, setBook] = useState<BookDetails | undefined>()
  useEffect(() => {
    if (data) {
      const bookData = convertBooksToBookDetails(data.content)
      setBook(bookData[0])
    }
  }, [data])

  if (isFetching || book == undefined) {
    return <Skeleton />
  }
  if (error) {
    return <Alert message='Error' description='Some error occurred while fetching chapters' type='error' showIcon />
  }

  return (
    <>
      <BookInfoSection book={book}></BookInfoSection>
      <BookEditSection book={book}></BookEditSection>
    </>
  )
}

export default BookEdit
