import _ from "lodash";
import React, { useContext, useState } from "react";
import { SocketContext } from "../../../../Context";
import { v4 as uuidv4 } from "uuid";

const InvitePeople = ({ users, authUser, socket }) => {
  const { createGroupChatRooms } = useContext(SocketContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [roomName, setRoomName] = useState("");
  console.log("🚀 ~ InvitePeople ~ selectedUsers:", selectedUsers);
  const handleCheckBoxChange = (itemId) => {
    // Toggle the checked status of the item
    setSelectedUsers((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
  };
  const generateChatRoomId = (userId1, userId2) => {
    return `${Math.min(userId1, userId2)}_${Math.max(userId1, userId2)}`;
  };
  const handleGroupNameChange = (e) => {
    setRoomName(e.target.value);
  };
  const createChatRooms = () => {
    const group_members = [];

    Object.entries(selectedUsers).map(([itemId, isChecked]) => {
      if (isChecked) {
        const selectedUser = users?.filter(
          (u) => u.id === _.toInteger(itemId)
        )[0];
        group_members.push(selectedUser);
      }
    });
    const adminUser = users?.filter((u) => u.id === authUser?.id)[0];
    const user_id = adminUser?.id;
    const user_name = adminUser?.name;
    const user_image = adminUser?.image;
    const formData = {
      name: roomName,
      user_id: user_id,
      user_name: user_name,
      user_image: user_image,
      room_id: uuidv4(),
      group_members: { members: group_members },
    };
    socket.emit("add-group-chat-room", formData);
  };
  return (
    <div>
      {/* <!-- Invite People --> */}
      <div class="modal fade" id="invite_people" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered mw-400p" role="document">
          <div class="modal-content">
            <div class="modal-header header-wth-bg-inv">
              <h5 class="modal-title">Invite People</h5>
              <button
                type="button"
                class="btn-close text-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body p-0">
              <form class="m-3" role="search">
                <input
                  type="text"
                  class="form-control rounded-input user-search"
                  placeholder="Search People"
                />
              </form>

              <div class="h-350p">
                <div data-simplebar class="nicescroll-bar">
                  <ul class="invite-user-list">
                    {users?.length > 0 ? (
                      users?.map((user, index) => (
                        <li key={index}>
                          <div class="media d-flex align-items-center">
                            <div class="media-head me-3">
                              <div class="avatar avatar-sm avatar-rounded">
                                <img
                                  src={user.avatar}
                                  alt="user"
                                  class="avatar-img"
                                />
                              </div>
                            </div>
                            <div class="media-body">
                              <div class="user-name">{user.name}</div>
                            </div>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              class="form-check-input"
                              //   id="customCheck2"
                              checked={selectedUsers[user.id] || false}
                              onChange={() => handleCheckBoxChange(user.id)}
                            />
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>No users found.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div class="form-group m-3" role="search">
              <label className="form-label">Group Name</label>
              <input
                type="text"
                class="form-control rounded-input user-search"
                onChange={handleGroupNameChange}
                placeholder="Search People"
              />
            </div>
            <div class="modal-footer justify-content-center">
              <button
                type="button"
                class="btn flex-fill btn-light flex-1"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={createChatRooms}
                type="button"
                class="btn flex-fill btn-primary flex-1"
                data-bs-dismiss="modal"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Invite People --> */}
    </div>
  );
};

export default InvitePeople;
