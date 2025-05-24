import React from 'react';
import { motion } from 'framer-motion';
import { Address } from '../../types';

interface AddressFormProps {
  type: 'shipping' | 'billing';
  address: Address;
  onChange: (address: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ type, address, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...address, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={address.firstName}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={address.lastName}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          type="text"
          name="streetAddress"
          value={address.streetAddress}
          onChange={handleChange}
          className="input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Apartment, suite, etc. (optional)
        </label>
        <input
          type="text"
          name="apartment"
          value={address.apartment || ''}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;