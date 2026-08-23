require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const TIMEZONES = [
  { identifier: 'UTC', name: 'Coordinated Universal Time', utcOffset: '+00:00', observesDst: false },
  { identifier: 'Africa/Abidjan', name: 'Greenwich Mean Time', utcOffset: '+00:00', observesDst: false },
  { identifier: 'Africa/Accra', name: 'Ghana Time', utcOffset: '+00:00', observesDst: false },
  { identifier: 'Africa/Cairo', name: 'Eastern European Time', utcOffset: '+02:00', observesDst: true },
  { identifier: 'Africa/Casablanca', name: 'Morocco Time', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Africa/Johannesburg', name: 'South Africa Standard Time', utcOffset: '+02:00', observesDst: false },
  { identifier: 'Africa/Lagos', name: 'West Africa Time', utcOffset: '+01:00', observesDst: false },
  { identifier: 'Africa/Nairobi', name: 'East Africa Time', utcOffset: '+03:00', observesDst: false },
  { identifier: 'Africa/Tunis', name: 'Central European Time', utcOffset: '+01:00', observesDst: false },

  { identifier: 'America/Anchorage', name: 'Alaska Time', utcOffset: '-09:00', observesDst: true },
  { identifier: 'America/Argentina/Buenos_Aires', name: 'Argentina Time', utcOffset: '-03:00', observesDst: false },
  { identifier: 'America/Bogota', name: 'Colombia Time', utcOffset: '-05:00', observesDst: false },
  { identifier: 'America/Caracas', name: 'Venezuela Time', utcOffset: '-04:00', observesDst: false },
  { identifier: 'America/Chicago', name: 'Central Time', utcOffset: '-06:00', observesDst: true },
  { identifier: 'America/Denver', name: 'Mountain Time', utcOffset: '-07:00', observesDst: true },
  { identifier: 'America/Detroit', name: 'Eastern Time - Detroit', utcOffset: '-05:00', observesDst: true },
  { identifier: 'America/Halifax', name: 'Atlantic Time', utcOffset: '-04:00', observesDst: true },
  { identifier: 'America/Los_Angeles', name: 'Pacific Time', utcOffset: '-08:00', observesDst: true },
  { identifier: 'America/Mexico_City', name: 'Central Mexico Time', utcOffset: '-06:00', observesDst: false },
  { identifier: 'America/Montevideo', name: 'Uruguay Time', utcOffset: '-03:00', observesDst: false },
  { identifier: 'America/New_York', name: 'Eastern Time', utcOffset: '-05:00', observesDst: true },
  { identifier: 'America/Phoenix', name: 'Arizona Time', utcOffset: '-07:00', observesDst: false },
  { identifier: 'America/Santiago', name: 'Chile Time', utcOffset: '-04:00', observesDst: true },
  { identifier: 'America/Sao_Paulo', name: 'Brasilia Time', utcOffset: '-03:00', observesDst: false },
  { identifier: 'America/St_Johns', name: 'Newfoundland Time', utcOffset: '-03:30', observesDst: true },
  { identifier: 'America/Toronto', name: 'Eastern Time - Toronto', utcOffset: '-05:00', observesDst: true },
  { identifier: 'America/Vancouver', name: 'Pacific Time - Vancouver', utcOffset: '-08:00', observesDst: true },

  { identifier: 'Antarctica/McMurdo', name: 'New Zealand Time - Antarctica', utcOffset: '+12:00', observesDst: true },

  { identifier: 'Asia/Almaty', name: 'Almaty Time', utcOffset: '+05:00', observesDst: false },
  { identifier: 'Asia/Amman', name: 'Jordan Time', utcOffset: '+03:00', observesDst: true },
  { identifier: 'Asia/Baghdad', name: 'Arabian Time', utcOffset: '+03:00', observesDst: false },
  { identifier: 'Asia/Baku', name: 'Azerbaijan Time', utcOffset: '+04:00', observesDst: false },
  { identifier: 'Asia/Bangkok', name: 'Indochina Time', utcOffset: '+07:00', observesDst: false },
  { identifier: 'Asia/Beirut', name: 'Lebanon Time', utcOffset: '+02:00', observesDst: true },
  { identifier: 'Asia/Colombo', name: 'Sri Lanka Standard Time', utcOffset: '+05:30', observesDst: false },
  { identifier: 'Asia/Dhaka', name: 'Bangladesh Standard Time', utcOffset: '+06:00', observesDst: false },
  { identifier: 'Asia/Dubai', name: 'Gulf Standard Time', utcOffset: '+04:00', observesDst: false },
  { identifier: 'Asia/Ho_Chi_Minh', name: 'Indochina Time - Vietnam', utcOffset: '+07:00', observesDst: false },
  { identifier: 'Asia/Hong_Kong', name: 'Hong Kong Time', utcOffset: '+08:00', observesDst: false },
  { identifier: 'Asia/Jakarta', name: 'Western Indonesia Time', utcOffset: '+07:00', observesDst: false },
  { identifier: 'Asia/Jerusalem', name: 'Israel Time', utcOffset: '+02:00', observesDst: true },
  { identifier: 'Asia/Kabul', name: 'Afghanistan Time', utcOffset: '+04:30', observesDst: false },
  { identifier: 'Asia/Karachi', name: 'Pakistan Standard Time', utcOffset: '+05:00', observesDst: false },
  { identifier: 'Asia/Kathmandu', name: 'Nepal Time', utcOffset: '+05:45', observesDst: false },
  { identifier: 'Asia/Kolkata', name: 'India Standard Time', utcOffset: '+05:30', observesDst: false },
  { identifier: 'Asia/Kuala_Lumpur', name: 'Malaysia Time', utcOffset: '+08:00', observesDst: false },
  { identifier: 'Asia/Kuwait', name: 'Arabian Standard Time', utcOffset: '+03:00', observesDst: false },
  { identifier: 'Asia/Manila', name: 'Philippine Standard Time', utcOffset: '+08:00', observesDst: false },
  { identifier: 'Asia/Muscat', name: 'Gulf Standard Time - Oman', utcOffset: '+04:00', observesDst: false },
  { identifier: 'Asia/Riyadh', name: 'Arabia Standard Time', utcOffset: '+03:00', observesDst: false },
  { identifier: 'Asia/Seoul', name: 'Korea Standard Time', utcOffset: '+09:00', observesDst: false },
  { identifier: 'Asia/Shanghai', name: 'China Standard Time', utcOffset: '+08:00', observesDst: false },
  { identifier: 'Asia/Singapore', name: 'Singapore Standard Time', utcOffset: '+08:00', observesDst: false },
  { identifier: 'Asia/Taipei', name: 'Taipei Standard Time', utcOffset: '+08:00', observesDst: false },
  { identifier: 'Asia/Tashkent', name: 'Uzbekistan Time', utcOffset: '+05:00', observesDst: false },
  { identifier: 'Asia/Tehran', name: 'Iran Time', utcOffset: '+03:30', observesDst: false },
  { identifier: 'Asia/Tokyo', name: 'Japan Standard Time', utcOffset: '+09:00', observesDst: false },
  { identifier: 'Asia/Ulaanbaatar', name: 'Ulaanbaatar Time', utcOffset: '+08:00', observesDst: false },
  { identifier: 'Asia/Yangon', name: 'Myanmar Time', utcOffset: '+06:30', observesDst: false },
  { identifier: 'Asia/Yerevan', name: 'Armenia Time', utcOffset: '+04:00', observesDst: false },

  { identifier: 'Atlantic/Azores', name: 'Azores Time', utcOffset: '-01:00', observesDst: true },
  { identifier: 'Atlantic/Reykjavik', name: 'Greenwich Mean Time - Iceland', utcOffset: '+00:00', observesDst: false },

  { identifier: 'Australia/Adelaide', name: 'Australian Central Time', utcOffset: '+09:30', observesDst: true },
  { identifier: 'Australia/Brisbane', name: 'Australian Eastern Time - Queensland', utcOffset: '+10:00', observesDst: false },
  { identifier: 'Australia/Darwin', name: 'Australian Central Time - Northern Territory', utcOffset: '+09:30', observesDst: false },
  { identifier: 'Australia/Hobart', name: 'Australian Eastern Time - Tasmania', utcOffset: '+10:00', observesDst: true },
  { identifier: 'Australia/Melbourne', name: 'Australian Eastern Time - Melbourne', utcOffset: '+10:00', observesDst: true },
  { identifier: 'Australia/Perth', name: 'Australian Western Time', utcOffset: '+08:00', observesDst: false },
  { identifier: 'Australia/Sydney', name: 'Australian Eastern Time', utcOffset: '+10:00', observesDst: true },

  { identifier: 'Europe/Amsterdam', name: 'Central European Time - Amsterdam', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Athens', name: 'Eastern European Time - Athens', utcOffset: '+02:00', observesDst: true },
  { identifier: 'Europe/Berlin', name: 'Central European Time - Berlin', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Brussels', name: 'Central European Time - Brussels', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Bucharest', name: 'Eastern European Time - Bucharest', utcOffset: '+02:00', observesDst: true },
  { identifier: 'Europe/Budapest', name: 'Central European Time - Budapest', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Copenhagen', name: 'Central European Time - Copenhagen', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Dublin', name: 'Ireland Time', utcOffset: '+00:00', observesDst: true },
  { identifier: 'Europe/Helsinki', name: 'Eastern European Time - Helsinki', utcOffset: '+02:00', observesDst: true },
  { identifier: 'Europe/Istanbul', name: 'Turkey Time', utcOffset: '+03:00', observesDst: false },
  { identifier: 'Europe/Lisbon', name: 'Western European Time - Lisbon', utcOffset: '+00:00', observesDst: true },
  { identifier: 'Europe/London', name: 'Greenwich Mean Time', utcOffset: '+00:00', observesDst: true },
  { identifier: 'Europe/Madrid', name: 'Central European Time - Madrid', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Oslo', name: 'Central European Time - Oslo', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Paris', name: 'Central European Time - Paris', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Prague', name: 'Central European Time - Prague', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Rome', name: 'Central European Time - Rome', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Stockholm', name: 'Central European Time - Stockholm', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Vienna', name: 'Central European Time - Vienna', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Warsaw', name: 'Central European Time - Warsaw', utcOffset: '+01:00', observesDst: true },
  { identifier: 'Europe/Zurich', name: 'Central European Time - Zurich', utcOffset: '+01:00', observesDst: true },

  { identifier: 'Indian/Maldives', name: 'Maldives Time', utcOffset: '+05:00', observesDst: false },
  { identifier: 'Indian/Mauritius', name: 'Mauritius Time', utcOffset: '+04:00', observesDst: false },

  { identifier: 'Pacific/Auckland', name: 'New Zealand Time', utcOffset: '+12:00', observesDst: true },
  { identifier: 'Pacific/Fiji', name: 'Fiji Time', utcOffset: '+12:00', observesDst: false },
  { identifier: 'Pacific/Guam', name: 'Chamorro Standard Time', utcOffset: '+10:00', observesDst: false },
  { identifier: 'Pacific/Honolulu', name: 'Hawaii-Aleutian Standard Time', utcOffset: '-10:00', observesDst: false },
  { identifier: 'Pacific/Noumea', name: 'New Caledonia Time', utcOffset: '+11:00', observesDst: false },
  { identifier: 'Pacific/Port_Moresby', name: 'Papua New Guinea Time', utcOffset: '+10:00', observesDst: false },
  { identifier: 'Pacific/Tahiti', name: 'Tahiti Time', utcOffset: '-10:00', observesDst: false }
];

const TAX_CATEGORIES = [
  ['GST', 'Goods and Services Tax', 'Standard GST'],
  ['CGST', 'Central Goods and Services Tax', 'Central GST component'],
  ['SGST', 'State Goods and Services Tax', 'State GST component'],
  ['IGST', 'Integrated Goods and Services Tax', 'Integrated GST for interstate transactions'],
  ['UTGST', 'Union Territory Goods and Services Tax', 'UT GST component'],
  ['VAT', 'Value Added Tax', 'Standard VAT'],
  ['SALES_TAX', 'Sales Tax', 'General sales tax'],
  ['USE_TAX', 'Use Tax', 'Use tax'],
  ['EXCISE', 'Excise Tax', 'Excise duty'],
  ['CUSTOMS', 'Customs Duty', 'Import customs duty'],
  ['SERVICE_TAX', 'Service Tax', 'Service tax category'],
  ['ZERO_RATED', 'Zero Rated', 'Zero rated tax items'],
  ['EXEMPT', 'Exempt', 'Tax exempt items'],
  ['NON_TAXABLE', 'Non Taxable', 'Non-taxable items'],
  ['OUT_OF_SCOPE', 'Out of Scope', 'Outside the scope of taxation']
].map(([code, name, description]) => ({ code, name, description }));

const ORDER_STATUSES = [
  ['DRAFT', 'Draft'], ['PENDING', 'Pending'], ['AWAITING_PAYMENT', 'Awaiting Payment'],
  ['CONFIRMED', 'Confirmed'], ['PROCESSING', 'Processing'], ['ON_HOLD', 'On Hold'],
  ['READY_TO_PACK', 'Ready to Pack'], ['PACKED', 'Packed'], ['READY_TO_SHIP', 'Ready to Ship'],
  ['SHIPPED', 'Shipped'], ['IN_TRANSIT', 'In Transit'], ['OUT_FOR_DELIVERY', 'Out for Delivery'],
  ['DELIVERED', 'Delivered'], ['PARTIALLY_DELIVERED', 'Partially Delivered'],
  ['CANCELLED', 'Cancelled'], ['RETURN_REQUESTED', 'Return Requested'], ['RETURNED', 'Returned'],
  ['REFUND_REQUESTED', 'Refund Requested'], ['REFUNDED', 'Refunded'], ['FAILED', 'Failed'],
  ['FRAUD_REVIEW', 'Fraud Review'], ['COMPLETED', 'Completed']
].map(([code, name]) => ({ code, name }));

const PAYMENT_STATUSES = [
  ['PENDING', 'Pending'], ['INITIATED', 'Initiated'], ['PROCESSING', 'Processing'],
  ['AUTHORIZED', 'Authorized'], ['CAPTURED', 'Captured'], ['PAID', 'Paid'],
  ['PARTIALLY_PAID', 'Partially Paid'], ['FAILED', 'Failed'], ['DECLINED', 'Declined'],
  ['CANCELLED', 'Cancelled'], ['EXPIRED', 'Expired'], ['REFUND_PENDING', 'Refund Pending'],
  ['REFUNDED', 'Refunded'], ['PARTIALLY_REFUNDED', 'Partially Refunded'],
  ['CHARGEBACK', 'Chargeback'], ['DISPUTED', 'Disputed']
].map(([code, name]) => ({ code, name }));

const FULFILLMENT_STATUSES = [
  ['UNFULFILLED', 'Unfulfilled'], ['PARTIALLY_FULFILLED', 'Partially Fulfilled'],
  ['FULFILLMENT_PENDING', 'Fulfillment Pending'], ['READY_TO_PICK', 'Ready to Pick'],
  ['PICKING', 'Picking'], ['PICKED', 'Picked'], ['PACKING', 'Packing'],
  ['PACKED', 'Packed'], ['READY_TO_SHIP', 'Ready to Ship'], ['FULFILLED', 'Fulfilled'],
  ['IN_TRANSIT', 'In Transit'], ['DELIVERED', 'Delivered'], ['CANCELLED', 'Cancelled'],
  ['RETURNED', 'Returned']
].map(([code, name]) => ({ code, name }));

const PRODUCT_STATUSES = [
  ['DRAFT', 'Draft'], ['ACTIVE', 'Active'], ['INACTIVE', 'Inactive'], ['ARCHIVED', 'Archived'],
  ['SCHEDULED', 'Scheduled'], ['OUT_OF_STOCK', 'Out of Stock'], ['LOW_STOCK', 'Low Stock'],
  ['DISCONTINUED', 'Discontinued'], ['COMING_SOON', 'Coming Soon'], ['PRE_ORDER', 'Pre Order'],
  ['BACKORDER', 'Backorder'], ['REJECTED', 'Rejected']
].map(([code, name]) => ({ code, name }));

const UNITS = [
  ['PC', 'Piece'], ['PCS', 'Pieces'], ['EA', 'Each'], ['BOX', 'Box'], ['PACK', 'Pack'],
  ['SET', 'Set'], ['DZ', 'Dozen'], ['PAIR', 'Pair'], ['CASE', 'Case'], ['CARTON', 'Carton'],
  ['BUNDLE', 'Bundle'], ['KIT', 'Kit'], ['ROLL', 'Roll'], ['BOTTLE', 'Bottle'],
  ['CAN', 'Can'], ['JAR', 'Jar'], ['TUBE', 'Tube'], ['BAG', 'Bag'], ['SHEET', 'Sheet'],
  ['METER', 'Meter'], ['LITER', 'Liter'], ['MILLILITER', 'Milliliter']
].map(([code, name]) => ({ code, name }));

const WEIGHT_UNITS = [
  ['KG', 'Kilogram'], ['G', 'Gram'], ['MG', 'Milligram'], ['MCG', 'Microgram'],
  ['LB', 'Pound'], ['OZ', 'Ounce'], ['TON', 'Metric Ton'], ['ST', 'Stone']
].map(([code, name]) => ({ code, name }));

const DIMENSION_UNITS = [
  ['MM', 'Millimeter'], ['CM', 'Centimeter'], ['M', 'Meter'], ['KM', 'Kilometer'],
  ['IN', 'Inch'], ['FT', 'Foot'], ['YD', 'Yard'], ['MI', 'Mile']
].map(([code, name]) => ({ code, name }));

const VOLUME_UNITS = [
  ['ML', 'Milliliter'], ['CL', 'Centiliter'], ['L', 'Liter'], ['M3', 'Cubic Meter'],
  ['GAL', 'Gallon'], ['QT', 'Quart'], ['PT', 'Pint'], ['CUP', 'Cup'], ['FL_OZ', 'Fluid Ounce']
].map(([code, name]) => ({ code, name }));

const PAYMENT_METHODS = [
  ['UPI', 'UPI'], ['UPI_COLLECT', 'UPI Collect'], ['UPI_INTENT', 'UPI Intent'],
  ['CREDIT_CARD', 'Credit Card'], ['DEBIT_CARD', 'Debit Card'], ['PREPAID_CARD', 'Prepaid Card'],
  ['NET_BANKING', 'Net Banking'], ['BANK_TRANSFER', 'Bank Transfer'], ['IMPS', 'IMPS'],
  ['NEFT', 'NEFT'], ['RTGS', 'RTGS'], ['WALLET', 'Digital Wallet'],
  ['PAY_LATER', 'Buy Now Pay Later'], ['EMI', 'EMI'], ['COD', 'Cash on Delivery'],
  ['CASH', 'Cash'], ['CHEQUE', 'Cheque'], ['DEMAND_DRAFT', 'Demand Draft'],
  ['GIFT_CARD', 'Gift Card'], ['STORE_CREDIT', 'Store Credit'], ['CRYPTO', 'Cryptocurrency']
].map(([code, name]) => ({ code, name }));

const PAYMENT_PROVIDERS = [
  ['RAZORPAY', 'Razorpay'], ['STRIPE', 'Stripe'], ['PAYPAL', 'PayPal'],
  ['CASHFREE', 'Cashfree'], ['PAYU', 'PayU'], ['PHONEPE', 'PhonePe Payment Gateway'],
  ['CCAvenue', 'CCAvenue'], ['INSTAMOJO', 'Instamojo'], ['JUSPAY', 'Juspay'],
  ['OPEN_MONEY', 'Open Money'], ['BILLDESK', 'BillDesk'], ['PAYTM', 'Paytm'],
  ['AMAZON_PAY', 'Amazon Pay'], ['GOOGLE_PAY', 'Google Pay'], ['APPLE_PAY', 'Apple Pay'],
  ['BRAINTREE', 'Braintree'], ['ADYEN', 'Adyen'], ['AUTHORIZE_NET', 'Authorize.Net'],
  ['2CHECKOUT', '2Checkout'], ['WORLD_PAY', 'Worldpay'], ['MOLLIE', 'Mollie'],
  ['KLARNA', 'Klarna'], ['AFTERPAY', 'Afterpay']
].map(([code, name]) => ({ code, name }));

const SHIPPING_STATUSES = [
  ['PENDING', 'Pending'], ['LABEL_CREATED', 'Label Created'], ['PICKUP_SCHEDULED', 'Pickup Scheduled'],
  ['PICKED_UP', 'Picked Up'], ['IN_TRANSIT', 'In Transit'], ['ARRIVED_AT_HUB', 'Arrived at Hub'],
  ['OUT_FOR_DELIVERY', 'Out for Delivery'], ['DELIVERED', 'Delivered'],
  ['DELIVERY_ATTEMPTED', 'Delivery Attempted'], ['DELIVERY_FAILED', 'Delivery Failed'],
  ['RTO_INITIATED', 'RTO Initiated'], ['RTO_IN_TRANSIT', 'RTO In Transit'],
  ['RTO_DELIVERED', 'RTO Delivered'], ['LOST', 'Lost'], ['DAMAGED', 'Damaged'],
  ['CANCELLED', 'Cancelled']
].map(([code, name]) => ({ code, name }));

const RETURN_STATUSES = [
  ['NONE', 'No Return'], ['REQUESTED', 'Return Requested'], ['PENDING_REVIEW', 'Pending Review'],
  ['APPROVED', 'Approved'], ['REJECTED', 'Rejected'], ['PICKUP_SCHEDULED', 'Pickup Scheduled'],
  ['PICKED_UP', 'Picked Up'], ['IN_TRANSIT', 'In Transit'], ['RECEIVED', 'Received'],
  ['INSPECTION', 'Under Inspection'], ['ACCEPTED', 'Accepted'],
  ['REFUND_PENDING', 'Refund Pending'], ['REFUNDED', 'Refunded'],
  ['EXCHANGE_PENDING', 'Exchange Pending'], ['EXCHANGED', 'Exchanged'], ['CLOSED', 'Closed']
].map(([code, name]) => ({ code, name }));

const INVENTORY_STATUSES = [
  ['IN_STOCK', 'In Stock'], ['LOW_STOCK', 'Low Stock'], ['OUT_OF_STOCK', 'Out of Stock'],
  ['RESERVED', 'Reserved'], ['ALLOCATED', 'Allocated'], ['DAMAGED', 'Damaged'],
  ['EXPIRED', 'Expired'], ['QUARANTINED', 'Quarantined'], ['IN_TRANSIT', 'In Transit'],
  ['RETURNED', 'Returned'], ['AVAILABLE', 'Available']
].map(([code, name]) => ({ code, name }));

const CUSTOMER_STATUSES = [
  ['ACTIVE', 'Active'], ['INACTIVE', 'Inactive'], ['PENDING', 'Pending'],
  ['VERIFIED', 'Verified'], ['UNVERIFIED', 'Unverified'], ['SUSPENDED', 'Suspended'],
  ['BLOCKED', 'Blocked'], ['DELETED', 'Deleted']
].map(([code, name]) => ({ code, name }));

const DISCOUNT_TYPES = [
  ['PERCENTAGE', 'Percentage Discount'], ['FIXED_AMOUNT', 'Fixed Amount'],
  ['FIXED_PRICE', 'Fixed Price'], ['FREE_SHIPPING', 'Free Shipping'],
  ['BUY_X_GET_Y', 'Buy X Get Y'], ['TIERED', 'Tiered Discount']
].map(([code, name]) => ({ code, name }));

const COUPON_STATUSES = [
  ['DRAFT', 'Draft'], ['ACTIVE', 'Active'], ['SCHEDULED', 'Scheduled'],
  ['PAUSED', 'Paused'], ['EXPIRED', 'Expired'], ['EXHAUSTED', 'Usage Limit Reached'],
  ['DISABLED', 'Disabled']
].map(([code, name]) => ({ code, name }));

const REVIEW_STATUSES = [
  ['PENDING', 'Pending'], ['APPROVED', 'Approved'], ['REJECTED', 'Rejected'],
  ['FLAGGED', 'Flagged'], ['HIDDEN', 'Hidden'], ['SPAM', 'Spam']
].map(([code, name]) => ({ code, name }));

const SHIPPING_METHODS = [
  ['STANDARD', 'Standard Shipping'], ['EXPRESS', 'Express Shipping'],
  ['SAME_DAY', 'Same Day Delivery'], ['NEXT_DAY', 'Next Day Delivery'],
  ['TWO_DAY', 'Two Day Delivery'], ['ECONOMY', 'Economy Shipping'],
  ['FREE', 'Free Shipping'], ['LOCAL_PICKUP', 'Local Pickup'],
  ['SCHEDULED', 'Scheduled Delivery'], ['INTERNATIONAL', 'International Shipping']
].map(([code, name]) => ({ code, name }));

const ADDRESS_TYPES = [
  ['HOME', 'Home'], ['WORK', 'Work'], ['BILLING', 'Billing'], ['SHIPPING', 'Shipping'],
  ['OFFICE', 'Office'], ['WAREHOUSE', 'Warehouse'], ['STORE', 'Store'], ['OTHER', 'Other']
].map(([code, name]) => ({ code, name }));

const CONTACT_TYPES = [
  ['EMAIL', 'Email'], ['PHONE', 'Phone'], ['MOBILE', 'Mobile'],
  ['WHATSAPP', 'WhatsApp'], ['SMS', 'SMS'], ['FAX', 'Fax']
].map(([code, name]) => ({ code, name }));

const CATALOG_VISIBILITY = [
  ['VISIBLE', 'Visible'], ['HIDDEN', 'Hidden'], ['SEARCH_ONLY', 'Search Only'],
  ['CATALOG_ONLY', 'Catalog Only'], ['DIRECT_LINK', 'Direct Link Only']
].map(([code, name]) => ({ code, name }));

const MEDIA_TYPES = [
  ['IMAGE', 'Image'], ['VIDEO', 'Video'], ['AUDIO', 'Audio'],
  ['DOCUMENT', 'Document'], ['PDF', 'PDF'], ['THREE_D', '3D Model']
].map(([code, name]) => ({ code, name }));

const FILE_TYPES = [
  ['JPEG', 'JPEG Image'], ['PNG', 'PNG Image'], ['WEBP', 'WebP Image'],
  ['GIF', 'GIF Image'], ['SVG', 'SVG Image'], ['MP4', 'MP4 Video'],
  ['MOV', 'MOV Video'], ['PDF', 'PDF Document'], ['CSV', 'CSV File'],
  ['XLSX', 'Excel Spreadsheet'], ['DOCX', 'Word Document']
].map(([code, name]) => ({ code, name }));

const NOTIFICATION_CHANNELS = [
  ['EMAIL', 'Email'], ['SMS', 'SMS'], ['PUSH', 'Push Notification'],
  ['WHATSAPP', 'WhatsApp'], ['IN_APP', 'In-App Notification'], ['WEBHOOK', 'Webhook']
].map(([code, name]) => ({ code, name }));

const NOTIFICATION_STATUSES = [
  ['PENDING', 'Pending'], ['QUEUED', 'Queued'], ['SENDING', 'Sending'],
  ['SENT', 'Sent'], ['DELIVERED', 'Delivered'], ['READ', 'Read'],
  ['FAILED', 'Failed'], ['BOUNCED', 'Bounced'], ['CANCELLED', 'Cancelled']
].map(([code, name]) => ({ code, name }));

const FULFILLMENT_TYPES = [
  ['MERCHANT', 'Merchant Fulfilled'], ['WAREHOUSE', 'Warehouse Fulfilled'],
  ['THIRD_PARTY', 'Third Party Fulfilled'], ['DROPSHIPPING', 'Dropshipping'],
  ['DIGITAL', 'Digital Fulfillment'], ['LOCAL_PICKUP', 'Local Pickup']
].map(([code, name]) => ({ code, name }));

const INVENTORY_TRANSACTION_TYPES = [
  ['PURCHASE', 'Purchase'], ['SALE', 'Sale'], ['RETURN', 'Return'],
  ['ADJUSTMENT', 'Stock Adjustment'], ['TRANSFER_IN', 'Transfer In'],
  ['TRANSFER_OUT', 'Transfer Out'], ['DAMAGE', 'Damage'], ['LOSS', 'Loss'],
  ['EXPIRY', 'Expiry'], ['RESERVATION', 'Reservation'], ['RELEASE', 'Reservation Release'],
  ['STOCKTAKE', 'Stocktake']
].map(([code, name]) => ({ code, name }));

const SHIPPING_PACKAGE_TYPES = [
  ['ENVELOPE', 'Envelope'], ['POLY_MAILER', 'Poly Mailer'], ['BOX', 'Box'],
  ['CARTON', 'Carton'], ['TUBE', 'Tube'], ['PALLET', 'Pallet'],
  ['CRATE', 'Crate'], ['BAG', 'Bag'], ['CUSTOM', 'Custom Package']
].map(([code, name]) => ({ code, name }));

const ORDER_SOURCES = [
  ['WEBSITE', 'Website'], ['MOBILE_APP', 'Mobile App'], ['ADMIN', 'Admin Panel'],
  ['POS', 'Point of Sale'], ['MARKETPLACE', 'Marketplace'], ['API', 'API'],
  ['SOCIAL_COMMERCE', 'Social Commerce'], ['WHATSAPP', 'WhatsApp'],
  ['PHONE', 'Phone Order'], ['MANUAL', 'Manual Order']
].map(([code, name]) => ({ code, name }));

const FISCAL_DOCUMENT_TYPES = [
  ['INVOICE', 'Invoice'], ['PROFORMA_INVOICE', 'Proforma Invoice'],
  ['CREDIT_NOTE', 'Credit Note'], ['DEBIT_NOTE', 'Debit Note'],
  ['REFUND_RECEIPT', 'Refund Receipt'], ['PURCHASE_ORDER', 'Purchase Order'],
  ['DELIVERY_NOTE', 'Delivery Note'], ['PACKING_SLIP', 'Packing Slip'],
  ['QUOTATION', 'Quotation']
].map(([code, name]) => ({ code, name }));

const DOCUMENT_STATUSES = [
  ['DRAFT', 'Draft'], ['ISSUED', 'Issued'], ['SENT', 'Sent'], ['VIEWED', 'Viewed'],
  ['ACCEPTED', 'Accepted'], ['REJECTED', 'Rejected'], ['CANCELLED', 'Cancelled'],
  ['PAID', 'Paid'], ['PARTIALLY_PAID', 'Partially Paid'], ['OVERDUE', 'Overdue']
].map(([code, name]) => ({ code, name }));

const MASTER_CONFIG = [
  ['taxCategory', TAX_CATEGORIES, 'Tax Categories'],
  ['orderStatusMaster', ORDER_STATUSES, 'Order Statuses'],
  ['paymentStatusMaster', PAYMENT_STATUSES, 'Payment Statuses'],
  ['fulfillmentStatusMaster', FULFILLMENT_STATUSES, 'Fulfillment Statuses'],
  ['productStatusMaster', PRODUCT_STATUSES, 'Product Statuses'],
  ['unit', UNITS, 'Units'],
  ['weightUnit', WEIGHT_UNITS, 'Weight Units'],
  ['dimensionUnit', DIMENSION_UNITS, 'Dimension Units'],
  ['volumeUnit', VOLUME_UNITS, 'Volume Units'],
  ['paymentMethodMaster', PAYMENT_METHODS, 'Payment Methods'],
  ['paymentProviderMaster', PAYMENT_PROVIDERS, 'Payment Providers'],
  ['shippingStatusMaster', SHIPPING_STATUSES, 'Shipping Statuses'],
  ['returnStatusMaster', RETURN_STATUSES, 'Return Statuses'],
  ['inventoryStatusMaster', INVENTORY_STATUSES, 'Inventory Statuses'],
  ['customerStatusMaster', CUSTOMER_STATUSES, 'Customer Statuses'],
  ['discountType', DISCOUNT_TYPES, 'Discount Types'],
  ['couponStatusMaster', COUPON_STATUSES, 'Coupon Statuses'],
  ['reviewStatus', REVIEW_STATUSES, 'Review Statuses'],
  ['shippingMethodMaster', SHIPPING_METHODS, 'Shipping Methods'],
  ['addressType', ADDRESS_TYPES, 'Address Types'],
  ['contactType', CONTACT_TYPES, 'Contact Types'],
  ['catalogVisibility', CATALOG_VISIBILITY, 'Catalog Visibility'],
  ['mediaType', MEDIA_TYPES, 'Media Types'],
  ['fileType', FILE_TYPES, 'File Types'],
  ['notificationChannelMaster', NOTIFICATION_CHANNELS, 'Notification Channels'],
  ['notificationStatus', NOTIFICATION_STATUSES, 'Notification Statuses'],
  ['fulfillmentType', FULFILLMENT_TYPES, 'Fulfillment Types'],
  ['inventoryTransactionType', INVENTORY_TRANSACTION_TYPES, 'Inventory Transaction Types'],
  ['shippingPackageType', SHIPPING_PACKAGE_TYPES, 'Shipping Package Types'],
  ['orderSource', ORDER_SOURCES, 'Order Sources'],
  ['fiscalDocumentType', FISCAL_DOCUMENT_TYPES, 'Fiscal Document Types'],
  ['documentStatus', DOCUMENT_STATUSES, 'Document Statuses']
];

function getPrismaModel(modelName) {
  const model = prisma[modelName];

  if (!model) {
    throw new Error(
      `Prisma model "${modelName}" is not available. Check the model name in schema.prisma.`
    );
  }

  return model;
}

async function seedCodeNameMaster(modelName, rows, label) {
  const model = getPrismaModel(modelName);
  console.log(`\n→ ${label}: ${rows.length} records`);

  const { Prisma } = require('@prisma/client');
  const dmmfModel = Prisma.dmmf.datamodel.models.find(m => m.name.toLowerCase() === modelName.toLowerCase());
  const hasTenantId = dmmfModel && dmmfModel.fields.some(f => f.name === 'tenantId');

  let inserted = 0;
  let failed = 0;

  for (const item of rows) {
    const data = {
      code: item.code,
      name: item.name,
      ...(item.description !== undefined ? { description: item.description } : {})
    };
    if (modelName.toLowerCase().includes('unit')) {
      data.symbol = item.code;
      data.conversionToBase = 1.0;
    }

    try {
      const whereClause = { code: item.code };
      if (hasTenantId) {
        whereClause.tenantId = null;
      }

      const existing = await model.findFirst({
        where: whereClause
      });

      if (existing) {
        await model.update({
          where: { id: existing.id },
          data
        });
      } else {
        if (hasTenantId) {
            data.tenantId = null;
        }
        await model.create({
          data
        });
        inserted++;
      }
    } catch (error) {
      console.error(`  ✗ Error processing ${item.code}: ${error.message}`);
      failed++;
    }
  }

  console.log(`  ✓ ${inserted} created, ${rows.length - inserted - failed} updated, ${failed} failed`);
  return { inserted, failed };
}

async function seedTimezones() {
  const model = getPrismaModel('timezone');

  const { Prisma } = require('@prisma/client');
  const dmmfModel = Prisma.dmmf.datamodel.models.find(m => m.name.toLowerCase() === 'timezone');
  const hasTenantId = dmmfModel && dmmfModel.fields.some(f => f.name === 'tenantId');

  let country = null;

  if (prisma.country && typeof prisma.country.findFirst === 'function') {
    country =
      await prisma.country.findFirst({ where: { iso2: 'IN' } }) ||
      await prisma.country.findFirst();
  }

  console.log(`\n→ Timezones: ${TIMEZONES.length} records`);

  let inserted = 0;
  let failed = 0;

  for (const item of TIMEZONES) {
    const data = {
      identifier: item.identifier,
      name: item.name,
      utcOffset: item.utcOffset,
      observesDst: item.observesDst
    };
    if (country) {
      data.countryId = country.id;
    }

    try {
      const whereClause = { identifier: item.identifier };
      if (hasTenantId) {
        whereClause.tenantId = null;
      }

      const existing = await model.findFirst({
        where: whereClause
      });

      if (existing) {
        await model.update({
          where: { id: existing.id },
          data
        });
      } else {
        if (hasTenantId) {
            data.tenantId = null;
        }
        await model.create({
          data
        });
        inserted++;
      }
    } catch (error) {
      console.error(`  ✗ Error processing ${item.identifier}: ${error.message}`);
      failed++;
    }
  }

  console.log(`  ✓ ${inserted} created, ${TIMEZONES.length - inserted - failed} updated, ${failed} failed`);
  return { inserted, failed };
}

async function seedExtendedMasters() {
  console.log('==============================================');
  console.log('🌱 Multi-Tenant Ecommerce Master Data Seeder');
  console.log('==============================================');

  const summary = {
    processed: 0,
    failed: 0
  };

  const timezoneResult = await seedTimezones();
  summary.processed += timezoneResult.inserted;
  summary.failed += timezoneResult.failed;

  for (const [modelName, rows, label] of MASTER_CONFIG) {
    const result = await seedCodeNameMaster(modelName, rows, label);
    summary.processed += result.inserted;
    summary.failed += result.failed;
  }

  console.log('\n==============================================');
  console.log('✅ Master data seeding completed');
  console.log(`Processed: ${summary.processed}`);
  console.log(`Failed:    ${summary.failed}`);
  console.log('==============================================');

  if (summary.failed > 0) {
    throw new Error(
      `Master data seeding completed with ${summary.failed} failed record(s).`
    );
  }
}

seedExtendedMasters()
  .catch((error) => {
    console.error('\n❌ Seed failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
