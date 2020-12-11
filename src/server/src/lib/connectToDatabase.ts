import mongoose from 'mongoose';

async function connectMongoose() {
  const databaseURI = process.env.MONGODB_URI;
  if (databaseURI === undefined) {
    throw Error('MONGODB_URI environment variable is not provided');
  }

  console.log(`Connecting to the mongo db using URI: "${databaseURI}"...`);
  await mongoose.connect(databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Make Mongoose use `findOneAndRemove() without deprecation warnings`
    useFindAndModify: false,
  });
}

export default connectMongoose;