const _auth = "/auth";
const _customer = "/customer";
const _notification = "/notification";
const _order = "/order";
const _product = "/product";
const _public = "/public";
const _review = "/review";
const _vendor = "/vendor";

const AUTH = {
  signup: {
    customer: `${_auth}/signup/customer`,
    vendor: `${_auth}/signup/vendor`,
  },
  login: {
    customer: `${_auth}/login/customer`,
    vendor: `${_auth}/login/vendor`,
  },
  renewToken: `${_auth}/renewToken`,
  signOut: `${_auth}/signOut`,
};

const CUSTOMER = {
  get_customer: `${_customer}/get-customer`,
  update_customer: `${_customer}/update-customer`,
  get_orders: `${_customer}/get-orders`,
  get_notifications: `${_customer}/get-notifications`,
};

const NOTIFICATION = {
  vendor: `${_notification}/vendor`,
  customer: `${_notification}/customer`,
  read_notification: `${_notification}/read-notification`,
};

const ORDER = {
  make_order: `${_order}/make-order`,
  update_order: `${_order}/update-order`,
};

const PRODUCT = {
  add_product: `${_product}/add-product`,
  edit_product: `${_product}/edit-product`,
  delete_product: `${_product}/delete-product`,
  delete_category: `${_product}/delete-category`,
};

const PUBLIC = {
  get_vendors: `${_public}/get-vendors`,
  get_vendor: `${_public}/get-vendor`,
  get_products: `${_public}/get-products`,
  get_product: `${_public}/get-product`,
  get_customer: `${_public}/get-customer`,
};

const REVIEW = {
  add_review: `${_review}/add-review`,
  get_reviews: `${_review}/get-reviews`,
};

const VENDOR = {
  get_vendor: `${_vendor}/get-vendor`,
  update_vendor: `${_vendor}/update-vendor`,
  get_orders: `${_vendor}/get-orders`,
  get_customer: `${_vendor}/get-customer`,
  get_notifications: `${_vendor}/get-notifications`,
};

export { AUTH, CUSTOMER, NOTIFICATION, ORDER, PRODUCT, PUBLIC, REVIEW, VENDOR };
