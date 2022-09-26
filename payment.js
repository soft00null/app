var instance = new Razorpay({ key_id: 'rzp_live_JTTAr6hqXptcYD', key_secret: '6LL1uwsjmvPRBgBP6LAwC2fz' })

instance.paymentLink.create({
  amount: 500,
  currency: "INR",
  accept_partial: true,
  first_min_partial_amount: 100,
  description: "For XYZ purpose",
  customer: {
    name: "Gaurav Kumar",
    email: "gaurav.kumar@example.com",
    contact: "+919999999999"
  },
  notify: {
    sms: true,
    email: true
  },
  reminder_enable: true,
  notes: {
    policy_name: "Jeevan Bima"
  },
  callback_url: "https://example-callback-url.com/",
  callback_method: "get"
})

