import { toast } from 'sonner'

interface ToastFunctions {
  toast: typeof toast;
  dismiss: typeof toast.dismiss;
  error: (message: string) => string | number;
  success: (message: string) => string | number;
  warning: (message: string) => string | number;
}

export const useToast = (): ToastFunctions => {
  return {
    toast,
    dismiss: toast.dismiss,
    error: (message: string): string | number => 
      toast.error(message, {
        style: { background: '#DC2626', color: 'white' }
      }),
    success: (message: string): string | number =>
      toast.success(message, {
        style: { background: '#059669', color: 'white' }
      }),
    warning: (message: string): string | number =>
      toast.warning(message, {
        style: { background: '#D97706', color: 'white' }
      }),
  }
}