'use client';

import { useState } from 'react';
import { MapPin, Plus, MoreVertical, Edit2, Trash2, CheckCircle2, UploadCloud, X } from 'lucide-react';

interface Address {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'Home',
      firstName: 'John',
      lastName: 'Doe',
      street: '123 E-commerce Blvd',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States',
      isDefault: true,
    },
    {
      id: '2',
      type: 'Work',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Tech Corp',
      street: '456 Startup Way, Suite 100',
      city: 'Austin',
      state: 'TX',
      zip: '73301',
      country: 'United States',
      isDefault: false,
    }
  ]);
  
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const emptyAddress: Address = {
    id: '', type: 'Home', firstName: '', lastName: '', street: '', city: '', state: '', zip: '', country: '', isDefault: false
  };
  const [formData, setFormData] = useState<Address>(emptyAddress);

  const deleteAddress = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(a => a.id !== id));
    }
    setActiveMenuId(null);
  };

  const setDefault = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    setActiveMenuId(null);
  };

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setAddresses([...addresses, {
        id: Date.now().toString(),
        type: 'Imported',
        firstName: 'Jane',
        lastName: 'Smith',
        street: '789 Import Ave',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States',
        isDefault: false,
      }]);
      setIsImporting(false);
      alert('Address imported successfully!');
    }, 1500);
  };

  const openCreateModal = () => {
    setEditingAddress(null);
    setFormData(emptyAddress);
    setIsModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    setFormData(address);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const saveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(addresses.map(a => a.id === editingAddress.id ? formData : a));
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Address Book</h1>
          <p className="text-gray-500">Manage your shipping and billing addresses.</p>
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <button 
            onClick={handleImport}
            disabled={isImporting}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isImporting ? (
              <span className="w-5 h-5 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin mr-2" />
            ) : (
              <UploadCloud className="w-4 h-4 mr-2" />
            )}
            Import Address
          </button>
          <button onClick={openCreateModal} className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-gray-900 transition-colors">
            <Plus className="w-4 h-4 mr-2" /> Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map(address => (
          <div key={address.id} className={`bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border-2 shadow-sm relative ${address.isDefault ? 'border-purple-600 dark:border-purple-500' : 'border-gray-100 dark:border-gray-800'}`}>
            
            {address.isDefault && (
              <div className="absolute -top-3 left-6 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Default Address
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mr-3 text-gray-500 dark:text-gray-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{address.type}</h2>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setActiveMenuId(activeMenuId === address.id ? null : address.id)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>

                {activeMenuId === address.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-10">
                    <button onClick={() => openEditModal(address)} className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Edit2 className="w-4 h-4 mr-3 text-gray-400" /> Edit Address
                    </button>
                    {!address.isDefault && (
                      <button onClick={() => setDefault(address.id)} className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <CheckCircle2 className="w-4 h-4 mr-3 text-gray-400" /> Set as Default
                      </button>
                    )}
                    <button onClick={() => deleteAddress(address.id)} className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-t border-gray-100 dark:border-gray-700">
                      <Trash2 className="w-4 h-4 mr-3" /> Delete Address
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1 text-gray-600 dark:text-gray-300 text-sm">
              <p className="font-medium text-gray-900 dark:text-white">{address.firstName} {address.lastName}</p>
              {address.company && <p>{address.company}</p>}
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.country}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
              <h3 className="text-xl font-bold">{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveAddress} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <input required value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Zip / Postal Code</label>
                  <input required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-medium rounded-lg hover:bg-gray-900 transition-colors">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
