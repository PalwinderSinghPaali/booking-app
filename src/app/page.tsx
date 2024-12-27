"use client"
import { useEffect, useState } from 'react';
import { useApi } from "@/hooks/useAPI";
import useTitle from "@/hooks/useTitle";
import { toasterError, toasterSuccess } from '@/components/core/Toaster';

export default function Home() {
  useTitle("Home");
  const { API } = useApi();

  const [name, setName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [bookedSlots, setBookedSlots] = useState<any>([]);
  const [availableSlots, setAvailableSlots] = useState<any>([]);
  const [error, setError] = useState('');

  useEffect(() => {
        getAllSlots();
        getBookedSlots();
  }, [])

  const getAllSlots = async () => {
    const { success, error, data } = await API.get(`slot/get-all-slots`);
    if (success) {
      setAvailableSlots(data)
    }
    else {
        toasterError(error);
    }
  };

  const getBookedSlots = async () => {
    const { success, error, data } = await API.get(`booking/get-all-bookings`);
    if (success) {
       setBookedSlots(data)
    }
    else {
        toasterError(error);
    }
  };
  

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBooking = async () => {
    try {
      
    setError('');

    if (!name || !email || !selectedSlot) {
      setError('Please fill all the fields');
      return;
    }

    if (!isEmailValid(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const { success,data, error } = await API.post("booking/create-booking", {
      name, email, slotId: Number(selectedSlot)
    });

      if (success) {
          setBookedSlots((prev: any) => ({
              ...prev,
              data
          }));
          setName('');
          setEmail('');
          setSelectedSlot(null);
        toasterSuccess("Booked Slot SuccessFully !", 2000, "id")              
      } else {
          toasterError(error || "Failed to book slot");
      }
    
    } catch (err) {
      console.log("Error:", err);
      toasterError("An error occurred while booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Book Your Slot</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Slots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availableSlots.map((slot: any) => (
              <div
                key={slot.id}
                className={`p-4 bg-gray-200 rounded-lg text-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-200 ${
                  Number(selectedSlot) === slot.id ? 'bg-blue-500 text-white' : ''
                } ${slot.is_booked ? 'bg-gray-300 cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (!slot.is_booked) setSelectedSlot(slot.id);
                }}
                style={{
                  pointerEvents: slot.is_booked ? 'none' : 'auto',
                }}
              >
                {slot.time}
              </div>
            ))}
          </div>
        </div>

        {selectedSlot && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Enter Your Details</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-600 font-semibold">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-600 font-semibold">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-200"
                onClick={handleBooking}
              >
                Book Slot
              </button>
            </form>
          </div>
        )}
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {bookedSlots.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Booked Slots</h2>
            <div className="space-y-4">
              {bookedSlots.map((booking: any, index: number) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <p className="font-semibold text-gray-800">{booking.name}</p>
                  <p className="text-gray-600">{booking.email}</p>
                  <p className="mt-2 text-blue-500">{booking.slot.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
