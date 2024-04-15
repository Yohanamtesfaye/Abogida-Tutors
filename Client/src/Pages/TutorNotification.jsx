import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
const TutorNotification = ({ notification, setNotification, fetch }) => {
  const id = localStorage.getItem('id');

  function markAllUnread() {
    setNotification(prev => prev.map(notify => ({ ...notify, isUnread: false })));
  }

  function handleNotificationClick(id) {
    setNotification(prev =>
      prev.map(notify =>
        notify.id === id ? { ...notify, isUnread: false } : notify
      )
    );
  }

  const handleClick = async (notify_id, is_approved) => {
    try {
      const data = {
        is_approved: `${is_approved}`,
        is_declined: `${!is_approved}`
      };
      const ress = await axios.put(
        `http://127.0.0.1:8000/core/api/tutor/dashboard/${id}/tutor-notifications/${notify_id}/`,
        data
      );
      console.log(ress.data);
      await fetch();
      // setNotification(///z);

    } catch (err) {
      console.log(err);
    }
  };

  const unreadCount = notification ? notification.length : 0;

  return (
    <div className="bg-[#F4EDE4] flex items-end">
      <div className="bg-white flex flex-col rounded-md">
        <div className="sticky flex jusitfy-between top-0 bg-white p-4 shadow-md z-10">
          <h1 className="text-3xl font-bold">Notification</h1>
          {unreadCount !== 0 ? (
            <button
              className="text-sm text-black hover:text-blue-600"
              onClick={markAllUnread}
            >
              Mark all as read
            </button>
          ) : (
            <p className="text-sm">No new notifications</p>
          )}
        </div>
        {notification &&
          notification.map(notify => (
            <div
              className="bg- m-5 p-1 flex hover:bg-[#eff5f5]"
              key={notify.id}
              onClick={() => handleNotificationClick(notify.id)}
              data-unread={notify.isUnread}
            >
              <div className="text-4xl p-7 m-2 text-white rounded-full bg-[#bbc3bf] ">
                <AiOutlineUser />
              </div>
              <div className="ml-2 flex flex-col justify-between">
                <div className="text- font-bold">{notify.message}</div>
                {!notify.message.includes('approved') && (
                  <div className="mt-3">
                    <button
                      onClick={() => handleClick(notify.id, true)}
                      className="mr-2 mb-3 bg-[#4a154b] text-white font-bold border border-[#4a154b] px-6 py-1 hover:text-[#4a154b] hover:bg-white rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleClick(notify.id, false)}
                      className="mr-20 bg-[#4a154b] text-white font-bold border border-[#4a154b] px-6 py-1 hover:text-[#4a154b] hover:bg-white rounded-lg"
                    >
                      Decline
                    </button>
                  </div>
                )}

                <div className="text-blue-500">{notify.created_at}</div>
              </div>
              {notify.isUnread && (
                <div className="w-3 h-3 m-2 p-1 rounded-full bg-[#d12b26]"></div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TutorNotification;
