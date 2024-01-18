
const db = require('./src/Database/Models/index.ts');
const faker = require('faker');

function generateOrderNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000000); 
    return `#${String(randomNumber).padStart(9, '0')}`; 
}


const generateFakeCategories = () => {
  return {
    name: faker.commerce.department(),
  };
};

const generateFakeBrands = () => {
  return {
    name: faker.company.companyName(),
  };
};

const generateFakeDiscount = () => {
  return {
    percentage: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    start_date: faker.date.past({ years: 1 }),
    expiry_date:faker.date.future({ years: 1 })
  };
};

const generateFakeProducts = (creartedCategories,createdBrands,creartedDiscount) => {
  return {
    name: faker.commerce.productName(),
    sub_title:faker.commerce.productAdjective(),
    model:faker.commerce.isbn(10),
    description :faker.commerce.productDescription(), 
    price :faker.commerce.price(), 
    stock_quantity :faker.random.number({ min: 0}),
    discount_id:faker.random.arrayElement(creartedDiscount.map((discount) => discount.id)),
    brand_id :faker.random.arrayElement(createdBrands.map((brand) => brand.id)),
    category_id :faker.random.arrayElement(creartedCategories.map((category) => category.id))
    
  };
};


const generateFakeUser = () => {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      first_name:faker.person.firstName() ,
      last_name:faker.person.lastName(),
      mobile:faker.phone.number(),
      birth_date:faker.date.birthdate()
    };
  };
  
  const generateFakeReviews = (createdProducts,createdUsers) => {
    return {
      comment: faker.lorem.sentence(),
      rating: faker.random.number({ min: 1, max: 5 }),
      product_id: faker.random.arrayElement(createdProducts.map((product) => product.id)), 
      user_id:faker.random.arrayElement(createdUsers.map((user) => user.id)),
    };
  };
  
  
  const generateFakeWishlist = (createdProducts,createdUsers) => {
    return {
      comment: faker.lorem.sentence(),
      product_id: faker.random.arrayElement(createdProducts.map((product) => product.id)), 
      user_id:faker.random.arrayElement(createdUsers.map((user) => user.id)),
    };
  };
  
    
  const generateFakeShoppinglist = (createdProducts,createdUsers) => {
    return {
      quantity:faker.random.number({ min: 1}),
      product_id: faker.random.arrayElement(createdProducts.map((product) => product.id)), 
      user_id:faker.random.arrayElement(createdUsers.map((user) => user.id)),
    };
  };

  const generateOrders = (createdUsers) => {
    return {
        order_number: generateOrderNumber(),
        status: faker.random.arrayElement(['completed', 'processing', 'cancelled']),
        payment_method: faker.random.arrayElement(['card', 'cash', 'paypal', 'bank_transfer', 'crypto']),
        user_id: faker.random.arrayElement(createdUsers.map((user) => user.id)),
    }
    };

    const generateOrderItems = (createdProducts,createdOrders) => {
      return {
          quantity:faker.random.number({ min: 1}),
          price :faker.commerce.price(), 
          product_id: faker.random.arrayElement(createdProducts.map((product) => product.id)),
          order_id: faker.random.arrayElement(createdOrders.map((order) => order.id)),
      }
      };

  const generateFakeSession = (createdUsers) => {
    return {
      session: faker.random.alphaNumeric(20),
      user_id:faker.random.arrayElement(createdUsers.map((user) => user.id)),
    };
  };
  
  // Function to populate the tables with fake data
  export const populateDatabase = async () => {
    try {


      // Generate and insert fake data for Brands
      const fakeBrands = Array.from({ length: 40 }, () => generateFakeBrands());
      const createdBrands = await db.brands.bulkCreate(fakeBrands, { returning: true });


      // Generate and insert fake data for Categorie
      const fakeCategories = Array.from({ length: 20 }, () => generateFakeCategories());
      const createdCategories= await db.categories.bulkCreate(fakeCategories, { returning: true });


       // Generate and insert fake data for Discounts
       const fakeDiscount = Array.from({ length: 20 }, () => generateFakeDiscount());
       const creartedDiscount= await db.discounts.bulkCreate(fakeDiscount, { returning: true });


      // Generate and insert fake data for Products
      const fakeProducts = Array.from({ length: 200 }, () => generateFakeProducts(createdCategories,createdBrands,creartedDiscount));
      const createdProducts = await db.products.bulkCreate(fakeProducts, { returning: true });


      // Generate and insert fake data for Users
      const fakeUsers = Array.from({ length: 20 }, () => generateFakeUser());
      const createdUsers = await db.users.bulkCreate(fakeUsers, { returning: true });


      // Generate and insert fake data for Reviews
      const fakeReviews = Array.from({ length: 100 }, () => generateFakeReviews(createdProducts,createdUsers));
      const createdReviews = await db.reviews.bulkCreate(fakeReviews, { returning: true });


      // Generate and insert fake data for Wishlists
      const fakeWishlist = Array.from({ length: 20 }, () => generateFakeWishlist(createdProducts,createdUsers));
      const createdWishlist = await db.wishlists.bulkCreate(fakeWishlist, { returning: true });


      // Generate and insert fake data for ShoppingCarts
      const fakeShoppingCart = Array.from({ length: 20 }, () => generateFakeShoppinglist(createdProducts,createdUsers));
      const createdShoppingCarts = await db.shoppingCarts.bulkCreate(fakeShoppingCart, { returning: true });


      // Generate and insert fake data for Orders
      const fakeOrders = Array.from({ length: 100 }, () => generateOrders(createdProducts));
      const createdOrders= await db.orders.bulkCreate(fakeOrders, { returning: true });


      // Generate and insert fake data for OrderItems
      const fakeOrderItems = Array.from({ length: 300 }, () => generateOrderItems(createdProducts,createdOrders));
      const createdOrderItems= await db.orderItems.bulkCreate(fakeOrderItems, { returning: true });

      // Generate and insert fake data for Sessions
      const fakeSessions = Array.from({ length: 30 }, () => generateFakeSession(createdUsers));
      const createdSessions = await db.sessions.bulkCreate(fakeSessions, { returning: true });
  
      console.log('Fake data inserted successfully.');
    } catch (error) {
      console.error('Error inserting fake data:', error);
    } finally {
      // Close the database connection
      await db.sequelize.close();
    }
  };


  // Call the function to populate the database with fake data
  populateDatabase()
