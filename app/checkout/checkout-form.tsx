'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';

export default function CheckoutForm() {
  const { items: cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    saveInfo: true,
  });

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        // Other fields would be filled if we had them in the user object
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.warning('Cart is empty', {
        className: 'bg-red-500 text-white',
        icon: '😞',
      });

      return;
    }

    setIsSubmitting(true);

    // Simulate processing payment
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('Order placed successfully!', {
      description:
        'Thank you for your purchase. You will receive a confirmation email shortly.',
      className: 'bg-green-500 text-white',
      icon: '🎉',
    });

    clearCart();
    // Add this line to set the order placed flag
    sessionStorage.setItem('orderPlaced', 'true');
    setIsSubmitting(false);
    router.push('/order-confirmation');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2">
        {!user && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Account</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">
                  Already have an account?
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/sign-in')}
                >
                  Sign In
                </Button>
              </div>
            </div>
            <p className="text-zinc-400 mb-4">
              Create an account for faster checkout and to track your orders.
            </p>
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">
                  Logged in as {user.email}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="bg-zinc-800 border-zinc-700"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="bg-zinc-800 border-zinc-700"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                className="bg-zinc-800 border-zinc-700"
                required
                value={formData.email}
                onChange={handleInputChange}
                readOnly={!!user}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                className="bg-zinc-800 border-zinc-700"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Main St"
                className="bg-zinc-800 border-zinc-700"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  className="bg-zinc-800 border-zinc-700"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  className="bg-zinc-800 border-zinc-700"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  placeholder="10001"
                  className="bg-zinc-800 border-zinc-700"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {user && (
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="saveInfo"
                  checked={formData.saveInfo}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      saveInfo: checked === true,
                    }))
                  }
                />
                <Label htmlFor="saveInfo" className="text-sm cursor-pointer">
                  Save this information for next time
                </Label>
              </div>
            )}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

          {user && (
            <div className="mb-4 p-3 border border-zinc-800 rounded-md bg-zinc-800/50">
              <h3 className="text-sm font-medium mb-2">
                Saved Payment Methods
              </h3>
              <RadioGroup defaultValue="saved-card" className="space-y-2">
                <div className="flex items-center space-x-2 rounded-md border border-zinc-700 p-2 bg-zinc-800">
                  <RadioGroupItem value="saved-card" id="saved-card" />
                  <Label htmlFor="saved-card" className="flex-1 cursor-pointer">
                    <div className="flex justify-between">
                      <span>•••• •••• •••• 4242</span>
                      <span className="text-zinc-400 text-sm">
                        Expires 12/25
                      </span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border border-dashed border-zinc-700 p-2">
                  <RadioGroupItem value="new-card" id="new-card" />
                  <Label
                    htmlFor="new-card"
                    className="flex-1 cursor-pointer text-zinc-400"
                  >
                    Add new payment method
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {(!user || true) && (
            <>
              <RadioGroup defaultValue="card" className="space-y-3">
                <div className="flex items-center space-x-2 rounded-md border border-zinc-800 p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit Card
                  </Label>
                  <div className="flex space-x-1">
                    <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center">
                      <span className="text-xs">Visa</span>
                    </div>
                    <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center">
                      <span className="text-xs">MC</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rounded-md border border-zinc-800 p-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                    PayPal
                  </Label>
                  <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center">
                    <span className="text-xs">PP</span>
                  </div>
                </div>
              </RadioGroup>

              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                </div>

                {user && (
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="savePayment" />
                    <Label
                      htmlFor="savePayment"
                      className="text-sm cursor-pointer"
                    >
                      Save this payment method for future purchases
                    </Label>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 sticky top-24">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="max-h-80 overflow-y-auto mb-4">
            {cartItems.length === 0 ? (
              <p className="text-zinc-400 text-center py-4">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-3 pb-3 border-b border-zinc-800"
                  >
                    <div className="w-16 h-16 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        width={64}
                        height={64}
                        alt={item.productId}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.productId}</h4>
                      <p className="text-zinc-400 text-xs">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm">
                        ${formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 py-4 border-t border-zinc-800">
            <div className="flex justify-between">
              <span className="text-zinc-400">Subtotal</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Shipping</span>
              <span>${formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Tax</span>
              <span>${formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t border-zinc-800">
              <span>Total</span>
              <span>${formatPrice(total)}</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            disabled={isSubmitting || cartItems.length === 0}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </Button>

          {user && (
            <div className="mt-4 text-center text-xs text-zinc-400">
              Your order will be processed using your account information.
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
