import { toast } from 'react-tiny-toast';

export function notifyUser(customMessage) {
    toast.show(customMessage, { timeout: 1500 })
}