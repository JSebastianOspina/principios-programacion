namespace WithoutTDA {
  type CartItem = {
    name: string;
    price: number;
  };
  class ShoppingCart {
    public items: CartItem[] = []; // Estado privado

    public getItems(): CartItem[] {
      // so so 🤔
      return this.items;
    }

    public addItem(item: CartItem): void {
      this.items.push(item);
    }
  }

  class OrderProcessor {
    public processOrder(cart: ShoppingCart): void {
      const cartItems = cart.getItems();

      // Pregunta por el estado interno del carrito para hacer validaciones (viola TDA) 👎
      if (cartItems.length === 0) {
        throw new Error("¡Empty cart!");
      }

      // Lógica para procesar la orden acoplándose a la implementación del carrito 🚫
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price,
        0
      );

      // Lógica de la clase 👍
      this.generateInvoice(totalPrice);
      this.sendConfirmation();
    }

    private generateInvoice(amount: number): void {
      console.log("invoice generated for amount", amount);
    }

    private sendConfirmation(): void {
      console.log("Confirmation has been sent");
    }
  }
}
