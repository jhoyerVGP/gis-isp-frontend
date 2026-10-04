import { getFriendlyErrorMessage } from "@/utils/errorHandler";
import { toast } from "sonner";

export const useToastPromise = () => {
  const execute = <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
    },
    params?: {
      duration?: number;
      position?:
        | "top-right"
        | "top-center"
        | "top-left"
        | "bottom-right"
        | "bottom-center"
        | "bottom-left";
    },
  ): Promise<T> => {
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: (error) => getFriendlyErrorMessage(error),
      duration: params?.duration ?? 4000,
      position: params?.position ?? "top-right",
    });

    return promise;
  };

  return { execute };
};
