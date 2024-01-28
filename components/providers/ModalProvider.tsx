'use client'

import ChangeRoleModal from '../UI/Modals/ChangeRoleModal'
import CreateChannelModal from '../UI/Modals/CreateChannelModal'
import CreateServerModal from '../UI/Modals/CreateServerModal'
import DeleteServerModal from '../UI/Modals/DeleteServerModal'
import EditChannelModal from '../UI/Modals/EditChannelModal'
import InviteModal from '../UI/Modals/InviteModal'
import LeaveServerModal from '../UI/Modals/LeaveServerModal'
import MembersModal from '../UI/Modals/MembersModal'
import MessageAttachmentModal from '../UI/Modals/MessageAttachmentModal'
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
      <LeaveServerModal />
      <EditChannelModal />
      <MessageAttachmentModal />
    </div>
  )
}

export default ModalProvider
