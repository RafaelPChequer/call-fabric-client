import React, { useState } from 'react';
import { useAuth } from '../state/AuthState.js';
import { ListItem } from './ListItem.js';
import { ButtonGroup } from './ButtonGroup.js';
import { AddressEntry, DirectoryProps } from '../types/Address.js';

const Directory: React.FC<DirectoryProps> = ({ onSelectAddress, onAddressStatusChange }) => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Map<string, AddressEntry[]>>(
    new Map(
      JSON.parse(localStorage.getItem('userAddresses') || '[]').map(
        ([username, addrList]: [string, AddressEntry[]]) => [
          username,
          addrList.map((entry: AddressEntry) => ({
            address: entry.address,
            status: entry.status || 'unused',
          })),
        ]
      )
    )
  );
  const [newAddress, setNewAddress] = useState('');

  React.useEffect(() => {
    localStorage.setItem(
      'userAddresses',
      JSON.stringify(
        Array.from(addresses.entries()).map(([username, addrList]) => [
          username,
          addrList.map((entry) => ({ address: entry.address, status: entry.status })),
        ])
      )
    );
  }, [addresses]);

  const addAddress = () => {
    if (!newAddress || !user?.id) return;

    const updatedAddresses = new Map(addresses);
    const userAddresses = updatedAddresses.get(user.id) || [];
    if (!userAddresses.some((entry) => entry.address === newAddress)) {
      userAddresses.push({ address: newAddress, status: 'unused' });
      updatedAddresses.set(user.id, userAddresses);
      setAddresses(updatedAddresses);
      setNewAddress('');
    }
  };

  const deleteAddress = (addressToDelete: string) => {
    if (!user?.id) return;
    const updatedAddresses = new Map(addresses);
    const userAddresses = updatedAddresses.get(user.id) || [];
    const filteredAddresses = userAddresses.filter((entry) => entry.address !== addressToDelete);

    if (filteredAddresses.length === 0) {
      updatedAddresses.delete(user.id);
    } else {
      updatedAddresses.set(user.id, filteredAddresses);
    }
    setAddresses(updatedAddresses);
  };

  const handleCall = (address: string) => {
    if (!user?.id) return;

    // Type assertion to ensure TypeScript knows this is a function
    if (typeof onSelectAddress === 'function') {
      onSelectAddress(address, user.id);
    } else {
      console.error('onSelectAddress is not a function');
      return;
    }

    if (onAddressStatusChange && typeof onAddressStatusChange === 'function') {
      onAddressStatusChange(user.id, address, 'used');
    }
  };

  const currentUserAddresses = addresses.get(user?.id || '') || [];

  return (
    <div className="card p-4 bg-white rounded border border-gray-300">
      <h2 className="font-bold text-xl pb-4">Directory</h2>

      <div className="mb-4 h-24 overflow-y-auto">
        {currentUserAddresses.length > 0 ? (
          currentUserAddresses.map((entry, index) => (
            <ListItem key={`${user?.id}-${index}`}>
              <div className="flex justify-between items-center w-full">
                <span>
                  {entry.address}
                  <span className="text-sm text-gray-500"> ({entry.status})</span>
                </span>
                <ButtonGroup
                  buttons={[
                    {
                      label: 'Call',
                      onClick: () => handleCall(entry.address),
                      className: 'bg-green-800 text-white px-2 py-1 rounded hover:bg-green-700',
                    },
                    {
                      label: 'Delete',
                      onClick: () => deleteAddress(entry.address),
                      className: 'bg-red-800 text-white px-2 py-1 rounded hover:bg-red-700',
                    },
                  ]}
                />
              </div>
            </ListItem>
          ))
        ) : (
          <p>No addresses found</p>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="New Address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="border border-gray-200 rounded w-full mb-2"
        />
        <button
          onClick={addAddress}
          className="bg-green-800 text-white px-4 rounded w-full hover:bg-green-700"
        >
          Add Address
        </button>
      </div>
    </div>
  );
};

export default Directory;
