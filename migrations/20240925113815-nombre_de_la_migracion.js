module.exports = {
  async up(db, client) {
    // Insertar un nuevo documento en la colección 'users'
    await db.collection('users').insertOne({
      username: "prueba_migracion",
      email: "prueba@correo.com",
      password: "password123"
    });
  },

  async down(db, client) {
    // Eliminar el documento que insertamos en la migración 'up'
    await db.collection('users').deleteOne({ username: "prueba_migracion" });
  }
};

