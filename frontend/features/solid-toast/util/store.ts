import type { Toast } from './toast';

export type Action =
  | {
      type: "ADD_TOAST$";
      toast: Toast;
    }
  | {
      type: "UPSERT_TOAST$";
      toast: Toast;
    }
  | {
      type: "UPDATE_TOAST$";
      toast: Partial<Toast>;
    }
  | {
      type: "DISMISS_TOAST$";
      toastId?: string;
    }
  | {
      type: "REMOVE_TOAST$";
      toastId?: string;
    }
  | {
      type: "START_PAUSE$";
      time: number;
    }
  | {
      type: "END_PAUSE$";
      time: number;
    };
// ...
export interface State {
  toasts: Toast[];
  pausedAt: number | undefined;
}