'use client'

import CreateServerModal from '../UI/Modals/CreateServerModal'
import InviteModal from '../UI/Modals/InviteModal'
import MembersModal from '../UI/Modals/MembersModal'

const ModalProvider = () => {
  return (
    <div>
      <CreateServerModal />
      <InviteModal />
      <MembersModal />
    </div>
  )
}

export default ModalProvider
