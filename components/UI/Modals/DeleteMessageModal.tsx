import { modalStore } from '@/lib/modalStore'
import axios from 'axios'
import qs from 'query-string'

const DeleteMessageModal = () => {
  const { isOpen, type, close, data } = modalStore()
  const isModalOpen = isOpen && type == 'deleteMessage'
  const { query, messageId } = data

  if (isModalOpen && query && messageId) {
    const handleDelete = async () => {
      try {
        const url = qs.stringifyUrl({ url: `/api/socket/messages/${messageId}`, query })
        await axios.delete(url)
        close()
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <div className={`modal visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-4 justify-center bg-background text-primary w-96'>
          <h1 className='text-xl md:text-2xl text-center font-bold mb-4'>Are you sure you want to delete your message?</h1>
          <div className='flex gap-4'>
            <button className='btn btn-block bg-indigo-500 text-white font-semibold' onClick={() => close()}>
              NO
            </button>
            <button className='btn btn-block bg-destructive text-white font-semibold' onClick={handleDelete}>
              YES
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DeleteMessageModal
