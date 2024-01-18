
const db = require('.Database/Models/index.ts');
const faker = require('faker');

function generateOrderNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000000); // Generate a random 9-digit number
    return `#${String(randomNumber).padStart(9, '0')}`; // Ensure it starts with '#' and is 9 digits long
}




// Function to generate fake data for publishers
const generateFakeCategories = () => {
  return {
    name: faker.commerce.department()(),
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
const generateFakeProducts = (generateFakeCategories,generateFakeBrands,generateFakeDiscount) => {
  return {
    name: faker.commerce.productName(),
    sub_title:faker.commerce.productAdjective(),
    model:faker.commerce.isbn(10),
    description :faker.commerce.productDescription(), 
    price :faker.commerce.price(), 
    stock_quantity :faker.random.number({ min: 0}),
    discount_id:faker.random.arrayElement(generateFakeDiscount.map((discount) => discount.id)),
    brand_id :faker.random.arrayElement(generateFakeBrands.map((brand) => brand.id)),
    category_id :faker.random.arrayElement(generateFakeCategories.map((category) => category.id))
    
  };
};



const generateFakePublisher = () => {
  return {
    name: faker.company.companyName(),
    country: faker.address.country(),
  };
};

const generateOrders = (createdUsers,OrderNummberArray) => {
  return {

      order_number: generateOrderNumber,
      status: faker.random.arrayElement(['completed', 'processing', 'cancelled']),
      payment_method: faker.random.arrayElement(['card', 'cash', 'paypal', 'bank_transfer', 'crypto']),
      user_id: faker.random.arrayElement(createdUsers.map((user) => user.id)),
  }
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
  // Function to generate fake data for users
  
  // Function to generate fake data for sessions
  const generateFakeSession = (createdUsers) => {
    return {
      sessionId: faker.random.alphaNumeric(20),
      user_id:faker.random.arrayElement(createdUsers.map((user) => user.id)),
    };
  };
  
  // Function to populate the tables with fake data
  export const populateDatabase = async () => {
    try {
      // Generate and insert fake data for publishers
      const fakePublishers = Array.from({ length: 20 }, () => generateFakePublisher());
      const createdPublishers = await db.publishers.bulkCreate(fakePublishers, { returning: true });
      
      // Generate and insert fake data for books
      const fakeBooks = Array.from({ length: 50 }, () => generateFakeBook(createdPublishers));
      const createdBooks = await db.books.bulkCreate(fakeBooks, { returning: true });

      const fakeUsers = Array.from({ length: 20 }, () => generateFakeUser());
      const createdUsers = await db.users.bulkCreate(fakeUsers, { returning: true });
      // Generate and insert fake data for comments
      const fakeComments = Array.from({ length: 100 }, () => generateFakeComment(createdBooks,createdUsers));
      const createdComments = await db.comments.bulkCreate(fakeComments, { returning: true });
  
      // Generate and insert fake data for users
    
      // Generate and insert fake data for sessions
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
