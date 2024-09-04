import React, { useState } from 'react';

function PageContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Überprüfen, ob alle Felder ausgefüllt sind
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      return;
    } else {
      // Hier kann man die Logik für den Absenden-Vorgang implementieren
      console.log('Formular wurde abgeschickt:', formData);
      // Fehlermeldung leeren
      setError('');
      // Optional: Setze das Formular zurück
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white mt-6 relative rounded-lg p-4">
      <div className='border-2 border-gray-400 rounded-lg opacity-100 shadow-xl hover:shadow-2xl transition duration-900 ease-in-out relative z-10 py-3 px-6 w-full max-w-lg'>
        <h2 className="mb-6 font-integral_cf text-3xl font-bold text-black">
          Contact Us
        </h2>
        
        <form onSubmit={handleSubmit} className="w-full">
          {error && <p className="mb-2 text-red-500">{error}</p>}
          <div className="mb-4 flex flex-col justify-center">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="rounded-md border border-gray-500 px-4 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-500" />
          </div>
          <div className="mb-4 flex flex-col justify-center">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="rounded-md border border-gray-500 px-4 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-500" />
          </div>
          <div className="mb-4 flex flex-col justify-center">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" className="rounded-md border border-gray-500 px-4 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-500"></textarea>
          </div>
          <button type="submit" className="rounded-md bg-black px-4 py-2 mb-2 font-integral_cf text-white shadow-lg hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PageContact;
