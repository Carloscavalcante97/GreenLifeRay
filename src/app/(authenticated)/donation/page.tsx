'use client';
import { useEffect, useState } from 'react';
import { Donation } from '@/commom/types/donations';
import { Users } from '@/commom/types/users';

export default function Donations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [userMap, setUserMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Fetch all donations
    fetch('https://db-liferay.onrender.com/donations')
      .then((response) => response.json())
      .then((data) => setDonations(data));

    // Fetch all users
    fetch('https://db-liferay.onrender.com/users')
      .then((response) => response.json())
      .then((users) => {
        const userMap = users.reduce((acc: { [key: string]: string }, user: Users) => {
          acc[user.id] = user.name;
          return acc;
        }, {});
        setUserMap(userMap);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center py-12 px-16 gap-10">
      <h1 className="text-liferayBlue font-bold text-3xl">Doações</h1>
      {donations.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-start py-2 px-4 border-b text-black">Usuário</th>
              <th className="text-start py-2 px-4 border-b text-black">Material</th>
              <th className="text-start py-2 px-4 border-b text-black">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td className="py-2 px-4 border-b text-black">{userMap[donation.userId]}</td>
                <td className="py-2 px-4 border-b text-black">{donation.title}</td>
                <td className="py-2 px-4 border-b text-black">{donation.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-black'>Nenhum material foi doado ainda</p>
      )}
    </div>
  );
}