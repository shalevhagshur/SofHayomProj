// navigationTypes.ts

export type RootStackParamList = {
    ProductManagement: undefined; // No parameters for ProductManagement screen
    AddProduct: undefined; // Add parameters if needed for AddProduct screen
    EditProduct: { productId: number }; // Assuming EditProduct needs a productId
  };
  