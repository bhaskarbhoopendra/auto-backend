import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const createdById = 'Id';
const modifiedById = 'Id';

// TypeORM DataSource configuration
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: 'admin', // Adding default schema if all entities are in the 'admin' schema
  synchronize: false,
  logging: false,
  entities: ['src/models/**/*.model.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});

// Seed function
const seed = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established.');

    // Seed Countries
    const countries = [{ countryName: 'Bharat1' }];

    const savedCountries = await AppDataSource.query(
      `INSERT INTO admin."country" ("countryName") VALUES ($1) RETURNING *`,
      [countries[0].countryName],
    );
    console.log('Countries seeded:', savedCountries);

    // Seed States
    const states = [
      { stateName: 'Madhya pradesh1', countryId: savedCountries[0].countryId },
      { stateName: 'Maharastar1', countryId: savedCountries[0].countryId },
      { stateName: 'Karnatka1', countryId: savedCountries[0].countryId },
    ];

    const savedStates = await AppDataSource.query(
      `INSERT INTO admin."state" ("stateName", "countryId") VALUES ($1, $2), ($3, $4), ($5, $6) RETURNING *`,
      [
        states[0].stateName,
        states[0].countryId,
        states[1].stateName,
        states[1].countryId,
        states[2].stateName,
        states[2].countryId,
      ],
    );
    console.log('States seeded:', savedStates);

    // Seed Cities
    const cities = [
      { cityName: 'Bhopal1', stateId: savedStates[0].stateId },
      { cityName: 'Mumbai1', stateId: savedStates[1].stateId },
      { cityName: 'Banglore1', stateId: savedStates[2].stateId },
    ];

    const savedCities = await AppDataSource.query(
      `INSERT INTO admin."cities" ("cityName", "stateId") VALUES ($1, $2), ($3, $4), ($5, $6) RETURNING *`,
      [
        cities[0].cityName,
        cities[0].stateId,
        cities[1].cityName,
        cities[1].stateId,
        cities[2].cityName,
        cities[2].stateId,
      ],
    );
    console.log('Cities seeded:', savedCities);

    // Seed Sites
    const sites = [
      {
        siteName: 'Rspl new Site',
        siteAddress: 'Address Site 28401',
        cityId: savedCities[0].cityId,
        stateId: savedStates[0].stateId,
        countryId: savedCountries[0].countryId,
        pincode: 123456,
        contactPerson: 'Person A',
        contactNumber: 9876543210,
        status: true,
        createdBy: createdById,
        modifiedBy: modifiedById,
      },
      {
        siteName: 'Rspl new Engineering',
        siteAddress: 'Atladra new Vadodra',
        cityId: savedCities[1].cityId,
        stateId: savedStates[1].stateId,
        countryId: savedCountries[0].countryId,
        pincode: 654321,
        contactPerson: 'Person B',
        contactNumber: 1234567890,
        status: true,
        createdBy: createdById,
        modifiedBy: modifiedById,
      },
    ];

    const savedSites = await AppDataSource.query(
      `INSERT INTO admin."sites" ("siteName", "siteAddress", "cityId", "stateId", "countryId", "pincode", "contactPerson", "contactNumber", "status", "createdBy", "modifiedBy") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11), 
             ($12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *`,
      [
        sites[0].siteName,
        sites[0].siteAddress,
        sites[0].cityId,
        sites[0].stateId,
        sites[0].countryId,
        sites[0].pincode,
        sites[0].contactPerson,
        sites[0].contactNumber,
        sites[0].status,
        sites[0].createdBy,
        sites[0].modifiedBy,
        sites[1].siteName,
        sites[1].siteAddress,
        sites[1].cityId,
        sites[1].stateId,
        sites[1].countryId,
        sites[1].pincode,
        sites[1].contactPerson,
        sites[1].contactNumber,
        sites[1].status,
        sites[1].createdBy,
        sites[1].modifiedBy,
      ],
    );
    console.log('Sites seeded:', savedSites);

    // Seed Locations
    const locations = [
      {
        siteId: savedSites[0].siteId,
        locationName: 'location',
        locationDetails: 'Details A',
        status: true,
        createdBy: createdById,
        modifiedBy: modifiedById,
      },
      {
        siteId: savedSites[1].siteId,
        locationName: 'Mireet',
        locationDetails: 'Details B',
        status: true,
        createdBy: createdById,
        modifiedBy: modifiedById,
      },
    ];

    const savedLocations = await AppDataSource.query(
      `INSERT INTO admin."locations" ("siteId", "locationName", "locationDetails", "status", "createdBy", "modifiedBy") 
      VALUES ($1, $2, $3, $4, $5, $6), 
             ($7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        locations[0].siteId,
        locations[0].locationName,
        locations[0].locationDetails,
        locations[0].status,
        locations[0].createdBy,
        locations[0].modifiedBy,
        locations[1].siteId,
        locations[1].locationName,
        locations[1].locationDetails,
        locations[1].status,
        locations[1].createdBy,
        locations[1].modifiedBy,
      ],
    );
    console.log('Locations seeded:', savedLocations);

    // Seed Departments
    const departments = [
      {
        departmentName: 'Department A',
        locationId: savedLocations[0].locationId,
        departmentDetails: 'Department A ',
        status: true,
        createdBy: createdById,
        modifiedBy: modifiedById,
      },
      {
        departmentName: 'Department B',
        locationId: savedLocations[1].locationId,
        departmentDetails: 'Department B ',
        status: true,
        createdBy: createdById,
        modifiedBy: modifiedById,
      },
    ];

    const savedDepartments = await AppDataSource.query(
      `INSERT INTO admin."departments" ("departmentName", "locationId", "departmentDetails", "status", "createdBy", "modifiedBy") 
      VALUES ($1, $2, $3, $4, $5, $6), 
             ($7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        departments[0].departmentName,
        departments[0].locationId,
        departments[0].departmentDetails,
        departments[0].status,
        departments[0].createdBy,
        departments[0].modifiedBy,
        departments[1].departmentName,
        departments[1].locationId,
        departments[1].departmentDetails,
        departments[1].status,
        departments[1].createdBy,
        departments[1].modifiedBy,
      ],
    );
    console.log('Departments seeded:', savedDepartments);

    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seed().catch((error) => {
  console.error('Error seeding data:', error);
});
