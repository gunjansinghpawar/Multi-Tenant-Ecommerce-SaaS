import { MasterConfig } from "./masters.types";

const COMMON = {
  code: {
    name: "code",
    label: "Code",
    type: "text" as const,
    required: true,
    unique: true,
    searchable: true,
    sortable: true,
    filterable: true
  },

  name: {
    name: "name",
    label: "Name",
    type: "text" as const,
    required: true,
    searchable: true,
    sortable: true,
    filterable: true
  },

  description: {
    name: "description",
    label: "Description",
    type: "textarea" as const,
    searchable: true
  },

  status: {
    name: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
      { label: "Archived", value: "ARCHIVED" }
    ],
    required: true,
    filterable: true
  },

  sortOrder: {
    name: "sortOrder",
    label: "Sort Order",
    type: "number" as const,
    sortable: true,
    filterable: true,
    min: 0
  }
};

const MASTER_FEATURES = {
  create: true,
  edit: true,
  delete: true,
  search: true,
  filter: true,
  export: true,
  import: true,
  bulkDelete: true,
  bulkUpdate: true
};

export const MASTER_CONFIGS: Record<string, MasterConfig> = {

  /* =========================================================
     GEOGRAPHY
  ========================================================= */

  continents: {
    entityName: "continent",
    displayName: "Continents",
    baseRoute: "/masters/continents",

    description: "Global continent master data.",

    dependencies: [
      {
        modelName: "country",
        relationField: "continentId",
        description: "Countries belonging to this continent."
      }
    ],

    fields: [
      COMMON.code,
      {
        ...COMMON.name,
        unique: true
      },
      {
        name: "isoCode",
        label: "ISO Code",
        type: "text",
        required: true,
        unique: true,
        searchable: true
      },
      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  countries: {
    entityName: "country",
    displayName: "Countries",
    baseRoute: "/masters/countries",

    description: "Countries and international geographic information.",

    dependencies: [
      {
        modelName: "state",
        relationField: "countryId",
        description: "States or provinces belonging to this country."
      },
      {
        modelName: "city",
        relationField: "countryId",
        description: "Cities belonging to this country."
      },
      {
        modelName: "timezone",
        relationField: "countryId",
        description: "Timezones associated with this country."
      },
      {
        modelName: "currency",
        relationField: "countryId",
        description: "Currencies associated with this country."
      }
    ],

    fields: [
      COMMON.name,

      {
        name: "slug",
        label: "Slug",
        type: "text",
        required: true,
        unique: true,
        searchable: true
      },

      {
        name: "iso2",
        label: "ISO 2",
        type: "text",
        required: true,
        unique: true,
        searchable: true
      },

      {
        name: "iso3",
        label: "ISO 3",
        type: "text",
        required: true,
        unique: true,
        searchable: true
      },

      {
        name: "numericCode",
        label: "Numeric Code",
        type: "text",
        searchable: true,
        sortable: true
      },

      {
        name: "phoneCode",
        label: "Phone Code",
        type: "text",
        required: true,
        searchable: true
      },

      {
        name: "continentId",
        label: "Continent",
        type: "reference",
        referenceModel: "continent",
        required: true,
        filterable: true
      },

      {
        name: "capital",
        label: "Capital",
        type: "text",
        searchable: true
      },

      {
        name: "nationality",
        label: "Nationality",
        type: "text",
        searchable: true
      },

      COMMON.description,
      COMMON.sortOrder,
    ],

    features: MASTER_FEATURES
  },

  states: {
    entityName: "state",
    displayName: "States / Provinces",
    baseRoute: "/masters/states",

    dependencies: [
      {
        modelName: "city",
        relationField: "stateId",
        description: "Cities belonging to this state."
      }
    ],

    fields: [
      COMMON.name,

      {
        name: "code",
        label: "State Code",
        type: "text",
        required: true,
        searchable: true,
        sortable: true
      },

      {
        name: "slug",
        label: "Slug",
        type: "text",
        required: true,
        unique: true,
        searchable: true
      },

      {
        name: "countryId",
        label: "Country",
        type: "reference",
        referenceModel: "country",
        required: true,
        filterable: true
      },

      {
        name: "continentId",
        label: "Continent",
        type: "reference",
        referenceModel: "continent",
        virtual: true,
        filterBy: "countryId",
        filterable: true,
        readonly: true
      },

      {
        name: "stateType",
        label: "State Type",
        type: "select",
        options: [
          { value: "STATE", label: "State" },
          { value: "PROVINCE", label: "Province" },
          { value: "REGION", label: "Region" },
          { value: "TERRITORY", label: "Territory" },
          { value: "DISTRICT", label: "District" }
        ]
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  cities: {
    entityName: "city",
    displayName: "Cities",
    baseRoute: "/masters/cities",

    fields: [
      COMMON.name,

      {
        name: "slug",
        label: "Slug",
        type: "text",
        required: true,
        unique: true,
        searchable: true
      },

      {
        name: "code",
        label: "City Code",
        type: "text",
        searchable: true
      },

      {
        name: "countryId",
        label: "Country",
        type: "reference",
        referenceModel: "country",
        required: true,
        filterable: true
      },

      {
        name: "stateId",
        label: "State / Province",
        type: "reference",
        referenceModel: "state",
        required: true,
        filterBy: "countryId",
        filterable: true
      },

      {
        name: "continentId",
        label: "Continent",
        type: "reference",
        referenceModel: "continent",
        virtual: true,
        readonly: true
      },

      {
        name: "postalCode",
        label: "Postal Code",
        type: "text",
        searchable: true
      },

      {
        name: "latitude",
        label: "Latitude",
        type: "decimal",
        min: -90,
        max: 90
      },

      {
        name: "longitude",
        label: "Longitude",
        type: "decimal",
        min: -180,
        max: 180
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  regions: {
    entityName: "region",
    displayName: "Regions",
    baseRoute: "/masters/regions",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "countryId",
        label: "Country",
        type: "reference",
        referenceModel: "country",
        filterable: true
      },

      {
        name: "description",
        label: "Description",
        type: "textarea"
      },

      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  /* =========================================================
     LOCALIZATION
  ========================================================= */

  currencies: {
    entityName: "currency",
    displayName: "Currencies",
    baseRoute: "/masters/currencies",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "isoCode",
        label: "ISO Code",
        type: "text",
        required: true,
        unique: true
      },

      {
        name: "numericCode",
        label: "Numeric Code",
        type: "text"
      },

      {
        name: "symbol",
        label: "Symbol",
        type: "text",
        required: true
      },

      {
        name: "minorUnit",
        label: "Minor Unit",
        type: "number",
        required: true,
        min: 0,
        max: 4
      },

      {
        name: "symbolPosition",
        label: "Symbol Position",
        type: "select",
        options: [
          { value: "BEFORE", label: "Before Amount" },
          { value: "AFTER", label: "After Amount" }
        ]
      },

      {
        name: "decimalSeparator",
        label: "Decimal Separator",
        type: "text"
      },

      {
        name: "thousandSeparator",
        label: "Thousand Separator",
        type: "text"
      },

      {
        name: "isBaseCurrency",
        label: "Base Currency",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  languages: {
    entityName: "language",
    displayName: "Languages",
    baseRoute: "/masters/languages",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "iso2",
        label: "ISO 2",
        type: "text",
        required: true,
        unique: true
      },

      {
        name: "iso3",
        label: "ISO 3",
        type: "text",
        unique: true
      },

      {
        name: "nativeName",
        label: "Native Name",
        type: "text"
      },

      {
        name: "locale",
        label: "Locale",
        type: "text",
        required: true,
        unique: true
      },

      {
        name: "direction",
        label: "Text Direction",
        type: "select",
        options: [
          { value: "LTR", label: "Left to Right" },
          { value: "RTL", label: "Right to Left" }
        ]
      },

      {
        name: "isDefault",
        label: "Default Language",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  timezones: {
    entityName: "timezone",
    displayName: "Timezones",
    baseRoute: "/masters/timezones",

    fields: [
      {
        name: "identifier",
        label: "IANA Identifier",
        type: "text",
        required: true,
        unique: true,
        searchable: true
      },

      COMMON.name,

      {
        name: "abbreviation",
        label: "Abbreviation",
        type: "text"
      },

      {
        name: "utcOffset",
        label: "UTC Offset",
        type: "text",
        required: true
      },

      {
        name: "observesDst",
        label: "Observes DST",
        type: "boolean"
      },

      {
        name: "countryId",
        label: "Country",
        type: "reference",
        referenceModel: "country",
        filterable: true
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "phone-country-codes": {
    entityName: "phoneCountryCode",
    displayName: "Phone Country Codes",
    baseRoute: "/masters/phone-country-codes",

    fields: [
      {
        name: "countryId",
        label: "Country",
        type: "reference",
        referenceModel: "country",
        required: true
      },

      {
        name: "countryCode",
        label: "Country Code",
        type: "text",
        required: true,
        unique: true
      },

      {
        name: "dialCode",
        label: "Dial Code",
        type: "text",
        required: true,
        searchable: true
      },

      COMMON.name,

      {
        name: "minLength",
        label: "Minimum Number Length",
        type: "number"
      },

      {
        name: "maxLength",
        label: "Maximum Number Length",
        type: "number"
      },

      {
        name: "exampleNumber",
        label: "Example Number",
        type: "text"
      },

      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "date-formats": {
    entityName: "dateFormat",
    displayName: "Date Formats",
    baseRoute: "/masters/date-formats",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "format",
        label: "Format",
        type: "text",
        required: true
      },

      {
        name: "example",
        label: "Example",
        type: "text"
      },

      {
        name: "locale",
        label: "Locale",
        type: "text"
      },

      {
        name: "isDefault",
        label: "Default",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "time-formats": {
    entityName: "timeFormat",
    displayName: "Time Formats",
    baseRoute: "/masters/time-formats",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "format",
        label: "Format",
        type: "text",
        required: true
      },

      {
        name: "example",
        label: "Example",
        type: "text"
      },

      {
        name: "hourCycle",
        label: "Hour Cycle",
        type: "select",
        options: [
          { value: "12", label: "12 Hour" },
          { value: "24", label: "24 Hour" }
        ]
      },

      {
        name: "isDefault",
        label: "Default",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  /* =========================================================
     TAXATION
  ========================================================= */

  "tax-categories": {
    entityName: "taxCategory",
    displayName: "Tax Categories",
    baseRoute: "/masters/tax-categories",

    dependencies: [
      {
        modelName: "taxRate",
        relationField: "taxCategoryId",
        description: "Tax rates belonging to this category."
      }
    ],

    fields: [
      COMMON.code,
      COMMON.name,
      COMMON.description,

      {
        name: "taxType",
        label: "Tax Type",
        type: "select",
        options: [
          { value: "GST", label: "GST" },
          { value: "VAT", label: "VAT" },
          { value: "SALES_TAX", label: "Sales Tax" },
          { value: "EXCISE", label: "Excise" },
          { value: "CUSTOMS", label: "Customs" },
          { value: "ZERO_RATED", label: "Zero Rated" },
          { value: "EXEMPT", label: "Exempt" },
          { value: "NON_TAXABLE", label: "Non Taxable" }
        ]
      },

      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "tax-rates": {
    entityName: "taxRate",
    displayName: "Tax Rates",
    baseRoute: "/masters/tax-rates",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "taxCategoryId",
        label: "Tax Category",
        type: "reference",
        referenceModel: "taxCategory",
        required: true,
        filterable: true
      },

      {
        name: "type",
        label: "Tax Type",
        type: "select",
        required: true,
        options: [
          { value: "PERCENTAGE", label: "Percentage" },
          { value: "FIXED", label: "Fixed Amount" }
        ]
      },

      {
        name: "rate",
        label: "Rate %",
        type: "decimal",
        required: true,
        min: 0,
        max: 100
      },

      {
        name: "countryId",
        label: "Country",
        type: "reference",
        referenceModel: "country"
      },

      {
        name: "stateId",
        label: "State",
        type: "reference",
        referenceModel: "state",
        filterBy: "countryId"
      },

      {
        name: "isCompound",
        label: "Compound Tax",
        type: "boolean"
      },

      {
        name: "effectiveFrom",
        label: "Effective From",
        type: "date"
      },

      {
        name: "effectiveTo",
        label: "Effective To",
        type: "date"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  /* =========================================================
     PRODUCT
  ========================================================= */

  "product-types": {
    entityName: "productType",
    displayName: "Product Types",
    baseRoute: "/masters/product-types",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "slug",
        label: "Slug",
        type: "text",
        unique: true
      },

      {
        name: "requiresShipping",
        label: "Requires Shipping",
        type: "boolean"
      },

      {
        name: "isDigital",
        label: "Digital Product",
        type: "boolean"
      },

      {
        name: "allowsVariants",
        label: "Allows Variants",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "product-statuses": {
    entityName: "productStatusMaster",
    displayName: "Product Statuses",
    baseRoute: "/masters/product-statuses",

    fields: [
      COMMON.code,
      COMMON.name,
      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "attribute-types": {
    entityName: "attributeType",
    displayName: "Attribute Types",
    baseRoute: "/masters/attribute-types",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "dataType",
        label: "Data Type",
        type: "select",
        required: true,
        options: [
          { value: "TEXT", label: "Text" },
          { value: "NUMBER", label: "Number" },
          { value: "DECIMAL", label: "Decimal" },
          { value: "BOOLEAN", label: "Boolean" },
          { value: "DATE", label: "Date" },
          { value: "DATETIME", label: "Date & Time" },
          { value: "COLOR", label: "Color" },
          { value: "IMAGE", label: "Image" },
          { value: "SELECT", label: "Select" },
          { value: "MULTI_SELECT", label: "Multi Select" }
        ]
      },

      {
        name: "isVariantAttribute",
        label: "Variant Attribute",
        type: "boolean"
      },

      {
        name: "isFilterable",
        label: "Filterable",
        type: "boolean"
      },

      {
        name: "isSearchable",
        label: "Searchable",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  units: {
    entityName: "unit",
    displayName: "Units",
    baseRoute: "/masters/units",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "symbol",
        label: "Symbol",
        type: "text",
        required: true
      },

      {
        name: "unitType",
        label: "Unit Type",
        type: "select",
        required: true,
        options: [
          { value: "COUNT", label: "Count" },
          { value: "LENGTH", label: "Length" },
          { value: "AREA", label: "Area" },
          { value: "WEIGHT", label: "Weight" },
          { value: "VOLUME", label: "Volume" }
        ]
      },

      {
        name: "conversionToBase",
        label: "Conversion To Base",
        type: "decimal",
        required: true,
        min: 0
      },

      {
        name: "isBaseUnit",
        label: "Base Unit",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "weight-units": {
    entityName: "weightUnit",
    displayName: "Weight Units",
    baseRoute: "/masters/weight-units",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "symbol",
        label: "Symbol",
        type: "text",
        required: true
      },

      {
        name: "conversionToBase",
        label: "Conversion To KG",
        type: "decimal",
        required: true,
        min: 0
      },

      {
        name: "isBaseUnit",
        label: "Base Unit",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "dimension-units": {
    entityName: "dimensionUnit",
    displayName: "Dimension Units",
    baseRoute: "/masters/dimension-units",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "symbol",
        label: "Symbol",
        type: "text",
        required: true
      },

      {
        name: "conversionToBase",
        label: "Conversion To CM",
        type: "decimal",
        required: true,
        min: 0
      },

      {
        name: "isBaseUnit",
        label: "Base Unit",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "volume-units": {
    entityName: "volumeUnit",
    displayName: "Volume Units",
    baseRoute: "/masters/volume-units",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "symbol",
        label: "Symbol",
        type: "text",
        required: true
      },

      {
        name: "conversionToBase",
        label: "Conversion To Liter",
        type: "decimal",
        required: true,
        min: 0
      },

      {
        name: "isBaseUnit",
        label: "Base Unit",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  /* =========================================================
     CUSTOMER / BUSINESS
  ========================================================= */

  "customer-statuses": {
    entityName: "customerStatusMaster",
    displayName: "Customer Statuses",
    baseRoute: "/masters/customer-statuses",

    fields: [
      COMMON.code,
      COMMON.name,
      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "address-types": {
    entityName: "addressType",
    displayName: "Address Types",
    baseRoute: "/masters/address-types",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "isBillingAllowed",
        label: "Billing Address",
        type: "boolean"
      },

      {
        name: "isShippingAllowed",
        label: "Shipping Address",
        type: "boolean"
      },

      {
        name: "requiresContact",
        label: "Requires Contact",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "business-types": {
    entityName: "businessType",
    displayName: "Business Types",
    baseRoute: "/masters/business-types",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "requiresTaxId",
        label: "Requires Tax ID",
        type: "boolean"
      },

      {
        name: "requiresBusinessRegistration",
        label: "Requires Registration",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  industries: {
    entityName: "industry",
    displayName: "Industries",
    baseRoute: "/masters/industries",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "parentId",
        label: "Parent Industry",
        type: "reference",
        referenceModel: "industry"
      },

      {
        name: "slug",
        label: "Slug",
        type: "text",
        unique: true
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  /* =========================================================
     ORDERS
  ========================================================= */

  "order-statuses": {
    entityName: "orderStatusMaster",
    displayName: "Order Statuses",
    baseRoute: "/masters/order-statuses",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "description",
        label: "Description",
        type: "textarea"
      },

      {
        name: "isFinal",
        label: "Final Status",
        type: "boolean"
      },

      {
        name: "isCustomerVisible",
        label: "Customer Visible",
        type: "boolean"
      },

      {
        name: "color",
        label: "Display Color",
        type: "text"
      },

      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "payment-statuses": {
    entityName: "paymentStatusMaster",
    displayName: "Payment Statuses",
    baseRoute: "/masters/payment-statuses",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "isSuccessful",
        label: "Successful",
        type: "boolean"
      },

      {
        name: "isFinal",
        label: "Final Status",
        type: "boolean"
      },

      {
        name: "allowsRefund",
        label: "Allows Refund",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "fulfillment-statuses": {
    entityName: "fulfillmentStatusMaster",
    displayName: "Fulfillment Statuses",
    baseRoute: "/masters/fulfillment-statuses",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "isFinal",
        label: "Final Status",
        type: "boolean"
      },

      {
        name: "isCustomerVisible",
        label: "Customer Visible",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "cancellation-reasons": {
    entityName: "cancellationReason",
    displayName: "Cancellation Reasons",
    baseRoute: "/masters/cancellation-reasons",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "reasonType",
        label: "Reason Type",
        type: "select",
        options: [
          { value: "CUSTOMER", label: "Customer" },
          { value: "MERCHANT", label: "Merchant" },
          { value: "PAYMENT", label: "Payment" },
          { value: "INVENTORY", label: "Inventory" },
          { value: "FRAUD", label: "Fraud" },
          { value: "SYSTEM", label: "System" }
        ]
      },

      {
        name: "requiresComment",
        label: "Requires Comment",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "return-reasons": {
    entityName: "returnReason",
    displayName: "Return Reasons",
    baseRoute: "/masters/return-reasons",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "reasonType",
        label: "Reason Type",
        type: "select",
        options: [
          { value: "DAMAGED", label: "Damaged" },
          { value: "WRONG_ITEM", label: "Wrong Item" },
          { value: "NOT_AS_DESCRIBED", label: "Not As Described" },
          { value: "QUALITY", label: "Quality Issue" },
          { value: "SIZE", label: "Size Issue" },
          { value: "CUSTOMER_CHANGE_OF_MIND", label: "Customer Changed Mind" },
          { value: "OTHER", label: "Other" }
        ]
      },

      {
        name: "requiresEvidence",
        label: "Requires Evidence",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  /* =========================================================
     SHIPPING / PAYMENT
  ========================================================= */

  "shipping-methods": {
    entityName: "shippingMethodMaster",
    displayName: "Shipping Methods",
    baseRoute: "/masters/shipping-methods",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "shippingProviderId",
        label: "Provider",
        type: "reference",
        referenceModel: "shippingProviderMaster"
      },

      {
        name: "deliveryType",
        label: "Delivery Type",
        type: "select",
        options: [
          { value: "STANDARD", label: "Standard" },
          { value: "EXPRESS", label: "Express" },
          { value: "SAME_DAY", label: "Same Day" },
          { value: "NEXT_DAY", label: "Next Day" },
          { value: "LOCAL_PICKUP", label: "Local Pickup" },
          { value: "INTERNATIONAL", label: "International" }
        ]
      },

      {
        name: "estimatedMinDays",
        label: "Min Delivery Days",
        type: "number",
        min: 0
      },

      {
        name: "estimatedMaxDays",
        label: "Max Delivery Days",
        type: "number",
        min: 0
      },

      {
        name: "trackingSupported",
        label: "Tracking Supported",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "shipping-providers": {
    entityName: "shippingProviderMaster",
    displayName: "Shipping Providers",
    baseRoute: "/masters/shipping-providers",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "slug",
        label: "Slug",
        type: "text",
        unique: true
      },

      {
        name: "website",
        label: "Website",
        type: "text"
      },

      {
        name: "trackingUrl",
        label: "Tracking URL",
        type: "text"
      },

      {
        name: "supportsTracking",
        label: "Tracking",
        type: "boolean"
      },

      {
        name: "supportsPickup",
        label: "Pickup",
        type: "boolean"
      },

      {
        name: "supportsInternational",
        label: "International",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "payment-methods": {
    entityName: "paymentMethodMaster",
    displayName: "Payment Methods",
    baseRoute: "/masters/payment-methods",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "methodType",
        label: "Method Type",
        type: "select",
        options: [
          { value: "CARD", label: "Card" },
          { value: "BANK", label: "Bank" },
          { value: "WALLET", label: "Wallet" },
          { value: "UPI", label: "UPI" },
          { value: "COD", label: "Cash on Delivery" },
          { value: "CASH", label: "Cash" },
          { value: "OTHER", label: "Other" }
        ]
      },

      {
        name: "requiresGateway",
        label: "Requires Gateway",
        type: "boolean"
      },

      {
        name: "supportsRefund",
        label: "Supports Refund",
        type: "boolean"
      },

      {
        name: "supportsPartialPayment",
        label: "Partial Payment",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "payment-providers": {
    entityName: "paymentProviderMaster",
    displayName: "Payment Providers",
    baseRoute: "/masters/payment-providers",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "slug",
        label: "Slug",
        type: "text",
        unique: true
      },

      {
        name: "website",
        label: "Website",
        type: "text"
      },

      {
        name: "supportsCards",
        label: "Cards",
        type: "boolean"
      },

      {
        name: "supportsUPI",
        label: "UPI",
        type: "boolean"
      },

      {
        name: "supportsWallets",
        label: "Wallets",
        type: "boolean"
      },

      {
        name: "supportsRefunds",
        label: "Refunds",
        type: "boolean"
      },

      {
        name: "supportsSubscriptions",
        label: "Subscriptions",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  /* =========================================================
     SAAS / STORE
  ========================================================= */

  "store-types": {
    entityName: "storeType",
    displayName: "Store Types",
    baseRoute: "/masters/store-types",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "slug",
        label: "Slug",
        type: "text",
        unique: true
      },

      {
        name: "businessModel",
        label: "Business Model",
        type: "select",
        options: [
          { value: "B2C", label: "B2C" },
          { value: "B2B", label: "B2B" },
          { value: "B2B2C", label: "B2B2C" },
          { value: "D2C", label: "D2C" },
          { value: "MARKETPLACE", label: "Marketplace" }
        ]
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "theme-categories": {
    entityName: "themeCategory",
    displayName: "Theme Categories",
    baseRoute: "/masters/theme-categories",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "slug",
        label: "Slug",
        type: "text",
        unique: true
      },

      {
        name: "parentId",
        label: "Parent Category",
        type: "reference",
        referenceModel: "themeCategory"
      },

      {
        name: "icon",
        label: "Icon",
        type: "text"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "notification-channels": {
    entityName: "notificationChannelMaster",
    displayName: "Notification Channels",
    baseRoute: "/masters/notification-channels",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "channelType",
        label: "Channel Type",
        type: "select",
        options: [
          { value: "EMAIL", label: "Email" },
          { value: "SMS", label: "SMS" },
          { value: "PUSH", label: "Push" },
          { value: "WHATSAPP", label: "WhatsApp" },
          { value: "IN_APP", label: "In App" },
          { value: "WEBHOOK", label: "Webhook" }
        ]
      },

      {
        name: "supportsTemplate",
        label: "Supports Templates",
        type: "boolean"
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "notification-types": {
    entityName: "notificationTypeMaster",
    displayName: "Notification Types",
    baseRoute: "/masters/notification-types",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "eventType",
        label: "Event Type",
        type: "text",
        required: true
      },

      {
        name: "priority",
        label: "Priority",
        type: "select",
        options: [
          { value: "LOW", label: "Low" },
          { value: "NORMAL", label: "Normal" },
          { value: "HIGH", label: "High" },
          { value: "CRITICAL", label: "Critical" }
        ]
      },

      {
        name: "description",
        label: "Description",
        type: "textarea"
      },

      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "integration-types": {
    entityName: "integrationTypeMaster",
    displayName: "Integration Types",
    baseRoute: "/masters/integration-types",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "PAYMENT", label: "Payment" },
          { value: "SHIPPING", label: "Shipping" },
          { value: "MARKETING", label: "Marketing" },
          { value: "ANALYTICS", label: "Analytics" },
          { value: "CRM", label: "CRM" },
          { value: "COMMUNICATION", label: "Communication" },
          { value: "AI", label: "AI" },
          { value: "OTHER", label: "Other" }
        ]
      },

      {
        name: "authType",
        label: "Authentication Type",
        type: "select",
        options: [
          { value: "API_KEY", label: "API Key" },
          { value: "OAUTH2", label: "OAuth 2.0" },
          { value: "BASIC", label: "Basic Auth" },
          { value: "WEBHOOK", label: "Webhook" },
          { value: "NONE", label: "None" }
        ]
      },

      COMMON.description,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "webhook-event-types": {
    entityName: "webhookEventTypeMaster",
    displayName: "Webhook Event Types",
    baseRoute: "/masters/webhook-event-types",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "eventGroup",
        label: "Event Group",
        type: "text",
        required: true
      },

      {
        name: "resource",
        label: "Resource",
        type: "text",
        required: true
      },

      {
        name: "action",
        label: "Action",
        type: "text",
        required: true
      },

      {
        name: "description",
        label: "Description",
        type: "textarea"
      },

      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "subscription-statuses": {
    entityName: "subscriptionStatusMaster",
    displayName: "Subscription Statuses",
    baseRoute: "/masters/subscription-statuses",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "isActiveState",
        label: "Active State",
        type: "boolean"
      },

      {
        name: "isFinal",
        label: "Final State",
        type: "boolean"
      },

      {
        name: "allowsRenewal",
        label: "Allows Renewal",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "tenant-statuses": {
    entityName: "tenantStatusMaster",
    displayName: "Tenant Statuses",
    baseRoute: "/masters/tenant-statuses",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "isOperational",
        label: "Operational",
        type: "boolean"
      },

      {
        name: "allowsLogin",
        label: "Allows Login",
        type: "boolean"
      },

      {
        name: "allowsBilling",
        label: "Allows Billing",
        type: "boolean"
      },

      {
        name: "isFinal",
        label: "Final State",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "plan-types": {
    entityName: "planType",
    displayName: "Plan Types",
    baseRoute: "/masters/plan-types",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "billingModel",
        label: "Billing Model",
        type: "select",
        options: [
          { value: "SUBSCRIPTION", label: "Subscription" },
          { value: "USAGE", label: "Usage Based" },
          { value: "HYBRID", label: "Hybrid" },
          { value: "FREE", label: "Free" }
        ]
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "plan-tiers": {
    entityName: "planTier",
    displayName: "Plan Tiers",
    baseRoute: "/masters/plan-tiers",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "slug",
        label: "Slug",
        type: "text",
        required: true,
        unique: true
      },

      {
        name: "planTypeId",
        label: "Plan Type",
        type: "reference",
        referenceModel: "planType",
        required: true
      },

      {
        name: "monthlyPrice",
        label: "Monthly Price",
        type: "decimal",
        required: true,
        min: 0
      },

      {
        name: "yearlyPrice",
        label: "Yearly Price",
        type: "decimal",
        required: true,
        min: 0
      },

      {
        name: "currencyId",
        label: "Currency",
        type: "reference",
        referenceModel: "currency",
        required: true
      },

      {
        name: "trialDays",
        label: "Trial Days",
        type: "number",
        min: 0
      },

      {
        name: "maxStores",
        label: "Maximum Stores",
        type: "number",
        min: -1
      },

      {
        name: "maxUsers",
        label: "Maximum Users",
        type: "number",
        min: -1
      },

      {
        name: "maxProducts",
        label: "Maximum Products",
        type: "number",
        min: -1
      },

      {
        name: "maxOrders",
        label: "Maximum Orders",
        type: "number",
        min: -1
      },

      {
        name: "maxStorageGB",
        label: "Storage GB",
        type: "decimal",
        min: -1
      },

      {
        name: "maxDomains",
        label: "Maximum Domains",
        type: "number",
        min: -1
      },

      {
        name: "isPopular",
        label: "Popular Plan",
        type: "boolean"
      },

      {
        name: "isPublic",
        label: "Public Plan",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  },

  "billing-cycles": {
    entityName: "billingCycle",
    displayName: "Billing Cycles",
    baseRoute: "/masters/billing-cycles",

    fields: [
      COMMON.code,
      COMMON.name,

      {
        name: "interval",
        label: "Interval",
        type: "select",
        required: true,
        options: [
          { value: "DAY", label: "Day" },
          { value: "WEEK", label: "Week" },
          { value: "MONTH", label: "Month" },
          { value: "YEAR", label: "Year" }
        ]
      },

      {
        name: "intervalCount",
        label: "Interval Count",
        type: "number",
        required: true,
        min: 1
      },

      {
        name: "trialSupported",
        label: "Trial Supported",
        type: "boolean"
      },

      COMMON.description,
      COMMON.sortOrder,
      COMMON.status
    ],

    features: MASTER_FEATURES
  }
};