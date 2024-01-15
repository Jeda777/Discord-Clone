'use client'

import ChangeRoleModal from '../UI/Modals/ChangeRoleModal'
import CreateChannelModal from '../UI/Modals/CreateChannelModal'
import CreateServerModal from '../UI/Modals/CreateServerModal'
import DeleteServerModal from '../UI/Modals/DeleteServerModal'
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
      <DeleteServerModal />
      <CreateChannelModal />
    </div>
  )
}

export default ModalProvider
