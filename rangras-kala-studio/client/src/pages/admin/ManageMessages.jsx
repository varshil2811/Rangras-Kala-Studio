import { FiTrash2, FiMail } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get('https://rangras-kala-studio.onrender.com/api/messages');
      setMessages(data);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (id) => {
    try {
      await axios.put(`https://rangras-kala-studio.onrender.com/api/messages/${id}/read`);
      fetchMessages();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`https://rangras-kala-studio.onrender.com/api/messages/${id}`);
        toast.success('Message deleted');
        fetchMessages();
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold text-primary mb-8">Contact Messages</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No messages yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {messages.map(msg => (
              <li key={msg._id} className={`p-6 ${!msg.isRead ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={`text-lg ${!msg.isRead ? 'font-bold' : 'font-medium'} text-primary`}>
                      {msg.name} {!msg.isRead && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-white">New</span>}
                    </h3>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                  </div>
                  <span className="text-sm text-gray-500">{msg.date}</span>
                </div>
                <p className="text-gray-700 mt-3 mb-4">{msg.message}</p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => toggleReadStatus(msg._id)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                  <div className="flex space-x-4">
                    <a href={`mailto:${msg.email}`} className="text-gray-500 hover:text-primary"><FiMail className="w-5 h-5" /></a>
                    <button onClick={() => handleDelete(msg._id)} className="text-red-500 hover:text-red-700"><FiTrash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageMessages;
