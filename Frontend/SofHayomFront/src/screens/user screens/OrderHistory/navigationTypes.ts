// navigationTypes.ts

export type RootStackParamList = {
    navigate(arg0: string, arg1: { orderId: number; }): unknown;
    OrderHistory: undefined;
    OrderDetail: { orderId: number };
    // Add other screen types if needed
  };
  