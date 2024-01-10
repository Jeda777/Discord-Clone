'use client'

import ChangeRoleModal from '../UI/Modals/ChangeRoleModal'
import CreateServerModal from '../UI/Modals/CreateServerModal'
import InviteModal from '../UI/Modals/InviteModal'
import MembersModal from '../UI/Modals/MembersModal'
import RemoveMemberModal from '../UI/Modals/RemoveMemberModal'
import ServerSettingsModal from '../UI/Modals/ServerSettingsModal'

const ModalProvider = () => {
  return (
    <div>
      <CreateServerModal />
      <InviteModal />
      <MembersModal />
      <ChangeRoleModal />
      <RemoveMemberModal />
      <ServerSettingsModal />
    </div>
  )
}

export default ModalProvider
