import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Card } from "@/components/ui/card";
  
  export function FAQSection() {
    return (
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Card className="p-6 shadow-lg rounded-2xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept Visa, MasterCard, PayPal, Apple Pay, and Google Pay.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>
                Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
              <AccordionContent>
                Yes, we ship worldwide! Shipping rates and times vary depending on location.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I return or exchange an item?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer a 30-day return and exchange policy. Items must be unused and in original packaging.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I track my order?</AccordionTrigger>
              <AccordionContent>
                Once your order is shipped, you will receive a tracking number via email.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>What if I receive a damaged or defective item?</AccordionTrigger>
              <AccordionContent>
                Contact our support team within 7 days of delivery for a replacement or refund.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>Do you offer discounts or promotions?</AccordionTrigger>
              <AccordionContent>
                Yes! Subscribe to our newsletter to get exclusive discounts and offers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>How do I change or cancel my order?</AccordionTrigger>
              <AccordionContent>
                Orders can be modified or canceled within 12 hours of placement. Contact support as soon as possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
              <AccordionContent>
                Yes, we use SSL encryption and secure payment gateways to protect your data.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>Do you have a loyalty or rewards program?</AccordionTrigger>
              <AccordionContent>
                Yes! Earn points with every purchase and redeem them for discounts.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    );
  }