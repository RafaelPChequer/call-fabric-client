import { Prettify } from '../utils/Prettify.js';

export type AddressEntry = Prettify<{
    address: string;
    status: 'unused' | 'used' | 'error';
}>;

export type DirectoryProps = Prettify<{
    onSelectAddress: (address: string, username: string) => void;
    onAddressStatusChange?: (username: string, address: string, status: 'used' | 'error') => void;
}>;