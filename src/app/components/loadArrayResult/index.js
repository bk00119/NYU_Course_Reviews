import Loading from "../loading"
import NoResult from "../noResult"

export default function LoadArrayResult({
  children,
  isLoading,
  data,
  message,
}) {
  return isLoading ? (
    <Loading />
  ) : data.length > 0 ? (
    children
  ) : (
    <NoResult message={message} />
  )
}
