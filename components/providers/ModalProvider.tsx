'use client'

import ChangeRoleModal from '../UI/Modals/ChangeRoleModal'
import CreateServerModal from '../UI/Modals/CreateServerModal'
import InviteModal from '../UI/Modals/InviteModal'
import MembersModal from '../UI/Modals/MembersModal'
import RemoveMemberModal from '../UI/Modals/RemoveMemberModal'

const ModalProvider = () => {
  return (
    <div>
      <CreateServerModal />
      <InviteModal />
      <MembersModal />
      <ChangeRoleModal />
      <RemoveMemberModal />
    </div>
  )
}

export default ModalProvider
