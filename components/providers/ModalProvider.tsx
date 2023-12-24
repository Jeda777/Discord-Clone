'use client'

import CreateServerModal from '../UI/Modals/CreateServerModal'
import InviteModal from '../UI/Modals/InviteModal'

const ModalProvider = () => {
  return (
    <div>
      <CreateServerModal />
      <InviteModal />
    </div>
  )
}

export default ModalProvider
