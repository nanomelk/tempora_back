// In this file you can configure migrate-mongo


const config = {
  mongodb: {
    // Aquí pones la URL directa de tu MongoDB
    url: "mongodb+srv://marianomelk:cXU6QSym7zUCW2Zy@temporadb.i9dnb.mongodb.net/tempora_db?retryWrites=true&w=majority",

    // El nombre de la base de datos que estás usando
    databaseName: "tempora_db",

    options: {
      // Opciones que puedes ajustar si es necesario
      // connectTimeoutMS: 3600000,
      // socketTimeoutMS: 3600000,
    }
  },

  // Resto de la configuración de migrate-mongo
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
