type CartItem2 = {
  name: string;
  price: number;
};
class ShoppingCart2 {
  public items: CartItem[] = []; // Estado privado

  public addItem(item: CartItem): void {
    this.items.push(item);
  }

  public isReadyToPay(): boolean {
    return this.items.length === 0;
  }

  public getItemsTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}

class OrderProcessor2 {
  public processOrder(cart: ShoppingCart2): void {
    if (cart.isReadyToPay()) { //No se accede a su estado
      throw new Error("¡Empty cart!");
    }

    // Lógica de la clase 👍
    this.generateInvoice(cart.getItemsTotalPrice());
    this.sendConfirmation();
  }

  private generateInvoice(amount: number): void {
    console.log("invoice generated for amount", amount);
  }

  private sendConfirmation(): void {
    console.log("Confirmation has been sent");
  }
}
