import toast from 'react-hot-toast';

export const useToasts = () => {
  return {
    setToast: ({ text, type, delay }: { text: string; type: 'success' | 'error'; delay: number }) => {
      toast[type](text, { duration: delay });
    }
  };
};
