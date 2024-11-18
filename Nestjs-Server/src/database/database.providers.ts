import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://localhost:27017/vehicle-bazar`),
  },
];
// MongoDB connectivity: for online atlas platform
// mongoose.connect(`mongodb+srv://devharsh:google2024@cluster0.l2mjqmn.mongodb.net/nestConn?retryWrites=true&w=majority&appName=Cluster0`)
