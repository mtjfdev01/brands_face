// Product Data Structure
const productData = {
  rigidBoxes: {
    title: 'Rigid Boxes',
    description: 'Premium rigid boxes for luxury packaging',
    products: [
      { id: 1, name: 'Magnetic Snap Box', image: '/assets/images/Magnetic.png', url: '/products/rigid-boxes/magnetic-snap-box.html' },
      { id: 2, name: 'Book Style Box', image: '/assets/images/Book.png', url: '/products/rigid-boxes/book-style-box.html' },
      { id: 3, name: 'Drawer Style Box', image: '/assets/images/Drawer.png', url: '/products/rigid-boxes/drawer-style-box.html' },
      { id: 4, name: 'Collapsible Box', image: '/assets/images/Collapsible.png', url: '/products/rigid-boxes/collapsible-rigid-box.html' },
      { id: 5, name: 'Lid & Base Box', image: '/assets/images/Lid-base.png', url: '/products/rigid-boxes/lid-and-base-box.html' },
      { id: 6, name: 'Hexagonal Box', image: '/assets/images/Hexagonal.png', url: '/products/rigid-boxes/hexagonal-rigid-box.html' },
      { id: 7, name: 'Shoulder & Neck Box', image: '/assets/images/Shoulder-Neck.png', url: '/products/rigid-boxes/shoulder-and-neck-box.html' },
      { id: 8, name: 'Rigid Tube', image: '/assets/images/Tube.png', url: '/products/rigid-boxes/circular-rigid-tube.html' }
    ]
  },
  corrugatedBoxes: {
    title: 'Corrugated Boxes',
    description: 'Durable corrugated shipping and display boxes',
    products: [
      { id: 1, name: 'Standard Shipping Box', image: '/assets/images/box1.png', url: '/products/corrugated-boxes/standard-shipping-box-rsc.html' },
      { id: 2, name: 'Full Color Mailer', image: '/assets/images/box2.png', url: '/products/corrugated-boxes/full-color-mailer-box.html' }
    ]
  },
  customPouches: {
    title: 'Custom Pouches',
    description: 'Flexible packaging pouches with various finishes',
    products: [
      { id: 1, name: 'Stand Up Pouch', image: '/assets/images/pouch.png', url: '/products/custom-pouches/stand-up-pouch-doypack.html' },
      { id: 2, name: 'Flat Bottom Pouch', image: '/assets/images/P-1.png', url: '/products/custom-pouches/flat-bottom-pouch-box-pouch.html' }
    ]
  },
  giftBoxes: {
    title: 'Gift Boxes',
    description: 'Beautiful gift box solutions',
    products: [
      { id: 1, name: 'Window Gift Box', image: '/assets/images/P-2.png', url: '/products/gift-boxes/window-gift-box.html' },
      { id: 2, name: 'Magnetic Gift Box', image: '/assets/images/P-3.png', url: '/products/gift-boxes/magnetic-gift-box.html' }
    ]
  },
  kraftPaper: {
    title: 'Kraft Paper',
    description: 'Eco-friendly kraft paper packaging',
    products: [
      { id: 1, name: 'White Kraft Box', image: '/assets/images/P-4.png', url: '/products/kraft-paper/white-kraft-box.html' },
      { id: 2, name: 'Twisted Handle Bag', image: '/assets/images/P-5.png', url: '/products/kraft-paper/twisted-handle-shopping-bag.html' }
    ]
  },
  labelsAndTags: {
    title: 'Labels & Tags',
    description: 'Custom labels and decorative tags',
    products: [
      { id: 1, name: 'Bottle Labels', image: '/assets/images/P-6.png', url: '/products/labels-and-tags/bottle-and-jar-labels.html' },
      { id: 2, name: 'Hang Tags', image: '/assets/images/P-7.png', url: '/products/labels-and-tags/luxury-hang-tags.html' }
    ]
  },
  premiumFinish: {
    title: 'Premium Finish',
    description: 'Luxury finishing options for packaging',
    products: [
      { id: 1, name: 'Gold Foil Stamping', image: '/assets/images/P-8.png', url: '/products/premium-finish/gold-and-silver-foil-stamping.html' },
      { id: 2, name: 'Spot UV', image: '/assets/images/box10.png', url: '/products/premium-finish/spot-uv-and-raised-uv.html' }
    ]
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = productData;
}
